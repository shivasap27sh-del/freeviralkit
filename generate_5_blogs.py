import os
import google.generativeai as genai
import time

genai.configure(api_key=os.environ.get("GEMINI_API_KEY"))

model = genai.GenerativeModel("gemini-2.5-pro", system_instruction="""You are an expert YouTube strategist and copywriter.
Write an emotional, highly detailed, non-robotic blog post.
The post must be STRICTLY OVER 1500 WORDS.
Do not use generic intros. Start with an emotional hook/personal story.
Use clear Markdown formatting. Add a relevant Unsplash image after the intro.
End with 5 completely unique FAQs and a CTA linking to 2 tools on FreeViralKit.com.
Follow the E-E-A-T guidelines.""")

blogs = [
    {
        "slug": "youtube-first-100-subscribers",
        "title": "The Exact Strategy to Get Your First 100 YouTube Subscribers",
        "description": "Stop refreshing your zero subscriber count. Learn the emotional mindset shift and actionable tactics needed to escape the void and build your first loyal audience."
    },
    {
        "slug": "youtube-comment-moderation-guide",
        "title": "How to Deal with Hate Comments and Trolls on YouTube",
        "description": "Getting your first hateful comment is terrifying, but it actually means the algorithm is working. Learn how to protect your mental health and moderate trolls effectively."
    },
    {
        "slug": "youtube-lighting-setup-budget",
        "title": "How to Light Your YouTube Videos on a $50 Budget",
        "description": "You don't need a $500 professional lighting kit. Discover how to use bounce boards, window light, and $50 hardware store gear to look cinematic on camera."
    },
    {
        "slug": "youtube-burnout-creator-mental-health",
        "title": "Avoiding Creator Burnout: Mental Health for YouTubers",
        "description": "Are you a slave to the Sunday upload schedule? Learn how to detach your self-worth from view counts, batch content, and survive YouTube burnout."
    },
    {
        "slug": "youtube-custom-url-handle-guide",
        "title": "The Ultimate Guide to YouTube Handles and Custom URLs",
        "description": "Your channel name and handle are your digital real estate. Here is how to pick the perfect handle, rebrand your old channel, and secure your identity."
    }
]

for b in blogs:
    print(f"Generating {b['slug']}...")
    prompt = f"Write the blog post for: {b['title']}. Description: {b['description']}. MUST BE >1500 WORDS! Include 5 Unique FAQs and CTA."
    response = model.generate_content(prompt)
    
    content = response.text.replace("`", "") # avoid issues with template literals
    
    file_content = f'''import {{ BlogPost }} from '../data';

export const post: BlogPost = {{
  slug: "{b['slug']}",
  title: "{b['title']}",
  description: "{b['description']}",
  content: `{content}`
}};
'''
    with open(f"src/app/blog/posts/{b['slug']}.ts", "w", encoding="utf-8") as f:
        f.write(file_content)
    
    time.sleep(2)

print("Done generating!")
