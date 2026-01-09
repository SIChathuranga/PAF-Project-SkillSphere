import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
    MapPinIcon,
    LinkIcon,
    CalendarIcon,
    MailIcon,
    EditIcon,
    MoreHorizontalIcon,
    UsersIcon,
    BookOpenIcon,
    AwardIcon,
    BriefcaseIcon,
    GraduationCapIcon,
    PlusIcon,
    CheckIcon
} from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Sidebar from '../components/layout/Sidebar';
import { Card, Avatar, Badge, Button, Modal } from '../components/ui';
import { useAuth } from '../contexts/AuthContext';

const Profile = () => {
    const { userId } = useParams();
    const { userProfile, currentUser, updateUserProfile } = useAuth();
    const [activeTab, setActiveTab] = useState('posts');
    const [isOwnProfile, setIsOwnProfile] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [isConnected, setIsConnected] = useState(false);

    // Determine if viewing own profile
    useEffect(() => {
        setIsOwnProfile(!userId || userId === currentUser?.uid);
    }, [userId, currentUser]);

    // Sample data - will be replaced with Firebase
    const profileData = isOwnProfile ? userProfile : {
        displayName: 'Sarah Chen',
        headline: 'Senior UX Designer at Google',
        bio: 'Passionate about creating beautiful and intuitive user experiences. 10+ years in the design industry.',
        location: 'San Francisco, CA',
        website: 'sarahchen.design',
        joinDate: 'January 2024',
        skills: ['UI/UX Design', 'Figma', 'User Research', 'Prototyping', 'Design Systems'],
        connections: 1247,
        followers: 5820,
        following: 342
    };

    const tabs = [
        { id: 'posts', label: 'Posts', count: 24 },
        { id: 'about', label: 'About', count: null },
        { id: 'skills', label: 'Skills', count: 12 },
        { id: 'learning', label: 'Learning', count: 5 },
        { id: 'activity', label: 'Activity', count: null }
    ];

    const experience = [
        {
            id: 1,
            title: 'Senior UX Designer',
            company: 'Google',
            location: 'San Francisco, CA',
            duration: 'Jan 2022 - Present',
            description: 'Leading design for Google Cloud products, mentoring junior designers.'
        },
        {
            id: 2,
            title: 'UX Designer',
            company: 'Meta',
            location: 'Menlo Park, CA',
            duration: 'Jun 2019 - Dec 2021',
            description: 'Designed user experiences for Facebook Marketplace.'
        }
    ];

    const education = [
        {
            id: 1,
            school: 'Stanford University',
            degree: 'Master of Science in HCI',
            duration: '2017 - 2019'
        },
        {
            id: 2,
            school: 'UC Berkeley',
            degree: 'Bachelor of Arts in Design',
            duration: '2013 - 2017'
        }
    ];

    const skills = [
        { name: 'UI/UX Design', endorsements: 99, endorsed: true },
        { name: 'Figma', endorsements: 87, endorsed: false },
        { name: 'User Research', endorsements: 76, endorsed: true },
        { name: 'Prototyping', endorsements: 65, endorsed: false },
        { name: 'Design Systems', endorsements: 54, endorsed: true },
        { name: 'Interaction Design', endorsements: 48, endorsed: false }
    ];

    return (
        <div className="min-h-screen bg-secondary">
            <Navbar />
            <Sidebar />

            <div className="md:pl-64 pt-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    {/* Cover Photo */}
                    <Card className="overflow-hidden">
                        <div className="relative h-48 sm:h-64 gradient-bg">
                            {/* Pattern overlay */}
                            <div className="absolute inset-0 opacity-30">
                                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                                    <defs>
                                        <pattern id="dots" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                                            <circle cx="2" cy="2" r="1" fill="white" />
                                        </pattern>
                                    </defs>
                                    <rect width="100%" height="100%" fill="url(#dots)" />
                                </svg>
                            </div>

                            {/* Edit Cover Button */}
                            {isOwnProfile && (
                                <button className="absolute top-4 right-4 p-2 bg-black/30 hover:bg-black/50 rounded-lg text-white transition-colors">
                                    <EditIcon size={18} />
                                </button>
                            )}
                        </div>

                        {/* Profile Info */}
                        <div className="relative px-6 pb-6">
                            {/* Avatar */}
                            <div className="absolute -top-16 left-6">
                                <div className="relative">
                                    <Avatar
                                        src={profileData?.photoURL}
                                        name={profileData?.displayName}
                                        size="2xl"
                                        className="ring-4 ring-[rgb(var(--color-bg-primary))] w-32 h-32"
                                    />
                                    {isOwnProfile && (
                                        <button className="absolute bottom-2 right-2 p-2 gradient-bg rounded-full text-white shadow-lg hover:scale-110 transition-transform">
                                            <EditIcon size={14} />
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex justify-end gap-2 pt-4">
                                {isOwnProfile ? (
                                    <>
                                        <Button variant="secondary" icon={<EditIcon size={16} />}>
                                            Edit Profile
                                        </Button>
                                        <Button variant="ghost">
                                            <MoreHorizontalIcon size={20} />
                                        </Button>
                                    </>
                                ) : (
                                    <>
                                        <Button
                                            variant={isConnected ? 'secondary' : 'primary'}
                                            icon={isConnected ? <CheckIcon size={16} /> : <PlusIcon size={16} />}
                                            onClick={() => setIsConnected(!isConnected)}
                                        >
                                            {isConnected ? 'Connected' : 'Connect'}
                                        </Button>
                                        <Button variant="secondary" icon={<MailIcon size={16} />}>
                                            Message
                                        </Button>
                                        <Button variant="ghost">
                                            <MoreHorizontalIcon size={20} />
                                        </Button>
                                    </>
                                )}
                            </div>

                            {/* Profile Details */}
                            <div className="mt-8 sm:mt-4">
                                <h1 className="text-2xl font-bold text-primary">
                                    {profileData?.displayName || 'User'}
                                </h1>
                                <p className="text-secondary mt-1">
                                    {profileData?.headline || 'Add a professional headline'}
                                </p>

                                <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-tertiary">
                                    <span className="flex items-center gap-1">
                                        <MapPinIcon size={16} />
                                        {profileData?.location || 'Add location'}
                                    </span>
                                    {profileData?.website && (
                                        <a href={`https://${profileData.website}`} className="flex items-center gap-1 text-brand hover:underline">
                                            <LinkIcon size={16} />
                                            {profileData.website}
                                        </a>
                                    )}
                                    <span className="flex items-center gap-1">
                                        <CalendarIcon size={16} />
                                        Joined {profileData?.joinDate || 'Recently'}
                                    </span>
                                </div>

                                {/* Stats */}
                                <div className="flex items-center gap-6 mt-4">
                                    <Link to="/network" className="hover:underline">
                                        <span className="font-semibold text-primary">{profileData?.connections || 0}</span>
                                        <span className="text-tertiary ml-1">connections</span>
                                    </Link>
                                    <button className="hover:underline">
                                        <span className="font-semibold text-primary">{profileData?.followers || 0}</span>
                                        <span className="text-tertiary ml-1">followers</span>
                                    </button>
                                    <button className="hover:underline">
                                        <span className="font-semibold text-primary">{profileData?.following || 0}</span>
                                        <span className="text-tertiary ml-1">following</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Navigation Tabs */}
                    <div className="mt-4 overflow-x-auto">
                        <div className="flex gap-1 p-1 bg-tertiary rounded-xl min-w-max">
                            {tabs.map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`
                    flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all
                    ${activeTab === tab.id
                                            ? 'gradient-bg text-white shadow-lg'
                                            : 'text-secondary hover:text-primary hover:bg-primary'
                                        }
                  `}
                                >
                                    {tab.label}
                                    {tab.count && (
                                        <span className={`text-xs ${activeTab === tab.id ? 'text-white/80' : 'text-muted'}`}>
                                            {tab.count}
                                        </span>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Tab Content */}
                    <div className="mt-4 space-y-4">
                        {activeTab === 'about' && (
                            <>
                                {/* Bio */}
                                <Card className="p-6">
                                    <h2 className="text-lg font-semibold text-primary mb-4">About</h2>
                                    <p className="text-secondary">
                                        {profileData?.bio || 'No bio added yet.'}
                                    </p>
                                </Card>

                                {/* Experience */}
                                <Card className="p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <h2 className="text-lg font-semibold text-primary flex items-center gap-2">
                                            <BriefcaseIcon size={20} className="text-brand" />
                                            Experience
                                        </h2>
                                        {isOwnProfile && (
                                            <Button variant="ghost" size="sm" icon={<PlusIcon size={16} />}>
                                                Add
                                            </Button>
                                        )}
                                    </div>
                                    <div className="space-y-6">
                                        {experience.map(exp => (
                                            <div key={exp.id} className="flex gap-4">
                                                <div className="w-12 h-12 rounded-xl bg-tertiary flex items-center justify-center flex-shrink-0">
                                                    <BriefcaseIcon size={24} className="text-muted" />
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold text-primary">{exp.title}</h3>
                                                    <p className="text-secondary">{exp.company}</p>
                                                    <p className="text-sm text-tertiary">{exp.duration} • {exp.location}</p>
                                                    <p className="text-sm text-secondary mt-2">{exp.description}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </Card>

                                {/* Education */}
                                <Card className="p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <h2 className="text-lg font-semibold text-primary flex items-center gap-2">
                                            <GraduationCapIcon size={20} className="text-purple-500" />
                                            Education
                                        </h2>
                                        {isOwnProfile && (
                                            <Button variant="ghost" size="sm" icon={<PlusIcon size={16} />}>
                                                Add
                                            </Button>
                                        )}
                                    </div>
                                    <div className="space-y-6">
                                        {education.map(edu => (
                                            <div key={edu.id} className="flex gap-4">
                                                <div className="w-12 h-12 rounded-xl bg-tertiary flex items-center justify-center flex-shrink-0">
                                                    <GraduationCapIcon size={24} className="text-muted" />
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold text-primary">{edu.school}</h3>
                                                    <p className="text-secondary">{edu.degree}</p>
                                                    <p className="text-sm text-tertiary">{edu.duration}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </Card>
                            </>
                        )}

                        {activeTab === 'skills' && (
                            <Card className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-lg font-semibold text-primary flex items-center gap-2">
                                        <AwardIcon size={20} className="text-yellow-500" />
                                        Skills & Endorsements
                                    </h2>
                                    {isOwnProfile && (
                                        <Button variant="ghost" size="sm" icon={<PlusIcon size={16} />}>
                                            Add Skill
                                        </Button>
                                    )}
                                </div>
                                <div className="space-y-4">
                                    {skills.map(skill => (
                                        <div key={skill.name} className="flex items-center justify-between p-4 rounded-xl bg-tertiary">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center text-white font-semibold">
                                                    {skill.endorsements}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-primary">{skill.name}</p>
                                                    <p className="text-xs text-tertiary">{skill.endorsements} endorsements</p>
                                                </div>
                                            </div>
                                            {!isOwnProfile && (
                                                <Button
                                                    variant={skill.endorsed ? 'secondary' : 'outline'}
                                                    size="sm"
                                                    icon={skill.endorsed ? <CheckIcon size={14} /> : <PlusIcon size={14} />}
                                                >
                                                    {skill.endorsed ? 'Endorsed' : 'Endorse'}
                                                </Button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        )}

                        {activeTab === 'posts' && (
                            <Card className="p-12 text-center">
                                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-tertiary flex items-center justify-center">
                                    <BookOpenIcon size={32} className="text-muted" />
                                </div>
                                <h3 className="text-lg font-semibold text-primary mb-2">No posts yet</h3>
                                <p className="text-tertiary">
                                    {isOwnProfile ? "Share your knowledge with the community!" : "This user hasn't posted anything yet."}
                                </p>
                            </Card>
                        )}

                        {activeTab === 'learning' && (
                            <Card className="p-12 text-center">
                                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-tertiary flex items-center justify-center">
                                    <BookOpenIcon size={32} className="text-muted" />
                                </div>
                                <h3 className="text-lg font-semibold text-primary mb-2">Learning Plans</h3>
                                <p className="text-tertiary mb-4">
                                    Track your learning journey and share your progress.
                                </p>
                                {isOwnProfile && (
                                    <Button icon={<PlusIcon size={16} />}>
                                        Create Learning Plan
                                    </Button>
                                )}
                            </Card>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
