import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { UserIcon, AtSignIcon, LockIcon, CameraIcon, BriefcaseIcon, TagIcon, ArrowLeftIcon, ArrowRightIcon, CheckIcon } from 'lucide-react';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const Register = () => {
  const [step, setStep] = useState(1);
  const totalSteps = 3;

  const goToNextStep = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  const goToPrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      {/* Left side - Form */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center mb-2">
              <div className="bg-gradient-to-r from-blue-600 to-blue-400 w-10 h-10 rounded-lg flex items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
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
              <span className="ml-2 text-2xl font-bold text-gray-800">SkillSphere</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Create your account</h1>
            <p className="text-gray-600 mt-2">Join our community of skilled professionals</p>
          </div>
          {/* Progress indicators */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      s < step
                        ? 'bg-green-500 text-white'
                        : s === step
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {s < step ? <CheckIcon size={16} /> : s}
                  </div>
                  <span className="text-xs mt-1 text-gray-500">
                    {s === 1 ? 'Basic Info' : s === 2 ? 'Profile' : 'Skills'}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-2 flex w-full">
              <div className={`h-1 flex-1 ${step > 1 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
              <div className={`h-1 flex-1 ${step > 2 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
            </div>
          </div>
          <Card className="mb-6">
            <form>
              {/* Step 1: Basic Info */}
              {step === 1 && (
                <div className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <Input label="First Name" placeholder="John" icon={<UserIcon size={18} />} required />
                    <Input label="Last Name" placeholder="Doe" required />
                  </div>
                  <Input type="email" label="Email address" placeholder="name@example.com" icon={<AtSignIcon size={18} />} required />
                  <Input type="password" label="Password" placeholder="Create a password" icon={<LockIcon size={18} />} required />
                  <div className="text-xs text-gray-500 -mt-3">
                    <p>Password must contain:</p>
                    <ul className="pl-4 mt-1 space-y-1">
                      <li className="flex items-center">
                        <CheckIcon size={12} className="text-green-500 mr-1" />
                        <span>At least 8 characters</span>
                      </li>
                      <li className="flex items-center">
                        <CheckIcon size={12} className="text-green-500 mr-1" />
                        <span>At least 1 uppercase letter</span>
                      </li>
                      <li className="flex items-center">
                        <CheckIcon size={12} className="text-green-500 mr-1" />
                        <span>At least 1 number</span>
                      </li>
                    </ul>
                  </div>
                  <Input type="password" label="Confirm Password" placeholder="Confirm your password" icon={<LockIcon size={18} />} required />
                  <div className="flex justify-end">
                    <Button onClick={goToNextStep} className="px-6">
                      Next <ArrowRightIcon size={16} className="ml-1" />
                    </Button>
                  </div>
                </div>
              )}
              {/* Step 2: Profile Setup */}
              {step === 2 && (
                <div className="space-y-5">
                  <div className="flex flex-col items-center mb-2">
                    <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center relative mb-4">
                      <UserIcon size={40} className="text-gray-400" />
                      <div className="absolute bottom-0 right-0 bg-blue-600 rounded-full p-1.5 cursor-pointer">
                        <CameraIcon size={14} className="text-white" />
                      </div>
                    </div>
                    <p className="text-sm text-gray-500">Upload a profile picture</p>
                  </div>
                  <Input label="Headline" placeholder="e.g., Software Developer at Tech Company" icon={<BriefcaseIcon size={18} />} required />
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Bio <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Tell us about yourself..."
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    ></textarea>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Areas of Expertise <span className="text-red-500">*</span>
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {['Web Development', 'UX Design', 'Marketing', 'Data Science'].map((area) => (
                        <div key={area} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center">
                          {area}
                          <button className="ml-1.5 text-blue-600 hover:text-blue-800">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M18 6L6 18M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      ))}
                      <button className="border border-dashed border-gray-300 px-3 py-1 rounded-full text-sm text-gray-500 hover:border-gray-400">
                        + Add more
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <Button variant="secondary" onClick={goToPrevStep}>
                      <ArrowLeftIcon size={16} className="mr-1" /> Back
                    </Button>
                    <Button onClick={goToNextStep}>
                      Next <ArrowRightIcon size={16} className="ml-1" />
                    </Button>
                  </div>
                </div>
              )}
              {/* Step 3: Skill Selection */}
              {step === 3 && (
                <div className="space-y-5">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Select your skills <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Input placeholder="Search for skills..." icon={<TagIcon size={18} />} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-700">Popular Skills</p>
                    <div className="flex flex-wrap gap-2">
                      {['JavaScript', 'React', 'UI/UX Design', 'Python', 'Project Management', 'Digital Marketing', 'Data Analysis', 'Communication', 'Leadership', 'Problem Solving'].map((skill) => (
                        <div
                          key={skill}
                          className="border border-gray-300 px-3 py-1 rounded-full text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300 cursor-pointer transition-colors"
                        >
                          + {skill}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-700">Your Selected Skills</p>
                    <div className="flex flex-wrap gap-2">
                      {['React', 'TypeScript', 'UI Design'].map((skill) => (
                        <div key={skill} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center">
                          {skill}
                          <button className="ml-1.5 text-blue-600 hover:text-blue-800">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M18 6L6 18M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-start mt-4">
                    <input
                      id="terms"
                      name="terms"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 mt-1"
                    />
                    <label htmlFor="terms" className="ml-2 block text-sm text-gray-600">
                      I agree to the{' '}
                      <a href="#" className="text-blue-600 hover:text-blue-500">
                        Terms of Service
                      </a>{' '}
                      and{' '}
                      <a href="#" className="text-blue-600 hover:text-blue-500">
                        Privacy Policy
                      </a>
                    </label>
                  </div>
                  <div className="flex justify-between">
                    <Button variant="secondary" onClick={goToPrevStep}>
                      <ArrowLeftIcon size={16} className="mr-1" /> Back
                    </Button>
                    <Button type="submit">Complete Registration</Button>
                  </div>
                </div>
              )}
            </form>
          </Card>
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/" className="font-medium text-blue-600 hover:text-blue-500">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
      {/* Right side - Image and info */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-blue-600 to-blue-400 p-10 items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        <div className="relative z-10 max-w-md text-white">
          <div className="mb-8">
            <svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                stroke="white"
                strokeWidth="2"
              />
              <path d="M15 9L9 15M9 9L15 15" stroke="white" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold mb-6">Join the SkillSphere Community</h2>
          <p className="text-xl mb-8">
            Create your profile, showcase your expertise, and connect with professionals who share your passion for
            learning.
          </p>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="bg-white/10 p-2 rounded-full">
                <CheckIcon size={20} className="text-white" />
              </div>
              <div className="ml-4">
                <h3 className="font-medium text-lg">Share Your Knowledge</h3>
                <p className="text-white/80">
                  Create posts, tutorials, and learning plans to help others grow
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-white/10 p-2 rounded-full">
                <CheckIcon size={20} className="text-white" />
              </div>
              <div className="ml-4">
                <h3 className="font-medium text-lg">Build Your Network</h3>
                <p className="text-white/80">
                  Connect with like-minded professionals and industry experts
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-white/10 p-2 rounded-full">
                <CheckIcon size={20} className="text-white" />
              </div>
              <div className="ml-4">
                <h3 className="font-medium text-lg">Track Your Progress</h3>
                <p className="text-white/80">
                  Organize your learning journey with structured plans and milestones
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
