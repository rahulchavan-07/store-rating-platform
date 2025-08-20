# 🌟 Store Rating Platform

A full-stack web platform that enables users to rate stores, with role-based authentication and interactive dashboards for admins, store owners, and regular users.

---

## 🚀 Tech Stack

- **Frontend:** React.js (with Tailwind CSS)  
- **Backend:** Express.js (Node.js)  
- **Database:** MySQL  
- **Auth:** JWT-based authentication  

---

## ⚙️ Other Tools

- `axios` — for making HTTP requests from frontend to backend  
- `bcrypt` — for hashing passwords securely  
- `.env` — to manage environment variables and keep sensitive info safe  

---

## 👥 User Roles & Functionalities

### 🔑 System Administrator
- Add/view stores and users (admins & normal users)
- View dashboard metrics:
  - Total Users, Total Stores, Total Ratings
- 🔄 View latest 10 users  
- 🏪 View latest 10 stores  
- 🌟 View latest 5 ratings  
- 📊 Average ratings per store  
- 🔍 Filter listings by Name, Email, Role, etc.  
- 🧾 View complete user details and store ratings  
- 🔒 Secure logout  

---

### 👤 Normal User
- Sign up / Log in  
- View all stores with:
  - Name, Address, Overall Rating, Your Rating
- 🔎 Search/filter stores by name and address  
- ⭐ Submit and update ratings (1–5 stars)  
- 🔐 Change password  
- 🔒 Secure logout  

---

### 🧑‍💼 Store Owner
- Log in  
- 👥 View users who rated their store  
- 📈 View average rating of their own store  
- 🔐 Change password  
- 🔒 Secure logout  

---

## 📋 Validations

- **Name:** 20–60 characters  
- **Address:** Up to 400 characters  
- **Email:** Valid email format  
- **Password:** 8–16 characters, at least 1 uppercase letter and 1 special character  

---

## 📁 Folder Structure

```bash
store-rating-platform/
├── client/         # React frontend
├── server/         # Express backend
├── screenshots/    # Project demo screenshots
└── README.md

---

## 🗄️ Database Schema

### users
| Column   | Type                        | Constraints                          |
|----------|----------------------------|--------------------------------------|
| id       | INT                        | AUTO_INCREMENT, PRIMARY KEY           |
| name     | VARCHAR(60)                | NOT NULL                              |
| email    | VARCHAR(100)               | UNIQUE, NOT NULL                      |
| password | VARCHAR(255)               | NOT NULL                              |
| address  | VARCHAR(400)               |                                       |
| role     | ENUM('USER','ADMIN','OWNER') | DEFAULT 'USER'                        |

---

### stores
| Column    | Type         | Constraints                     |
|-----------|-------------|---------------------------------|
| id        | INT         | AUTO_INCREMENT, PRIMARY KEY      |
| name      | VARCHAR(100)| NOT NULL                         |
| location  | VARCHAR(255)|                                 |
| owner_id  | INT         | FOREIGN KEY → users(id)          |

---

### ratings
| Column    | Type      | Constraints                                             |
|-----------|-----------|--------------------------------------------------------|
| id        | INT       | AUTO_INCREMENT, PRIMARY KEY                             |
| user_id   | INT       | NOT NULL, FOREIGN KEY → users(id)                      |
| store_id  | INT       | NOT NULL, FOREIGN KEY → stores(id)                     |
| value     | INT       | CHECK(value >= 1 AND value <= 5)                      |
| created_at| TIMESTAMP | DEFAULT CURRENT_TIMESTAMP                                |
| UNIQUE    |           | user_id + store_id (a user can rate a store only once) |

