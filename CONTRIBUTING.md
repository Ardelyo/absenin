# 🤝 Panduan Kontribusi Absenin

Terima kasih telah tertarik untuk berkontribusi pada Absenin! Dokumen ini menjelaskan bagaimana cara berkontribusi.

## 🎯 Jenis Kontribusi

- 💡 **Feature Request** - Sarankan fitur baru
- 🐛 **Bug Report** - Laporkan bug yang ditemukan
- 📚 **Documentation** - Perbaiki atau tambah dokumentasi
- 🌐 **Translation** - Bantuan terjemahan
- 🎨 **Design** - Kontribusi desain
- 💻 **Code** - Kontribusi kode
- 🧪 **Testing** - Bantuan testing
- 📢 **Promotion** - Bantu promosikan project

## ⚙️ Setup Development

### Prerequisites
- Node.js 16+
- Docker & Docker Compose
- Git

### Installation

```bash
# 1. Fork repository
# Kunjungi https://github.com/absenin/absenin dan fork

# 2. Clone
git clone https://github.com/YOUR_USERNAME/absenin.git
cd absenin

# 3. Install dependencies
npm install

# 4. Setup database
npm run docker:up

# 5. Run migrations
npm run migration:run

# 6. Start development
npm run dev
```

Aplikasi akan berjalan di:
- Frontend: http://localhost:3000
- Backend: http://localhost:3001

## 📝 Workflow Kontribusi

### 1. Create Issue
Sebelum membuat PR, buat issue terlebih dahulu untuk:
- Diskusi fitur baru
- Melaporkan bug
- Meminta opini

### 2. Create Branch
```bash
# Format: feature/nama-fitur atau fix/nama-bug
git checkout -b feature/awesome-feature
```

### 3. Development Guidelines

#### Code Style
```bash
# Format code
npm run lint:fix

# Check linting
npm run lint

# Run tests
npm run test
```

#### Commit Messages
Gunakan Conventional Commits:
```
feat: tambah fitur baru
fix: perbaiki bug
docs: update dokumentasi
style: perubahan formatting
refactor: refactor kode
test: tambah test
chore: update dependencies
```

Contoh:
```bash
git commit -m "feat: implement check-in with QR code"
git commit -m "fix: resolve timezone issue in attendance report"
```

#### Test Coverage
- Minimal test coverage: 80%
- Setiap module harus memiliki `.spec.ts` file
```bash
npm run test:cov
```

### 4. Create Pull Request

Pastikan PR Anda memenuhi:

✅ Deskripsi yang jelas dan detail
✅ Screenshot/video jika ada UI changes
✅ Semua tests passing
✅ Tidak ada console errors/warnings
✅ Code sudah di-format dengan prettier
✅ Mengikuti Conventional Commits

Template PR:
```markdown
## Description
Jelaskan apa yang diubah dan mengapa.

## Related Issue
Closes #123

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
Jelaskan testing yang sudah dilakukan.

## Screenshots (if applicable)
Lampirkan screenshot atau video.
```

### 5. Code Review

PR akan direview oleh minimal 2 maintainer. Respond terhadap feedback dan lakukan perubahan jika diperlukan.

## 🏗️ Project Structure

```
absenin/
├── apps/
│   ├── backend/          # NestJS Backend
│   │   ├── src/
│   │   │   ├── modules/
│   │   │   ├── common/
│   │   │   └── main.ts
│   │   └── test/
│   └── web/              # Next.js Frontend
│       ├── src/
│       │   ├── app/
│       │   ├── components/
│       │   └── pages/
│       └── public/
├── packages/             # Shared utilities
└── docs/                 # Documentation
```

## 📋 Checklist Sebelum Submit PR

- [ ] Branch sudah update dengan main branch
- [ ] Semua tests passing locally
- [ ] Code sudah di-format (`npm run lint:fix`)
- [ ] Tidak ada console errors
- [ ] Commit messages mengikuti Conventional Commits
- [ ] PR description jelas dan lengkap
- [ ] Documentation sudah diupdate
- [ ] No breaking changes (atau dijelaskan)

## 🧪 Testing

### Unit Tests
```bash
npm run test:backend
```

### Integration Tests
```bash
npm run test
```

### Manual Testing
1. Jalankan aplikasi locally
2. Test di berbagai browser
3. Test di mobile (jika applicable)

## 📚 Dokumentasi

Setiap fitur baru harus didokumentasikan:
- Update README jika diperlukan
- Tambah JSDoc comments untuk fungsi
- Update API documentation
- Tambah contoh usage jika applicable

## 🤔 Pertanyaan?

- **Discord**: [discord.gg/absenin](https://discord.gg/absenin)
- **GitHub Discussions**: [discussions](https://github.com/absenin/absenin/discussions)
- **Email**: hello@absenin.id

## 📜 Code of Conduct

Kami berkomitmen untuk menciptakan lingkungan yang inklusif. Silakan baca [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) sebelum berkontribusi.

---

**Terima kasih atas kontribusi Anda!** ❤️
