# EduCode.uz - Tezkor Ma'lumotnoma

## 🎯 Yangi Funksiyalar (Qisqacha)

### Admin Funksiyalari

#### 1. O'quvchilarni Bloklash
```
Admin Panel → O'quvchilar boshqaruvi → "Bloklash" tugmasi
```
- ✅ O'quvchini bloklash
- ✅ Blokdan chiqarish
- ✅ Bloklangan o'quvchi kirish urinishida xato oladi

#### 2. O'quvchi Parolini O'zgartirish
```
Admin Panel → O'quvchilar boshqaruvi → "Parolni o'zgartirish" tugmasi
```
- ✅ Istalgan o'quvchi parolini o'zgartirish
- ✅ Joriy parol kerak emas
- ✅ Kamida 6 ta belgi

#### 3. O'z Parolini O'zgartirish
```
Profil → "Parolni o'zgartirish" tugmasi
```
- ✅ Joriy parol kerak
- ✅ Yangi parol kamida 6 ta belgi
- ✅ Parol tasdiqlash

---

### O'quvchi Funksiyalari

#### 1. Ismni O'zgartirish
```
Profil → "Tahrirlash" tugmasi
```
- ✅ To'liq ismni o'zgartirish
- ✅ Telefon raqamni o'zgartirish

#### 2. Parolni O'zgartirish
```
Profil → "Parolni o'zgartirish" tugmasi
```
- ✅ Joriy parol kerak
- ✅ Yangi parol kamida 6 ta belgi
- ✅ Parol tasdiqlash

---

## 📍 Sahifalar

| Sahifa | URL | Kimlar uchun |
|--------|-----|--------------|
| O'quvchilar boshqaruvi | `/admin/students` | Faqat admin |
| Profil | `/profile` | Barcha foydalanuvchilar |
| Admin panel | `/admin` | Faqat admin |

---

## 🔑 API Funksiyalari

### Profil API

```typescript
// O'z parolini o'zgartirish
api.profiles.changeOwnPassword(currentPassword, newPassword)

// Admin o'quvchi parolini o'zgartirish
api.profiles.adminChangeUserPassword(targetUserId, newPassword)

// Admin o'quvchini bloklash/blokdan chiqarish
api.profiles.adminBanUser(targetUserId, banStatus)

// Profilni yangilash
api.profiles.update(userId, updates)
```

---

## 🗄️ Database

### Yangi Ustunlar

```sql
profiles.is_banned BOOLEAN DEFAULT false
```

### RPC Funksiyalar

```sql
-- O'z parolini o'zgartirish
change_own_password(current_password TEXT, new_password TEXT)

-- Admin o'quvchi parolini o'zgartirish
admin_change_user_password(target_user_id UUID, new_password TEXT)

-- Admin o'quvchini bloklash
admin_ban_user(target_user_id UUID, ban_status BOOLEAN)
```

---

## ✅ Tekshirish Ro'yxati

### Admin uchun

- [ ] O'quvchilar boshqaruvi sahifasiga kirish
- [ ] O'quvchini bloklash
- [ ] O'quvchini blokdan chiqarish
- [ ] O'quvchi parolini o'zgartirish
- [ ] O'z parolini o'zgartirish

### O'quvchi uchun

- [ ] Profilga kirish
- [ ] Ismni o'zgartirish
- [ ] Telefon raqamni o'zgartirish
- [ ] Parolni o'zgartirish

### Xavfsizlik Testi

- [ ] Bloklangan o'quvchi kirish urinishi
- [ ] Xato xabari ko'rsatilishi
- [ ] Admin o'zini bloklashi mumkin emasligini tekshirish
- [ ] Parol kamida 6 ta belgi bo'lishi kerakligini tekshirish

---

## 🚨 Muhim Eslatmalar

1. **Bloklash:**
   - Admin o'zini bloklashi mumkin emas
   - Bloklangan o'quvchi avtomatik chiqariladi
   - Blokdan chiqarish orqali qayta kirish mumkin

2. **Parol O'zgartirish:**
   - O'z parolini o'zgartirish uchun joriy parol kerak
   - Admin boshqa foydalanuvchi parolini o'zgartirishi uchun joriy parol kerak emas
   - Yangi parol kamida 6 ta belgidan iborat bo'lishi kerak

3. **Profil Tahrirlash:**
   - Foydalanuvchi faqat o'z profilini tahrirlashi mumkin
   - Rol o'zgartirilmaydi
   - Admin huquqlari saqlanadi

---

## 📊 Statistika

### O'quvchilar Boshqaruvi Sahifasida

- Jami o'quvchilar soni
- Faol o'quvchilar (yashil badge)
- Bloklangan o'quvchilar (qizil badge va border)

---

## 🎨 Interfeys

### O'quvchilar Ro'yxati

```
┌─────────────────────────────────────────┐
│ 👤 Ali Valiyev                          │
│ +998901234567                           │
│ ✅ Faol                                 │
│ [Parolni o'zgartirish] [Bloklash]      │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ 👤 Vali Aliyev                          │
│ +998901234568                           │
│ ❌ Bloklangan                           │
│ [Parolni o'zgartirish] [Blokdan chiqar]│
└─────────────────────────────────────────┘
```

### Profil Sahifasi

```
┌─────────────────────────────────────────┐
│ 👤 Ali Valiyev                          │
│ +998901234567                           │
│ [Parolni o'zgartirish] [Tahrirlash]    │
└─────────────────────────────────────────┘
```

---

## 🔄 Ish Jarayoni

### O'quvchini Bloklash

```
1. Admin Panel
   ↓
2. O'quvchilar boshqaruvi
   ↓
3. O'quvchini tanlash
   ↓
4. "Bloklash" tugmasini bosish
   ↓
5. ✅ O'quvchi bloklandi
```

### Parolni O'zgartirish

```
1. Profil sahifasi
   ↓
2. "Parolni o'zgartirish" tugmasi
   ↓
3. Joriy parol
   ↓
4. Yangi parol
   ↓
5. Parolni tasdiqlash
   ↓
6. ✅ Parol o'zgartirildi
```

---

## 📝 Xato Xabarlari

### Bloklash

- ✅ "Foydalanuvchi bloklandi"
- ✅ "Foydalanuvchi blokdan chiqarildi"
- ❌ "O'zingizni bloklash mumkin emas"
- ❌ "Foydalanuvchi topilmadi"

### Parol O'zgartirish

- ✅ "Parol muvaffaqiyatli o'zgartirildi"
- ❌ "Barcha maydonlarni to'ldiring"
- ❌ "Yangi parol kamida 6 ta belgidan iborat bo'lishi kerak"
- ❌ "Yangi parollar mos kelmayapti"

### Kirish

- ❌ "Sizning hisobingiz bloklangan. Iltimos, admin bilan bog'laning."

---

## 🎉 Yakuniy Holat

**Barcha funksiyalar ishlayapti!**

- ✅ 5 ta yangi funksiya
- ✅ 1 ta yangi sahifa
- ✅ 3 ta yangi RPC funksiya
- ✅ Xavfsizlik tekshiruvlari
- ✅ Bloklash tizimi
- ✅ Parol boshqaruvi

**Platformadan foydalaning!** 🚀
