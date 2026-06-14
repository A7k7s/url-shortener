# URL Shortener Application

A full-stack URL Shortener application built with React, Node.js, Express, and PostgreSQL featuring JWT authentication, custom aliases, QR code generation, click analytics, and visit tracking.

---

## Project Overview

This application allows users to:

* Register and Login securely using JWT Authentication
* Create shortened URLs
* Create custom aliases for URLs
* Redirect users using short URLs
* Generate and download QR Codes
* Track URL clicks and visit history
* View analytics for each shortened URL
* Delete URLs owned by the logged-in user

---

## Tech Stack

### Frontend

* React
* React Router DOM
* Axios
* Tailwind CSS
* React Hot Toast

### Backend

* Node.js
* Express.js
* JWT Authentication
* bcrypt.js
* QRCode

### Database

* PostgreSQL

---

## Features

### Authentication

* User Registration
* User Login
* JWT-based Authentication
* Protected Routes

### URL Management

* Create Short URL
* Custom Alias Support
* Copy Short URL
* Delete URL
* User-specific URL Access

### Analytics

* Click Tracking
* Visit Tracking
* Total Visit Count
* Visit History

### QR Code Generation

* Generate QR Code
* Download QR Code

---

## Project Structure

```text
url-shortener/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── utils/
│   │   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│
├── docs/
├── outputs/
└── README.md
```

---

## Setup Instructions

### Clone the Repository

```bash
git clone <repository-url>
cd url-shortener
```

---

## Backend Setup

Navigate to the backend folder:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
PORT=5000
DATABASE_URL=your_postgresql_connection_string
JWT_SECRET=your_secret_key
```

Run the backend server:

```bash
node src/server.js
```

or

```bash
npm run dev
```

Backend runs on:

```text
http://localhost:5000
```

---

## Frontend Setup

Navigate to the frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Run the frontend:

```bash
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

## Database Schema

### Users Table

| Column   | Type    |
| -------- | ------- |
| id       | Integer |
| name     | Text    |
| email    | Text    |
| password | Text    |

### URLs Table

| Column       | Type      |
| ------------ | --------- |
| id           | Integer   |
| user_id      | Integer   |
| original_url | Text      |
| short_code   | Text      |
| custom_alias | Text      |
| clicks       | Integer   |
| created_at   | Timestamp |

### Visits Table

| Column     | Type      |
| ---------- | --------- |
| id         | Integer   |
| url_id     | Integer   |
| visited_at | Timestamp |

---

## Assumptions Made

* Users can only manage URLs created by themselves.
* Short codes are unique across the platform.
* Visitors do not need an account to access shortened URLs.
* Analytics count all visits to a shortened URL.
* QR Codes are generated on demand.
* JWT tokens are used for authentication and authorization.

---

## Architecture Diagram

```text
docs/Architecture_diagram.png
```
---

## Documentation

```text
docs/
├── URL Shortener Documentation.docx
└── architecture-diagram.png
```

---

## outputs

```text
outputs/
├── Login page.png
├── Register page.png
├── Dashboard page.png
├── Analytics page.png
└── QR-generation.png
```

---

## Demo Video

https://www.loom.com/share/3149fa0fc61f4e44ae46967f22a382da

---

## Author

Akshayaa Panneerselvam
https://github.com/A7k7s

---

This project is a part of a hackathon run by https://katomaran.com
