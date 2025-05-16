import { OpenAI } from 'openai';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { client, pillars, ideas } = req.body;

  if (!client || !pillars || !ideas) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    // Construct the prompt
    const systemPrompt = `You are a social media strategist helping a user plan a 5-day Instagram content calendar for a brand. Use the user-provided content pillar ideas to create daily posts, including platform (Instagram), content pillar, post format, post idea, caption, and hashtags. 

IMPORTANT: 
1. You must determine the most appropriate post format (Carousel, Reel, Single Image, Story, or IGTV) for each post based on the content pillar and main idea.
2. Provide ALL responses in Bahasa Indonesia. 
3. Make sure all captions and hashtags are appropriate for an Indonesian audience.
4. Format your response in a structured way for each day (Monday through Friday), with clear labels for each section.
5. Use this exact format for each day:
   Hari: [day name in Indonesian]
   Pilar: [content pillar]
   Format: [post format]
   Ide: [post idea]
   Caption: [caption with emojis]
   Hashtags: [3-5 hashtags]`;

    // Format the user input for the prompt
    let userPrompt = `Client: ${client.name}\n`;
    userPrompt += `Industry: ${client.industry}\n`;
    userPrompt += `Goal: ${client.brief.goal}\n`;
    userPrompt += `Audience: ${client.brief.audience}\n\n`;
    
    userPrompt += `Content Pillars and Ideas:\n`;
    
    // Add the content pillars and ideas to the prompt
    let hasPillars = false;
    pillars.forEach(pillar => {
      const pillarIdeas = ideas[pillar.id];
      
      if (pillar && pillarIdeas && pillarIdeas.mainIdea) {
        userPrompt += `- ${pillar.name}: ${pillarIdeas.mainIdea}\n`;
        hasPillars = true;
      }
    });
    
    // If no pillars with ideas were found, add a default one to ensure we get a response
    if (!hasPillars) {
      userPrompt += `- Content Pillar 1: Informative posts about the brand\n`;
      userPrompt += `- Content Pillar 2: Behind the scenes content\n`;
      console.log('No pillar ideas found, using default pillars');
    }

    userPrompt += `\nPlease create a 5-day Instagram content calendar (Monday through Friday) for ${client.name} based on these ideas. For each day, include the following:
1. Day of the week (in Indonesian: Senin, Selasa, Rabu, Kamis, Jumat)
2. Content pillar
3. Post format (choose the most appropriate format: Carousel, Reel, Single Image, Story, or IGTV)
4. Post idea (detailed)
5. Caption (with emojis)
6. 3-5 relevant hashtags

IMPORTANT: 
- Choose the most appropriate post format for each idea based on the content type and what would be most engaging for the audience.
- Format your response with clear labels for each section (Hari, Pilar, Format, Ide, Caption, Hashtags).
- Provide ALL text in Bahasa Indonesia.`;

    console.log('Sending prompt to OpenAI:', userPrompt);

    // Call the OpenAI API
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      temperature: 0.7,
      max_tokens: 2000,
    });

    const response = completion.choices[0].message.content;
    console.log('OpenAI response:', response);
    
    // Process the response into a structured calendar
    const calendar = processCalendarResponse(response);
    console.log('Processed calendar:', calendar);
    
    // Generate client feedback
    const feedback = await generateClientFeedback(openai, client, calendar);

    return res.status(200).json({ calendar, feedback });
  } catch (error) {
    console.error('Error calling OpenAI:', error);
    return res.status(500).json({ message: 'Error generating content calendar', error: error.message });
  }
}

// Helper function to process the OpenAI response into a structured calendar
function processCalendarResponse(response) {
  console.log('Raw AI response:', response);
  
  // Create a structured calendar object
  const calendar = {};
  const expectedDays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
  
  // Map Indonesian day names to English
  const dayMapping = {
    'senin': 'monday',
    'selasa': 'tuesday',
    'rabu': 'wednesday',
    'kamis': 'thursday',
    'jumat': 'friday'
  };
  
  // First, create an empty structure for all days
  expectedDays.forEach(day => {
    calendar[day] = {
      day: day,
      content: {
        pillar: '',
        format: '',
        idea: '',
        caption: '',
        hashtags: []
      }
    };
  });
  
  try {
    // Split the response by double newlines to get each day's section
    const sections = response.split(/\n\n+/);
    console.log('Sections:', sections);
    
    let currentDay = null;
    let currentSection = {};
    
    // Process each section
    for (const section of sections) {
      // Skip empty sections
      if (!section.trim()) continue;
      
      // Check if this is a new day section
      const dayLines = section.split('\n');
      const firstLine = dayLines[0].trim().toLowerCase();
      
      // Check if the section starts with a day identifier
      const isDayHeader = firstLine.includes('senin') || 
                          firstLine.includes('selasa') || 
                          firstLine.includes('rabu') || 
                          firstLine.includes('kamis') || 
                          firstLine.includes('jumat') || 
                          firstLine.includes('monday') || 
                          firstLine.includes('tuesday') || 
                          firstLine.includes('wednesday') || 
                          firstLine.includes('thursday') || 
                          firstLine.includes('friday');
      
      if (isDayHeader) {
        // Extract the day name
        let dayName = '';
        for (const key of Object.keys(dayMapping)) {
          if (firstLine.includes(key)) {
            dayName = dayMapping[key];
            break;
          }
        }
        
        // If we found an English day name
        if (!dayName) {
          for (const engDay of expectedDays) {
            if (firstLine.includes(engDay)) {
              dayName = engDay;
              break;
            }
          }
        }
        
        if (dayName) {
          currentDay = dayName;
          currentSection = {};
          console.log('Found day section:', currentDay);
        }
      }
      
      // If we have a current day, extract content
      if (currentDay) {
        // Process each line to extract content
        for (const line of dayLines) {
          const lineLower = line.toLowerCase();
          
          // Extract content based on labels
          if (lineLower.startsWith('pilar:') || lineLower.startsWith('pillar:') || lineLower.includes('content pillar')) {
            const value = line.split(':')[1]?.trim() || '';
            calendar[currentDay].content.pillar = value;
          } 
          else if (lineLower.startsWith('format:') || lineLower.includes('post format')) {
            const value = line.split(':')[1]?.trim() || '';
            calendar[currentDay].content.format = value;
          }
          else if (lineLower.startsWith('ide:') || lineLower.startsWith('idea:') || lineLower.includes('post idea')) {
            const value = line.split(':')[1]?.trim() || '';
            calendar[currentDay].content.idea = value;
          }
          else if (lineLower.startsWith('caption:')) {
            const value = line.split(':')[1]?.trim() || '';
            calendar[currentDay].content.caption = value;
          }
          else if (lineLower.startsWith('hashtag:') || lineLower.startsWith('hashtags:')) {
            const value = line.split(':')[1]?.trim() || '';
            calendar[currentDay].content.hashtags = value.split(/\s+/).filter(tag => tag.startsWith('#'));
          }
        }
      }
    }
    
    console.log('Processed calendar:', calendar);
  } catch (error) {
    console.error('Error processing calendar response:', error);
  }
  
  // Verify we have content for all days
  const hasAllDays = expectedDays.every(day => 
    calendar[day] && 
    calendar[day].content && 
    calendar[day].content.pillar && 
    calendar[day].content.format
  );
  
  if (!hasAllDays) {
    console.log('Some days are missing content, creating fallback content');
    
    // Fill in missing content with fallback values
    expectedDays.forEach(day => {
      if (!calendar[day] || !calendar[day].content || !calendar[day].content.pillar) {
        calendar[day] = {
          day: day,
          content: {
            pillar: `Content Pillar for ${day}`,
            format: 'Reel',
            idea: `Post idea for ${day}`,
            caption: `Caption for ${day} 📱 #social`,
            hashtags: ['#content', '#social', '#instagram']
          }
        };
      }
    });
  }
  
  return calendar;
}

// Helper function to generate client feedback
async function generateClientFeedback(openai, client, calendar) {
  const feedbackPrompt = `You are the marketing director at ${client.name}. Your social media strategist has just presented you with the following 5-day Instagram content calendar:

${JSON.stringify(calendar, null, 2)}

Please provide brief feedback (2-3 sentences) on this content calendar. Consider how well it aligns with our goal to "${client.brief.goal}" and targets our audience of "${client.brief.audience}". Include one specific thing you like and one suggestion for improvement. IMPORTANT: Provide your feedback in Bahasa Indonesia.`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      { role: "user", content: feedbackPrompt }
    ],
    temperature: 0.7,
    max_tokens: 200,
  });

  return completion.choices[0].message.content;
}
