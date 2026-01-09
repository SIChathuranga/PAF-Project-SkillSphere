import React, { useState } from 'react';
import {
    BookOpenIcon,
    PlusIcon,
    PlayIcon,
    CheckCircleIcon,
    ClockIcon,
    TrendingUpIcon,
    AwardIcon,
    TargetIcon,
    CalendarIcon
} from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Sidebar from '../components/layout/Sidebar';
import { Card, Avatar, Badge, Button } from '../components/ui';

const LearningPlans = () => {
    const [activeTab, setActiveTab] = useState('in-progress');

    const tabs = [
        { id: 'in-progress', label: 'In Progress', count: 3 },
        { id: 'completed', label: 'Completed', count: 8 },
        { id: 'saved', label: 'Saved', count: 5 },
        { id: 'explore', label: 'Explore', count: null }
    ];

    const learningPlans = [
        {
            id: 1,
            title: 'Master React & TypeScript',
            description: 'Complete guide to building modern web apps with React and TypeScript',
            progress: 65,
            totalLessons: 24,
            completedLessons: 16,
            duration: '12 hours',
            level: 'Intermediate',
            skills: ['React', 'TypeScript', 'Redux'],
            author: { name: 'Alex Morgan', avatar: null },
            lastAccessed: '2 hours ago'
        },
        {
            id: 2,
            title: 'UI/UX Design Fundamentals',
            description: 'Learn the principles of great user interface and experience design',
            progress: 40,
            totalLessons: 18,
            completedLessons: 7,
            duration: '8 hours',
            level: 'Beginner',
            skills: ['UI Design', 'UX Research', 'Figma'],
            author: { name: 'Sarah Chen', avatar: null },
            lastAccessed: '1 day ago'
        },
        {
            id: 3,
            title: 'Machine Learning Basics',
            description: 'Introduction to ML concepts and practical implementations',
            progress: 20,
            totalLessons: 30,
            completedLessons: 6,
            duration: '16 hours',
            level: 'Beginner',
            skills: ['Python', 'TensorFlow', 'Data Science'],
            author: { name: 'David Kim', avatar: null },
            lastAccessed: '3 days ago'
        }
    ];

    const explorePlans = [
        {
            id: 4,
            title: 'Advanced Node.js Development',
            description: 'Build scalable backend systems with Node.js',
            totalLessons: 28,
            duration: '14 hours',
            level: 'Advanced',
            skills: ['Node.js', 'Express', 'MongoDB'],
            author: { name: 'Michael Brown', avatar: null },
            enrolled: 1234
        },
        {
            id: 5,
            title: 'AWS Cloud Practitioner',
            description: 'Prepare for AWS certification with hands-on labs',
            totalLessons: 35,
            duration: '20 hours',
            level: 'Intermediate',
            skills: ['AWS', 'Cloud', 'DevOps'],
            author: { name: 'Emily Davis', avatar: null },
            enrolled: 2567
        },
        {
            id: 6,
            title: 'Mobile App Development with Flutter',
            description: 'Create beautiful cross-platform mobile apps',
            totalLessons: 32,
            duration: '18 hours',
            level: 'Intermediate',
            skills: ['Flutter', 'Dart', 'Mobile'],
            author: { name: 'John Smith', avatar: null },
            enrolled: 890
        }
    ];

    return (
        <div className="min-h-screen bg-secondary">
            <Navbar />
            <Sidebar />

            <div className="md:pl-64 pt-16">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h1 className="text-2xl font-bold text-primary flex items-center gap-2">
                                <BookOpenIcon size={28} className="text-brand" />
                                Learning Plans
                            </h1>
                            <p className="text-tertiary mt-1">Track your learning journey and skill development</p>
                        </div>
                        <Button icon={<PlusIcon size={16} />}>
                            Create Plan
                        </Button>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        <Card className="p-4 flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center flex-shrink-0">
                                <TrendingUpIcon size={24} className="text-white" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-primary">12</p>
                                <p className="text-sm text-tertiary">Hours this week</p>
                            </div>
                        </Card>
                        <Card className="p-4 flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-green-500 flex items-center justify-center flex-shrink-0">
                                <CheckCircleIcon size={24} className="text-white" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-primary">29</p>
                                <p className="text-sm text-tertiary">Lessons completed</p>
                            </div>
                        </Card>
                        <Card className="p-4 flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-purple-500 flex items-center justify-center flex-shrink-0">
                                <AwardIcon size={24} className="text-white" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-primary">8</p>
                                <p className="text-sm text-tertiary">Certificates earned</p>
                            </div>
                        </Card>
                        <Card className="p-4 flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-orange-500 flex items-center justify-center flex-shrink-0">
                                <TargetIcon size={24} className="text-white" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-primary">7</p>
                                <p className="text-sm text-tertiary">Day streak 🔥</p>
                            </div>
                        </Card>
                    </div>

                    {/* Tabs */}
                    <div className="flex gap-1 p-1 bg-tertiary rounded-xl mb-6 overflow-x-auto">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${activeTab === tab.id
                                        ? 'gradient-bg text-white shadow-lg'
                                        : 'text-secondary hover:text-primary hover:bg-primary'
                                    }`}
                            >
                                {tab.label}
                                {tab.count && (
                                    <Badge variant={activeTab === tab.id ? 'neutral' : 'primary'} size="sm"
                                        className={activeTab === tab.id ? 'bg-white/20 text-white' : ''}
                                    >
                                        {tab.count}
                                    </Badge>
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Content */}
                    {(activeTab === 'in-progress' || activeTab === 'completed' || activeTab === 'saved') && (
                        <div className="space-y-4">
                            {learningPlans.map(plan => (
                                <Card key={plan.id} className="p-6 hover-lift">
                                    <div className="flex flex-col md:flex-row gap-6">
                                        {/* Thumbnail */}
                                        <div className="w-full md:w-48 h-32 rounded-xl gradient-bg flex items-center justify-center flex-shrink-0">
                                            <BookOpenIcon size={48} className="text-white/50" />
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1">
                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <h3 className="text-lg font-semibold text-primary">{plan.title}</h3>
                                                    <p className="text-sm text-tertiary mt-1">{plan.description}</p>
                                                </div>
                                                <Badge variant={
                                                    plan.level === 'Beginner' ? 'success' :
                                                        plan.level === 'Intermediate' ? 'warning' : 'error'
                                                }>
                                                    {plan.level}
                                                </Badge>
                                            </div>

                                            {/* Skills */}
                                            <div className="flex flex-wrap gap-2 mt-3">
                                                {plan.skills.map(skill => (
                                                    <Badge key={skill} variant="secondary" size="sm">{skill}</Badge>
                                                ))}
                                            </div>

                                            {/* Progress */}
                                            <div className="mt-4">
                                                <div className="flex items-center justify-between text-sm mb-2">
                                                    <span className="text-tertiary">
                                                        {plan.completedLessons} of {plan.totalLessons} lessons
                                                    </span>
                                                    <span className="font-medium text-brand">{plan.progress}%</span>
                                                </div>
                                                <div className="h-2 bg-tertiary rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full gradient-bg rounded-full transition-all duration-500"
                                                        style={{ width: `${plan.progress}%` }}
                                                    ></div>
                                                </div>
                                            </div>

                                            {/* Footer */}
                                            <div className="flex items-center justify-between mt-4 pt-4 border-t border-[rgb(var(--color-border))]">
                                                <div className="flex items-center gap-4 text-sm text-tertiary">
                                                    <span className="flex items-center gap-1">
                                                        <ClockIcon size={14} />
                                                        {plan.duration}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <CalendarIcon size={14} />
                                                        {plan.lastAccessed}
                                                    </span>
                                                </div>
                                                <Button icon={<PlayIcon size={16} />}>
                                                    Continue
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    )}

                    {activeTab === 'explore' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {explorePlans.map(plan => (
                                <Card key={plan.id} className="overflow-hidden hover-lift">
                                    {/* Thumbnail */}
                                    <div className="h-40 gradient-bg-secondary flex items-center justify-center">
                                        <BookOpenIcon size={48} className="text-white/50" />
                                    </div>

                                    {/* Content */}
                                    <div className="p-4">
                                        <div className="flex items-start justify-between mb-2">
                                            <Badge variant={
                                                plan.level === 'Beginner' ? 'success' :
                                                    plan.level === 'Intermediate' ? 'warning' : 'error'
                                            } size="sm">
                                                {plan.level}
                                            </Badge>
                                            <span className="text-xs text-muted">{plan.enrolled} enrolled</span>
                                        </div>

                                        <h3 className="font-semibold text-primary">{plan.title}</h3>
                                        <p className="text-sm text-tertiary mt-1 line-clamp-2">{plan.description}</p>

                                        <div className="flex flex-wrap gap-1 mt-3">
                                            {plan.skills.slice(0, 2).map(skill => (
                                                <Badge key={skill} variant="secondary" size="sm">{skill}</Badge>
                                            ))}
                                        </div>

                                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-[rgb(var(--color-border))]">
                                            <div className="flex items-center gap-2">
                                                <Avatar src={plan.author.avatar} name={plan.author.name} size="sm" />
                                                <span className="text-sm text-secondary">{plan.author.name}</span>
                                            </div>
                                            <span className="text-sm text-muted">{plan.duration}</span>
                                        </div>

                                        <Button fullWidth className="mt-4">
                                            Enroll Now
                                        </Button>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LearningPlans;
