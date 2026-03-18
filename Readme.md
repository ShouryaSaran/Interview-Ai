🚀 InterviewIQ – AI-Powered Interview Preparation Platform

A full-stack AI-powered web application designed to help developers prepare for technical interviews. The platform analyzes user input and generates personalized interview questions using AI, enabling effective and targeted practice.

📌 Features

🔐 JWT Authentication

    Secure login and registration system

    Protected routes and session handling

🤖 AI-Generated Interview Questions

    Uses Google Gemini API

    Generates both technical and behavioral questions

📄 Resume-Based Analysis

    Tailored questions based on user profile/input

🌐 Full-Stack Architecture

    Responsive frontend with React

    RESTful backend using Node.js & Express

🧠 Developer-Focused Practice

    Helps improve problem-solving and interview readiness

🛠️ Tech Stack

    Frontend

        React

        SCSS / CSS

    Backend

    Node.js

    Express.js

    Authentication

        JSON Web Tokens (JWT)

    AI Integration

        Google Gemini API

    Database

        MongoDB

📂 Project Structure

InterviewIQ/
│
├── client/              # React frontend
│   ├── src/
│   └── public/
│
├── server/              # Node.js backend
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   └── middleware/
│
├── .env
├── package.json
└── README.md


⚙️ Installation & Setup
1️⃣ Clone the repository
    git clone https://github.com/your-username/interviewiq.git
cd interviewiq
    2️⃣ Install dependencies
For backend:
    cd server
    npm install
For frontend:
    cd client
    npm install
3️⃣ Setup environment variables

    Create a .env file in the server folder:
        PORT=5000
        MONGO_URI=your_mongodb_connection
        JWT_SECRET=your_secret_key
        GEMINI_API_KEY=your_google_gemini_api_key
4️⃣ Run the application
    Start backend:
        cd server
        npx nodemon server.js || npm --watch server.js
    Start frontend:
        cd client
        npm run dev

🔑 API Endpoints (Sample)
    Method	 |   Endpoint	              |      Description
    POST	 |   /api/auth/register	      |      Register user
    POST	 |   /api/auth/login	      |      Login user
    POST	 |   /api/interview/	      |      Generate AI questions

🧪 Future Enhancements

🎯 Mock interview simulation (real-time)

📊 Performance analytics & scoring

🗣️ Voice-based interview practice

🧠 Advanced AI feedback on answers

🌍 Multi-role support (Frontend, Backend, DevOps, etc.)

🤝 Contributing

    Contributions are welcome!

    Fork the repo

    Create your feature branch

    Commit your changes

    Push and create a Pull Request

💡 Author

    Shourya Saran

    GitHub: https://github.com/ShouryaSaran

    LinkedIn: www.linkedin.com/in/shourya-saran-6b1749327