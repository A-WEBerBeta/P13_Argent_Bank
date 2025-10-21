# 🏦 Argent Bank - React Authentication App

This project is part of the **OpenClassrooms Front-End Developer path** (Project 13).  
It’s a responsive banking web application built with **React**, **Redux Toolkit**, and **React Router**.

---

## 🚀 Features

- User authentication (login/logout)
- Secure profile access (JWT)
- State management with Redux Toolkit
- User information update via API
- Fully responsive design based on the provided mockups

---

## 🧰 Tech Stack

- **Front-end:** React, Redux Toolkit, React Router
- **Styling:** CSS
- **API:** Argent Bank API (Node.js)
- **Build tool:** Vite

---

## ⚙️ Installation

1. Clone both repositories:

   ```bash
   # Frontend
   git clone https://github.com/your-username/argent-bank.git
   cd argent-bank

   # Backend (API)
   git clone https://github.com/OpenClassrooms-Student-Center/Project-10-Bank-API.git

   ```

2. Install dependencies:

   ```bash
   npm install

   ```

3. Run the API:

   ```bash
   npm run dev:server

   ```

4. Run the front-end:

   ```bash
   npm run dev
   ```

## 🧪 Test Accounts

| Email            | Password    |
| ---------------- | ----------- |
| tony@stark.com   | password123 |
| steve@rogers.com | password456 |

---

## 📁 Folder Structure

```bash
  src/
  ├── assets/           # Images and styles
  ├── components/       # Reusable components
  ├── features/         # Redux slices (auth, user)
  ├── pages/            # React pages (Home, Login, Profile)
  ├── store/            # Redux store configuration
  └── App.jsx           # Main app entry
```

---

## 🧩 API Endpoints Used

| Method | Endpoint             | Description       |
| ------ | -------------------- | ----------------- |
| POST   | /api/v1/user/login   | Authenticate user |
| POST   | /api/v1/user/profile | Get user profile  |
| PUT    | /api/v1/user/profile | Update user info  |

---

## 📌 Notes

Référence : [Notes Vites](./VITE_NOTES.md)
