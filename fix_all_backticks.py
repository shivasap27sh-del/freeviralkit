import os
import re

directory = 'src/app/blog/posts'

for filename in os.listdir(directory):
    if not filename.endswith('.ts'):
        continue
        
    file_path = os.path.join(directory, filename)
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    match = re.search(r'("?content"?\s*:\s*`)(.*?)(\`,\n)', content, re.DOTALL)
    if not match:
        # Some files might end with `\n instead of `,\n
        match = re.search(r'("?content"?\s*:\s*`)(.*?)(\`\n)', content, re.DOTALL)
        
    if match:
        start_marker = match.group(1)
        inner_content = match.group(2)
        end_marker = match.group(3)
        
        # Replace unescaped backticks
        fixed_inner = re.sub(r'(?<!\\)`', r'\\`', inner_content)
        
        if inner_content != fixed_inner:
            new_content = content[:match.start()] + start_marker + fixed_inner + end_marker + content[match.end():]
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Fixed backticks in {filename}")
