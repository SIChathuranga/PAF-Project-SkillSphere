import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  UserIcon,
  AtSignIcon,
  LockIcon,
  CameraIcon,
  BriefcaseIcon,
  TagIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckIcon,
  XIcon
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Button, Input, Card, Checkbox } from '../components/ui';
import ThemeToggle from '../components/common/ThemeToggle';

const Register = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Form data
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    headline: '',
    bio: '',
    expertise: [],
    skills: [],
    agreeToTerms: false
  });

  const { signup, loginWithGoogle, loginWithFacebook } = useAuth();
  const navigate = useNavigate();

  const totalSteps = 3;

  const popularSkills = [
    'JavaScript', 'React', 'Python', 'UI/UX Design', 'Data Science',
    'Machine Learning', 'Node.js', 'TypeScript', 'AWS', 'Docker',
    'Project Management', 'Digital Marketing', 'Graphic Design', 'Mobile Development'
  ];

  const expertiseAreas = [
    'Web Development', 'Mobile Development', 'Data Science', 'AI/ML',
    'Cloud Computing', 'DevOps', 'UI/UX Design', 'Cybersecurity',
    'Product Management', 'Digital Marketing', 'Content Creation'
  ];

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError('');
  };

  const validateStep = (currentStep) => {
    switch (currentStep) {
      case 1:
        if (!formData.firstName.trim()) return 'First name is required';
        if (!formData.lastName.trim()) return 'Last name is required';
        if (!formData.email.trim()) return 'Email is required';
        if (!formData.password) return 'Password is required';
        if (formData.password.length < 8) return 'Password must be at least 8 characters';
        if (formData.password !== formData.confirmPassword) return 'Passwords do not match';
        return null;
      case 2:
        if (!formData.headline.trim()) return 'Professional headline is required';
        return null;
      case 3:
        if (formData.skills.length === 0) return 'Please select at least one skill';
        if (!formData.agreeToTerms) return 'You must agree to the terms and conditions';
        return null;
      default:
        return null;
    }
  };

  const goToNextStep = () => {
    const validationError = validateStep(step);
    if (validationError) {
      setError(validationError);
      return;
    }
    if (step < totalSteps) {
      setStep(step + 1);
      setError('');
    }
  };

  const goToPrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
      setError('');
    }
  };

  const toggleSkill = (skill) => {
    const skills = formData.skills.includes(skill)
      ? formData.skills.filter(s => s !== skill)
      : [...formData.skills, skill];
    updateFormData('skills', skills);
  };

  const toggleExpertise = (area) => {
    const expertise = formData.expertise.includes(area)
      ? formData.expertise.filter(e => e !== area)
      : [...formData.expertise, area];
    updateFormData('expertise', expertise);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateStep(step);
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);
      await signup(formData.email, formData.password, {
        displayName: `${formData.firstName} ${formData.lastName}`,
        headline: formData.headline,
        bio: formData.bio,
        skills: formData.skills,
        expertise: formData.expertise
      });
      navigate('/home');
    } catch (err) {
      console.error('Registration error:', err);
      setError(
        err.code === 'auth/email-already-in-use' ? 'Email is already registered' :
          err.code === 'auth/weak-password' ? 'Password is too weak' :
            'Failed to create account. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSocialSignup = async (provider) => {
    try {
      setLoading(true);
      if (provider === 'google') {
        await loginWithGoogle();
      } else {
        await loginWithFacebook();
      }
      navigate('/home');
    } catch (err) {
      setError(`Failed to sign up with ${provider}`);
    } finally {
      setLoading(false);
    }
  };

  // Password strength indicator
  const getPasswordStrength = () => {
    const password = formData.password;
    if (!password) return { strength: 0, label: '', color: '' };

    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    const levels = [
      { label: 'Very Weak', color: 'bg-red-500' },
      { label: 'Weak', color: 'bg-orange-500' },
      { label: 'Fair', color: 'bg-yellow-500' },
      { label: 'Good', color: 'bg-blue-500' },
      { label: 'Strong', color: 'bg-green-500' }
    ];

    return { strength, ...levels[Math.min(strength, 4)] };
  };

  const passwordStrength = getPasswordStrength();

  return (
    <div className="min-h-screen flex">
      {/* Theme Toggle */}
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      {/* Left side - Form */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-10 bg-secondary overflow-y-auto">
        <div className="w-full max-w-md py-8 animate-slide-up">
          {/* Logo */}
          <div className="text-center mb-8">
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
            <h1 className="text-3xl font-bold gradient-text mb-2">Join SkillSphere</h1>
            <p className="text-tertiary">Create your account and start your journey</p>
          </div>

          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between relative">
              {/* Progress Line */}
              <div className="absolute top-4 left-0 right-0 h-0.5 bg-tertiary">
                <div
                  className="h-full gradient-bg transition-all duration-500"
                  style={{ width: `${((step - 1) / (totalSteps - 1)) * 100}%` }}
                ></div>
              </div>

              {[
                { num: 1, label: 'Account' },
                { num: 2, label: 'Profile' },
                { num: 3, label: 'Skills' }
              ].map((s) => (
                <div key={s.num} className="flex flex-col items-center relative z-10">
                  <div
                    className={`
                      w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm
                      transition-all duration-300 
                      ${s.num < step
                        ? 'gradient-bg text-white shadow-lg'
                        : s.num === step
                          ? 'gradient-bg text-white shadow-lg ring-4 ring-blue-500/20'
                          : 'bg-tertiary text-muted'
                      }
                    `}
                  >
                    {s.num < step ? <CheckIcon size={16} /> : s.num}
                  </div>
                  <span className={`text-xs mt-2 font-medium ${s.num <= step ? 'text-brand' : 'text-muted'}`}>
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Registration Card */}
          <Card className="mb-6">
            <form onSubmit={handleSubmit}>
              {/* Error Message */}
              {error && (
                <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-sm animate-fade-in">
                  {error}
                </div>
              )}

              {/* Step 1: Account Details */}
              {step === 1 && (
                <div className="space-y-4 animate-fade-in">
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="First Name"
                      placeholder="John"
                      icon={<UserIcon size={18} />}
                      value={formData.firstName}
                      onChange={(e) => updateFormData('firstName', e.target.value)}
                      required
                    />
                    <Input
                      label="Last Name"
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={(e) => updateFormData('lastName', e.target.value)}
                      required
                    />
                  </div>

                  <Input
                    type="email"
                    label="Email Address"
                    placeholder="name@example.com"
                    icon={<AtSignIcon size={18} />}
                    value={formData.email}
                    onChange={(e) => updateFormData('email', e.target.value)}
                    required
                  />

                  <div>
                    <Input
                      type="password"
                      label="Password"
                      placeholder="Create a strong password"
                      icon={<LockIcon size={18} />}
                      value={formData.password}
                      onChange={(e) => updateFormData('password', e.target.value)}
                      required
                    />
                    {formData.password && (
                      <div className="mt-2">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-1.5 bg-tertiary rounded-full overflow-hidden">
                            <div
                              className={`h-full ${passwordStrength.color} transition-all duration-300`}
                              style={{ width: `${(passwordStrength.strength / 5) * 100}%` }}
                            ></div>
                          </div>
                          <span className={`text-xs font-medium ${passwordStrength.color.replace('bg-', 'text-')}`}>
                            {passwordStrength.label}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  <Input
                    type="password"
                    label="Confirm Password"
                    placeholder="Confirm your password"
                    icon={<LockIcon size={18} />}
                    value={formData.confirmPassword}
                    onChange={(e) => updateFormData('confirmPassword', e.target.value)}
                    required
                    error={formData.confirmPassword && formData.password !== formData.confirmPassword ? 'Passwords do not match' : ''}
                  />

                  {/* Social Signup */}
                  <div className="relative my-4">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-[rgb(var(--color-border))]"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-4 bg-primary text-tertiary">Or sign up with</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() => handleSocialSignup('google')}
                      className="justify-center"
                    >
                      <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                      </svg>
                      Google
                    </Button>
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() => handleSocialSignup('facebook')}
                      className="justify-center"
                    >
                      <svg className="w-5 h-5 mr-2" fill="#1877F2" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                      Facebook
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 2: Profile Setup */}
              {step === 2 && (
                <div className="space-y-5 animate-fade-in">
                  {/* Profile Photo Upload */}
                  <div className="flex flex-col items-center mb-4">
                    <div className="relative">
                      <div className="w-24 h-24 rounded-full bg-tertiary flex items-center justify-center overflow-hidden">
                        <UserIcon size={40} className="text-muted" />
                      </div>
                      <button
                        type="button"
                        className="absolute bottom-0 right-0 p-2 rounded-full gradient-bg text-white shadow-lg hover:scale-110 transition-transform"
                      >
                        <CameraIcon size={16} />
                      </button>
                    </div>
                    <p className="text-sm text-tertiary mt-3">Add a profile photo</p>
                  </div>

                  <Input
                    label="Professional Headline"
                    placeholder="e.g., Full Stack Developer at Tech Corp"
                    icon={<BriefcaseIcon size={18} />}
                    value={formData.headline}
                    onChange={(e) => updateFormData('headline', e.target.value)}
                    required
                  />

                  <div>
                    <label className="label">Bio</label>
                    <textarea
                      rows={3}
                      placeholder="Tell us about yourself, your experience, and what you're passionate about..."
                      className="input resize-none"
                      value={formData.bio}
                      onChange={(e) => updateFormData('bio', e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="label">Areas of Expertise</label>
                    <div className="flex flex-wrap gap-2">
                      {expertiseAreas.map((area) => (
                        <button
                          key={area}
                          type="button"
                          onClick={() => toggleExpertise(area)}
                          className={`
                            px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200
                            ${formData.expertise.includes(area)
                              ? 'gradient-bg text-white shadow-md'
                              : 'bg-tertiary text-secondary hover:bg-hover'
                            }
                          `}
                        >
                          {formData.expertise.includes(area) && (
                            <CheckIcon size={14} className="inline mr-1" />
                          )}
                          {area}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Skills Selection */}
              {step === 3 && (
                <div className="space-y-5 animate-fade-in">
                  <div>
                    <label className="label">Select Your Skills</label>
                    <Input
                      placeholder="Search for skills..."
                      icon={<TagIcon size={18} />}
                    />
                  </div>

                  <div>
                    <p className="text-sm font-medium text-secondary mb-3">Popular Skills</p>
                    <div className="flex flex-wrap gap-2">
                      {popularSkills.map((skill) => (
                        <button
                          key={skill}
                          type="button"
                          onClick={() => toggleSkill(skill)}
                          className={`
                            px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200
                            ${formData.skills.includes(skill)
                              ? 'gradient-bg text-white shadow-md'
                              : 'border border-[rgb(var(--color-border))] text-secondary hover:border-brand hover:text-brand'
                            }
                          `}
                        >
                          {formData.skills.includes(skill) ? (
                            <XIcon size={14} className="inline mr-1" />
                          ) : (
                            <span className="mr-1">+</span>
                          )}
                          {skill}
                        </button>
                      ))}
                    </div>
                  </div>

                  {formData.skills.length > 0 && (
                    <div>
                      <p className="text-sm font-medium text-secondary mb-3">
                        Your Selected Skills ({formData.skills.length})
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {formData.skills.map((skill) => (
                          <span
                            key={skill}
                            className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium gradient-bg text-white"
                          >
                            {skill}
                            <button
                              type="button"
                              onClick={() => toggleSkill(skill)}
                              className="ml-2 hover:bg-white/20 rounded-full p-0.5 transition-colors"
                            >
                              <XIcon size={12} />
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <Checkbox
                    label={
                      <span>
                        I agree to the{' '}
                        <a href="#" className="text-brand hover:underline">Terms of Service</a>
                        {' '}and{' '}
                        <a href="#" className="text-brand hover:underline">Privacy Policy</a>
                      </span>
                    }
                    checked={formData.agreeToTerms}
                    onChange={(e) => updateFormData('agreeToTerms', e.target.checked)}
                  />
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-6">
                {step > 1 ? (
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={goToPrevStep}
                    icon={<ArrowLeftIcon size={16} />}
                  >
                    Back
                  </Button>
                ) : (
                  <div></div>
                )}

                {step < totalSteps ? (
                  <Button
                    type="button"
                    onClick={goToNextStep}
                    icon={<ArrowRightIcon size={16} />}
                    iconPosition="right"
                  >
                    Continue
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    loading={loading}
                  >
                    Create Account
                  </Button>
                )}
              </div>
            </form>
          </Card>

          {/* Sign In Link */}
          <div className="text-center">
            <p className="text-sm text-tertiary">
              Already have an account?{' '}
              <Link to="/login" className="font-semibold text-brand hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right side - Hero */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 gradient-bg-secondary"></div>

        {/* Animated Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-white/20"
                style={{
                  width: `${Math.random() * 200 + 100}px`,
                  height: `${Math.random() * 200 + 100}px`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animation: `float ${Math.random() * 5 + 5}s ease-in-out infinite`,
                  animationDelay: `${Math.random() * 2}s`
                }}
              ></div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center w-full p-12 text-white">
          <div className="max-w-lg">
            <h2 className="text-4xl font-bold mb-6">
              Start Your Professional Journey
            </h2>
            <p className="text-xl text-white/80 mb-10">
              Join our community of professionals sharing knowledge and building valuable skills.
            </p>

            <div className="space-y-6">
              {[
                { icon: '🎯', title: 'Showcase Your Skills', desc: 'Build a professional profile that highlights your expertise' },
                { icon: '🤝', title: 'Connect & Network', desc: 'Meet like-minded professionals and industry experts' },
                { icon: '📚', title: 'Learn & Grow', desc: 'Access learning resources and track your progress' }
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 glass-card p-4">
                  <div className="text-3xl">{item.icon}</div>
                  <div>
                    <h3 className="font-semibold text-lg">{item.title}</h3>
                    <p className="text-white/70 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
