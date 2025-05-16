import { OpenAI } from 'openai';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { client, pillar, field } = req.body;

    if (!client || !pillar) {
      return res.status(400).json({ message: 'Missing required data' });
    }
    
    // Default to suggesting both fields if not specified
    const suggestField = field || 'both';

    // Initialize OpenAI
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    // Construct the prompt based on the field requested
    let prompt = `You are a social media strategist helping to generate Instagram content ideas.
    
Client: ${client.name}
Industry: ${client.industry}
Goal: ${client.brief.goal}
Target Audience: ${client.brief.audience}
Content Pillar: ${pillar.name} - ${pillar.description}\n
IMPORTANT: Provide ALL suggestions in Bahasa Indonesia. Make sure all ideas, captions, and hashtags are appropriate for an Indonesian audience.\n`;
    
    if (suggestField === 'mainIdea') {
      prompt += `\nPlease suggest 1 creative main idea for an Instagram post for the "${pillar.name}" content pillar. The idea should be 1-2 sentences that clearly describe what the post will be about.\n\nFormat your response as: "Main Idea: [your suggestion]"\n\nBe specific and creative.`;
    } else if (suggestField === 'postFormat') {
      prompt += `\nPlease suggest the most appropriate post format for an Instagram post for the "${pillar.name}" content pillar.\n\nChoose from: Carousel, Reel, Single Image, Story, or IGTV.\n\nFormat your response as: "Post Format: [your suggestion]"\n\nConsider which format would best showcase this type of content.`;
    } else {
      prompt += `\nPlease suggest 1 creative Instagram post idea for the "${pillar.name}" content pillar. Include:\n1. A main idea (1-2 sentences)\n2. A suggested post format (e.g., Carousel, Reel, Single Image, Story)\n\nFormat your response with "Main Idea:" and "Post Format:" labels.`;
    }

    // Call the OpenAI API
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "user", content: prompt }
      ],
      temperature: 0.8,
      max_tokens: 500,
    });

    const suggestions = completion.choices[0].message.content;

    return res.status(200).json({ suggestions });
  } catch (error) {
    console.error('Error calling OpenAI:', error);
    return res.status(500).json({ message: 'Error generating suggestions', error: error.message });
  }
}
