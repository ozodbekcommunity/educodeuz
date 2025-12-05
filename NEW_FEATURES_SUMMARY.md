# EduCode.uz - Yangi Funksiyalar

## ✅ Qo'shilgan Funksiyalar

### 1. 🚫 Admin O'quvchilarni Bloklash

**Funksiya:** Admin o'quvchilarni bloklashi va blokdan chiqarishi mumkin.

**Qanday ishlaydi:**
1. Admin panel → O'quvchilar boshqaruvi (`/admin/students`)
2. O'quvchilar ro'yxatini ko'rish
3. Har bir o'quvchi uchun:
   - **"Bloklash"** tugmasi - o'quvchini bloklash
   - **"Blokdan chiqarish"** tugmasi - blokni olib tashlash

**Bloklangan o'quvchi:**
- ❌ Tizimga kira olmaydi
- ❌ Kirish urinishida xato xabari ko'rsatiladi
- ✅ Admin blokdan chiqarishi mumkin

**Texnik ma'lumotlar:**
- Database: `profiles.is_banned` ustuni qo'shildi
- RPC funksiya: `admin_ban_user(target_user_id, ban_status)`
- Login tekshiruvi: Bloklangan foydalanuvchilar avtomatik chiqariladi

---

### 2. 🔐 Admin O'z Parolini O'zgartirish

**Funksiya:** Admin o'z profilidan parolini o'zgartira oladi.

**Qanday ishlaydi:**
1. Profil sahifasiga o'ting (`/profile`)
2. **"Parolni o'zgartirish"** tugmasini bosing
3. Quyidagi ma'lumotlarni kiriting:
   - Joriy parol
   - Yangi parol (kamida 6 ta belgi)
   - Parolni tasdiqlash
4. **"O'zgartirish"** tugmasini bosing

**Xavfsizlik:**
- ✅ Joriy parol tekshiriladi
- ✅ Yangi parol kamida 6 ta belgidan iborat bo'lishi kerak
- ✅ Parol tasdiqlash majburiy

---

### 3. 👤 O'quvchi Ismini O'zgartirish

**Funksiya:** O'quvchi o'z profilidan ismini o'zgartira oladi.

**Qanday ishlaydi:**
1. Profil sahifasiga o'ting (`/profile`)
2. **"Tahrirlash"** tugmasini bosing
3. To'liq ismni o'zgartiring
4. Telefon raqamni o'zgartiring (ixtiyoriy)
5. **"Saqlash"** tugmasini bosing

**O'zgarishlar:**
- ✅ To'liq ism
- ✅ Telefon raqam
- ❌ Rol o'zgartirilmaydi (xavfsizlik uchun)

---

### 4. 🔑 O'quvchi Parolini O'zgartirish

**Funksiya:** O'quvchi o'z profilidan parolini o'zgartira oladi.

**Qanday ishlaydi:**
1. Profil sahifasiga o'ting (`/profile`)
2. **"Parolni o'zgartirish"** tugmasini bosing
3. Quyidagi ma'lumotlarni kiriting:
   - Joriy parol
   - Yangi parol (kamida 6 ta belgi)
   - Parolni tasdiqlash
4. **"O'zgartirish"** tugmasini bosing

**Xavfsizlik:**
- ✅ Joriy parol tekshiriladi
- ✅ Yangi parol kamida 6 ta belgidan iborat bo'lishi kerak
- ✅ Parol tasdiqlash majburiy

---

### 5. 🔧 Admin O'quvchi Parolini O'zgartirish

**Funksiya:** Admin istalgan o'quvchining parolini o'zgartira oladi.

**Qanday ishlaydi:**
1. Admin panel → O'quvchilar boshqaruvi (`/admin/students`)
2. Kerakli o'quvchini toping
3. **"Parolni o'zgartirish"** tugmasini bosing
4. Yangi parolni kiriting (kamida 6 ta belgi)
5. Parolni tasdiqlang
6. **"O'zgartirish"** tugmasini bosing

**Xususiyatlar:**
- ✅ Admin joriy parolni bilishi shart emas
- ✅ Yangi parol kamida 6 ta belgidan iborat bo'lishi kerak
- ✅ O'quvchi yangi parol bilan kirishi mumkin

**Texnik ma'lumotlar:**
- RPC funksiya: `admin_change_user_password(target_user_id, new_password)`
- Faqat adminlar uchun

---

## 📊 Yangi Sahifalar

### Admin O'quvchilar Boshqaruvi

**URL:** `/admin/students`

**Funksiyalar:**
- ✅ Barcha o'quvchilarni ko'rish
- ✅ O'quvchi holati (Faol/Bloklangan)
- ✅ O'quvchini bloklash/blokdan chiqarish
- ✅ O'quvchi parolini o'zgartirish
- ✅ O'quvchilar soni statistikasi

**Interfeys:**
- 🟢 Faol o'quvchilar - yashil badge
- 🔴 Bloklangan o'quvchilar - qizil badge va border
- 📊 Jami o'quvchilar soni

---

## 🗄️ Database O'zgarishlari

### Yangi Ustunlar

```sql
-- profiles jadvaliga qo'shildi
is_banned BOOLEAN DEFAULT false NOT NULL
```

### Yangi RPC Funksiyalar

1. **change_own_password(current_password, new_password)**
   - Foydalanuvchi o'z parolini o'zgartiradi
   - Joriy parol tekshiriladi
   - Xavfsizlik: SECURITY DEFINER

2. **admin_change_user_password(target_user_id, new_password)**
   - Admin istalgan foydalanuvchi parolini o'zgartiradi
   - Faqat adminlar uchun
   - Xavfsizlik: SECURITY DEFINER

3. **admin_ban_user(target_user_id, ban_status)**
   - Admin foydalanuvchini bloklaydi/blokdan chiqaradi
   - Faqat adminlar uchun
   - Admin o'zini bloklashi mumkin emas
   - Xavfsizlik: SECURITY DEFINER

---

## 🔒 Xavfsizlik

### Bloklash Xavfsizligi

- ✅ Admin o'zini bloklashi mumkin emas
- ✅ Bloklangan foydalanuvchi kirish urinishida avtomatik chiqariladi
- ✅ Bloklangan foydalanuvchi xato xabari oladi
- ✅ Faqat adminlar bloklashi mumkin

### Parol O'zgartirish Xavfsizligi

- ✅ O'z parolini o'zgartirish uchun joriy parol kerak
- ✅ Yangi parol kamida 6 ta belgidan iborat bo'lishi kerak
- ✅ Parol tasdiqlash majburiy
- ✅ Admin boshqa foydalanuvchi parolini o'zgartirishi mumkin
- ✅ Parollar xavfsiz saqlash (bcrypt)

### Profil Tahrirlash Xavfsizligi

- ✅ Foydalanuvchi faqat o'z profilini tahrirlashi mumkin
- ✅ Rol o'zgartirilmaydi (xavfsizlik uchun)
- ✅ Admin huquqlari saqlanadi

---

## 📝 Foydalanish Qo'llanmasi

### Admin uchun

#### O'quvchini Bloklash

1. Admin panel → O'quvchilar boshqaruvi
2. Kerakli o'quvchini toping
3. "Bloklash" tugmasini bosing
4. Tasdiqlash
5. ✅ O'quvchi bloklandi

#### O'quvchini Blokdan Chiqarish

1. Admin panel → O'quvchilar boshqaruvi
2. Bloklangan o'quvchini toping (qizil border)
3. "Blokdan chiqarish" tugmasini bosing
4. Tasdiqlash
5. ✅ O'quvchi blokdan chiqarildi

#### O'quvchi Parolini O'zgartirish

1. Admin panel → O'quvchilar boshqaruvi
2. Kerakli o'quvchini toping
3. "Parolni o'zgartirish" tugmasini bosing
4. Yangi parolni kiriting (kamida 6 ta belgi)
5. Parolni tasdiqlang
6. "O'zgartirish" tugmasini bosing
7. ✅ Parol o'zgartirildi

#### O'z Parolini O'zgartirish

1. Profil sahifasiga o'ting
2. "Parolni o'zgartirish" tugmasini bosing
3. Joriy parolni kiriting
4. Yangi parolni kiriting (kamida 6 ta belgi)
5. Parolni tasdiqlang
6. "O'zgartirish" tugmasini bosing
7. ✅ Parol o'zgartirildi

### O'quvchi uchun

#### Ismni O'zgartirish

1. Profil sahifasiga o'ting
2. "Tahrirlash" tugmasini bosing
3. To'liq ismni o'zgartiring
4. Telefon raqamni o'zgartiring (ixtiyoriy)
5. "Saqlash" tugmasini bosing
6. ✅ Profil yangilandi

#### Parolni O'zgartirish

1. Profil sahifasiga o'ting
2. "Parolni o'zgartirish" tugmasini bosing
3. Joriy parolni kiriting
4. Yangi parolni kiriting (kamida 6 ta belgi)
5. Parolni tasdiqlang
6. "O'zgartirish" tugmasini bosing
7. ✅ Parol o'zgartirildi

---

## 🧪 Test Qilish

### Bloklash Testi

1. ✅ Admin o'quvchini bloklashi
2. ✅ Bloklangan o'quvchi kirish urinishi
3. ✅ Xato xabari ko'rsatilishi
4. ✅ Admin blokdan chiqarishi
5. ✅ O'quvchi qayta kirishi

### Parol O'zgartirish Testi

1. ✅ O'quvchi o'z parolini o'zgartirishi
2. ✅ Yangi parol bilan kirish
3. ✅ Admin o'quvchi parolini o'zgartirishi
4. ✅ O'quvchi yangi parol bilan kirish

### Profil Tahrirlash Testi

1. ✅ O'quvchi ismini o'zgartirishi
2. ✅ Telefon raqamni o'zgartirishi
3. ✅ O'zgarishlar saqlanishi
4. ✅ Profilda ko'rsatilishi

---

## 📁 O'zgartirilgan Fayllar

### Database

1. **supabase/migrations/add_ban_and_password_management.sql**
   - `is_banned` ustuni qo'shildi
   - `change_own_password` RPC funksiyasi
   - `admin_change_user_password` RPC funksiyasi
   - `admin_ban_user` RPC funksiyasi

### Backend (API)

2. **src/db/api.ts**
   - `profiles.changeOwnPassword()` qo'shildi
   - `profiles.adminChangeUserPassword()` qo'shildi
   - `profiles.adminBanUser()` qo'shildi

### Types

3. **src/types/index.ts**
   - `Profile` interface'ga `is_banned` qo'shildi

### Frontend Pages

4. **src/pages/Profile.tsx**
   - Parolni o'zgartirish dialog qo'shildi
   - Profil tahrirlash yaxshilandi
   - Ikkita tugma: "Tahrirlash" va "Parolni o'zgartirish"

5. **src/pages/admin/AdminStudents.tsx** (YANGI)
   - O'quvchilar ro'yxati
   - Bloklash/blokdan chiqarish funksiyasi
   - Parolni o'zgartirish funksiyasi
   - Holat ko'rsatkichlari (Faol/Bloklangan)

6. **src/pages/Login.tsx**
   - Bloklangan foydalanuvchilarni tekshirish
   - Avtomatik chiqarish
   - Xato xabari

### Routes

7. **src/routes.tsx**
   - `/admin/students` route qo'shildi
   - AdminStudents import qo'shildi

### Admin Dashboard

8. **src/pages/admin/AdminDashboard.tsx**
   - "Talabalarni ko'rish" tugmasi allaqachon mavjud

---

## 🎯 Barcha Funksiyalar Holati

| Funksiya | Holat | Tavsif |
|----------|-------|--------|
| Admin o'quvchini bloklash | ✅ | To'liq ishlaydi |
| Admin o'quvchini blokdan chiqarish | ✅ | To'liq ishlaydi |
| Admin o'z parolini o'zgartirish | ✅ | To'liq ishlaydi |
| O'quvchi ismini o'zgartirish | ✅ | To'liq ishlaydi |
| O'quvchi parolini o'zgartirish | ✅ | To'liq ishlaydi |
| Admin o'quvchi parolini o'zgartirish | ✅ | To'liq ishlaydi |
| Bloklangan foydalanuvchi kirish tekshiruvi | ✅ | To'liq ishlaydi |
| O'quvchilar boshqaruvi sahifasi | ✅ | To'liq ishlaydi |

---

## 🚀 Keyingi Qadamlar

### Foydalanish

1. **Admin:**
   - O'quvchilar boshqaruvi sahifasiga o'ting
   - O'quvchilarni bloklang/blokdan chiqaring
   - O'quvchi parollarini o'zgartiring
   - O'z parolingizni o'zgartiring

2. **O'quvchi:**
   - Profilingizni tahrirlang
   - Ismingizni o'zgartiring
   - Parolingizni o'zgartiring

### Test Qilish

1. ✅ Bloklash funksiyasini test qiling
2. ✅ Parol o'zgartirish funksiyasini test qiling
3. ✅ Profil tahrirlash funksiyasini test qiling
4. ✅ Bloklangan foydalanuvchi kirish urinishini test qiling

---

## 📞 Yordam

Agar muammo yuzaga kelsa:

1. **Browser console'ni tekshiring (F12)**
2. **Xato xabarlarini o'qing**
3. **Database connection'ni tekshiring**
4. **RPC funksiyalarni tekshiring**

---

## ✅ Yakuniy Holat

**Barcha yangi funksiyalar to'liq ishlayapti!**

- ✅ Admin o'quvchilarni bloklashi mumkin
- ✅ Admin o'z parolini o'zgartirishi mumkin
- ✅ O'quvchi ismini o'zgartirishi mumkin
- ✅ O'quvchi parolini o'zgartirishi mumkin
- ✅ Admin o'quvchi parolini o'zgartirishi mumkin
- ✅ Bloklangan foydalanuvchilar kirish tekshiruvi
- ✅ O'quvchilar boshqaruvi sahifasi
- ✅ Barcha xavfsizlik tekshiruvlari

**Platformadan foydalanishni davom ettiring!** 🎉
