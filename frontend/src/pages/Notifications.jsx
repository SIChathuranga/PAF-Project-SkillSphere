import React, { useState } from 'react';
import {
    BellIcon,
    CheckIcon,
    CheckCheckIcon,
    UserPlusIcon,
    HeartIcon,
    MessageSquareIcon,
    ShareIcon,
    CalendarIcon,
    AwardIcon,
    SettingsIcon,
    TrashIcon
} from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Sidebar from '../components/layout/Sidebar';
import { Card, Avatar, Badge, Button } from '../components/ui';

const Notifications = () => {
    const [activeTab, setActiveTab] = useState('all');
    const [notifications, setNotifications] = useState([
        {
            id: 1,
            type: 'connection',
            user: { name: 'Sarah Chen', avatar: null },
            message: 'sent you a connection request',
            time: '2 minutes ago',
            read: false,
            actionable: true
        },
        {
            id: 2,
            type: 'like',
            user: { name: 'Michael Brown', avatar: null },
            message: 'liked your post about React performance',
            time: '15 minutes ago',
            read: false
        },
        {
            id: 3,
            type: 'comment',
            user: { name: 'Emily Davis', avatar: null },
            message: 'commented on your post: "Great insights! This is exactly what I needed..."',
            time: '1 hour ago',
            read: false
        },
        {
            id: 4,
            type: 'mention',
            user: { name: 'Alex Morgan', avatar: null },
            message: 'mentioned you in a comment',
            time: '3 hours ago',
            read: true
        },
        {
            id: 5,
            type: 'event',
            user: { name: 'React Conf', avatar: null },
            message: 'reminder: React Conf 2024 starts in 2 days',
            time: '5 hours ago',
            read: true
        },
        {
            id: 6,
            type: 'achievement',
            user: null,
            message: 'You earned the "Rising Star" badge for getting 100 connections!',
            time: '1 day ago',
            read: true
        },
        {
            id: 7,
            type: 'share',
            user: { name: 'David Kim', avatar: null },
            message: 'shared your post about machine learning',
            time: '2 days ago',
            read: true
        }
    ]);

    const getIcon = (type) => {
        switch (type) {
            case 'connection': return <UserPlusIcon size={18} className="text-brand" />;
            case 'like': return <HeartIcon size={18} className="text-red-500" />;
            case 'comment': return <MessageSquareIcon size={18} className="text-green-500" />;
            case 'mention': return <MessageSquareIcon size={18} className="text-purple-500" />;
            case 'share': return <ShareIcon size={18} className="text-blue-500" />;
            case 'event': return <CalendarIcon size={18} className="text-orange-500" />;
            case 'achievement': return <AwardIcon size={18} className="text-yellow-500" />;
            default: return <BellIcon size={18} className="text-muted" />;
        }
    };

    const markAllAsRead = () => {
        setNotifications(notifications.map(n => ({ ...n, read: true })));
    };

    const unreadCount = notifications.filter(n => !n.read).length;

    const filteredNotifications = notifications.filter(n => {
        if (activeTab === 'all') return true;
        if (activeTab === 'unread') return !n.read;
        return n.type === activeTab;
    });

    return (
        <div className="min-h-screen bg-secondary">
            <Navbar />
            <Sidebar />

            <div className="md:pl-64 pt-16">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h1 className="text-2xl font-bold text-primary flex items-center gap-2">
                                <BellIcon size={28} className="text-brand" />
                                Notifications
                                {unreadCount > 0 && (
                                    <Badge variant="error">{unreadCount} new</Badge>
                                )}
                            </h1>
                            <p className="text-tertiary mt-1">Stay updated with your latest activity</p>
                        </div>
                        <div className="flex gap-2">
                            <Button
                                variant="secondary"
                                size="sm"
                                icon={<CheckCheckIcon size={16} />}
                                onClick={markAllAsRead}
                            >
                                Mark all read
                            </Button>
                            <Button variant="ghost" size="sm" icon={<SettingsIcon size={16} />}>
                                Settings
                            </Button>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="flex gap-1 p-1 bg-tertiary rounded-xl mb-6 overflow-x-auto">
                        {[
                            { id: 'all', label: 'All' },
                            { id: 'unread', label: 'Unread', count: unreadCount },
                            { id: 'connection', label: 'Connections' },
                            { id: 'comment', label: 'Comments' },
                            { id: 'like', label: 'Likes' }
                        ].map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${activeTab === tab.id
                                        ? 'gradient-bg text-white shadow-lg'
                                        : 'text-secondary hover:text-primary hover:bg-primary'
                                    }`}
                            >
                                {tab.label}
                                {tab.count > 0 && (
                                    <Badge
                                        variant={activeTab === tab.id ? 'neutral' : 'error'}
                                        size="sm"
                                        className={activeTab === tab.id ? 'bg-white/20 text-white' : ''}
                                    >
                                        {tab.count}
                                    </Badge>
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Notifications List */}
                    <Card className="divide-y divide-[rgb(var(--color-border))]">
                        {filteredNotifications.length > 0 ? (
                            filteredNotifications.map(notification => (
                                <div
                                    key={notification.id}
                                    className={`p-4 flex items-start gap-4 hover:bg-tertiary transition-colors ${!notification.read ? 'bg-blue-50/50 dark:bg-blue-950/20' : ''
                                        }`}
                                >
                                    {/* Icon or Avatar */}
                                    <div className="flex-shrink-0">
                                        {notification.user ? (
                                            <div className="relative">
                                                <Avatar
                                                    src={notification.user.avatar}
                                                    name={notification.user.name}
                                                    size="md"
                                                />
                                                <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-primary flex items-center justify-center border-2 border-[rgb(var(--color-bg-primary))]">
                                                    {getIcon(notification.type)}
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center">
                                                {getIcon(notification.type)}
                                            </div>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm text-primary">
                                            {notification.user && (
                                                <span className="font-semibold">{notification.user.name} </span>
                                            )}
                                            {notification.message}
                                        </p>
                                        <p className="text-xs text-muted mt-1">{notification.time}</p>

                                        {/* Action buttons for connection requests */}
                                        {notification.actionable && notification.type === 'connection' && (
                                            <div className="flex gap-2 mt-3">
                                                <Button size="sm">Accept</Button>
                                                <Button variant="ghost" size="sm">Ignore</Button>
                                            </div>
                                        )}
                                    </div>

                                    {/* Unread indicator */}
                                    {!notification.read && (
                                        <div className="w-2 h-2 rounded-full bg-brand flex-shrink-0 mt-2"></div>
                                    )}
                                </div>
                            ))
                        ) : (
                            <div className="p-12 text-center">
                                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-tertiary flex items-center justify-center">
                                    <BellIcon size={32} className="text-muted" />
                                </div>
                                <h3 className="text-lg font-semibold text-primary mb-2">No notifications</h3>
                                <p className="text-tertiary">
                                    {activeTab === 'unread'
                                        ? "You're all caught up!"
                                        : "You don't have any notifications yet."
                                    }
                                </p>
                            </div>
                        )}
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Notifications;
