# **🚀 GigFlow – Mini Freelance Marketplace**


GigFlow is a full-stack freelance marketplace platform where clients can post gigs and freelancers can place bids. Clients can review bids and hire one freelancer, while others are automatically rejected. The system supports secure authentication, real-time notifications, and robust state handling.

🌐 Live Links

Frontend: https://gigflow-1-eiu2.onrender.com

Backend: https://gigflow-me2e.onrender.com

---

🔑 Test Credentials

You can use the following test accounts to explore the platform:

👤 User 1

Email: suraj@gmail.com

Password: suraj12

👤 User 2

Email: fl@gmail.com

Password: free12

⚠️ This is a dynamic application.
You are free to register new users, create gigs, place bids, and test all features independently.

---

🧠 Project Working (How It Works)

User Authentication

Users can register and login securely.

Authentication is implemented using JWT stored in HttpOnly cookies.

Sessions persist across page refresh.

Gig Management

Any logged-in user can create a gig (acts as a Client).

Open gigs are visible in the Browse Gigs section.

Users cannot bid on their own gigs.

Bidding System

Freelancers can place one bid per gig.

Each bid includes a message and a proposed price.

Duplicate bids are prevented at the database level.

Hiring Logic

Gig owners can view all bids for their gigs.

Hiring one freelancer:

Assigns the gig

Marks the selected bid as hired

Automatically rejects all other bids

Real-Time Notifications

Freelancers receive instant notifications when hired using Socket.io.

Flexible Roles

No fixed roles.

The same user can act as both client and freelancer.

---

🛠️ Tech Stack Used
Frontend

React.js (Vite)

Tailwind CSS

React Router DOM

Axios

React Hot Toast

Socket.io Client

Backend

Node.js

Express.js

MongoDB (Mongoose)

JWT Authentication

HttpOnly Cookies

Socket.io

CORS

Database

MongoDB Atlas

---

🔧 Tools & Platforms

Git & GitHub

Render (Frontend & Backend Deployment)

MongoDB Atlas

Postman (API Testing)

VS Code

---

⚠️ Problems Faced & How They Were Resolved
1. CORS & Cookie-Based Authentication

Problem: Cookies were not sent across domains.
Solution: Enabled credentials: true, configured environment-aware cookies, and added trust proxy for cloud deployment.

2. Secure Cookies on Localhost

Problem: Secure cookies were blocked during local development.
Solution: Used conditional cookie configuration based on environment.

3. MongoDB Transaction Errors

Problem: Transactions failed on local MongoDB instances.
Solution: Used safe atomic update logic without transactions in development.

4. Duplicate Bids

Problem: Freelancers could attempt multiple bids on the same gig.
Solution: Added a compound unique index and handled duplicate key errors gracefully.

5. React Shared State Issue

Problem: Bid inputs updated across multiple gigs.
Solution: Maintained bid state per gig using object mapping.

---

✅ Key Highlights

Secure cookie-based authentication

Real-time hiring notifications

Clean and responsive UI

Production-ready deployment

Scalable architecture

---

📌 Final Note

GigFlow demonstrates real-world full-stack development concepts including secure authentication, role-less systems, real-time communication, and robust data integrity, making it a strong practical project.
