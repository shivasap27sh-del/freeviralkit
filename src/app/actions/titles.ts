'use server';

import { executeAIGeneration, safeParseJsonArray } from './core';

interface NicheStrategy {
  role: string;
  framework: string;
  archetypes: string[];
  rules: string[];
  examples: string[];
}

function getNicheStrategy(niche?: string): NicheStrategy {
  const lowerNiche = (niche || '').toLowerCase();

  // 1. BESPOKE STRATEGY: Anime & Manga
  if (lowerNiche.includes('anime') || lowerNiche.includes('manga')) {
    return {
      role: `You are an elite Anime YouTube essayist and community analyst (in the style of AniNews, Totally Not Mark, and Nux Taku). You know Shonen, Seinen, power-scaling debates, seasonal hype cycles, and manga lore inside out.`,
      framework: `Anime titles must tap into deep community debates, unresolved plot loops, power-scaling comparisons, and manga-vs-anime differences.`,
      archetypes: [
        `POWER SCALING & VS BATTLES (2 titles): "Could Gojo Defeat Sukuna Without 10 Shadows?", "Top 5 Characters Who Break Anime Logic"`,
        `MANGA LORE & "WHAT THE ANIME CUT" (2 titles): "The Dark One Piece Secret Episode 1120 Left Out", "Why Mappa Changed This Scene in Season 2"`,
        `SEASONAL TIER LISTS & HOT TAKES (2 titles): "Ranking Every Winter 2026 Anime (Peak vs Trash)", "The 1 Overrated Anime Everyone is Hyping"`,
        `HIDDEN FORESHADOWING (2 titles): "The Attack on Titan Clue We All Missed for 10 Years", "Luffy's Real Dream Finally Confirmed by Oda"`,
        `CHARACTER PSYCHOLOGY (2 titles): "The Tragic Philosophy of Eren Yeager", "Why [Character] is the Best Written Villain in Anime"`
      ],
      rules: [
        `Front-load the Anime franchise or primary character name in the first 3 words.`,
        `Never use boring titles like "My Thoughts on..." or "Anime Review Episode 4".`,
        `Ensure titles spark an immediate opinion or debate in the comments.`
      ],
      examples: [
        `Luffy's Gear 5 Explained: What the Anime Changed #OnePiece`,
        `Could Sukuna Beat Gojo in a Fair Fight? (Full Analysis)`,
        `Ranking Every Winter 2026 Anime (Peak vs Trash) #Anime2026`
      ]
    };
  }

  // 2. BESPOKE STRATEGY: ASMR & Relaxation
  if (lowerNiche.includes('asmr') || lowerNiche.includes('relaxation') || lowerNiche.includes('sleep')) {
    return {
      role: `You are a master ASMR audio engineer and sleep therapist (in the style of Gibi ASMR, ASMR Glow, and Tingting). You understand binaural acoustics, 3Dio mic technology, trigger keywords, and insomnia psychology.`,
      framework: `ASMR titles require sensory physical trigger keywords, bracketed audio tags ([No Talking], [Binaural 3Dio], [Whispered]), and emotional sleep/insomnia relief framing.`,
      archetypes: [
        `DEEP SLEEP & INSOMNIA CURE (2 titles): "ASMR for When You Cannot Sleep (Soft Whispers & Rain)", "1 Hour of Deep Brain Tingles [Instant Sleep]"`,
        `AGGRESSIVE & NO-TALKING TRIGGERS (2 titles): "ASMR Fast & Aggressive Tapping on 15 Objects [No Talking]", "Intense Scratching & Fluffy Mic Brushing [3Dio]"`,
        `PERSONAL ATTENTION & EXAMS (2 titles): "ASMR Real Person Cranial Nerve Exam (Close-up & Calming)", "Late Night Spa & Face Brushing Roleplay [Whisper]"`,
        `LO-FI & COZY AMBIENCE (2 titles): "ASMR Rainy Night in Tokyo (Cozy Bedroom Ambience)", "Vintage Book Turning & Gentle Paper Sounds [Study]"`,
        `BINAURAL ACOUSTICS (2 titles): "3Dio Ear Cleaning & Tingles for Deep Relaxation", "Ultra Sensitive Microphone Tapping for Tingles"`
      ],
      rules: [
        `ALWAYS start the title with "ASMR" in the first word.`,
        `Include exactly 1 bracketed trigger tag at the end (e.g. [No Talking], [Binaural 3Dio], [Whispered], [1 Hour], [Ultra Sensitive]).`,
        `Never use harsh, loud, or clickbait words; use soothing, tactile, and sensory language.`
      ],
      examples: [
        `ASMR Fast & Aggressive Tapping on 15 Objects [No Talking] #ASMR`,
        `ASMR Real Person Cranial Nerve Exam (Close-up & Calming)`,
        `1 Hour of Pure Rain & Soft Whispers for Sleep [Binaural 3Dio]`
      ]
    };
  }

  // 3. BESPOKE STRATEGY: Faceless Channels, Documentaries & YouTube Automation
  if (
    lowerNiche.includes('faceless') ||
    lowerNiche.includes('automation') ||
    lowerNiche.includes('documentary') ||
    lowerNiche.includes('cash cow')
  ) {
    return {
      role: `You are an elite Documentary Showrunner and Investigative Script Director (in the style of MagnatesMedia, Moon, Fern, Johnny Harris, and Jake Tran). You craft high-RPM titles for narrative video essays.`,
      framework: `Faceless documentary titles must lead with institutional brands, geopolitical stakes, corporate intrigue, or dark psychology to maximize browse feature CTR.`,
      archetypes: [
        `CORPORATE EXPOSÉ & MONOPOLY (2 titles): "How Rolex Tricked the World into Buying Status", "The $3 Trillion AI Monopoly Nobody is Talking About"`,
        `IMPOSSIBLE HEISTS & FINANCIAL SCANDALS (2 titles): "The $500M Art Heist That Fooled the FBI for 25 Years", "How a Fake Billionaire Conned Wall Street"`,
        `GEOPOLITICS & CRITICAL COMMODITIES (2 titles): "Why Taiwan's Microchips are More Dangerous Than Oil", "The Secret Reason Dubai is Running Out of Money"`,
        `DARK PSYCHOLOGY & CONSUMER MANIPULATION (2 titles): "The Dark Psychology Casinos Use to Drain Your Wallet", "Why Fast Food Menus are Designed to Manipulate You"`,
        `SYSTEM COLLAPSE & REVELATION (2 titles): "Why WeWork Was Destined to Crash from Day One", "The Terrifying Truth About the Global Subsea Cable Grid"`
      ],
      rules: [
        `Lead with a recognizable brand, powerful institution, or provocative revelation in the first 3 words.`,
        `Use revelation verbs: "How X Tricked...", "Why X is Collapsing", "The Dark Truth About...", "The Secret Reason...".`,
        `Avoid generic YouTube tropes; frame every video like a high-budget Netflix documentary.`
      ],
      examples: [
        `How Rolex Tricked the World into Buying Status #Business`,
        `The $500M Art Heist That Fooled the FBI for 25 Years`,
        `Why Taiwan's Microchips are More Dangerous Than Oil #Tech`
      ]
    };
  }

  // 4. BESPOKE STRATEGY: Personal Finance, Wealth & Crypto ($15-$50+ RPM)
  if (
    lowerNiche.includes('finance') ||
    lowerNiche.includes('wealth') ||
    lowerNiche.includes('money') ||
    lowerNiche.includes('crypto') ||
    lowerNiche.includes('investing') ||
    lowerNiche.includes('stock')
  ) {
    return {
      role: `You are an elite Wealth Strategist and Financial Media Director (in the style of Graham Stephan, Andrei Jikh, Ali Abdaal, and Meet Kevin). You know macroeconomic cycles, compounding math, asymmetrical risk/reward, and high-RPM YouTube finance audience psychology.`,
      framework: `Personal finance titles must lead with real dollar figures, asymmetrical math, wealth traps, or economic shifts to maximize ultra-high RPM ($15-$50+) advertiser placement.`,
      archetypes: [
        `ASYMMETRICAL WEALTH & COMPOUNDING (2 titles): "How to Invest $1,000 in 2026 (The Compound Interest Math)", "The $10,000/mo Dividend Portfolio Blueprint"`,
        `WEALTH TRAPS & MIDDLE-CLASS PENALTIES (2 titles): "The 5 Money Traps Keeping You Broke (Stop Buying These)", "Why Most People Go Broke Trying to Look Rich"`,
        `MARKET CYCLES & ECONOMIC SHIFTS (2 titles): "What the 2026 Fed Rate Cut Means for Your Money", "The Real Estate Market is Shifting: What to Buy Now"`,
        `PASSIVE INCOME & CASH FLOW SYSTEMS (2 titles): "7 Realistic Passive Income Streams to Build in 2026", "How I Built a $5,000/Month Cash Flow Engine"`,
        `BEHAVIORAL PSYCHOLOGY & HIGH-CONVICTION (2 titles): "The Psychology of Money: Habits That Build Real Wealth", "Why High Earners Still Live Paycheck to Paycheck"`
      ],
      rules: [
        `Include exact dollar benchmarks ($1,000, $10K/mo, $100K) or specific percentage yields.`,
        `Never make illegal financial guarantees; focus on principles, data, and behavioral frameworks.`,
        `Front-load high-commercial intent keywords: "Invest", "Passive Income", "Dividend", "Wealth", "Money".`
      ],
      examples: [
        `How to Invest $1,000 in 2026 (Step-by-Step Blueprint) #Finance`,
        `The 5 Money Traps Keeping the Middle Class Broke in 2026`,
        `How I Built a $10,000/Month Dividend Portfolio (The Math)`
      ]
    };
  }

  // 5. BESPOKE STRATEGY: AI Tools, Automation & Software Engineering
  if (
    lowerNiche.includes('ai') ||
    lowerNiche.includes('tech') ||
    lowerNiche.includes('automation') ||
    lowerNiche.includes('coding') ||
    lowerNiche.includes('developer') ||
    lowerNiche.includes('software')
  ) {
    return {
      role: `You are an elite AI Architect and Tech Media Producer (in the style of Fireship, Matt Wolfe, NetworkChuck, and Wes Roth). You know LLMs, Agentic AI, developer tooling, automation workflows, and zero-fluff software reviews.`,
      framework: `AI & Tech titles must emphasize concrete tool capability, speed benchmarks, autonomous workflows, or developer productivity shifts.`,
      archetypes: [
        `AUTONOMOUS AGENTS & WORKFLOWS (2 titles): "I Built an Autonomous AI Agent in 10 Minutes (No Code)", "How AI Agents Are Replacing Traditional SaaS Tools"`,
        `ZERO-FLUFF BENCHMARK REVIEWS (2 titles): "OpenAI o3 vs DeepSeek R1 vs Claude 3.7: The Brutal Truth", "The Best Free AI Tools for Creators in 2026"`,
        `PRODUCTIVITY & LEVERAGE BREAKTHROUGHS (2 titles): "How 1 Developer Built a $20k/mo App Using AI in 48 Hours", "The 5 AI Automation Workflows Every Solo Creator Needs"`,
        `CODING & DEV REVOLUTIONS (2 titles): "Why Cursor AI Changed Software Engineering Forever", "How to Build Full-Stack Web Apps with Agentic AI"`,
        `FUTURE IMPACT & REALISTIC PROJECTIONS (2 titles): "The AI Shift That Will Kill Boring Work by 2027", "How to Future-Proof Your Tech Career Against AI"`
      ],
      rules: [
        `Mention the specific tool name or breakthrough model (e.g. Claude 3.7, DeepSeek, Cursor, OpenAI, Agentic AI) in the title.`,
        `Keep pacing punchy, fast, and high-density with zero boring corporate jargon.`,
        `Use active engineering verbs: "Built", "Replaced", "Benchmarked", "Automated", "Tested".`
      ],
      examples: [
        `I Built an Autonomous AI Agent in 10 Minutes (No Code) #AI`,
        `Cursor AI vs Windsurf: The Brutal Coding Benchmark Test`,
        `The 7 Free AI Tools You Should Actually Be Using in 2026 #Tech`
      ]
    };
  }

  // 6. DEFAULT HIGH-CONVERTING CREATOR STRATEGY
  return {
    role: `You are an elite YouTube algorithm consultant and title strategist with 10+ years of experience studying CTR psychology and search indexing for top creators like MrBeast, Ali Abdaal, and MKBHD.`,
    framework: `Titles must trigger curiosity loops, challenge assumptions, and communicate high value in the first 3 words.`,
    archetypes: [
      `CURIOSITY GAP (2 titles): Open an irresistible question loop without being misleading.`,
      `CONTRARIAN / REVERSAL (2 titles): Challenge common advice or expose a counterintuitive truth.`,
      `VALUE / RESULT REVEAL (2 titles): Focus on tangible outcomes, exact numbers, or fast timeframes.`,
      `QUESTION / DEBATE (2 titles): Provoke an immediate opinion or debate in the viewer's mind.`,
      `STORY / EXPERIMENT (2 titles): Narrative arc with personal stakes ("I Tested...", "30 Days of...").`
    ],
    rules: [
      `Front-load the primary search keyword within the first 3-4 words whenever possible.`,
      `Sound like a confident, opinionated creator — NOT a corporate narrator.`
    ],
    examples: [
      `I Tested the Most Viral Productivity Hack for 30 Days`,
      `Why 90% of Creators Give Up in Month 1 (And How to Win)`,
      `How to Build a Fast PC in 2026: Complete Beginner Guide #Tech`
    ]
  };
}

export async function generateTitles(topic: string, excludeTitles: string[] = [], niche?: string) {
  const strategy = getNicheStrategy(niche);

  const result = await executeAIGeneration({
    topic,
    excludeItems: excludeTitles,
    systemPrompt: (webContext) => `<role>
${strategy.role}
</role>

<framework>
${strategy.framework}
</framework>

<niche_archetypes>
Every batch of 10 titles MUST span across these 5 specialized archetypes:
${strategy.archetypes.map((a, i) => `${i + 1}. ${a}`).join('\n')}
</niche_archetypes>

${webContext ? `<real_world_context>\n${webContext}\n</real_world_context>` : ''}`,

    userPrompt: (context, excludes) => `<instruction>
Generate exactly 10 high-CTR YouTube video titles for the topic: "${topic}"
${niche ? `Niche Audience: "${niche}"` : ''}
</instruction>

<strict_rules>
- CRITICAL LENGTH: Each title MUST be between 45 and 65 characters long. (This guarantees zero mobile feed truncation).
${strategy.rules.map((r) => `- ${r}`).join('\n')}
- BAN LIST: NEVER use these cheap robotic AI clichés:
  * "The Ultimate Guide"
  * "Mastering the Art"
  * "A Comprehensive Breakdown"
  * "Game Changer"
  * "In-Depth Deep Dive"
  * "You Won't Believe"
  * "Shocking Truth"
  * "The Secret"
  * "Secret Algorithm Trigger"
  * "Nobody Tells You"
  * "In Exactly 30 Days"
  * "In 30 Days"
  * "Stop Doing This"
  * "Stop Using"
  * "Hidden Truth"
  * "The Real Reason"
  * "The Truth About"
  * "Fast Growth"
  * "You Are Wrong"
  * "They Hate This"
- TONE: Sound like a world-class creator with strong opinions, empirical data, and concrete nouns — NEVER a corporate AI bot.
- HASHTAGS: Attach 1-2 clean hashtags to 4-5 titles only (e.g. #Shorts, #${niche?.split(' ')[0] || 'YouTube'}). Keep remaining titles clean.
${excludes.length > 0 ? `- DO NOT repeat previous titles: ${JSON.stringify(excludes)}` : ''}
</strict_rules>

<output_format>
Return ONLY a valid JSON array of 10 title strings.
[
  "${strategy.examples[0]}",
  "${strategy.examples[1]}",
  "${strategy.examples[2]}"
]
</output_format>
[Variation Seed: ${Math.random().toString(36).substring(2, 10)}]`,
    options: { temperature: 0.85, maxTokens: 800 },
    parseResponse: safeParseJsonArray,
  });

  return result.success && result.data
    ? { success: true, titles: result.data }
    : { success: false, error: result.error || 'Failed to generate titles.' };
}
