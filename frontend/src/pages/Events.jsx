import React, { useState } from 'react';
import {
    CalendarIcon,
    PlusIcon,
    MapPinIcon,
    UsersIcon,
    ClockIcon,
    VideoIcon,
    ExternalLinkIcon,
    FilterIcon
} from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Sidebar from '../components/layout/Sidebar';
import { Card, Avatar, Badge, Button } from '../components/ui';

const Events = () => {
    const [activeTab, setActiveTab] = useState('upcoming');
    const [filter, setFilter] = useState('all');

    const events = [
        {
            id: 1,
            title: 'React Conf 2024',
            description: 'The biggest React conference of the year featuring talks from core team members',
            date: 'Jan 15, 2024',
            time: '9:00 AM - 5:00 PM PST',
            type: 'virtual',
            attendees: 2345,
            host: { name: 'React Team', avatar: null },
            registered: true,
            tags: ['React', 'JavaScript', 'Web Development']
        },
        {
            id: 2,
            title: 'AI/ML Workshop: Deep Learning Fundamentals',
            description: 'Hands-on workshop covering neural networks, CNNs, and practical implementations',
            date: 'Jan 20, 2024',
            time: '2:00 PM - 6:00 PM EST',
            type: 'virtual',
            attendees: 567,
            host: { name: 'David Kim', avatar: null },
            registered: false,
            tags: ['AI', 'Machine Learning', 'Python']
        },
        {
            id: 3,
            title: 'SF Tech Meetup: Future of Cloud Computing',
            description: 'In-person networking event with talks on serverless architecture and edge computing',
            date: 'Jan 25, 2024',
            time: '6:00 PM - 9:00 PM PST',
            location: 'San Francisco, CA',
            type: 'in-person',
            attendees: 189,
            host: { name: 'Bay Area Tech', avatar: null },
            registered: true,
            tags: ['Cloud', 'AWS', 'Networking']
        },
        {
            id: 4,
            title: 'UX Design Sprint Workshop',
            description: 'Learn the Google Ventures design sprint methodology in this intensive workshop',
            date: 'Feb 1, 2024',
            time: '10:00 AM - 4:00 PM EST',
            type: 'hybrid',
            location: 'New York, NY + Virtual',
            attendees: 234,
            host: { name: 'Design Sprints Co', avatar: null },
            registered: false,
            tags: ['UX', 'Design', 'Product']
        }
    ];

    const filteredEvents = events.filter(event => {
        if (filter === 'all') return true;
        return event.type === filter;
    });

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
                                <CalendarIcon size={28} className="text-brand" />
                                Events
                            </h1>
                            <p className="text-tertiary mt-1">Discover and attend professional events</p>
                        </div>
                        <Button icon={<PlusIcon size={16} />}>
                            Create Event
                        </Button>
                    </div>

                    {/* Tabs & Filters */}
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                        <div className="flex gap-1 p-1 bg-tertiary rounded-xl">
                            {['upcoming', 'registered', 'past'].map(tab => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all ${activeTab === tab
                                            ? 'gradient-bg text-white shadow-lg'
                                            : 'text-secondary hover:text-primary hover:bg-primary'
                                        }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>

                        <div className="flex gap-2">
                            {['all', 'virtual', 'in-person', 'hybrid'].map(type => (
                                <button
                                    key={type}
                                    onClick={() => setFilter(type)}
                                    className={`px-3 py-1.5 rounded-full text-sm font-medium capitalize transition-all ${filter === type
                                            ? 'gradient-bg text-white'
                                            : 'bg-tertiary text-secondary hover:text-primary'
                                        }`}
                                >
                                    {type === 'all' ? 'All Events' : type}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Events Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {filteredEvents.map(event => (
                            <Card key={event.id} className="overflow-hidden hover-lift">
                                {/* Event Cover */}
                                <div className="h-40 gradient-bg relative">
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <CalendarIcon size={48} className="text-white/30" />
                                    </div>
                                    <div className="absolute top-4 right-4">
                                        <Badge
                                            variant={
                                                event.type === 'virtual' ? 'primary' :
                                                    event.type === 'in-person' ? 'success' : 'warning'
                                            }
                                        >
                                            {event.type === 'virtual' && <VideoIcon size={12} className="mr-1" />}
                                            {event.type === 'in-person' && <MapPinIcon size={12} className="mr-1" />}
                                            {event.type.replace('-', ' ')}
                                        </Badge>
                                    </div>
                                    {event.registered && (
                                        <div className="absolute top-4 left-4">
                                            <Badge variant="success">Registered ✓</Badge>
                                        </div>
                                    )}
                                </div>

                                {/* Event Content */}
                                <div className="p-4">
                                    <h3 className="font-semibold text-primary text-lg">{event.title}</h3>
                                    <p className="text-sm text-tertiary mt-1 line-clamp-2">{event.description}</p>

                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-1 mt-3">
                                        {event.tags.map(tag => (
                                            <Badge key={tag} variant="secondary" size="sm">{tag}</Badge>
                                        ))}
                                    </div>

                                    {/* Event Details */}
                                    <div className="space-y-2 mt-4 text-sm text-secondary">
                                        <div className="flex items-center gap-2">
                                            <CalendarIcon size={16} className="text-brand" />
                                            <span>{event.date}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <ClockIcon size={16} className="text-muted" />
                                            <span>{event.time}</span>
                                        </div>
                                        {event.location && (
                                            <div className="flex items-center gap-2">
                                                <MapPinIcon size={16} className="text-green-500" />
                                                <span>{event.location}</span>
                                            </div>
                                        )}
                                        <div className="flex items-center gap-2">
                                            <UsersIcon size={16} className="text-purple-500" />
                                            <span>{event.attendees} attending</span>
                                        </div>
                                    </div>

                                    {/* Footer */}
                                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-[rgb(var(--color-border))]">
                                        <div className="flex items-center gap-2">
                                            <Avatar src={event.host.avatar} name={event.host.name} size="sm" />
                                            <span className="text-sm text-secondary">{event.host.name}</span>
                                        </div>
                                        <Button
                                            size="sm"
                                            variant={event.registered ? 'secondary' : 'primary'}
                                            icon={event.registered ? null : <ExternalLinkIcon size={14} />}
                                        >
                                            {event.registered ? 'View Details' : 'Register'}
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>

                    {filteredEvents.length === 0 && (
                        <Card className="p-12 text-center">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-tertiary flex items-center justify-center">
                                <CalendarIcon size={32} className="text-muted" />
                            </div>
                            <h3 className="text-lg font-semibold text-primary mb-2">No events found</h3>
                            <p className="text-tertiary">Try adjusting your filters or check back later.</p>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Events;
