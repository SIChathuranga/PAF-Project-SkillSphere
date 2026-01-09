import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AtSignIcon, ArrowLeftIcon, CheckCircleIcon } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Button, Input, Card } from '../components/ui';
import ThemeToggle from '../components/common/ThemeToggle';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const { resetPassword } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!email) {
            setError('Please enter your email address');
            return;
        }

        try {
            setLoading(true);
            await resetPassword(email);
            setSuccess(true);
        } catch (err) {
            console.error('Password reset error:', err);
            setError(
                err.code === 'auth/user-not-found' ? 'No account found with this email' :
                    err.code === 'auth/invalid-email' ? 'Invalid email address' :
                        'Failed to send reset email. Please try again.'
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-secondary p-6">
            {/* Theme Toggle */}
            <div className="fixed top-4 right-4 z-50">
                <ThemeToggle />
            </div>

            <div className="w-full max-w-md animate-slide-up">
                {/* Logo */}
                <div className="text-center mb-10">
                    <div className="flex items-center justify-center mb-4">
                        <div className="w-14 h-14 rounded-2xl gradient-bg flex items-center justify-center shadow-lg">
                            <svg viewBox="0 0 24 24" width="32" height="32" stroke="white" strokeWidth="2" fill="none">
                                <circle cx="12" cy="12" r="10"></circle>
                                <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                                <line x1="9" y1="9" x2="9.01" y2="9"></line>
                                <line x1="15" y1="9" x2="15.01" y2="9"></line>
                            </svg>
                        </div>
                    </div>
                    <h1 className="text-3xl font-bold gradient-text mb-2">SkillSphere</h1>
                </div>

                <Card className="mb-6">
                    {success ? (
                        <div className="text-center py-6 animate-fade-in">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                                <CheckCircleIcon size={32} className="text-green-500" />
                            </div>
                            <h2 className="text-xl font-semibold text-primary mb-2">Check your email</h2>
                            <p className="text-tertiary mb-6">
                                We've sent password reset instructions to<br />
                                <span className="font-medium text-secondary">{email}</span>
                            </p>
                            <Link to="/login">
                                <Button fullWidth>
                                    Back to Sign In
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        <>
                            <div className="text-center mb-6">
                                <h2 className="text-2xl font-bold text-primary">Forgot Password?</h2>
                                <p className="text-tertiary mt-2">
                                    No worries! Enter your email and we'll send you reset instructions.
                                </p>
                            </div>

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

                                    {/* Submit Button */}
                                    <Button
                                        type="submit"
                                        fullWidth
                                        size="lg"
                                        loading={loading}
                                    >
                                        Send Reset Link
                                    </Button>
                                </div>
                            </form>
                        </>
                    )}
                </Card>

                {/* Back to Login */}
                <div className="text-center">
                    <Link
                        to="/login"
                        className="inline-flex items-center gap-2 text-sm text-tertiary hover:text-brand transition-colors"
                    >
                        <ArrowLeftIcon size={16} />
                        Back to Sign In
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
