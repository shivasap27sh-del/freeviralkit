import os
import re

files = [
    ('youtube-first-100-subscribers.ts', '"youtube growth", "first 100 subscribers", "youtube strategy"', 'YouTube Strategy'),
    ('youtube-comment-moderation-guide.ts', '"youtube comments", "hate comments", "youtube moderation"', 'Creator Tools'),
    ('youtube-lighting-setup-budget.ts', '"youtube lighting", "budget lighting", "youtube setup"', 'Creator Tools'),
    ('youtube-burnout-creator-mental-health.ts', '"creator burnout", "mental health", "youtube schedule"', 'Creator Health'),
    ('youtube-custom-url-handle-guide.ts', '"youtube handle", "youtube url", "channel name"', 'YouTube Strategy')
]

for f, tags, cat in files:
    path = os.path.join('src/app/blog/posts', f)
    with open(path, 'r', encoding='utf-8') as file:
        content = file.read()
    
    insert_str = f'  date: "2026-06-17",\n  readTime: "7 min read",\n  category: "{cat}",\n  tags: [{tags}],\n'
    
    content = re.sub(r'(description: ".*?",\n)', r'\1' + insert_str, content)
    
    with open(path, 'w', encoding='utf-8') as file:
        file.write(content)

print('Fixed all 5 files!')
