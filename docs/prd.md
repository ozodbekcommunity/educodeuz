# EduCode.uz O'quv Platformasi Talablari Hujjati

## 1. Platforma HaqidaUmumiy Ma'lumot

### 1.1 Platforma Nomi
EduCode.uz\n
### 1.2 Platforma Tavsifi
SoloLearn platformasiga o'xshash onlayn ta'lim tizimi bo'lib, admin tomonidan boshqariladigan kurslar, testlar va amaliy topshiriqlar orqali talabalarning bosqichma-bosqich o'rganishini ta'minlaydi.
\n## 2. Asosiy Funksiyalar

### 2.1 Foydalanuvchi Rollari
\n#### 2.1.1Superadmin Paneli
- Kurslar yaratish va boshqarish (istalgan mavzu bo'yicha)
- Testlar tuzish va tahrirlash
- Amaliy topshiriqlar qo'shish (Monaco Editor integratsiyasi bilan)
- OpenRouter API kaliti va model sozlamalari (admin o'zi qo'shadi, qo'shilsa ishlaydi, aks holda AI tekshiruv ishlamaydi)
- AI orqali kod tekshirish tizimini sozlash\n- Talabalar faoliyatini kuzatish
- Sertifikatlarni boshqarish

#### 2.1.2 Talaba (Student) Qismi
- Ro'yxatdan o'tish (to'liq ismi, telefon raqam, parol)
- Kurslarni bosqichma-bosqich o'rganish
- Testlarni topshirish
- Amaliy topshiriqlarni bajarish (Monaco Editor orqali)
- Kurs oxirida sertifikat olish
- Shaxsiy profil va o'quv jarayonini kuzatish

### 2.2 Kurs Tizimi
- Admin tomonidan istalgan mavzu bo'yicha kurs qo'shish imkoniyati
- Har bir kurs bosqichma-bosqich tuzilgan
- Nazariy qism, testlar va amaliy topshiriqlar kombinatsiyasi
- Kurs yakunida sertifikat berish

### 2.3 Tekshirish Tizimi
- Testlar uchun avtomatik tekshirish
- Amaliy topshiriqlar uchun AI tekshiruv (OpenRouter API orqali)
- Monaco Editor integratsiyasi kod yozish uchun
- Real vaqtda natijalarni ko'rsatish

### 2.4 Motivatsiya Elementlari
- Badge (nishonlar) tizimi
- Motivatsion xabarlar
- O'quv jarayonida yutuqlarni kuzatish
\n### 2.5 Qo'shimcha Funksiyalar
- Light/Dark mode o'zgartirish
- To'liq o'zbekcha interfeys
- Responsiv dizayn (barcha qurilmalarda ishlash)
\n## 3. Texnik Talablar

### 3.1 Ro'yxatdan O'tish Ma'lumotlari
- To'liq ismi
- Telefon raqam
- Parol
\n### 3.2 Integratsiyalar
- Monaco Editor (kod yozish uchun)
- OpenRouter API (AI tekshiruv uchun, admin tomonidan sozlanadi)
\n### 3.3 Sertifikat Tizimi
- Har bir kurs tugagandan so'ng avtomatik sertifikat generatsiya qilish
- Talaba ismi va kurs nomi bilan shaxsiylashtirilgan
\n## 4. Dizayn Uslubi
- Zamonaviy va minimalistik interfeys
- Asosiy ranglar: ko'k (#2196F3) va yashil (#4CAF50) ohangida, o'quv muhitiga mos\n- Light mode: oq fon (#FFFFFF) va och kulrang (#F5F5F5) elementlar
- Dark mode: qora (#121212) va to'q kulrang (#1E1E1E) fon\n- Yumshoq 8px radius burchaklar
- Karta (card) asosli layout tizimi
- Zamonaviy ikonkalar va badge dizayni
- O'tish animatsiyalari (smooth transitions)
- Aniq va o'qilishi oson o'zbek tilidagi shriftlar