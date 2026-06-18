import os
import re

directory = 'src/components/tools'

for filename in os.listdir(directory):
    if not filename.endswith('.tsx'):
        continue
        
    file_path = os.path.join(directory, filename)
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # We want to replace <div className="flex items-center justify-between [optional mb-x]">
    # ONLY if it's a section header. 
    # Section headers usually contain <h2 or <h3 or <div className="flex items-center gap-3" shortly after.
    
    # Let's use a regex that matches:
    # <div className="flex items-center justify-between( [^"]*)?">(.*?)<(h2|h3|div className="flex items-center gap-3")
    
    # Actually, a simpler and extremely safe approach is to look for specific combinations:
    # 1. <div className="flex items-center justify-between">
    #    <h2
    # 2. <div className="flex items-center justify-between mb-4"> (or mb-6)
    #    <div className="flex items-center gap-3">
    #      ... <h2 or <h3
    
    lines = content.split('\n')
    new_lines = []
    i = 0
    changed = False
    
    while i < len(lines):
        line = lines[i]
        
        match = re.search(r'(<div className=")(flex items-center justify-between.*?|)(">)', line)
        
        # Check if this line has the target classes
        if 'flex items-center justify-between' in line and not 'flex-col' in line:
            # Look ahead up to 5 lines to see if there is an <h2, <h3, or flex items-center gap-3
            is_header = False
            for j in range(1, 6):
                if i + j < len(lines):
                    lookahead = lines[i+j]
                    if '<h2' in lookahead or '<h3' in lookahead or 'flex items-center gap-3' in lookahead:
                        is_header = True
                        break
            
            if is_header:
                # Replace classes safely
                new_line = line.replace('flex items-center justify-between', 'flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4')
                new_lines.append(new_line)
                changed = True
                i += 1
                continue
                
        new_lines.append(line)
        i += 1
        
    if changed:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write('\n'.join(new_lines))
        print(f"Fixed responsive headers in {filename}")
