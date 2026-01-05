# Quick GitHub Upload Guide

Since git isn't installed, use one of these methods:

## Method 1: GitHub Desktop (EASIEST)
1. Download: https://desktop.github.com/
2. Install and sign in
3. File → Clone Repository
4. Paste: https://github.com/Alyssa-286/Vita-life.git
5. Clone to local folder
6. Copy your Blood-Don code into the cloned folder
7. Commit and push via GitHub Desktop

## Method 2: Upload via GitHub Web
1. Go to https://github.com/Alyssa-286/Vita-life
2. Click "Add file" → "Upload files"
3. Drag and drop your files
4. Write commit message
5. Click "Commit changes"

## Method 3: Install Git Manually
Download from: https://git-scm.com/download/win
Then run:
```
cd "a:\react projects\blood-don"
git init
git config user.name "Your Name"
git config user.email "your.email@example.com"
git add .
git commit -m "Add Blood-Don frontend"
git remote add origin https://github.com/Alyssa-286/Vita-life.git
git branch -M main
git push -u origin main
```

## What to Include
✅ src/ folder
✅ public/ folder
✅ package.json
✅ package-lock.json
✅ README.md
✅ .gitignore

❌ node_modules/ (don't upload)

---

**Recommendation:** Use GitHub Desktop - it's the easiest!
