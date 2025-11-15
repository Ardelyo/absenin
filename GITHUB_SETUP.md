# 📤 Setup GitHub Repository

## Step 1: Create Repository di GitHub

1. Buka https://github.com/new
2. Repository name: `absenin`
3. Description: `Sistem Presensi Open Source Modern`
4. Choose: **Public** (untuk open source)
5. **Jangan** inisialisasi dengan README (sudah ada locally)
6. Click "Create repository"

## Step 2: Add Remote dan Push

```bash
# Add remote origin
git remote add origin https://github.com/YOUR_USERNAME/absenin.git

# Verify remote
git remote -v
# Should show:
# origin  https://github.com/YOUR_USERNAME/absenin.git (fetch)
# origin  https://github.com/YOUR_USERNAME/absenin.git (push)

# Push to GitHub
git branch -M main
git push -u origin main
```

## Step 3: Verify GitHub

1. Refresh https://github.com/YOUR_USERNAME/absenin
2. Should see 36 files dan 2 commits
3. Check Actions tab untuk CI/CD workflow

## Step 4: Setup GitHub Settings

### Protect Main Branch

1. Go to Settings → Branches
2. Click "Add rule"
3. Branch name pattern: `main`
4. Enable:
   - ✅ Require pull request reviews before merging
   - ✅ Require status checks to pass before merging
   - ✅ Require branches to be up to date before merging

### Add Topics

Settings → About → Topics:
- `attendance`
- `presensi`
- `open-source`
- `nestjs`
- `typescript`

### Add Collaborators

Settings → Collaborators:
- Add team members untuk berkontribusi

## Step 5: Create Discussions

1. Go to Discussions tab
2. Create categories:
   - 📢 Announcements
   - 💬 General Discussion
   - 🐛 Bug Reports
   - 💡 Feature Requests
   - 🎓 Q&A

## Step 6: Update Documentation Links

Edit `readme.md` dan ganti:
```markdown
# Dari:
https://github.com/absenin/absenin

# Menjadi:
https://github.com/YOUR_USERNAME/absenin
```

## Step 7: Add Badges di README

Edit `readme.md` dan tambahkan di atas description:

```markdown
[![GitHub Stars](https://img.shields.io/github/stars/YOUR_USERNAME/absenin?style=social)](https://github.com/YOUR_USERNAME/absenin)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/node.js-16%2B-green.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/typescript-5.1-blue.svg)](https://www.typescriptlang.org/)

<!-- atau minimal -->
[![MIT License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
```

## Step 8: First Release

```bash
# Create a git tag
git tag -a v0.1.0 -m "Initial Phase 1 release"

# Push tag to GitHub
git push origin v0.1.0
```

Kemudian di GitHub:
1. Go to Releases
2. Click "Draft a new release"
3. Choose tag v0.1.0
4. Title: "Phase 1: Foundation Release"
5. Description:
```
## Phase 1: Foundation Release 🎉

### Features
- ✅ NestJS Backend API
- ✅ JWT Authentication
- ✅ Attendance Check-in/Check-out
- ✅ Docker Setup
- ✅ Comprehensive Documentation

### What's Next
- Phase 2: Core Features (Leave Management, Mobile App)
- Phase 3: Advanced Features (Face Recognition, Analytics)

### Getting Started
- [Documentation](docs/GETTING_STARTED.md)
- [API Reference](docs/API.md)
- [Contributing](CONTRIBUTING.md)

**[Lihat commit lebih detail](https://github.com/YOUR_USERNAME/absenin/releases/tag/v0.1.0)**
```

## Commands Quick Reference

```bash
# Setup (first time only)
git remote add origin https://github.com/YOUR_USERNAME/absenin.git
git branch -M main
git push -u origin main

# Regular workflow
git add .
git commit -m "feat: description"
git push origin main

# Create feature branch
git checkout -b feature/awesome-feature
git push origin feature/awesome-feature
# Then create Pull Request di GitHub UI

# Update local from remote
git pull origin main
```

## After Push Checklist

- [ ] Repository created on GitHub
- [ ] All files pushed successfully
- [ ] Main branch is default branch
- [ ] Branch protection enabled
- [ ] CI/CD workflow running
- [ ] Topics added
- [ ] README badges updated
- [ ] License visible on GitHub
- [ ] First release (v0.1.0) published
- [ ] Discussions enabled

## Troubleshooting

### Authentication Issue
```bash
# Use token instead of password
# Settings → Developer settings → Personal access tokens
git remote set-url origin https://YOUR_TOKEN@github.com/YOUR_USERNAME/absenin.git
```

### Already Have Origin
```bash
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/absenin.git
```

### Push Fails
```bash
# Pull latest first
git pull origin main --rebase

# Then push
git push origin main
```

---

**Next Step:** Announce di:
- Twitter: @absenin_app
- Telegram: @absenin_id
- Dev.to
- Hacker News
- Product Hunt (later)
