'use server';

import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function generateTitles(topic: string) {
  try {
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: `You are the #1 YouTube SEO title expert. You write titles that feel HUMAN and natural — the kind real creators with millions of subs actually use. You deeply understand every niche on YouTube and tailor titles to match what works in that specific community. You NEVER use generic clickbait. You always include relevant emojis and 1-2 hashtags at the end.`
        },
        {
          role: 'user',
          content: `Generate exactly 10 enhanced YouTube video titles for this topic: "${topic}"

RULES:
- Titles must feel like a real person wrote them, not an AI
- BANNED phrases: "You Won't Believe", "Shocking Truth", "Won't Guess", "Haunts Forever", "The #1 Thing", "Changes Everything", "This Will Blow Your Mind", "Nobody Is Talking About", "Game Changer", "Mind Blowing"
- NO fake urgency or manufactured suspense
- Auto-detect the content type and write titles that FIT that niche:
    • Reviews/Opinions → "Honest Review", "My Thoughts On", "Is It Worth It?", "After 30 Days"
    • Tutorials/How-To → "How To", "Step by Step", "Beginner's Guide", "In X Minutes", "The Right Way"
    • Reactions/Watchalongs → "First Time Watching", "Reacting To", "My Reaction"
    • Explainers → "Explained", "Breakdown", "Everything You Need To Know"
    • Vlogs/Personal → conversational, first-person, story-driven
    • Rankings/Lists → "Top 5", "Best", "Ranked", "Worst To Best"
    • Gaming → gameplay style titles natural to gaming community
- Include 1-2 relevant emojis per title placed naturally (🍝🎮📱💪💰🎬🔥✅⚡🎯 etc.)
- Add 1-2 relevant hashtags at the END of each title (#TopicName #Niche)
- Keep the CORE keyword/topic from the original
- Aim for 50-70 characters (excluding hashtags)
- Use power words naturally: Ultimate, Complete, Honest, Real, Actual, Full, Essential, Perfect
- Each title should use a DIFFERENT format/angle — no two titles should feel the same

EXAMPLES OF GREAT TITLES:
Input: "how to make pasta" →
"🍝 How To Make Fresh Pasta From Scratch - Beginner Friendly #Pasta #Cooking"
"I Made Homemade Pasta For The First Time 🍝 Here's How It Went #HomeCooking #Pasta"

Input: "iphone 16 review" →
"📱 iPhone 16 After 30 Days - My Honest Review #iPhone16 #Apple"
"Is The iPhone 16 Actually Worth It? Full Review 📱 #TechReview #iPhone16"

Return ONLY a JSON array of 10 strings. No explanation, no markdown.`
        }
      ],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.7,
      max_completion_tokens: 800,
    });

    const responseText = completion.choices[0]?.message?.content || '[]';
    const cleanJson = responseText.replace(/\`\`\`json/g, '').replace(/\`\`\`/g, '').trim();
    const titles = JSON.parse(cleanJson);
    return { success: true, titles: Array.isArray(titles) ? titles : [] };
  } catch (error) {
    console.error('Error generating titles:', error);
    return { success: false, error: 'Failed to generate titles. Please try again.' };
  }
}

async function generateTags(title: string): Promise<string[]> {
  const completion = await groq.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: 'You are a YouTube SEO tags expert. You generate tags that maximize discoverability by mixing exact match, broad, long-tail, and related keywords. Tags are always lowercase, no # symbols.'
      },
      {
        role: 'user',
        content: `Generate 20-25 YouTube tags for this video title: "${title}"

RULES:
- Mix: exact match (topic), broad (niche), long-tail (search phrases), related (adjacent topics)
- All lowercase, NO # symbols
- Vary length: single words + 2-3 word phrases + full search phrases
- Most important tags FIRST
- No duplicate meanings
- Think about what real people actually type in YouTube search

Return ONLY a JSON array of strings. No markdown.`
      }
    ],
    model: 'llama-3.3-70b-versatile',
    temperature: 0.7,
    max_completion_tokens: 500,
  });

  const text = completion.choices[0]?.message?.content || '[]';
  return JSON.parse(text.replace(/```json/g, '').replace(/```/g, '').trim());
}

async function generateHashtags(title: string): Promise<string[]> {
  const completion = await groq.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: 'You are a YouTube hashtag strategist. You know which hashtags drive real views — mixing high-traffic broad hashtags with niche-specific ones for maximum discoverability.'
      },
      {
        role: 'user',
        content: `Generate 8-10 YouTube hashtags for this video title: "${title}"

RULES:
- YouTube shows first 3 above the title — make those the STRONGEST
- Order by importance: highest traffic first
- Mix: 2-3 high-traffic broad + 3-4 medium specific + 2-3 low-competition niche
- CamelCase for multi-word (#HowToCook not #howtocook)
- Only real hashtags that creators in this niche actually use
- No random trending hashtags unrelated to content

Return ONLY a JSON array of strings with # symbol. No markdown.`
      }
    ],
    model: 'llama-3.3-70b-versatile',
    temperature: 0.7,
    max_completion_tokens: 300,
  });

  const text = completion.choices[0]?.message?.content || '[]';
  return JSON.parse(text.replace(/```json/g, '').replace(/```/g, '').trim());
}

async function generateDescription(title: string): Promise<string> {
  const completion = await groq.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: 'You are a YouTube SEO expert who writes optimized video descriptions for ANY niche. You auto-detect the content type and tailor the description style, keywords, and tone accordingly.'
      },
      {
        role: 'user',
        content: `Generate a complete YouTube description for this video title: "${title}"

The description must follow this exact structure:

1. HOOK (2-3 lines): Bold, engaging opening that creates curiosity or value.
   Mention the video topic naturally.

2. CALL TO ACTION (3 lines):
   👍 LIKE if you found this helpful
   💬 COMMENT your thoughts below
   🔔 SUBSCRIBE for more content like this

3. SEO BODY (3-4 sentences): Natural paragraph using keywords related to the video topic,
   woven into real, readable sentences — NOT a keyword list.

4. HASHTAGS: Exactly 5 relevant hashtags at the end.

STRICT RULES:
- Auto-detect the niche and match the tone
- No keyword stuffing or tag walls
- Total description under 250 words
- Keep it readable and human, not robotic
- Hashtags go at the very end only

Return ONLY the description as plain text. No JSON, no explanation.`
      }
    ],
    model: 'llama-3.3-70b-versatile',
    temperature: 0.7,
    max_completion_tokens: 600,
  });

  return completion.choices[0]?.message?.content?.trim() || '';
}
async function generatePinnedComment(title: string): Promise<string> {
  const completion = await groq.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: 'You are a YouTube engagement expert. You write pinned comments that drive replies, boost watch time, and make the algorithm favor the video.'
      },
      {
        role: 'user',
        content: `Write a pinned comment for a YouTube video titled: "${title}"

RULES:
- Start with a hook or question that makes people REPLY
- Keep it 2-4 lines max
- Match the tone of the niche (casual for vlogs, excited for gaming, helpful for tutorials)
- Include a call-to-action: ask viewers to comment their opinion, answer a question, or share their experience
- Use 1-2 relevant emojis
- Feel authentic, like the creator actually wrote it
- Do NOT say "pin this" or "pinned comment"

EXAMPLES:
For a cooking video: "What's your go-to comfort food? Mine is definitely this pasta 🍝 Drop yours below!"
For a tech review: "Would you switch to this phone? I'm curious what you guys think 📱👇"
For gaming: "This was genuinely the hardest boss I've ever fought 😂 Has anyone actually beaten this first try?"

Return ONLY the comment as plain text.`
      }
    ],
    model: 'llama-3.3-70b-versatile',
    temperature: 0.8,
    max_completion_tokens: 200,
  });

  return completion.choices[0]?.message?.content?.trim() || '';
}

export async function generateDetails(selectedTitle: string) {
  try {
    const [tags, hashtags, description, pinnedComment] = await Promise.all([
      generateTags(selectedTitle),
      generateHashtags(selectedTitle),
      generateDescription(selectedTitle),
      generatePinnedComment(selectedTitle),
    ]);

    return {
      success: true,
      details: {
        description,
        hashtags: Array.isArray(hashtags) ? hashtags : [],
        tags: Array.isArray(tags) ? tags : [],
        pinnedComment,
      },
    };
  } catch (error) {
    console.error('Error generating details:', error);
    return { success: false, error: 'Failed to generate details. Please try again.' };
  }
}

// === Standalone exported actions for dedicated tool pages ===

export async function generateHashtagsOnly(topic: string) {
  try {
    const hashtags = await generateHashtags(topic);
    return { success: true, hashtags: Array.isArray(hashtags) ? hashtags : [] };
  } catch (error) {
    console.error('Error generating hashtags:', error);
    return { success: false, error: 'Failed to generate hashtags. Please try again.' };
  }
}

export async function generateTagsOnly(topic: string) {
  try {
    const tags = await generateTags(topic);
    return { success: true, tags: Array.isArray(tags) ? tags : [] };
  } catch (error) {
    console.error('Error generating tags:', error);
    return { success: false, error: 'Failed to generate tags. Please try again.' };
  }
}

export async function generateDescriptionOnly(topic: string) {
  try {
    const description = await generateDescription(topic);
    return { success: true, description };
  } catch (error) {
    console.error('Error generating description:', error);
    return { success: false, error: 'Failed to generate description. Please try again.' };
  }
}
