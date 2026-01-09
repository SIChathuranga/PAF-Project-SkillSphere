import React, { useState, useEffect } from 'react';
import {
    SearchIcon,
    TrendingUpIcon,
    UsersIcon,
    BookOpenIcon,
    HashIcon,
    SparklesIcon,
    FilterIcon,
    XIcon
} from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Sidebar from '../components/layout/Sidebar';
import { Card, Avatar, Badge, Button, Input } from '../components/ui';
import { useDebounce } from '../hooks/useCustomHooks';

const Explore = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('all');
    const [selectedSkills, setSelectedSkills] = useState([]);
    const debouncedSearch = useDebounce(searchQuery, 300);

    const tabs = [
        { id: 'all', label: 'All', icon: SparklesIcon },
        { id: 'people', label: 'People', icon: UsersIcon },
        { id: 'posts', label: 'Posts', icon: HashIcon },
        { id: 'skills', label: 'Skills', icon: BookOpenIcon }
    ];

    const trendingSkills = [
        { name: 'React', count: 12453 },
        { name: 'Machine Learning', count: 9821 },
        { name: 'Python', count: 8934 },
        { name: 'UI/UX Design', count: 7562 },
        { name: 'TypeScript', count: 6234 },
        { name: 'Cloud Computing', count: 5678 },
        { name: 'Data Science', count: 5432 },
        { name: 'Node.js', count: 4567 }
    ];

    const suggestedPeople = [
        {
            id: 1,
            name: 'Sarah Chen',
            headline: 'Senior React Developer at Google',
            skills: ['React', 'TypeScript', 'GraphQL'],
            connections: 523,
            avatar: null
        },
        {
            id: 2,
            name: 'Michael Brown',
            headline: 'AI/ML Engineer at OpenAI',
            skills: ['Python', 'TensorFlow', 'PyTorch'],
            connections: 892,
            avatar: null
        },
        {
            id: 3,
            name: 'Emily Davis',
            headline: 'UX Designer at Spotify',
            skills: ['Figma', 'User Research', 'Prototyping'],
            connections: 645,
            avatar: null
        },
        {
            id: 4,
            name: 'Alex Morgan',
            headline: 'Full Stack Developer at Meta',
            skills: ['JavaScript', 'Node.js', 'PostgreSQL'],
            connections: 1234,
            avatar: null
        }
    ];

    const trendingPosts = [
        {
            id: 1,
            title: 'How I became a senior developer in 2 years',
            author: 'John Smith',
            likes: 2345,
            comments: 234,
            skill: 'Career Growth'
        },
        {
            id: 2,
            title: 'The future of AI in software development',
            author: 'Lisa Wang',
            likes: 1876,
            comments: 189,
            skill: 'AI/ML'
        },
        {
            id: 3,
            title: 'Building scalable React applications',
            author: 'David Kim',
            likes: 1543,
            comments: 156,
            skill: 'React'
        }
    ];

    const toggleSkill = (skill) => {
        if (selectedSkills.includes(skill)) {
            setSelectedSkills(selectedSkills.filter(s => s !== skill));
        } else {
            setSelectedSkills([...selectedSkills, skill]);
        }
    };

    return (
        <div className="min-h-screen bg-secondary">
            <Navbar />
            <Sidebar />

            <div className="md:pl-64 pt-16">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-primary flex items-center gap-2 mb-2">
                            <SearchIcon size={28} className="text-brand" />
                            Explore
                        </h1>
                        <p className="text-tertiary">Discover skills, people, and content that match your interests</p>
                    </div>

                    {/* Search Bar */}
                    <div className="relative mb-6">
                        <SearchIcon size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search for skills, people, posts..."
                            className="input pl-12 pr-12 py-4 text-lg"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery('')}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted hover:text-primary"
                            >
                                <XIcon size={20} />
                            </button>
                        )}
                    </div>

                    {/* Skill Filters */}
                    {selectedSkills.length > 0 && (
                        <div className="flex flex-wrap items-center gap-2 mb-6">
                            <span className="text-sm text-tertiary">Filters:</span>
                            {selectedSkills.map(skill => (
                                <Badge
                                    key={skill}
                                    variant="primary"
                                    className="flex items-center gap-1 cursor-pointer"
                                    onClick={() => toggleSkill(skill)}
                                >
                                    {skill}
                                    <XIcon size={12} />
                                </Badge>
                            ))}
                            <button
                                onClick={() => setSelectedSkills([])}
                                className="text-sm text-brand hover:underline"
                            >
                                Clear all
                            </button>
                        </div>
                    )}

                    {/* Tabs */}
                    <div className="flex gap-1 p-1 bg-tertiary rounded-xl mb-8 overflow-x-auto">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${activeTab === tab.id
                                        ? 'gradient-bg text-white shadow-lg'
                                        : 'text-secondary hover:text-primary hover:bg-primary'
                                    }`}
                            >
                                <tab.icon size={18} />
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Trending Skills */}
                            {(activeTab === 'all' || activeTab === 'skills') && (
                                <Card className="p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <h2 className="text-lg font-semibold text-primary flex items-center gap-2">
                                            <TrendingUpIcon size={20} className="text-brand" />
                                            Trending Skills
                                        </h2>
                                        <Button variant="ghost" size="sm">View all</Button>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {trendingSkills.map(skill => (
                                            <button
                                                key={skill.name}
                                                onClick={() => toggleSkill(skill.name)}
                                                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${selectedSkills.includes(skill.name)
                                                        ? 'gradient-bg text-white'
                                                        : 'bg-tertiary text-secondary hover:text-primary hover:bg-hover'
                                                    }`}
                                            >
                                                {skill.name}
                                                <span className="ml-2 text-xs opacity-70">
                                                    {(skill.count / 1000).toFixed(1)}k
                                                </span>
                                            </button>
                                        ))}
                                    </div>
                                </Card>
                            )}

                            {/* Suggested People */}
                            {(activeTab === 'all' || activeTab === 'people') && (
                                <Card className="p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <h2 className="text-lg font-semibold text-primary flex items-center gap-2">
                                            <UsersIcon size={20} className="text-purple-500" />
                                            People to Follow
                                        </h2>
                                        <Button variant="ghost" size="sm">View all</Button>
                                    </div>
                                    <div className="space-y-4">
                                        {suggestedPeople.map(person => (
                                            <div key={person.id} className="flex items-start gap-4 p-3 rounded-xl hover:bg-tertiary transition-colors">
                                                <Avatar
                                                    src={person.avatar}
                                                    name={person.name}
                                                    size="lg"
                                                />
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="font-semibold text-primary">{person.name}</h3>
                                                    <p className="text-sm text-tertiary line-clamp-1">{person.headline}</p>
                                                    <div className="flex flex-wrap gap-1 mt-2">
                                                        {person.skills.slice(0, 3).map(skill => (
                                                            <Badge key={skill} variant="secondary" size="sm">{skill}</Badge>
                                                        ))}
                                                    </div>
                                                </div>
                                                <Button size="sm">Connect</Button>
                                            </div>
                                        ))}
                                    </div>
                                </Card>
                            )}

                            {/* Trending Posts */}
                            {(activeTab === 'all' || activeTab === 'posts') && (
                                <Card className="p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <h2 className="text-lg font-semibold text-primary flex items-center gap-2">
                                            <SparklesIcon size={20} className="text-orange-500" />
                                            Popular This Week
                                        </h2>
                                        <Button variant="ghost" size="sm">View all</Button>
                                    </div>
                                    <div className="space-y-3">
                                        {trendingPosts.map((post, index) => (
                                            <div
                                                key={post.id}
                                                className="flex items-start gap-4 p-3 rounded-xl hover:bg-tertiary transition-colors cursor-pointer"
                                            >
                                                <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center flex-shrink-0 text-white font-bold">
                                                    {index + 1}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="font-medium text-primary hover:text-brand">{post.title}</h3>
                                                    <p className="text-sm text-tertiary mt-1">
                                                        by {post.author} • {post.likes.toLocaleString()} likes
                                                    </p>
                                                </div>
                                                <Badge variant="secondary" size="sm">{post.skill}</Badge>
                                            </div>
                                        ))}
                                    </div>
                                </Card>
                            )}
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Quick Stats */}
                            <Card className="p-6">
                                <h3 className="font-semibold text-primary mb-4">Platform Activity</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-tertiary">Active Users</span>
                                        <span className="font-semibold text-primary">12.4k</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-tertiary">Posts Today</span>
                                        <span className="font-semibold text-primary">3,245</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-tertiary">New Connections</span>
                                        <span className="font-semibold text-primary">9,876</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-tertiary">Learning Hours</span>
                                        <span className="font-semibold text-primary">45.2k</span>
                                    </div>
                                </div>
                            </Card>

                            {/* Skill Categories */}
                            <Card className="p-6">
                                <h3 className="font-semibold text-primary mb-4">Browse by Category</h3>
                                <div className="space-y-2">
                                    {[
                                        { name: 'Web Development', count: 5432 },
                                        { name: 'Data Science', count: 3456 },
                                        { name: 'Design', count: 2890 },
                                        { name: 'Mobile Development', count: 2345 },
                                        { name: 'Cloud & DevOps', count: 1987 },
                                        { name: 'Cybersecurity', count: 1654 }
                                    ].map(category => (
                                        <button
                                            key={category.name}
                                            className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-tertiary transition-colors text-left"
                                        >
                                            <span className="text-secondary">{category.name}</span>
                                            <Badge variant="secondary" size="sm">{category.count}</Badge>
                                        </button>
                                    ))}
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Explore;
