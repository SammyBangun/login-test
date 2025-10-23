# Next.js Dashboard with JWT Authentication

Ini adalah proyek [Next.js](https://nextjs.org) dengan **autentikasi JWT** dan **Prisma ORM** untuk manajemen basis data. Proyek ini mencakup rute terproteksi (dasbor) dan fungsionalitas login/logout pengguna.

---

## Fitur

- Halaman dasbor yang dilindungi (diperlukan JWT)

- Fungsionalitas Login dan Logout

- Manajemen pengguna dengan Prisma

- Migrasi dan seeding basis data dengan Prisma
  
---

## Permulaan

### 1. Clone Repo

```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
```


### 2. Instal Dependensi

```bash
npm install
```

### 3. Setup ENV

```bash
DATABASE_URL="mysql://root:@localhost:3306/login_test"
JWT_SECRET="secret"
COOKIE_NAME="token"
```

### 4. Migrasi Database

```bash
npx prisma migrate dev --name init
```

### 5. Seed Database

```bash
npx prisma db seed
# username/email: test@example.com
# password: password123
```

### 6. Jalankan Server

```bash
npm run dev
```

## Tech Stack

- **Frontend:** React.js (Next.js App Router + Tailwind CSS)  
- **Backend:** Node.js (Next.js API Routes)  
- **Database:** MySQL (Prisma ORM)  
- **Authentication:** JWT + HttpOnly Cookies  
- **Password Security:** bcrypt (hashing password)  

## Tampilan UI

<img width="500" height="603" alt="image" src="https://github.com/user-attachments/assets/ab2fb42b-cc70-4d9d-b503-3cd59c113b41" />
<img width="1365" height="681" alt="Screenshot 2025-10-23 085432" src="https://github.com/user-attachments/assets/291257b1-5623-4eab-bb36-95e01466e6c9" />
<img width="1365" height="677" alt="Screenshot 2025-10-23 085457" src="https://github.com/user-attachments/assets/95b5103a-e5cd-473c-9ae5-b1ce72bd5bd6" />





