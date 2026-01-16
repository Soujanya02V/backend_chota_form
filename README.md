#Full Stack Admin Dashboard (JWT Auth)

A full-stack web application with a JWT-protected admin dashboard that allows admins to securely view, delete, and search user-submitted contact data stored in MongoDB.

🚀 Features
🔐 Authentication

Admin login using JWT

Password hashing with bcrypt

Protected backend routes using middleware

🗄️ Admin Dashboard

View all contact submissions (READ)

Delete contact submissions (DELETE)

Search contacts by name or message

JWT-protected access

🌐 Public Contact Form

Users can submit name and message

Data stored in MongoDB

🛠️ Tech Stack
Frontend

React

React Router

Fetch API

Vite

Backend

Node.js

Express.js

MongoDB Atlas

Mongoose

JSON Web Token (JWT)

bcryptjs

dotenv



🔑 Environment Variables
Backend (backend/.env)
PORT=3001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

Frontend (frontend/.env)
VITE_BACKEND_URI=http://localhost:3000

▶️ How to Run Locally
1️⃣ Clone the repository
git clone <repo-url>
cd project-root

2️⃣ Setup Backend
cd backend
npm install
node index.js

3️⃣ Create Admin User (One-time)
node createAdmin.js

4️⃣ Setup Frontend
cd frontend
npm install
npm run dev

🔐 Admin Login

URL: /admin

Uses JWT authentication

Token stored on frontend

Protected dashboard route

🌍 API Endpoints
Public
Method	Route	Description
POST	/contact	Submit contact form
Admin (Protected)
Method	Route	Description
POST	/admin/login	Admin login
GET	/admin/contacts	View all contacts
DELETE	/admin/contacts/:id	Delete contact
🧠 Key Learnings

JWT-based authentication

Protected routes (frontend & backend)

REST API design

MongoDB with Mongoose

CRUD operations

Debugging backend errors

Environment variable management

🎯 Future Improvements (Optional)

Pagination for large datasets

Backend-based search

Role-based access control

HTTP-only cookies for JWT

UI improvements



📌 Author

Soujanya


