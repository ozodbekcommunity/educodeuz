# EduCode.uz - Tezkor Boshlash Qo'llanmasi

## 🚀 Platformani Ishga Tushirish

Platforma tayyor va ishlaydigan holatda! Barcha funksiyalar to'liq amalga oshirilgan.

## 👤 Birinchi Foydalanuvchi (Admin)

### Ro'yxatdan O'tish
1. Platformaga kiring
2. "Ro'yxatdan o'tish" tugmasini bosing
3. Quyidagi ma'lumotlarni kiriting:
   - **To'liq ism:** Ismingiz
   - **Telefon raqam:** +998901234567 (yoki istalgan raqam)
   - **Parol:** Xavfsiz parol
4. "Ro'yxatdan o'tish" tugmasini bosing

**Muhim:** Birinchi ro'yxatdan o'tgan foydalanuvchi avtomatik **Admin** bo'ladi!

## 🎓 Admin Uchun

### 1. Kurs Yaratish

1. **Admin panelga kirish:**
   - Header'da "Admin" tugmasini bosing
   - "Kurslar boshqaruvi" bo'limiga o'ting

2. **Yangi kurs qo'shish:**
   - "Yangi kurs" tugmasini bosing
   - **Kurs nomi:** Masalan, "Python asoslari"
   - **Tavsif:** Kurs haqida qisqacha ma'lumot
   - **Rasm URL:** Kurs rasmi havolasi (ixtiyoriy)
   - **Kursni nashr qilish:** Yoqing (talabalar ko'rishi uchun)
   - "Yaratish" tugmasini bosing

### 2. Dars Qo'shish

1. Kurs ro'yxatidan kerakli kursni toping
2. "Darslarni ko'rish" tugmasini bosing
3. "Yangi dars" tugmasini bosing
4. Quyidagi ma'lumotlarni kiriting:
   - **Dars nomi:** Masalan, "O'zgaruvchilar"
   - **Dars matni:** HTML formatida (matn, kod, rasmlar)
   - **Tartib raqami:** 1, 2, 3... (darslar tartibi)
5. "Yaratish" tugmasini bosing

### 3. Test Qo'shish

1. Dars ro'yxatidan kerakli darsni toping
2. "Test" tugmasini bosing
3. Test ma'lumotlarini kiriting:
   - **Test nomi:** Masalan, "O'zgaruvchilar testi"
   - **O'tish balli:** 70% (yoki istalgan foiz)
4. Savollar qo'shing:
   - **Savol matni:** Savolni yozing
   - **4 ta variant:** Javob variantlarini kiriting
   - **To'g'ri javob:** Radio button bilan belgilang
5. "Savol qo'shish" tugmasi bilan ko'proq savol qo'shing
6. "Yaratish" tugmasini bosing

### 4. Amaliy Topshiriq Qo'shish

1. Dars ro'yxatidan kerakli darsni toping
2. "Topshiriq" tugmasini bosing
3. Topshiriq ma'lumotlarini kiriting:
   - **Topshiriq nomi:** Masalan, "Sonlarni qo'shish"
   - **Tavsif:** Topshiriq shartlari
   - **Dasturlash tili:** javascript, python, java, cpp
   - **Boshlang'ich kod:** Shablon kod (ixtiyoriy)
4. "Yaratish" tugmasini bosing

### 5. AI Kod Tekshiruvni Sozlash

1. Admin panel → "Sozlamalar"
2. **OpenRouter API kaliti:**
   - OpenRouter.ai saytiga kiring
   - API kalit oling
   - Kalitni kiriting
3. **Model tanlash:**
   - Tavsiya: `openai/gpt-4o-mini`
   - Yoki boshqa model
4. "Saqlash" tugmasini bosing

**Eslatma:** AI tekshiruv faqat API kaliti kiritilgandan keyin ishlaydi!

### 6. Profilni Tahrirlash

1. Header'dagi foydalanuvchi ikonkasiga bosing
2. "Profil" tugmasini tanlang
3. "Tahrirlash" tugmasini bosing
4. To'liq ism va telefon raqamni o'zgartiring
5. "Saqlash" tugmasini bosing

## 📚 Talaba Uchun

### 1. Ro'yxatdan O'tish

1. "Ro'yxatdan o'tish" tugmasini bosing
2. Ma'lumotlarni kiriting:
   - To'liq ism
   - Telefon raqam
   - Parol
3. "Ro'yxatdan o'tish" tugmasini bosing

### 2. Kurslarni Ko'rish

1. "Kurslar" bo'limiga o'ting
2. Kerakli kursni tanlang
3. Darslar ro'yxatini ko'ring

### 3. Darslarni O'rganish

1. Darsni oching
2. Dars matnini o'qing
3. "Darsni yakunlash" tugmasini bosing

### 4. Test Topshirish

1. Dars ichida "Test" bo'limiga o'ting
2. Savollarni javoblang
3. "Testni topshirish" tugmasini bosing
4. Natijani ko'ring

### 5. Amaliy Topshiriq Bajarish

1. Dars ichida "Amaliy topshiriq" bo'limiga o'ting
2. Monaco Editor'da kod yozing
3. "Tekshirish" tugmasini bosing
4. AI natijasini ko'ring (agar API sozlangan bo'lsa)

### 6. Sertifikat Olish

1. Kursning barcha darslarini yakunlang
2. Barcha testlardan o'ting
3. Barcha topshiriqlarni bajaring
4. Avtomatik sertifikat oling
5. "Sertifikatlar" bo'limidan yuklab oling

### 7. Profilni Tahrirlash

1. Header'dagi foydalanuvchi ikonkasiga bosing
2. "Profil" tugmasini tanlang
3. "Tahrirlash" tugmasini bosing
4. Ma'lumotlarni o'zgartiring
5. "Saqlash" tugmasini bosing

## 🎨 Interfeys

### Light/Dark Mode
- Header'dagi quyosh/oy ikonkasiga bosing
- Avtomatik o'zgaradi

### Navigatsiya
- **Bosh sahifa:** Platformaga kirish
- **Kurslar:** Barcha kurslar ro'yxati
- **Admin:** Admin panel (faqat adminlar uchun)
- **Profil:** Shaxsiy ma'lumotlar
- **Sertifikatlar:** Qo'lga kiritilgan sertifikatlar

## 🔧 Texnik Ma'lumotlar

### Database
- **Supabase:** PostgreSQL
- **Tables:** 12 ta (profiles, courses, lessons, tests, assignments, va boshqalar)
- **RLS:** Enabled (xavfsizlik uchun)

### Autentifikatsiya
- **Telefon raqam:** Email formatiga o'tkaziladi
- **Parol:** Xavfsiz saqlash
- **Session:** Avtomatik boshqaruv

### AI Tekshiruv
- **OpenRouter API:** Kod tekshirish uchun
- **Model:** openai/gpt-4o-mini (tavsiya)
- **Sozlash:** Admin panel → Sozlamalar

## 📝 Muhim Eslatmalar

1. **Birinchi foydalanuvchi admin bo'ladi**
2. **AI tekshiruv uchun API kalit kerak**
3. **Kursni nashr qilish kerak (talabalar ko'rishi uchun)**
4. **Darslar tartib raqami bo'yicha ko'rsatiladi**
5. **Profil tahrirlash barcha foydalanuvchilar uchun**

## 🆘 Yordam

Agar muammo yuzaga kelsa:
1. Console'ni tekshiring (F12)
2. Xato xabarlarini o'qing
3. Database connection'ni tekshiring
4. API kalitlarni tekshiring

## 🎉 Muvaffaqiyat!

Platforma to'liq tayyor va ishlaydigan holatda. Barcha funksiyalar amalga oshirilgan:
- ✅ Autentifikatsiya
- ✅ Kurslar boshqaruvi
- ✅ Darslar, testlar, topshiriqlar
- ✅ AI kod tekshiruv
- ✅ Progress tracking
- ✅ Badge va sertifikatlar
- ✅ Profil tahrirlash
- ✅ Admin panel
- ✅ Light/Dark mode

**Omad tilaymiz!** 🚀
