**Product Requirements Document (PRD)**

**Project Title:** 10-Minute Strategist (Adjusted Version)

---

### 1. Purpose

A simulation game that trains users to think like a Social Media Strategist by creating strategic content pillar ideas and transforming them into a 5-day Instagram content calendar using real-time AI guidance.

---

### 2. Target Users

* Marketing students
* Aspiring social media strategists
* Junior marketers
* Content creators

---

### 3. Core Concept

Users receive a brand brief and select 3-4 content pillars. They then generate general post ideas for each pillar, supported by AI if desired. The AI then converts these into a structured weekday Instagram content calendar (Mon-Fri). The experience includes client feedback and educational value.

---

### 4. Core Features

* **Client Selection:** Choose from 3 fictional brands
* **Brand Brief:** Instagram-focused brand overview
* **Content Pillar Selection:** Choose 3-4 pillars with short descriptions
* **Idea Input:** Users provide strategic ideas per pillar (main idea + post format)
* **AI Suggestion Support:** Users can ask AI for help in idea generation
* **AI Calendar Generation:** AI creates a 5-day calendar from the input
* **Calendar Review:** Users view and optionally edit the proposed plan
* **Client Feedback:** AI-generated feedback from the client

---

### 5. Game Mechanics

* **Max Time:** 10 minutes
* \*\*Timer starts after "Start Planning"
* **Countdown visible throughout**
* **Warnings at 3:00 and 1:00**
* **Auto-submit if time expires**

---

### 6. OpenAI Integration

**System Prompt:**
You are a social media strategist helping a user plan a 5-day Instagram content calendar for a brand. Use the user-provided content pillar ideas to create daily posts, including platform (Instagram), content pillar, post format, post idea, caption, and hashtags.

**Example Input:**
Client: GoodFood
Platform: Instagram
Pillar Idea: Behind the Kitchen – Show daily lunch prep (Reel)

**AI Output:**

* Platform: Instagram
* Pillar: Behind the Kitchen
* Post Format: Reel
* Post Idea: Chef preparing Thursday lunch special
* Caption: "Fresh, local, and ready for you! 🍲 #LunchVibes #GoodFood #BehindTheKitchen"

---

### 7. Client Briefs

**Client 1: LoveSummer (Fashion)**

* Goal: Promote Spring/Summer collection
* Audience: Women 18-30
* Platform: Instagram only
* Pillars: Outfit Inspiration, Influencer Looks, Behind the Scenes, Testimonials

**Client 2: GoodFood (Restaurant)**

* Goal: Increase weekday reservations
* Audience: Adults 25-45
* Platform: Instagram only
* Pillars: Daily Specials, Behind the Kitchen, Reviews, Chef Tips

**Client 3: GentlemanPalace (Barbershop)**

* Goal: Promote grooming package
* Audience: Men 20-40
* Platform: Instagram only
* Pillars: Transformations, Tips, Staff Spotlights, Testimonials

---

### 8. Technical Architecture

* **Frontend:** React (Next.js), TailwindCSS
* **Backend:** Node.js or Firebase
* **AI API:** OpenAI GPT-4
* **Hosting:** Vercel

---

### 9. AI Implementation Guide

**API Flow:**

1. User inputs ideas per pillar
2. User clicks "Generate Calendar"
3. Request sent to `/api/openai`
4. Prompt formatted and sent to GPT-4
5. AI returns content calendar (5 days)

**Sample Route:** `/pages/api/openai.js`

---

### 10. MVP Checklist

* Client selection
* Instagram-only brand briefs
* Pillar selection with descriptions
* User idea input + post format
* AI suggestions for ideas
* AI calendar generation (Mon-Fri)
* Calendar UI for review
* AI-generated feedback
* Timer (10 min) + auto-submit

---

### 11. Success Metrics

* % of users finishing within 10 minutes
* % using AI for idea generation
* Quality/score of AI-generated content
* Calendar review completion rate
* User satisfaction (1-5)
* Replay and return usage rates
