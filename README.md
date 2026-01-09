# 🌐 SkillSphere - Professional Skill-Sharing Platform

<div align="center">
  <img src="https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react" alt="React" />
  <img src="https://img.shields.io/badge/Firebase-9.x-FFCA28?style=for-the-badge&logo=firebase" alt="Firebase" />
  <img src="https://img.shields.io/badge/TailwindCSS-3.x-06B6D4?style=for-the-badge&logo=tailwindcss" alt="TailwindCSS" />
  <img src="https://img.shields.io/badge/Spring%20Boot-3.x-6DB33F?style=for-the-badge&logo=springboot" alt="Spring Boot" />
</div>

<br />

SkillSphere is a modern, full-featured professional networking platform designed for skill sharing, learning, and professional growth. Built with React, Firebase, and Spring Boot, it offers a premium user experience with dark/light mode support, real-time features, and a beautiful glassmorphism design.

## ✨ Features

### 🔐 Authentication & Security
- **Firebase Authentication** - Email/password, Google, and Facebook sign-in
- **Protected Routes** - Secure access control for authenticated users
- **Password Reset** - Secure password recovery via email

### 👤 User Profiles
- **Rich Profiles** - Professional headline, bio, skills, and experience
- **Profile Photos** - Upload and manage profile pictures
- **Skills & Endorsements** - Showcase expertise and receive endorsements
- **Experience & Education** - Add work history and educational background

### 📝 Social Feed
- **Create Posts** - Share text, images, and videos
- **Skill Tags** - Tag posts with relevant skills
- **Engagement** - Like, comment, share, and save posts
- **Real-time Updates** - Live feed with Firebase Firestore

### 💬 Messaging
- **Real-time Chat** - Instant messaging with connections
- **Message History** - Persistent conversation history
- **Online Status** - See when connections are online

### 👥 Networking
- **Connection Requests** - Send and receive connection invitations
- **Suggestions** - AI-powered connection recommendations
- **Mutual Connections** - See shared connections

### 📚 Learning Plans
- **Track Progress** - Monitor learning journey with progress bars
- **Skill Development** - Structured learning paths
- **Certificates** - Earn and display achievements

### 🎨 Premium Design
- **Dark/Light Mode** - System preference detection + manual toggle
- **Glassmorphism** - Modern translucent UI effects
- **Animations** - Smooth transitions and micro-interactions
- **Responsive** - Mobile-first design approach

### 👥 Groups & Events
- **Create Groups** - Build communities around skills
- **Join Events** - Attend virtual and in-person events
- **Event Calendar** - Manage your event schedule

### 📊 User Status Updates
- **Story-like Status** - Share quick updates with the community
- **Status Feed** - View recent updates from connections
- **Carousel Display** - Beautiful status presentation

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Java 21+ (for backend)
- Firebase account

### Frontend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/PAF-Project-SkillSphere.git
   cd PAF-Project-SkillSphere/frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Firebase**
   
   Create a `.env` file in the frontend directory:
   ```env
   REACT_APP_FIREBASE_API_KEY=your_api_key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   REACT_APP_FIREBASE_PROJECT_ID=your_project_id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   REACT_APP_FIREBASE_APP_ID=your_app_id
   REACT_APP_FIREBASE_MEASUREMENT_ID=your_measurement_id
   REACT_APP_API_URL=http://localhost:8080
   ```

4. **Start development server**
   ```bash
   npm start
   ```

   The app will open at [http://localhost:3000](http://localhost:3000)

### Backend Setup

1. **Navigate to backend**
   ```bash
   cd ../backend
   ```

2. **Configure application properties**
   
   Update `src/main/resources/application.properties`:
   ```properties
   spring.application.name=backend
   server.port=8080
   
   # MongoDB configuration
   spring.data.mongodb.uri=mongodb+srv://your_connection_string
   ```

3. **Run the backend**
   ```bash
   ./mvnw spring-boot:run
   ```

   The API will be available at [http://localhost:8080](http://localhost:8080)

## 📁 Project Structure

```
PAF-Project-SkillSphere/
├── .agent/
│   └── workflows/
│       └── implementation-plan.md
├── firebase/
│   ├── firestore.rules
│   ├── firestore.indexes.json
│   └── storage.rules
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── api/                    # API services
│   │   │   ├── commentApi.js
│   │   │   ├── postApi.js
│   │   │   ├── topicApi.js
│   │   │   ├── userStatusApi.js
│   │   │   └── index.js
│   │   ├── components/
│   │   │   ├── comment/            # Comment components
│   │   │   ├── common/             # Shared components (ThemeToggle)
│   │   │   ├── layout/             # Layout components (Navbar, Sidebar)
│   │   │   ├── learningplans/      # Learning plan components
│   │   │   ├── post/               # Post components (PostCard, CreatePost)
│   │   │   ├── ui/                 # Reusable UI components
│   │   │   ├── userstatus/         # User status components
│   │   │   └── index.js
│   │   ├── config/                 # Firebase configuration
│   │   │   └── firebase.js
│   │   ├── contexts/               # React contexts
│   │   │   ├── AuthContext.jsx
│   │   │   └── ThemeContext.jsx
│   │   ├── hooks/                  # Custom React hooks
│   │   │   ├── useCustomHooks.js
│   │   │   └── index.js
│   │   ├── pages/                  # Page components
│   │   │   ├── Comments.jsx
│   │   │   ├── Events.jsx
│   │   │   ├── Explore.jsx
│   │   │   ├── ForgotPassword.jsx
│   │   │   ├── Groups.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── LearningPlanInsider.jsx
│   │   │   ├── LearningPlans.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Messages.jsx
│   │   │   ├── Network.jsx
│   │   │   ├── Notifications.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Settings.jsx
│   │   │   └── index.js
│   │   ├── services/               # Firebase services
│   │   │   └── firebase.js
│   │   ├── utils/                  # Utility functions
│   │   │   └── dateUtils.js
│   │   ├── App.js                  # Main app with routes
│   │   ├── index.css               # Global styles & design system
│   │   └── index.js                # Entry point
│   ├── .env.example
│   ├── tailwind.config.js
│   └── package.json
│
├── backend/
│   ├── src/main/java/com/backend/backend/
│   │   ├── Controller/
│   │   │   ├── CommentController.java
│   │   │   ├── PostController.java
│   │   │   ├── TopicController.java
│   │   │   └── UserStatusController.java
│   │   ├── Model/
│   │   │   ├── Comment.java
│   │   │   ├── CommentDto.java
│   │   │   ├── Post.java
│   │   │   ├── Topic.java
│   │   │   └── UserStatus.java
│   │   ├── Repository/
│   │   └── Service/
│   ├── src/main/resources/
│   │   └── application.properties
│   └── pom.xml
│
└── README.md
```

## 📱 Pages & Routes

| Page | Route | Description |
|------|-------|-------------|
| Login | `/login` | User authentication with social login |
| Register | `/register` | Multi-step registration form |
| Forgot Password | `/forgot-password` | Password recovery |
| Home | `/home` | Main feed with posts |
| Profile | `/profile` | User profile with tabs |
| Profile (Other) | `/profile/:userId` | View other user's profile |
| Messages | `/messages` | Chat interface |
| Messages (Conv) | `/messages/:conversationId` | Specific conversation |
| Network | `/network` | Connections management |
| Learning Plans | `/learning` | Learning plans list |
| Learning Plan | `/learning/:planId` | Specific learning plan |
| Comments | `/comments/:postId` | Comments for a post |
| Groups | `/groups` | Community groups |
| Events | `/events` | Virtual/in-person events |
| Notifications | `/notifications` | Activity notifications |
| Settings | `/settings` | Account settings |
| Explore | `/explore` | Search & discovery |

## 🔧 API Endpoints

### Posts API
```
GET    /posts              - Get all posts
GET    /posts/:id          - Get single post
POST   /posts              - Create post
PUT    /posts/:id          - Update post
DELETE /posts/:id          - Delete post
```

### Comments API
```
POST   /api/v1/comments/add                 - Add comment
GET    /api/v1/comments/getAllComments/:id  - Get comments by post
PUT    /api/v1/comments/update              - Update comment
DELETE /api/v1/comments/delete/:id          - Delete comment
```

### User Status API
```
GET    /api/v1/user-status/all        - Get all statuses
GET    /api/v1/user-status/:id        - Get status by ID
POST   /api/v1/user-status/add        - Create status
PUT    /api/v1/user-status/update/:id - Update status
DELETE /api/v1/user-status/delete/:id - Delete status
GET    /api/v1/user-status/user/:id   - Get user's statuses
```

### Topics/Learning Plans API
```
GET    /api/v1/topics/all        - Get all topics
GET    /api/v1/topics/:id        - Get topic by ID
POST   /api/v1/topics/add        - Create topic
PUT    /api/v1/topics/update/:id - Update topic
DELETE /api/v1/topics/delete/:id - Delete topic
GET    /api/v1/topics/user/:id   - Get user's topics
```

## 🎨 Design System

### Color Palette

| Color | Light Mode | Dark Mode | Usage |
|-------|------------|-----------|-------|
| Brand Primary | `#3B82F6` | `#60A5FA` | Primary actions, links |
| Brand Secondary | `#8B5CF6` | `#A78BFA` | Gradients, accents |
| Background | `#F9FAFB` | `#111827` | Page background |
| Surface | `#FFFFFF` | `#1F2937` | Cards, modals |
| Text Primary | `#111827` | `#F9FAFB` | Headings, body text |

### Typography

- **Font Family**: Inter (Google Fonts)
- **Headings**: 700 weight (Bold)
- **Body**: 400 weight (Regular)
- **Labels**: 500 weight (Medium)

## 🔧 Available Scripts

### Frontend

```bash
npm start          # Start development server
npm run build      # Build for production
npm test           # Run tests
```

### Backend

```bash
./mvnw spring-boot:run    # Run the application
./mvnw clean package      # Build JAR file
./mvnw test               # Run tests
```

## 🤝 Contributors

1. Chathuranga D.S.I. - IT22069054
2. Karunarathne D.T.S. - IT21313684
3. Nawarathne N.S.N. - IT21307126
4. Yapa K.G.D.C. - IT22315182

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - UI Library
- [Firebase](https://firebase.google.com/) - Backend as a Service
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [Lucide Icons](https://lucide.dev/) - Beautiful icons
- [Inter Font](https://rsms.me/inter/) - Typography

---

<div align="center">
  <p>Built with ❤️ by the SkillSphere Team</p>
  <p>
    <a href="#top">Back to top ↑</a>
  </p>
</div>
