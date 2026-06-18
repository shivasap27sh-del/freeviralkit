import os
import re

files_to_fix = [
    'src/app/blog/posts/do-youtube-hashtags-actually-help.ts',
    'src/app/blog/posts/youtube-hashtag-strategy.ts'
]

for file_path in files_to_fix:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find the content block between "content": ` or content: ` and `,
    # We can use regex to find the start and end.
    match = re.search(r'("?content"?\s*:\s*`)(.*?)(\`,\n)', content, re.DOTALL)
    if match:
        start_marker = match.group(1)
        inner_content = match.group(2)
        end_marker = match.group(3)
        
        # Replace all unescaped backticks.
        # A backtick that is NOT preceded by a backslash
        inner_content = re.sub(r'(?<!\\)`', r'\\`', inner_content)
        
        new_content = content[:match.start()] + start_marker + inner_content + end_marker + content[match.end():]
        
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Fixed {file_path}")
    else:
        print(f"Could not find content block in {file_path}")
