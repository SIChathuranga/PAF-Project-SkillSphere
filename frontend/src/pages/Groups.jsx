import React, { useState } from 'react';
import {
    UsersIcon,
    PlusIcon,
    SearchIcon,
    GlobeIcon,
    LockIcon,
    MessageSquareIcon,
    SettingsIcon
} from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Sidebar from '../components/layout/Sidebar';
import { Card, Avatar, Badge, Button } from '../components/ui';

const Groups = () => {
    const [activeTab, setActiveTab] = useState('my-groups');
    const [searchQuery, setSearchQuery] = useState('');

    const myGroups = [
        {
            id: 1,
            name: 'React Developers Community',
            description: 'A community for React enthusiasts to share knowledge and best practices',
            members: 12453,
            posts: 234,
            isPublic: true,
            cover: null
        },
        {
            id: 2,
            name: 'UX/UI Design Hub',
            description: 'Discuss design trends, tools, and techniques',
            members: 8921,
            posts: 156,
            isPublic: true,
            cover: null
        },
        {
            id: 3,
            name: 'Machine Learning Study Group',
            description: 'Learn ML together through collaborative projects',
            members: 3456,
            posts: 89,
            isPublic: false,
            cover: null
        }
    ];

    const discoverGroups = [
        {
            id: 4,
            name: 'Full Stack Development',
            description: 'Everything about building complete web applications',
            members: 25678,
            isPublic: true
        },
        {
            id: 5,
            name: 'AWS Cloud Practitioners',
            description: 'Share AWS tips, solutions, and career advice',
            members: 18234,
            isPublic: true
        },
        {
            id: 6,
            name: 'Startup Founders Network',
            description: 'Connect with fellow entrepreneurs and share experiences',
            members: 9876,
            isPublic: false
        },
        {
            id: 7,
            name: 'Data Science Daily',
            description: 'Daily discussions on data science topics and trends',
            members: 15432,
            isPublic: true
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
                                <UsersIcon size={28} className="text-brand" />
                                Groups
                            </h1>
                            <p className="text-tertiary mt-1">Join communities and connect with like-minded professionals</p>
                        </div>
                        <Button icon={<PlusIcon size={16} />}>
                            Create Group
                        </Button>
                    </div>

                    {/* Tabs */}
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                        <div className="flex gap-1 p-1 bg-tertiary rounded-xl">
                            <button
                                onClick={() => setActiveTab('my-groups')}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'my-groups'
                                        ? 'gradient-bg text-white shadow-lg'
                                        : 'text-secondary hover:text-primary hover:bg-primary'
                                    }`}
                            >
                                My Groups
                            </button>
                            <button
                                onClick={() => setActiveTab('discover')}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'discover'
                                        ? 'gradient-bg text-white shadow-lg'
                                        : 'text-secondary hover:text-primary hover:bg-primary'
                                    }`}
                            >
                                Discover
                            </button>
                        </div>

                        <div className="relative w-full sm:w-64">
                            <SearchIcon size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                            <input
                                type="text"
                                placeholder="Search groups..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="input pl-10"
                            />
                        </div>
                    </div>

                    {/* My Groups */}
                    {activeTab === 'my-groups' && (
                        <div className="space-y-4">
                            {myGroups.map(group => (
                                <Card key={group.id} className="overflow-hidden hover-lift">
                                    <div className="flex flex-col sm:flex-row">
                                        {/* Cover */}
                                        <div className="sm:w-48 h-32 sm:h-auto gradient-bg flex items-center justify-center flex-shrink-0">
                                            <UsersIcon size={40} className="text-white/50" />
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 p-4">
                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <h3 className="font-semibold text-primary">{group.name}</h3>
                                                        <Badge variant={group.isPublic ? 'success' : 'secondary'} size="sm">
                                                            {group.isPublic ? <GlobeIcon size={12} className="mr-1" /> : <LockIcon size={12} className="mr-1" />}
                                                            {group.isPublic ? 'Public' : 'Private'}
                                                        </Badge>
                                                    </div>
                                                    <p className="text-sm text-tertiary mt-1">{group.description}</p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-4 mt-4 text-sm text-muted">
                                                <span>{group.members.toLocaleString()} members</span>
                                                <span>•</span>
                                                <span>{group.posts} posts this week</span>
                                            </div>

                                            <div className="flex gap-2 mt-4">
                                                <Button size="sm" icon={<MessageSquareIcon size={14} />}>
                                                    View Group
                                                </Button>
                                                <Button variant="ghost" size="sm" icon={<SettingsIcon size={14} />}>
                                                    Settings
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    )}

                    {/* Discover */}
                    {activeTab === 'discover' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {discoverGroups.map(group => (
                                <Card key={group.id} className="p-4 hover-lift">
                                    <div className="flex items-start gap-4">
                                        <div className="w-16 h-16 rounded-xl gradient-bg-secondary flex items-center justify-center flex-shrink-0">
                                            <UsersIcon size={28} className="text-white" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2">
                                                <h3 className="font-semibold text-primary truncate">{group.name}</h3>
                                                {group.isPublic ? (
                                                    <GlobeIcon size={14} className="text-green-500 flex-shrink-0" />
                                                ) : (
                                                    <LockIcon size={14} className="text-muted flex-shrink-0" />
                                                )}
                                            </div>
                                            <p className="text-sm text-tertiary line-clamp-2 mt-1">{group.description}</p>
                                            <p className="text-xs text-muted mt-2">{group.members.toLocaleString()} members</p>
                                            <Button size="sm" className="mt-3" icon={<PlusIcon size={14} />}>
                                                Join Group
                                            </Button>
                                        </div>
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

export default Groups;
