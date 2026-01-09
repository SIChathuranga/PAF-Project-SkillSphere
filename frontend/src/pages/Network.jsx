import React, { useState } from 'react';
import {
    SearchIcon,
    UsersIcon,
    UserPlusIcon,
    UserCheckIcon,
    MailIcon,
    FilterIcon,
    GridIcon,
    ListIcon
} from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Sidebar from '../components/layout/Sidebar';
import { Card, Avatar, Badge, Button, Input } from '../components/ui';

const Network = () => {
    const [activeTab, setActiveTab] = useState('connections');
    const [viewMode, setViewMode] = useState('grid');
    const [searchQuery, setSearchQuery] = useState('');

    const tabs = [
        { id: 'connections', label: 'My Connections', count: 127 },
        { id: 'pending', label: 'Pending', count: 12 },
        { id: 'sent', label: 'Sent Requests', count: 5 },
        { id: 'suggestions', label: 'Suggestions', count: null }
    ];

    const connections = [
        { id: 1, name: 'Sarah Chen', headline: 'Senior UX Designer at Google', avatar: null, mutualConnections: 15 },
        { id: 2, name: 'Michael Brown', headline: 'Full Stack Developer', avatar: null, mutualConnections: 8 },
        { id: 3, name: 'Emily Davis', headline: 'Product Manager at Meta', avatar: null, mutualConnections: 23 },
        { id: 4, name: 'Alex Morgan', headline: 'Data Scientist', avatar: null, mutualConnections: 12 },
        { id: 5, name: 'David Kim', headline: 'ML Engineer at OpenAI', avatar: null, mutualConnections: 7 },
        { id: 6, name: 'Lisa Wang', headline: 'Frontend Developer', avatar: null, mutualConnections: 19 }
    ];

    const pendingRequests = [
        { id: 1, name: 'John Smith', headline: 'Backend Developer at Amazon', avatar: null, mutualConnections: 5, message: 'Hi! I love your work.' },
        { id: 2, name: 'Emma Wilson', headline: 'UI Designer', avatar: null, mutualConnections: 8, message: null },
        { id: 3, name: 'James Lee', headline: 'Tech Lead at Spotify', avatar: null, mutualConnections: 3, message: 'Would love to connect!' }
    ];

    const suggestions = [
        { id: 1, name: 'Rachel Green', headline: 'DevOps Engineer at Netflix', avatar: null, mutualConnections: 12, skills: ['AWS', 'Kubernetes', 'Docker'] },
        { id: 2, name: 'Tom Hardy', headline: 'Cloud Architect', avatar: null, mutualConnections: 9, skills: ['GCP', 'Terraform', 'Python'] },
        { id: 3, name: 'Sophie Turner', headline: 'Mobile Developer', avatar: null, mutualConnections: 15, skills: ['React Native', 'Flutter', 'iOS'] },
        { id: 4, name: 'Chris Evans', headline: 'Security Engineer', avatar: null, mutualConnections: 6, skills: ['Cybersecurity', 'Penetration Testing'] },
        { id: 5, name: 'Anna Smith', headline: 'AI Researcher', avatar: null, mutualConnections: 11, skills: ['Deep Learning', 'NLP', 'PyTorch'] },
        { id: 6, name: 'Mark Johnson', headline: 'Startup Founder', avatar: null, mutualConnections: 20, skills: ['Entrepreneurship', 'Strategy'] }
    ];

    const filteredConnections = connections.filter(c =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.headline.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-secondary">
            <Navbar />
            <Sidebar />

            <div className="md:pl-64 pt-16">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    {/* Header */}
                    <div className="mb-6">
                        <h1 className="text-2xl font-bold text-primary mb-2">My Network</h1>
                        <p className="text-tertiary">Manage your connections and grow your professional network</p>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        <Card className="p-4 text-center hover-lift">
                            <div className="w-12 h-12 mx-auto mb-2 rounded-full gradient-bg flex items-center justify-center">
                                <UsersIcon size={24} className="text-white" />
                            </div>
                            <p className="text-2xl font-bold text-primary">127</p>
                            <p className="text-sm text-tertiary">Connections</p>
                        </Card>
                        <Card className="p-4 text-center hover-lift">
                            <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-purple-500 flex items-center justify-center">
                                <UserPlusIcon size={24} className="text-white" />
                            </div>
                            <p className="text-2xl font-bold text-primary">12</p>
                            <p className="text-sm text-tertiary">Pending</p>
                        </Card>
                        <Card className="p-4 text-center hover-lift">
                            <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-green-500 flex items-center justify-center">
                                <UserCheckIcon size={24} className="text-white" />
                            </div>
                            <p className="text-2xl font-bold text-primary">5.8K</p>
                            <p className="text-sm text-tertiary">Followers</p>
                        </Card>
                        <Card className="p-4 text-center hover-lift">
                            <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-orange-500 flex items-center justify-center">
                                <MailIcon size={24} className="text-white" />
                            </div>
                            <p className="text-2xl font-bold text-primary">342</p>
                            <p className="text-sm text-tertiary">Following</p>
                        </Card>
                    </div>

                    {/* Tabs */}
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                        <div className="flex gap-1 p-1 bg-tertiary rounded-xl overflow-x-auto">
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

                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'gradient-bg text-white' : 'text-secondary hover:bg-tertiary'}`}
                            >
                                <GridIcon size={20} />
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'gradient-bg text-white' : 'text-secondary hover:bg-tertiary'}`}
                            >
                                <ListIcon size={20} />
                            </button>
                        </div>
                    </div>

                    {/* Search */}
                    <div className="mb-6">
                        <div className="relative max-w-md">
                            <SearchIcon size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                            <input
                                type="text"
                                placeholder="Search connections..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="input pl-10"
                            />
                        </div>
                    </div>

                    {/* Content */}
                    {activeTab === 'connections' && (
                        <div className={viewMode === 'grid'
                            ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'
                            : 'space-y-3'
                        }>
                            {filteredConnections.map(person => (
                                <Card key={person.id} className={`p-4 ${viewMode === 'list' ? 'flex items-center gap-4' : ''}`}>
                                    <div className={viewMode === 'grid' ? 'text-center' : 'flex items-center gap-4 flex-1'}>
                                        <Avatar
                                            src={person.avatar}
                                            name={person.name}
                                            size={viewMode === 'grid' ? 'xl' : 'lg'}
                                            className={viewMode === 'grid' ? 'mx-auto mb-3' : ''}
                                        />
                                        <div className={viewMode === 'grid' ? '' : 'flex-1 min-w-0'}>
                                            <p className="font-semibold text-primary truncate">{person.name}</p>
                                            <p className="text-sm text-tertiary truncate">{person.headline}</p>
                                            <p className="text-xs text-muted mt-1">{person.mutualConnections} mutual connections</p>
                                        </div>
                                    </div>
                                    <div className={`flex gap-2 ${viewMode === 'grid' ? 'mt-4 justify-center' : ''}`}>
                                        <Button variant="secondary" size="sm" icon={<MailIcon size={14} />}>
                                            Message
                                        </Button>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    )}

                    {activeTab === 'pending' && (
                        <div className="space-y-4">
                            {pendingRequests.map(request => (
                                <Card key={request.id} className="p-4">
                                    <div className="flex items-start gap-4">
                                        <Avatar
                                            src={request.avatar}
                                            name={request.name}
                                            size="lg"
                                        />
                                        <div className="flex-1 min-w-0">
                                            <p className="font-semibold text-primary">{request.name}</p>
                                            <p className="text-sm text-tertiary">{request.headline}</p>
                                            <p className="text-xs text-muted mt-1">{request.mutualConnections} mutual connections</p>
                                            {request.message && (
                                                <p className="mt-2 text-sm text-secondary bg-tertiary p-3 rounded-lg">
                                                    "{request.message}"
                                                </p>
                                            )}
                                        </div>
                                        <div className="flex gap-2">
                                            <Button size="sm">Accept</Button>
                                            <Button variant="ghost" size="sm">Ignore</Button>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    )}

                    {activeTab === 'suggestions' && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {suggestions.map(person => (
                                <Card key={person.id} className="p-4">
                                    <div className="text-center">
                                        <Avatar
                                            src={person.avatar}
                                            name={person.name}
                                            size="xl"
                                            className="mx-auto mb-3"
                                        />
                                        <p className="font-semibold text-primary">{person.name}</p>
                                        <p className="text-sm text-tertiary">{person.headline}</p>
                                        <p className="text-xs text-muted mt-1">{person.mutualConnections} mutual connections</p>
                                        <div className="flex flex-wrap justify-center gap-1 mt-3">
                                            {person.skills.slice(0, 3).map(skill => (
                                                <Badge key={skill} variant="secondary" size="sm">{skill}</Badge>
                                            ))}
                                        </div>
                                        <Button className="mt-4 w-full" icon={<UserPlusIcon size={16} />}>
                                            Connect
                                        </Button>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    )}

                    {activeTab === 'sent' && (
                        <Card className="p-12 text-center">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-tertiary flex items-center justify-center">
                                <UserPlusIcon size={32} className="text-muted" />
                            </div>
                            <h3 className="text-lg font-semibold text-primary mb-2">Sent Requests</h3>
                            <p className="text-tertiary">You have 5 pending connection requests sent.</p>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Network;
