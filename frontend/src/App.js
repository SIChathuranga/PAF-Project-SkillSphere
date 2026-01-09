import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { Spinner } from './components/ui';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Messages from './pages/Messages';
import Network from './pages/Network';
import LearningPlans from './pages/LearningPlans';
import Settings from './pages/Settings';
import Groups from './pages/Groups';
import Events from './pages/Events';
import Notifications from './pages/Notifications';
import ForgotPassword from './pages/ForgotPassword';
import Explore from './pages/Explore';
import LearningPlanInsider from './pages/LearningPlanInsider';
import Comments from './pages/Comments';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
    const { currentUser, loading } = useAuth();

    if (loading) {
        return <Spinner.Page />;
    }

    if (!currentUser) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

// Public Route Component (redirects to home if logged in)
const PublicRoute = ({ children }) => {
    const { currentUser, loading } = useAuth();

    if (loading) {
        return <Spinner.Page />;
    }

    if (currentUser) {
        return <Navigate to="/home" replace />;
    }

    return children;
};

// App Routes Component
function AppRoutes() {
    return (
        <Routes>
            {/* Public Routes */}
            <Route
                path="/login"
                element={
                    <PublicRoute>
                        <Login />
                    </PublicRoute>
                }
            />
            <Route
                path="/register"
                element={
                    <PublicRoute>
                        <Register />
                    </PublicRoute>
                }
            />
            <Route
                path="/forgot-password"
                element={
                    <PublicRoute>
                        <ForgotPassword />
                    </PublicRoute>
                }
            />

            {/* Protected Routes */}
            <Route
                path="/home"
                element={
                    <ProtectedRoute>
                        <Home />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/profile"
                element={
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/profile/:userId"
                element={
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/messages"
                element={
                    <ProtectedRoute>
                        <Messages />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/messages/:conversationId"
                element={
                    <ProtectedRoute>
                        <Messages />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/network"
                element={
                    <ProtectedRoute>
                        <Network />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/learning"
                element={
                    <ProtectedRoute>
                        <LearningPlans />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/settings"
                element={
                    <ProtectedRoute>
                        <Settings />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/groups"
                element={
                    <ProtectedRoute>
                        <Groups />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/events"
                element={
                    <ProtectedRoute>
                        <Events />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/notifications"
                element={
                    <ProtectedRoute>
                        <Notifications />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/explore"
                element={
                    <ProtectedRoute>
                        <Explore />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/learning/:planId"
                element={
                    <ProtectedRoute>
                        <LearningPlanInsider />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/comments/:postId"
                element={
                    <ProtectedRoute>
                        <Comments />
                    </ProtectedRoute>
                }
            />

            {/* Default routes */}
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
    );
}

// Main App Component
function App() {
    return (
        <ThemeProvider>
            <AuthProvider>
                <Router>
                    <div className="min-h-screen bg-secondary transition-colors duration-300">
                        <AppRoutes />
                    </div>
                </Router>
            </AuthProvider>
        </ThemeProvider>
    );
}

export default App;
