import sys

files = [
    r"c:\Users\shiva\Desktop\Youtube tag and hashtag and description and title updater\src\app\blog\posts\youtube-pinned-comment-formula.ts",
    r"c:\Users\shiva\Desktop\Youtube tag and hashtag and description and title updater\src\app\blog\posts\ultimate-youtube-equipment-guide-2026.ts",
    r"c:\Users\shiva\Desktop\Youtube tag and hashtag and description and title updater\src\app\blog\posts\how-to-write-youtube-scripts-with-ai.ts",
    r"c:\Users\shiva\Desktop\Youtube tag and hashtag and description and title updater\src\app\blog\posts\how-to-pick-youtube-channel-name.ts"
]

for file in files:
    with open(file, "r", encoding="utf-8") as f:
        text = f.read()
    print(file)
    content_start = text.find("content\": `")
    if content_start == -1:
        content_start = text.find("content: `")
    bt_start = text.find("`", content_start)
    
    unescaped = []
    i = bt_start + 1
    while i < len(text):
        if text[i] == '\\':
            i += 2
            continue
        if text[i] == '`':
            unescaped.append(i)
        i += 1
    print("Unescaped backticks at indices:", unescaped)
