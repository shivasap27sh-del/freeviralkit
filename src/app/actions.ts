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
          content: `You are the #1 YouTube title strategist with 10+ years of experience. You create TWO types of titles:

TYPE A — SEO TITLES: Keyword-rich, 50-70 chars, optimized for YouTube search rankings. Include emojis and hashtags.
TYPE B — VIRAL TITLES: Short, punchy, 20-45 chars MAX. These are the titles trending creators use — curiosity-driven, emotional, raw. Think "I Quit.", "This Broke Me.", "It Actually Works.", "We Need To Talk.", "Not What I Expected." style. These titles make people CLICK because they FEEL something. Emojis optional. NO hashtags on viral titles.

You deeply understand every niche and tailor both styles to match the community.`
        },
        {
          role: 'user',
          content: `Generate exactly 10 YouTube video titles for this topic: "${topic}"

STRUCTURE (follow this EXACTLY):
- Titles 1-5: SEO-OPTIMIZED (Type A) — keyword-rich, 50-70 chars, emojis + hashtags at end
- Titles 6-8: SHORT & PUNCHY VIRAL (Type B) — 20-45 chars MAX, emotional, curiosity-driven, NO hashtags
- Titles 9-10: TRENDING FORMAT (Type B) — mimic what's trending RIGHT NOW on YouTube, short and raw

RULES FOR ALL:
- Must feel like a REAL person wrote them, not an AI
- BANNED phrases: "You Won't Believe", "Shocking Truth", "Won't Guess", "Haunts Forever", "The #1 Thing", "Changes Everything", "This Will Blow Your Mind", "Nobody Is Talking About", "Game Changer", "Mind Blowing"
- NO fake urgency or manufactured suspense
- Keep the CORE keyword/topic present in every title
- Each title MUST use a completely DIFFERENT angle/format

RULES FOR TYPE A (SEO — titles 1-5):
- Auto-detect niche and use matching formats:
    • Reviews → "Honest Review", "After 30 Days", "Is It Worth It?"
    • Tutorials → "How To", "Step by Step", "In X Minutes"
    • Gaming → natural gaming community style
    • Vlogs → conversational, first-person
- Include 1-2 relevant emojis placed naturally
- Add 1-2 hashtags at the END (#TopicName #Niche)
- Use power words: Ultimate, Complete, Honest, Real, Full

RULES FOR TYPE B (VIRAL — titles 6-10):
- SHORT. Under 45 characters. Period.
- Use formats top creators use:
    • Statement: "I Quit My Job.", "This is Real.", "It's Finally Done."
    • Reaction: "bro what.", "nah this is crazy.", "I can't believe this."
    • Emotional: "This Broke Me.", "I Wasn't Ready.", "It Hit Different."
    • Cliffhanger: "So This Happened...", "We Need To Talk.", "I Was Wrong."
    • Raw/Casual: lowercase or minimal punctuation for authenticity
- Emojis optional (max 1)
- NO hashtags on viral titles
- These should make someone's thumb STOP while scrolling

EXAMPLES:
Input: "how to make pasta" →
SEO: "🍝 How To Make Fresh Pasta From Scratch - Beginner Friendly #Pasta #Cooking"
SEO: "Homemade Pasta in 30 Minutes — Easier Than You Think 🍝 #Cooking #PastaRecipe"
VIRAL: "I finally made pasta from scratch."
VIRAL: "this changed how I cook forever."
TRENDING: "pasta from scratch hits different 🍝"

Input: "iphone 16 review" →
SEO: "📱 iPhone 16 After 30 Days - My Honest Review #iPhone16 #Apple"
VIRAL: "I Was Wrong About the iPhone 16."
VIRAL: "returning my iPhone."
TRENDING: "the iPhone 16 is not what you think."

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
        content: 'You are a YouTube tags expert who optimizes for BOTH search rankings AND viral/Shorts discoverability. You generate tags that mix SEO keywords with trending Shorts tags to maximize reach across all YouTube surfaces.'
      },
      {
        role: 'user',
        content: `Generate 25-30 YouTube tags for this video title: "${title}"

STRUCTURE:
- Tags 1-10: SEO TAGS — exact match keywords, broad niche terms, long-tail search phrases
- Tags 11-18: SHORTS & VIRAL TAGS — tags that boost Shorts discoverability: "shorts", "youtube shorts", "viral", "trending", plus niche-specific viral tags
- Tags 19-25+: TRENDING TAGS — what people are searching RIGHT NOW in this niche, casual/slang search terms real people type

RULES:
- All lowercase, NO # symbols
- Vary length: single words + 2-3 word phrases + full search phrases
- Most important tags FIRST within each category
- No duplicate meanings
- MUST include: "shorts", "youtube shorts", "viral", "trending" if the content could work as a Short
- Include casual/slang terms people actually search (e.g. "satisfying", "fyp", "must watch", "insane")
- Think about what real people type in YouTube search AND what tags trending Shorts use
- Stay under 500 total characters

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
        content: 'You are a YouTube hashtag strategist who optimizes for BOTH long-form videos AND Shorts. You mix high-traffic SEO hashtags with viral/trending Shorts hashtags for maximum discoverability across all YouTube surfaces.'
      },
      {
        role: 'user',
        content: `Generate 10-12 YouTube hashtags for this video title: "${title}"

STRUCTURE:
- First 3: STRONGEST high-traffic hashtags (these show above the title)
- Next 4-5: Niche-specific SEO hashtags
- Last 3-4: Shorts/Viral hashtags — MUST include #Shorts, #Viral, #Trending if relevant

RULES:
- YouTube shows first 3 above the title — make those the STRONGEST
- Order by importance: highest traffic first
- CamelCase for multi-word (#HowToCook not #howtocook)
- Only real hashtags that creators in this niche actually use
- ALWAYS include #Shorts if the content could work as a Short
- Include viral-format hashtags: #Viral, #Trending, #FYP, #MustWatch where appropriate
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
