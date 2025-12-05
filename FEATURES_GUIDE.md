# EduCode.uz - Yangi Funksiyalar Qo'llanmasi

## 📋 Mundarija

1. [Admin O'quvchilarni Bloklash](#1-admin-oquvchilarni-bloklash)
2. [Admin O'z Parolini O'zgartirish](#2-admin-oz-parolini-ozgartirish)
3. [O'quvchi Ismini O'zgartirish](#3-oquvchi-ismini-ozgartirish)
4. [O'quvchi Parolini O'zgartirish](#4-oquvchi-parolini-ozgartirish)
5. [Admin O'quvchi Parolini O'zgartirish](#5-admin-oquvchi-parolini-ozgartirish)

---

## 1. Admin O'quvchilarni Bloklash

### 🎯 Maqsad
Admin o'quvchilarni bloklashi va blokdan chiqarishi mumkin. Bloklangan o'quvchilar tizimga kira olmaydi.

### 📍 Qayerda
**URL:** `/admin/students`  
**Yo'l:** Admin Panel → O'quvchilar boshqaruvi

### 🔧 Qanday Ishlaydi

#### Bosqich 1: O'quvchilar Sahifasiga Kirish
```
1. Admin panel'ga kiring
2. "Talabalarni ko'rish" tugmasini bosing
3. Yoki to'g'ridan-to'g'ri /admin/students ga o'ting
```

#### Bosqich 2: O'quvchini Bloklash
```
1. O'quvchilar ro'yxatidan kerakli o'quvchini toping
2. O'quvchi kartochkasida "Bloklash" tugmasini bosing
3. Tasdiqlash
4. ✅ O'quvchi bloklandi
```

#### Bosqich 3: Blokdan Chiqarish
```
1. Bloklangan o'quvchini toping (qizil border bilan)
2. "Blokdan chiqarish" tugmasini bosing
3. Tasdiqlash
4. ✅ O'quvchi blokdan chiqarildi
```

### 📊 Interfeys

**Faol O'quvchi:**
```
┌─────────────────────────────────────────────────────┐
│ 👤 Ali Valiyev                                      │
│ +998901234567                                       │
│ ✅ Faol                                             │
│                                                     │
│ [Parolni o'zgartirish]  [Bloklash]                 │
└─────────────────────────────────────────────────────┘
```

**Bloklangan O'quvchi:**
```
┌─────────────────────────────────────────────────────┐ ← Qizil border
│ 🚫 Vali Aliyev                                      │
│ +998901234568                                       │
│ ❌ Bloklangan                                       │
│                                                     │
│ [Parolni o'zgartirish]  [Blokdan chiqarish]        │
└─────────────────────────────────────────────────────┘
```

### ⚠️ Muhim
- ❌ Admin o'zini bloklashi mumkin emas
- ✅ Bloklangan o'quvchi kirish urinishida xato oladi
- ✅ Blokdan chiqarish orqali qayta kirish mumkin

### 🧪 Test
1. O'quvchini bloklang
2. O'quvchi hisobidan kirish urinishini qiling
3. Xato xabari ko'rsatilishini tekshiring
4. Blokdan chiqaring
5. O'quvchi qayta kirishi mumkinligini tekshiring

---

## 2. Admin O'z Parolini O'zgartirish

### 🎯 Maqsad
Admin o'z profilidan parolini o'zgartira oladi.

### 📍 Qayerda
**URL:** `/profile`  
**Yo'l:** Header → Profil → Parolni o'zgartirish

### 🔧 Qanday Ishlaydi

#### Bosqich 1: Profil Sahifasiga Kirish
```
1. Header'dagi foydalanuvchi ikonkasiga bosing
2. "Profil" tugmasini tanlang
3. Yoki to'g'ridan-to'g'ri /profile ga o'ting
```

#### Bosqich 2: Parolni O'zgartirish Dialog'ini Ochish
```
1. Profil sahifasida "Parolni o'zgartirish" tugmasini bosing
2. Dialog oynasi ochiladi
```

#### Bosqich 3: Yangi Parolni Kiriting
```
1. Joriy parol: ********
2. Yangi parol: ******** (kamida 6 ta belgi)
3. Parolni tasdiqlang: ********
4. "O'zgartirish" tugmasini bosing
5. ✅ Parol o'zgartirildi
```

### 📊 Interfejs

**Profil Sahifasi:**
```
┌─────────────────────────────────────────────────────┐
│ 👤 Admin User                                       │
│ +998901234567                                       │
│                                                     │
│ [🔒 Parolni o'zgartirish]  [✏️ Tahrirlash]         │
└─────────────────────────────────────────────────────┘
```

**Parol O'zgartirish Dialog:**
```
┌─────────────────────────────────────────────────────┐
│ Parolni o'zgartirish                                │
│ Yangi parol kiriting                                │
│                                                     │
│ Joriy parol *                                       │
│ [________________]                                  │
│                                                     │
│ Yangi parol *                                       │
│ [________________]                                  │
│                                                     │
│ Parolni tasdiqlang *                                │
│ [________________]                                  │
│                                                     │
│           [Bekor qilish]  [O'zgartirish]           │
└─────────────────────────────────────────────────────┘
```

### ⚠️ Muhim
- ✅ Joriy parol to'g'ri bo'lishi kerak
- ✅ Yangi parol kamida 6 ta belgidan iborat bo'lishi kerak
- ✅ Parol tasdiqlash majburiy
- ✅ Parollar mos kelishi kerak

### 🧪 Test
1. Parolni o'zgartiring
2. Logout qiling
3. Yangi parol bilan kirish urinishini qiling
4. Muvaffaqiyatli kirish

---

## 3. O'quvchi Ismini O'zgartirish

### 🎯 Maqsad
O'quvchi o'z profilidan ismini va telefon raqamini o'zgartira oladi.

### 📍 Qayerda
**URL:** `/profile`  
**Yo'l:** Header → Profil → Tahrirlash

### 🔧 Qanday Ishlaydi

#### Bosqich 1: Profil Sahifasiga Kirish
```
1. Header'dagi foydalanuvchi ikonkasiga bosing
2. "Profil" tugmasini tanlang
3. Yoki to'g'ridan-to'g'ri /profile ga o'ting
```

#### Bosqich 2: Tahrirlash Dialog'ini Ochish
```
1. Profil sahifasida "Tahrirlash" tugmasini bosing
2. Dialog oynasi ochiladi
```

#### Bosqich 3: Ma'lumotlarni O'zgartirish
```
1. To'liq ism: Ali Valiyev → Vali Aliyev
2. Telefon raqam: +998901234567 → +998901234568
3. "Saqlash" tugmasini bosing
4. ✅ Profil yangilandi
```

### 📊 Interfejs

**Profil Tahrirlash Dialog:**
```
┌─────────────────────────────────────────────────────┐
│ Profilni tahrirlash                                 │
│ Shaxsiy ma'lumotlaringizni yangilang               │
│                                                     │
│ To'liq ism *                                        │
│ [Ali Valiyev___________]                            │
│                                                     │
│ Telefon raqam                                       │
│ [+998901234567_________]                            │
│                                                     │
│           [Bekor qilish]  [Saqlash]                │
└─────────────────────────────────────────────────────┘
```

### ⚠️ Muhim
- ✅ To'liq ism majburiy
- ✅ Telefon raqam ixtiyoriy
- ❌ Rol o'zgartirilmaydi (xavfsizlik uchun)

### 🧪 Test
1. Ismni o'zgartiring
2. Saqlang
3. Profilda yangi ism ko'rsatilishini tekshiring
4. Header'da yangi ism ko'rsatilishini tekshiring

---

## 4. O'quvchi Parolini O'zgartirish

### 🎯 Maqsad
O'quvchi o'z profilidan parolini o'zgartira oladi.

### 📍 Qayerda
**URL:** `/profile`  
**Yo'l:** Header → Profil → Parolni o'zgartirish

### 🔧 Qanday Ishlaydi

#### Bosqich 1: Profil Sahifasiga Kirish
```
1. Header'dagi foydalanuvchi ikonkasiga bosing
2. "Profil" tugmasini tanlang
3. Yoki to'g'ridan-to'g'ri /profile ga o'ting
```

#### Bosqich 2: Parolni O'zgartirish Dialog'ini Ochish
```
1. Profil sahifasida "Parolni o'zgartirish" tugmasini bosing
2. Dialog oynasi ochiladi
```

#### Bosqich 3: Yangi Parolni Kiriting
```
1. Joriy parol: ********
2. Yangi parol: ******** (kamida 6 ta belgi)
3. Parolni tasdiqlang: ********
4. "O'zgartirish" tugmasini bosing
5. ✅ Parol o'zgartirildi
```

### 📊 Interfejs

**Profil Sahifasi:**
```
┌─────────────────────────────────────────────────────┐
│ 👤 Ali Valiyev                                      │
│ +998901234567                                       │
│                                                     │
│ [🔒 Parolni o'zgartirish]  [✏️ Tahrirlash]         │
└─────────────────────────────────────────────────────┘
```

### ⚠️ Muhim
- ✅ Joriy parol to'g'ri bo'lishi kerak
- ✅ Yangi parol kamida 6 ta belgidan iborat bo'lishi kerak
- ✅ Parol tasdiqlash majburiy
- ✅ Parollar mos kelishi kerak

### 🧪 Test
1. Parolni o'zgartiring
2. Logout qiling
3. Yangi parol bilan kirish urinishini qiling
4. Muvaffaqiyatli kirish

---

## 5. Admin O'quvchi Parolini O'zgartirish

### 🎯 Maqsad
Admin istalgan o'quvchining parolini o'zgartira oladi (joriy parolni bilishi shart emas).

### 📍 Qayerda
**URL:** `/admin/students`  
**Yo'l:** Admin Panel → O'quvchilar boshqaruvi → Parolni o'zgartirish

### 🔧 Qanday Ishlaydi

#### Bosqich 1: O'quvchilar Sahifasiga Kirish
```
1. Admin panel'ga kiring
2. "Talabalarni ko'rish" tugmasini bosing
3. Yoki to'g'ridan-to'g'ri /admin/students ga o'ting
```

#### Bosqich 2: O'quvchini Tanlash
```
1. O'quvchilar ro'yxatidan kerakli o'quvchini toping
2. "Parolni o'zgartirish" tugmasini bosing
3. Dialog oynasi ochiladi
```

#### Bosqich 3: Yangi Parolni Kiriting
```
1. Yangi parol: ******** (kamida 6 ta belgi)
2. Parolni tasdiqlang: ********
3. "O'zgartirish" tugmasini bosing
4. ✅ Parol o'zgartirildi
```

### 📊 Interfejs

**Parol O'zgartirish Dialog:**
```
┌─────────────────────────────────────────────────────┐
│ O'quvchi parolini o'zgartirish                      │
│ Ali Valiyev uchun yangi parol kiriting             │
│                                                     │
│ Yangi parol *                                       │
│ [________________]                                  │
│                                                     │
│ Parolni tasdiqlang *                                │
│ [________________]                                  │
│                                                     │
│           [Bekor qilish]  [O'zgartirish]           │
└─────────────────────────────────────────────────────┘
```

### ⚠️ Muhim
- ✅ Admin joriy parolni bilishi shart emas
- ✅ Yangi parol kamida 6 ta belgidan iborat bo'lishi kerak
- ✅ Parol tasdiqlash majburiy
- ✅ O'quvchi yangi parol bilan kirishi mumkin

### 🧪 Test
1. O'quvchi parolini o'zgartiring
2. O'quvchi hisobidan logout qiling
3. Yangi parol bilan kirish urinishini qiling
4. Muvaffaqiyatli kirish

---

## 📊 Barcha Funksiyalar Jadvali

| # | Funksiya | Kim uchun | Qayerda | Joriy parol kerakmi |
|---|----------|-----------|---------|---------------------|
| 1 | O'quvchini bloklash | Admin | `/admin/students` | - |
| 2 | Admin parolini o'zgartirish | Admin | `/profile` | ✅ Ha |
| 3 | O'quvchi ismini o'zgartirish | O'quvchi | `/profile` | - |
| 4 | O'quvchi parolini o'zgartirish | O'quvchi | `/profile` | ✅ Ha |
| 5 | Admin o'quvchi parolini o'zgartirish | Admin | `/admin/students` | ❌ Yo'q |

---

## 🔒 Xavfsizlik Qoidalari

### Bloklash
- ✅ Faqat adminlar bloklashi mumkin
- ❌ Admin o'zini bloklashi mumkin emas
- ✅ Bloklangan o'quvchi avtomatik chiqariladi

### Parol O'zgartirish
- ✅ O'z parolini o'zgartirish uchun joriy parol kerak
- ✅ Admin boshqa foydalanuvchi parolini o'zgartirishi uchun joriy parol kerak emas
- ✅ Yangi parol kamida 6 ta belgidan iborat bo'lishi kerak
- ✅ Parol tasdiqlash majburiy

### Profil Tahrirlash
- ✅ Foydalanuvchi faqat o'z profilini tahrirlashi mumkin
- ❌ Rol o'zgartirilmaydi
- ✅ Admin huquqlari saqlanadi

---

## 🎯 Foydalanish Stsenariylari

### Stsenariy 1: O'quvchi Qoidalarni Buzdi
```
1. Admin o'quvchilar sahifasiga kiradi
2. Muammoli o'quvchini topadi
3. "Bloklash" tugmasini bosadi
4. O'quvchi tizimga kira olmaydi
5. Muammo hal qilingandan keyin blokdan chiqaradi
```

### Stsenariy 2: O'quvchi Parolini Unutdi
```
1. O'quvchi admin bilan bog'lanadi
2. Admin o'quvchilar sahifasiga kiradi
3. O'quvchini topadi
4. "Parolni o'zgartirish" tugmasini bosadi
5. Yangi parolni o'rnatadi
6. O'quvchiga yangi parolni aytadi
7. O'quvchi yangi parol bilan kiradi
```

### Stsenariy 3: O'quvchi Ismini O'zgartirmoqchi
```
1. O'quvchi profiliga kiradi
2. "Tahrirlash" tugmasini bosadi
3. Yangi ismni kiriting
4. Saqlaydi
5. Yangi ism barcha joylarda ko'rsatiladi
```

### Stsenariy 4: Xavfsizlik Uchun Parolni O'zgartirish
```
1. Foydalanuvchi profiliga kiradi
2. "Parolni o'zgartirish" tugmasini bosadi
3. Joriy parolni kiriting
4. Yangi parolni kiriting
5. Parolni tasdiqlaydi
6. Saqlaydi
7. Yangi parol bilan kiradi
```

---

## ✅ Yakuniy Tekshirish Ro'yxati

### Admin uchun
- [ ] O'quvchilarni bloklash
- [ ] O'quvchilarni blokdan chiqarish
- [ ] O'quvchi parolini o'zgartirish
- [ ] O'z parolini o'zgartirish
- [ ] O'quvchilar statistikasini ko'rish

### O'quvchi uchun
- [ ] Ismni o'zgartirish
- [ ] Telefon raqamni o'zgartirish
- [ ] Parolni o'zgartirish
- [ ] Profilni ko'rish

### Xavfsizlik
- [ ] Bloklangan o'quvchi kirish urinishi
- [ ] Admin o'zini bloklashi mumkin emasligini tekshirish
- [ ] Parol kamida 6 ta belgi bo'lishi kerakligini tekshirish
- [ ] Parol tasdiqlash ishlashini tekshirish

---

## 🎉 Xulosa

**Barcha yangi funksiyalar to'liq ishlayapti va foydalanishga tayyor!**

- ✅ 5 ta yangi funksiya
- ✅ 1 ta yangi sahifa
- ✅ To'liq xavfsizlik
- ✅ Qulay interfeys
- ✅ Barcha rollar uchun

**Platformadan foydalaning va o'quvchilarni samarali boshqaring!** 🚀
