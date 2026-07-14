# QRlink

# 🔗 QRLink – URL Shortener & QR Code Generator

QRLink is a full-stack web application that allows users to create secure short URLs, generate QR codes, and manage all their links from a personalized dashboard. The application uses JWT authentication, stores data in MySQL, and provides a modern, responsive React interface.

---

## 🚀 Features

### 🔐 Authentication
- User Registration
- User Login
- JWT Authentication
- Protected Routes
- Secure Password Hashing using bcrypt

### 🔗 URL Management
- Create Short URLs
- Automatic Short Code Generation
- Redirect Short URL to Original URL
- Copy Short URL
- Delete URLs
- Search URLs

### 📱 QR Code
- Generate QR Code for every short URL
- Download QR Code as PNG
- Open Short URL directly
- Share QR Code

### 📊 Dashboard
- Personalized Dashboard
- View Recently Created Links
- Quick Navigation
- Responsive Cards

### 🎨 User Interface
- Modern Glassmorphism UI
- Fully Responsive Design
- Smooth Animations using Framer Motion
- Toast Notifications
- Mobile Friendly

---

# 🛠 Tech Stack

## Frontend
- React.js
- Vite
- React Router DOM
- Axios
- Tailwind CSS
- Framer Motion
- React Hot Toast
- QRCode React
- React Icons

## Backend
- Node.js
- Express.js
- JWT Authentication
- bcrypt
- MySQL
- QRCode Package
- dotenv

---

# 📂 Project Structure

```
QRLink/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── routes/
│   ├── utils/
│   ├── app.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   └── utils/
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/cruchitha09/QRlink.git
```

---

## Backend Setup

```bash
cd backend

npm install
```

Create a `.env` file:

```env
PORT=5000

DB_HOST=localhost
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=qrlink

JWT_SECRET=your_secret_key

BASE_URL=http://localhost:5000
```

Start backend

```bash
npm start
```

or

```bash
npm run dev
```

---

## Frontend Setup

```bash
cd frontend

npm install
```

Create a `.env` file

```env
VITE_API_URL=http://localhost:5000
```

Start frontend

```bash
npm run dev
```

---

# 🔌 API Endpoints

## Authentication

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | /api/auth/register | Register User |
| POST | /api/auth/login | Login User |

---

## URL

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | /api/url/create | Create Short URL |
| GET | /api/url/my-links | Get User Links |
| DELETE | /api/url/delete/:id | Delete Link |
| GET | /api/url/qr/:shortCode | Generate QR |
| GET | /:shortCode | Redirect URL |

---

# 📸 Application Screens

- Home Page
- Login
- Register
- Dashboard
- Create Link
- My Links
- QR Code Download

*(Screenshots can be added here after deployment.)*

---

# 🔒 Security

- JWT Authentication
- Password Hashing using bcrypt
- Protected API Routes
- Environment Variables
- Secure Database Access

---

# 🌟 Future Enhancements

- URL Click Analytics
- Custom Short URLs
- User Profile Management
- Link Expiration
- QR Customization
- Dark / Light Theme
- Admin Dashboard
- Email Verification

---

# 👩‍💻 Author

**Ruchitha C**

GitHub:
https://github.com/cruchitha09

---

