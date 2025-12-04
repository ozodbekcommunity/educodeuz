# EduCode.uz - Foydalanish Qo'llanmasi

## Platformaga Kirish

### Birinchi Foydalanuvchi (Superadmin)
1. Platformaga birinchi ro'yxatdan o'tgan foydalanuvchi avtomatik ravishda **Admin** huquqiga ega bo'ladi
2. Ro'yxatdan o'tish: `/register` sahifasiga o'ting
3. To'liq ismingiz, telefon raqamingiz va parolingizni kiriting
4. Ro'yxatdan o'tgandan so'ng, `/login` sahifasidan tizimga kiring

### Keyingi Foydalanuvchilar
- Keyingi barcha foydalanuvchilar **Talaba** sifatida ro'yxatdan o'tadilar
- Ular faqat nashr qilingan kurslarni ko'rishlari va o'rganishlari mumkin

## Admin Panel

### 1. Kurslar Boshqaruvi

#### Kurs Yaratish
1. Admin panelga o'ting: `/admin`
2. "Kurslarni boshqarish" tugmasini bosing
3. "Yangi kurs" tugmasini bosing
4. Quyidagi ma'lumotlarni kiriting:
   - **Kurs nomi**: Kurs sarlavhasi (majburiy)
   - **Tavsif**: Kurs haqida qisqacha ma'lumot
   - **Rasm URL**: Kurs uchun rasm havolasi (ixtiyoriy)
   - **Kursni nashr qilish**: Talabalar ko'rishi uchun yoqing

#### Darslar Qo'shish
1. Kurslar ro'yxatidan kerakli kursni tanlang
2. "Darslarni ko'rish" tugmasini bosing
3. "Yangi dars" tugmasini bosing
4. Dars ma'lumotlarini kiriting:
   - **Dars nomi**: Dars sarlavhasi
   - **Tartib raqami**: Darsning tartibi (0 dan boshlanadi)
   - **Dars matni**: HTML formatida dars matni

**Dars matni uchun HTML misol:**
```html
<h2>Kirish</h2>
<p>Bu darsda biz JavaScript o'zgaruvchilarini o'rganamiz.</p>

<h3>O'zgaruvchilar</h3>
<p>O'zgaruvchi - bu ma'lumotlarni saqlash uchun konteyner.</p>

<pre><code>
let ism = "Ali";
const yosh = 25;
var shahar = "Toshkent";
</code></pre>

<ul>
  <li><code>let</code> - o'zgaruvchan qiymat</li>
  <li><code>const</code> - o'zgarmas qiymat</li>
  <li><code>var</code> - eski usul (tavsiya etilmaydi)</li>
</ul>
```

#### Test Qo'shish
1. Dars ro'yxatidan kerakli darsni tanlang
2. "Test" tugmasini bosing
3. Test ma'lumotlarini kiriting:
   - **Test nomi**: Test sarlavhasi
   - **Savollar**: JSON formatida savollar ro'yxati
   - **O'tish balli**: Minimal ball (masalan: 70)

**Test savollari JSON misol:**
```json
[
  {
    "question": "JavaScript-da o'zgaruvchi e'lon qilish uchun qaysi kalit so'z ishlatiladi?",
    "options": ["var", "let", "const", "Barchasi to'g'ri"],
    "correct_answer": 3
  },
  {
    "question": "const bilan e'lon qilingan o'zgaruvchini o'zgartirish mumkinmi?",
    "options": ["Ha", "Yo'q", "Ba'zan", "Bilmayman"],
    "correct_answer": 1
  }
]
```

**Muhim:** `correct_answer` 0 dan boshlanadi (0 = birinchi variant, 1 = ikkinchi variant, va hokazo)

#### Amaliy Topshiriq Qo'shish
1. Dars ro'yxatidan kerakli darsni tanlang
2. "Topshiriq" tugmasini bosing
3. Topshiriq ma'lumotlarini kiriting:
   - **Topshiriq nomi**: Topshiriq sarlavhasi
   - **Tavsif**: Topshiriq shartlari
   - **Boshlang'ich kod**: Talaba uchun shablon kod
   - **Til**: Dasturlash tili (masalan: javascript, python)

**Topshiriq misoli:**
```
Nomi: Sonlarni qo'shish funksiyasi
Tavsif: Ikkita sonni qabul qilib, ularning yig'indisini qaytaradigan funksiya yozing.

Boshlang'ich kod:
function qoshish(a, b) {
  // Kodingizni shu yerga yozing
  
}

console.log(qoshish(5, 3)); // 8 chiqishi kerak
```

### 2. OpenRouter API Sozlamalari

AI kod tekshiruv ishlashi uchun OpenRouter API kalitini sozlash kerak:

1. Admin paneldan "Sozlamalar"ga o'ting
2. OpenRouter API sozlamalarini to'ldiring:
   - **API kalit**: [openrouter.ai/keys](https://openrouter.ai/keys) dan oling
   - **Model**: `openai/gpt-4o-mini` (tavsiya etiladi - tez va arzon)
3. "Saqlash" tugmasini bosing

**Muhim eslatmalar:**
- API kalit sozlanmagan bo'lsa, AI kod tekshiruv ishlamaydi
- OpenRouter hisobingizda mablag' bo'lishi kerak
- Har bir kod tekshiruv uchun to'lov olinadi

### 3. Talabalar Faoliyatini Kuzatish

Admin panelda quyidagi statistikalarni ko'rishingiz mumkin:
- Jami kurslar soni
- Ro'yxatdan o'tgan talabalar soni
- Jami darslar soni
- Amaliy topshiriqlar soni

## Talaba Qismi

### Kurslarni O'rganish
1. Tizimga kiring
2. "Kurslar" bo'limiga o'ting
3. Kerakli kursni tanlang
4. Darslarni ketma-ket o'rganing

### Testlarni Topshirish
1. Darsni o'qib bo'lgandan so'ng, "Test" bo'limiga o'ting
2. Barcha savollarga javob bering
3. "Testni topshirish" tugmasini bosing
4. Natijani ko'ring (o'tish balli: 70%)

### Amaliy Topshiriqlarni Bajarish
1. "Amaliy topshiriq" bo'limiga o'ting
2. Monaco Editor-da kod yozing
3. "Topshiriqni topshirish" tugmasini bosing
4. AI sizning kodingizni tekshiradi va fikr-mulohaza beradi

### Nishonlar va Sertifikatlar
- Darslarni yakunlash orqali nishonlar qo'lga kiriting
- Kursni to'liq yakunlagandan so'ng sertifikat oling
- Profilingizda barcha yutuqlaringizni ko'ring

## Texnik Ma'lumotlar

### Rang Sxemasi
- Asosiy rang: Ko'k (#2196F3)
- Ikkilamchi rang: Yashil (#4CAF50)
- Light va Dark mode qo'llab-quvvatlanadi

### Texnologiyalar
- Frontend: React + TypeScript
- UI: shadcn/ui + Tailwind CSS
- Backend: Supabase
- Kod Editor: Monaco Editor
- AI: OpenRouter API

### Autentifikatsiya
- Telefon raqam + parol orqali kirish
- Birinchi foydalanuvchi avtomatik admin bo'ladi
- Keyingi foydalanuvchilar talaba sifatida ro'yxatdan o'tadilar

## Yordam va Qo'llab-quvvatlash

Agar savollaringiz bo'lsa yoki yordam kerak bo'lsa, platformaning texnik qo'llab-quvvatlash xizmatiga murojaat qiling.

---

**EduCode.uz** - Zamonaviy onlayn ta'lim platformasi 🚀
