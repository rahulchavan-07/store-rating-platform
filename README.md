🌟 Store Rating Platform

A full-stack web platform that enables users to rate stores, with role-based authentication and interactive dashboards for admins, store owners, and regular users.

🚀 Tech Stack
Frontend: React.js (with Tailwind CSS)
Backend: Express.js (Node.js)
Database: MySQL
Auth: JWT-based authentication

⚙️ Other Tools
axios — for making HTTP requests from frontend to backend
bcrypt — for hashing passwords securely
.env — to manage environment variables and keep sensitive info safe
👥 User Roles & Functionalities
🔑 System Administrator
Add/view stores, users (admins & normal users)
View dashboard metrics:
Total Users, Total Stores, Total Ratings
🔄 Latest 10 Users
🏪 Latest 10 Stores
🌟 Latest 5 Ratings
📊 Average Ratings per Store
Filter listings by Name, Email, Role, etc.
View complete user details and store ratings
Secure logout
👤 Normal User
Sign up / Log in
View all stores with:
Name, Address, Overall Rating, and Your Rating
Search/filter stores by name and address
Submit and update ratings (1–5 stars)
Change password
Secure logout
🧑‍💼 Store Owner
Log in
View users who rated their store
View average rating of their own store
Change password
Secure logout
📋 Validations
Name: 20–60 characters
Address: Up to 400 characters
Email: Valid email format
Password: 8–16 characters, at least 1 uppercase letter and 1 special character
📁 Folder Structure
roxiler_store_ratings/
├── client/         # React frontend
├── server/         # Express backend
├── screenshots/    # Project demo screenshots
└── README.md