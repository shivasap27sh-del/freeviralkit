'use server';

import { checkRateLimit, generateWithFallback, safeParseJsonArray, sanitizeInput, searchGroundedContext } from './core';

export async function generateTitles(topic: string, excludeTitles: string[] = [], niche?: string) {
  try {
    const sanitizedTopic = sanitizeInput(topic);
    if (!sanitizedTopic) {
      return { success: false, error: 'Topic cannot be empty.' };
    }

    const rateLimit = await checkRateLimit();
    if (!rateLimit.allowed) {
      return { success: false, error: `Rate limit exceeded. Please wait ${rateLimit.retryAfter} seconds.` };
    }

    const sanitizedExcludes = Array.isArray(excludeTitles) 
      ? excludeTitles.map(t => sanitizeInput(t)).filter(Boolean)
      : [];

    // Fetch real-time web context about the topic (current movies, trends, news, etc.)
    const webContext = await searchGroundedContext(sanitizedTopic);

    const responseText = await generateWithFallback([
      {
        role: 'system',
        content: `You are not a "YouTube title generator." You are a creator who has spent 8 years studying what makes people STOP scrolling and click. You've analyzed thousands of viral videos across every niche and you understand the deep psychology of clickthrough rate.

Your core belief: Every great title exploits ONE specific psychological trigger. Generic titles die. Specific titles win. The more a title sounds like it was written by a REAL person with a REAL opinion, the better it performs.

You know these psychological hooks inside-out:
• CURIOSITY GAP — create a gap between what the viewer knows and what they desperately want to know
• EXTREME SPECIFICITY — use exact numbers, names, timeframes ("I spent 347 hours testing...")
• CONTRARIAN TAKE — challenge something the audience assumes is true
• IDENTITY HOOK — make the viewer feel personally called out ("Every guitarist does this wrong")
• PATTERN INTERRUPT — break expected YouTube title format entirely
• STORY HOOK — imply a narrative arc with stakes ("The day I almost lost everything")
• AUTHORITY FLEX — establish credibility through experience ("After 10,000 client sessions...")
• COMPARISON TENSION — pit two things against each other unexpectedly
• TIME PRESSURE — urgency without being spammy ("before they patch this", "while it still works")
• RESULT REVEAL — lead with the outcome, not the process ("$0 to $12K/mo — here's the system")
${niche ? `\nCRITICAL: You are writing for the "${niche}" niche. Use insider terminology, community slang, and references that ONLY someone deep in ${niche} would know. An outsider reading these titles should feel slightly confused — that's how you know they're targeted enough.` : ''}
${webContext ? `\nCURRENT REAL-WORLD CONTEXT (use this for specific, timely references — names, details, trending angles):\n${webContext}` : ''}`
      },
      {
        role: 'user',
        content: `Generate exactly 10 YouTube video titles for: "${sanitizedTopic}"

ABSOLUTE REQUIREMENTS:
- Each title MUST use a DIFFERENT psychological hook from the list above. Never repeat the same hook type.
- Every title must pass the "scroll test": would a REAL person stop mid-scroll to click this?
- Titles must sound like a human with genuine enthusiasm or strong opinion wrote them — NOT an AI template
- Mix lengths naturally: some punchy (25-40 chars), some detailed (50-70 chars)
- Use emojis SPARINGLY — max 1 emoji on max 3 titles. Most titles should have ZERO emojis.
- HASHTAGS ARE IMPORTANT FOR SEO: Add 1-2 relevant niche-specific hashtags at the END of 5-6 titles. Use hashtags that real viewers search (e.g. #GamingSetup, #BudgetMeals, #HomeWorkout). The remaining 4-5 titles should be clean with NO hashtags for a punchy viral feel.

HARD BANNED (never use these or anything similar):
"You Won't Believe", "Shocking Truth", "Game Changer", "Mind Blowing", "Changes Everything",
"What They Don't Tell You", "Nobody Talks About", "Is It Worth It", "The Real Reason",
"Stop Doing This", "Don't Make This Mistake", "Why I Stopped", "The Truth About",
"Watch Before You", "This Is Why", "Here's Why", "I Was Wrong About",
"Everything You Need to Know", "The Ultimate Guide", "Complete Breakdown"

ALSO BANNED: Starting 3+ titles the same way. Using "..." at the end of more than 1 title. Putting ALL CAPS words in more than 2 titles.

${sanitizedExcludes.length > 0 ? `NEVER repeat or rephrase any of these previous titles: ${JSON.stringify(sanitizedExcludes)}` : ''}

Return ONLY a JSON array of 10 strings. No explanation, no markdown, no numbering.
[Seed: ${Math.random().toString(36).substring(2, 10)}]`
      }
    ], { temperature: 0.9, maxTokens: 800 });

    const titles = safeParseJsonArray(responseText);
    return { success: true, titles: Array.isArray(titles) ? titles : [] };
  } catch (error) {
    console.error('Error generating titles:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Failed to generate titles.' };
  }
}
