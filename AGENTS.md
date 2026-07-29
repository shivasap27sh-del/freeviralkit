<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->
<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Repository Settings
- **Git Remote Push URL:** Always commit and push changes for this project to `https://github.com/shivasap27sh-del/freeviralkit`.

# Agent Workflow Rules
- **Planning Mode Requirement:** Always create a detailed plan before implementing anything.
- **Permission Required:** For major changes, ask for explicit user permission to implement the plan before taking action. For very small changes, proceed directly. For creating new files, evaluate if it fits the architecture before doing so without permission.
- **Task Tracking:** Always maintain a `task.md` file listing all tasks. Break down any larger tasks into subtasks and sub-subtasks as needed.
- **Git Commit Safety:** NEVER commit or push `.py` files or any other script files that could cause issues with Google indexing or AdSense to the public repository. Instead, keep any necessary backend scripts in a dedicated `scripts/` folder that is safely excluded from public web deployment.
- **Efficient File Editing:** Always use patching/replace tools to modify existing files in small chunks. Avoid full file rewrites unless a file requires a complete structural refactor that makes patching unsafe.
- **Continuous Verification:** Never assume a patch worked perfectly. After finishing a task or subtask, always run the project locally or run tests to verify there are no syntax errors or crashing bugs before moving on.
- **No-Spaghetti Revert Rule:** If a small patch breaks the code, do not try to stack multiple patches on top of it to fix the mistake. Instead, immediately revert the file to its previous working state and rethink the approach from scratch.
- **Proactive Self-Documentation:** Whenever creating a new file or writing a complex function, automatically add brief, clear comments explaining *why* the code does what it does. If it's a major feature, update the `README.md` so documentation stays current.
- **Aesthetics & UI Priority:** If touching the frontend, always prioritize modern, premium aesthetics (good typography, smooth hover effects, harmonious colors). Never settle for a basic or generic-looking user interface.
- **Vercel Env Sync Reminder & Deployment Freeze**: AdSense approval is currently pending. DO NOT push to Git/Vercel until the user explicitly requests it. Whenever pushing to Git in the future, ALWAYS remind Shiva to sync all `.env.local` variables (including `QSTASH_*`, `UPSTASH_*`, `DATABASE_URL`, API keys) into the Vercel Dashboard environment settings.
