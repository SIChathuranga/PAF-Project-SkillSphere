# SkillSphere Deployment Guide

This guide provides comprehensive instructions for deploying the SkillSphere application:

- **Frontend (React)**: Vercel
- **Backend (Spring Boot)**: Render
- **Database**: Firebase Firestore
- **Authentication**: Firebase Auth

---

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Prerequisites](#prerequisites)
3. [Firebase Project Setup](#firebase-project-setup)
4. [Backend Deployment (Render)](#backend-deployment-render)
5. [Frontend Deployment (Vercel)](#frontend-deployment-vercel)
6. [Environment Variables Reference](#environment-variables-reference)
7. [Post-Deployment Configuration](#post-deployment-configuration)
8. [Troubleshooting](#troubleshooting)

---

## Architecture Overview

```
┌─────────────────┐      ┌─────────────────┐      ┌─────────────────────────┐
│                 │      │                 │      │        Firebase         │
│   React App     │─────▶│  Spring Boot    │─────▶│  ┌─────────────────┐   │
│   (Vercel)      │ API  │  Backend        │      │  │ Firestore       │   │
│                 │      │  (Render)       │      │  │ (Database)      │   │
└────────┬────────┘      └─────────────────┘      │  └─────────────────┘   │
         │                                        │  ┌─────────────────┐   │
         │           Firebase Auth                │  │ Authentication  │   │
         └───────────────────────────────────────▶│  │ (Auth)          │   │
                                                  │  └─────────────────┘   │
                                                  └─────────────────────────┘
```

**Components:**

- **React Frontend (Vercel)**: User interface, handles Firebase Authentication directly
- **Spring Boot Backend (Render)**: REST API, business logic, connects to Firestore via Firebase Admin SDK
- **Firebase Firestore**: NoSQL database for storing posts, comments, topics, user statuses
- **Firebase Auth**: User authentication (Email/Password, Google, Facebook)

---

## Prerequisites

Before starting the deployment, ensure you have:

- [ ] GitHub account with the repository pushed
- [ ] Google account (for Firebase)
- [ ] Vercel account (free tier at [vercel.com](https://vercel.com))
- [ ] Render account (free tier at [render.com](https://render.com))
- [ ] Node.js 18+ installed locally
- [ ] Java 21 installed locally (for backend testing)

---

## Firebase Project Setup

### Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click **"Create a project"**
3. Enter project name: `skillsphere`
4. Enable/disable Google Analytics as preferred
5. Click **"Create project"**

### Step 2: Enable Authentication

1. Go to **Build** → **Authentication** → **Get started**
2. Enable sign-in providers:

**Email/Password:**
1. Click **"Email/Password"**
2. Toggle **"Enable"** on
3. Click **"Save"**

**Google Sign-In:**
1. Click **"Google"**
2. Toggle **"Enable"** on
3. Add support email
4. Click **"Save"**

### Step 3: Create Firestore Database

1. Go to **Build** → **Firestore Database**
2. Click **"Create database"**
3. Choose **"Start in production mode"**
4. Select a location closest to your users
5. Click **"Enable"**

### Step 4: Get Firebase Web Config (for Frontend)

1. Go to **Project Settings** (gear icon)
2. Scroll to **"Your apps"**
3. Click the **"</>"** (Web) icon
4. Register app with nickname: `skillsphere-web`
5. Copy the configuration:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "skillsphere-xxxxx.firebaseapp.com",
  projectId: "skillsphere-xxxxx",
  storageBucket: "skillsphere-xxxxx.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef..."
};
```

### Step 5: Generate Service Account Key (for Backend)

1. Go to **Project Settings** → **Service Accounts**
2. Click **"Generate new private key"**
3. Save the JSON file securely (you'll need its contents for Render)

**⚠️ IMPORTANT: Never commit this file to version control!**

---

## Backend Deployment (Render)

### Step 1: Prepare Service Account JSON

Open the downloaded service account JSON file and copy its entire contents. You'll paste this as an environment variable.

### Step 2: Create a New Web Service on Render

1. Log in to [Render Dashboard](https://dashboard.render.com)
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository

### Step 3: Configure the Service

| Setting | Value |
| ------- | ----- |
| **Name** | `skillsphere-backend` |
| **Region** | Choose closest to your users |
| **Branch** | `main` |
| **Root Directory** | `backend` |
| **Runtime** | `Java` |
| **Build Command** | `./mvnw clean install -DskipTests` |
| **Start Command** | `java -jar target/*.jar` |
| **Instance Type** | `Free` (or as needed) |

### Step 4: Configure Environment Variables

Add the following environment variables:

| Key | Value |
| --- | ----- |
| `FIREBASE_PROJECT_ID` | Your Firebase project ID (e.g., `skillsphere-xxxxx`) |
| `FIREBASE_CREDENTIALS_JSON` | Entire contents of service account JSON (paste the full JSON) |
| `CORS_ALLOWED_ORIGINS` | Your Vercel frontend URL (e.g., `https://skillsphere.vercel.app`) |
| `PORT` | `8080` (Render sets this automatically) |

### Step 5: Deploy

1. Click **"Create Web Service"**
2. Wait for the build to complete (~5-10 minutes)
3. Note your backend URL (e.g., `https://skillsphere-backend.onrender.com`)

### Step 6: Verify Backend Deployment

Test the health endpoint:
```bash
curl https://skillsphere-backend.onrender.com/actuator/health
```

Expected response:
```json
{"status":"UP"}
```

---

## Frontend Deployment (Vercel)

### Step 1: Create a New Project on Vercel

1. Log in to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New..."** → **"Project"**
3. Import your GitHub repository

### Step 2: Configure the Project

| Setting | Value |
| ------- | ----- |
| **Project Name** | `skillsphere` |
| **Framework Preset** | `Create React App` |
| **Root Directory** | `frontend` |
| **Build Command** | `npm run build` |
| **Output Directory** | `build` |

### Step 3: Configure Environment Variables

Add the following environment variables:

| Key | Value |
| --- | ----- |
| `REACT_APP_FIREBASE_API_KEY` | Your Firebase API key |
| `REACT_APP_FIREBASE_AUTH_DOMAIN` | `skillsphere-xxxxx.firebaseapp.com` |
| `REACT_APP_FIREBASE_PROJECT_ID` | `skillsphere-xxxxx` |
| `REACT_APP_FIREBASE_STORAGE_BUCKET` | `skillsphere-xxxxx.appspot.com` |
| `REACT_APP_FIREBASE_MESSAGING_SENDER_ID` | Your messaging sender ID |
| `REACT_APP_FIREBASE_APP_ID` | Your Firebase app ID |
| `REACT_APP_API_URL` | Your Render backend URL (e.g., `https://skillsphere-backend.onrender.com`) |

### Step 4: Deploy

1. Click **"Deploy"**
2. Wait for the build to complete (~2-3 minutes)
3. Note your frontend URL (e.g., `https://skillsphere.vercel.app`)

---

## Environment Variables Reference

### Backend (Render)

| Variable | Required | Description |
| -------- | -------- | ----------- |
| `FIREBASE_PROJECT_ID` | Yes | Firebase project ID |
| `FIREBASE_CREDENTIALS_JSON` | Yes | Service account JSON content |
| `CORS_ALLOWED_ORIGINS` | Yes | Frontend URL(s), comma-separated |
| `PORT` | Auto | Set automatically by Render |

### Frontend (Vercel)

| Variable | Required | Description |
| -------- | -------- | ----------- |
| `REACT_APP_FIREBASE_API_KEY` | Yes | Firebase API key |
| `REACT_APP_FIREBASE_AUTH_DOMAIN` | Yes | Firebase auth domain |
| `REACT_APP_FIREBASE_PROJECT_ID` | Yes | Firebase project ID |
| `REACT_APP_FIREBASE_STORAGE_BUCKET` | Yes | Firebase storage bucket |
| `REACT_APP_FIREBASE_MESSAGING_SENDER_ID` | Yes | Firebase messaging sender ID |
| `REACT_APP_FIREBASE_APP_ID` | Yes | Firebase app ID |
| `REACT_APP_API_URL` | Yes | Backend API URL |

---

## Post-Deployment Configuration

### Step 1: Add Authorized Domains in Firebase

1. Go to Firebase Console → Authentication → Settings → Authorized domains
2. Add your Vercel domain:
   - `skillsphere.vercel.app`
   - `*.vercel.app` (for preview deployments)

### Step 2: Update CORS on Backend

If you get CORS errors, ensure `CORS_ALLOWED_ORIGINS` includes:
- Your Vercel production URL
- `http://localhost:3000` (for local development)

### Step 3: Deploy Firestore Security Rules

Create or update `firebase/firestore.rules`:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Posts collection
    match /posts/{postId} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null && request.auth.uid == resource.data.userId;
    }
    
    // Comments collection
    match /comments/{commentId} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null && request.auth.uid == resource.data.userId;
    }
    
    // Topics collection
    match /topics/{topicId} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null && request.auth.uid == resource.data.userId;
    }
    
    // User Statuses collection
    match /userStatuses/{statusId} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null && request.auth.uid == resource.data.userId;
    }
  }
}
```

Deploy with Firebase CLI:
```bash
firebase deploy --only firestore:rules
```

---

## Troubleshooting

### Backend Issues

#### Error: "Failed to initialize Firebase"

**Cause**: Invalid or missing Firebase credentials

**Solution**:
1. Verify `FIREBASE_CREDENTIALS_JSON` contains valid JSON
2. Ensure the JSON is the complete service account key
3. Check there are no extra spaces or line breaks

#### Error: "CORS policy blocked"

**Cause**: Frontend domain not in allowed origins

**Solution**:
1. Update `CORS_ALLOWED_ORIGINS` to include your frontend URL
2. Redeploy the backend

#### Backend is slow or sleeping

**Cause**: Render free tier instances sleep after inactivity

**Solution**:
- Upgrade to paid tier, OR
- Use a service like UptimeRobot to ping the health endpoint

### Frontend Issues

#### Error: "Firebase: Error (auth/unauthorized-domain)"

**Cause**: Vercel domain not authorized in Firebase

**Solution**:
1. Go to Firebase Console → Authentication → Settings → Authorized domains
2. Add your Vercel domain

#### API calls return "Failed to fetch"

**Cause**: Backend URL incorrect or backend is down

**Solution**:
1. Verify `REACT_APP_API_URL` is correct
2. Check if backend is running: `curl <backend-url>/actuator/health`
3. Check browser console for specific errors

### Firebase Issues

#### Error: "Missing or insufficient permissions"

**Cause**: Firestore rules blocking access

**Solution**:
1. Check Firestore rules allow the operation
2. For backend operations, ensure service account has proper permissions

---

## Local Development

### Running Backend Locally

1. Create `.env` file in `backend/` folder:
```bash
cd backend
cp .env.example .env
```

2. Download service account key and save as `serviceAccountKey.json` in backend folder

3. Update `.env`:
```env
FIREBASE_CREDENTIALS_PATH=./serviceAccountKey.json
FIREBASE_PROJECT_ID=your-project-id
CORS_ALLOWED_ORIGINS=http://localhost:3000
```

4. Run:
```bash
./mvnw spring-boot:run
```

### Running Frontend Locally

1. Create `.env` file in `frontend/` folder:
```bash
cd frontend
cp .env.example .env
```

2. Fill in Firebase config and set API URL:
```env
REACT_APP_API_URL=http://localhost:8080
```

3. Run:
```bash
npm install
npm start
```

---

## Production URLs

After deployment:
- **Frontend**: `https://your-project.vercel.app`
- **Backend**: `https://your-project-backend.onrender.com`
- **Firebase Console**: `https://console.firebase.google.com/project/your-project-id`

---

## Security Checklist

Before going live:

- [ ] Service account key is NOT committed to version control
- [ ] Firebase security rules are deployed
- [ ] Authorized domains configured in Firebase
- [ ] CORS configured correctly on backend
- [ ] All environment variables set in Vercel and Render
- [ ] Test all CRUD operations
- [ ] Test authentication flows

---

**Last Updated**: February 2026
