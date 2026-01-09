import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AtSignIcon, LockIcon } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { Button, Input, Card, Checkbox } from '../components/ui';
import ThemeToggle from '../components/common/ThemeToggle';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { login, loginWithGoogle, loginWithFacebook } = useAuth();
  const { isDark } = useTheme();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      setLoading(true);
      await login(email, password);
      navigate('/home');
    } catch (err) {
      console.error('Login error:', err);
      setError(
        err.code === 'auth/user-not-found' ? 'No account found with this email' :
          err.code === 'auth/wrong-password' ? 'Incorrect password' :
            err.code === 'auth/invalid-email' ? 'Invalid email address' :
              err.code === 'auth/too-many-requests' ? 'Too many attempts. Please try again later.' :
                'Failed to sign in. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      setError('');
      await loginWithGoogle();
      navigate('/home');
    } catch (err) {
      console.error('Google login error:', err);
      setError('Failed to sign in with Google');
    } finally {
      setLoading(false);
    }
  };

  const handleFacebookLogin = async () => {
    try {
      setLoading(true);
      setError('');
      await loginWithFacebook();
      navigate('/home');
    } catch (err) {
      console.error('Facebook login error:', err);
      setError('Failed to sign in with Facebook');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Theme Toggle - Fixed Position */}
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      {/* Left side - Form */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-10 bg-secondary">
        <div className="w-full max-w-md animate-slide-up">
          {/* Logo */}
          <div className="text-center mb-10">
            <div className="flex items-center justify-center mb-4">
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl gradient-bg flex items-center justify-center shadow-lg animate-pulse-glow">
                  <svg
                    viewBox="0 0 24 24"
                    width="32"
                    height="32"
                    stroke="white"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                    <line x1="9" y1="9" x2="9.01" y2="9"></line>
                    <line x1="15" y1="9" x2="15.01" y2="9"></line>
                  </svg>
                </div>
              </div>
            </div>
            <h1 className="text-3xl font-bold gradient-text mb-2">SkillSphere</h1>
            <h2 className="text-2xl font-bold text-primary">Welcome back</h2>
            <p className="text-tertiary mt-2">Sign in to continue your journey</p>
          </div>

          {/* Login Card */}
          <Card className="mb-6">
            <form onSubmit={handleSubmit}>
              <div className="space-y-5">
                {/* Error Message */}
                {error && (
                  <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-sm animate-fade-in">
                    {error}
                  </div>
                )}

                {/* Email Input */}
                <Input
                  type="email"
                  label="Email address"
                  placeholder="name@example.com"
                  icon={<AtSignIcon size={18} />}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

                {/* Password Input */}
                <Input
                  type="password"
                  label="Password"
                  placeholder="Enter your password"
                  icon={<LockIcon size={18} />}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                  <Checkbox
                    label="Remember me"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <Link
                    to="/forgot-password"
                    className="text-sm font-medium text-brand hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  fullWidth
                  size="lg"
                  loading={loading}
                >
                  Sign In
                </Button>

                {/* Divider */}
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-[rgb(var(--color-border))]"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-primary text-tertiary">Or continue with</span>
                  </div>
                </div>

                {/* Social Login Buttons */}
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="secondary"
                    onClick={handleGoogleLogin}
                    disabled={loading}
                    className="justify-center"
                  >
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Google
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={handleFacebookLogin}
                    disabled={loading}
                    className="justify-center"
                  >
                    <svg className="w-5 h-5 mr-2" fill="#1877F2" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    Facebook
                  </Button>
                </div>
              </div>
            </form>
          </Card>

          {/* Sign Up Link */}
          <div className="text-center">
            <p className="text-sm text-tertiary">
              Don't have an account?{' '}
              <Link to="/register" className="font-semibold text-brand hover:underline">
                Create account
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right side - Hero Section */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 gradient-bg"></div>

        {/* Decorative Patterns */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Floating Shapes */}
        <div className="absolute top-20 left-20 w-64 h-64 bg-white/10 rounded-full filter blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/20 rounded-full filter blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center w-full p-12 text-white">
          <div className="max-w-lg text-center">
            {/* Icon */}
            <div className="mb-8 inline-flex">
              <div className="w-20 h-20 rounded-3xl bg-white/10 backdrop-blur-sm flex items-center justify-center animate-float">
                <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>

            {/* Title */}
            <h2 className="text-4xl font-bold mb-6">
              Connect, Learn & Grow Together
            </h2>

            {/* Description */}
            <p className="text-xl text-white/80 mb-10">
              Join thousands of professionals sharing knowledge and building valuable skills on our platform.
            </p>

            {/* Testimonial Card */}
            <div className="glass-card p-6 text-left">
              <p className="text-white/90 italic mb-4">
                "SkillSphere has completely transformed how I learn new skills and connect with experts.
                The community is incredibly supportive!"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                  <span className="text-white font-semibold">SJ</span>
                </div>
                <div className="ml-4">
                  <p className="font-semibold">Sarah Johnson</p>
                  <p className="text-sm text-white/70">Senior UX Designer at Google</p>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-10">
              <div>
                <p className="text-3xl font-bold">50K+</p>
                <p className="text-sm text-white/70">Active Users</p>
              </div>
              <div>
                <p className="text-3xl font-bold">1M+</p>
                <p className="text-sm text-white/70">Skills Shared</p>
              </div>
              <div>
                <p className="text-3xl font-bold">500+</p>
                <p className="text-sm text-white/70">Communities</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
