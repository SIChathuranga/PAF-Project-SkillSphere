import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import {
    SearchIcon,
    SendIcon,
    PaperclipIcon,
    SmileIcon,
    MoreVerticalIcon,
    PhoneIcon,
    VideoIcon,
    InfoIcon,
    ImageIcon,
    CheckCheckIcon
} from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Sidebar from '../components/layout/Sidebar';
import { Card, Avatar, Input, Badge } from '../components/ui';
import { useAuth } from '../contexts/AuthContext';

const Messages = () => {
    const { conversationId } = useParams();
    const { userProfile } = useAuth();
    const [selectedConversation, setSelectedConversation] = useState(null);
    const [messageInput, setMessageInput] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const messagesEndRef = useRef(null);

    // Sample conversations
    const conversations = [
        {
            id: 1,
            user: { name: 'Sarah Chen', avatar: null, online: true },
            lastMessage: 'That sounds great! Let me know when you\'re free to discuss.',
            timestamp: '2m ago',
            unread: 2
        },
        {
            id: 2,
            user: { name: 'Michael Brown', avatar: null, online: false },
            lastMessage: 'Thanks for connecting!',
            timestamp: '1h ago',
            unread: 0
        },
        {
            id: 3,
            user: { name: 'Emily Davis', avatar: null, online: true },
            lastMessage: 'I\'ll send over the design files tomorrow.',
            timestamp: '3h ago',
            unread: 0
        },
        {
            id: 4,
            user: { name: 'Alex Morgan', avatar: null, online: false },
            lastMessage: 'Did you check out the new React features?',
            timestamp: '1d ago',
            unread: 0
        },
        {
            id: 5,
            user: { name: 'David Kim', avatar: null, online: true },
            lastMessage: 'The ML model is performing well now.',
            timestamp: '2d ago',
            unread: 0
        }
    ];

    // Sample messages for selected conversation
    const messages = [
        { id: 1, sender: 'other', text: 'Hey! I saw your post about UX design trends.', time: '10:30 AM' },
        { id: 2, sender: 'me', text: 'Hi Sarah! Yes, I\'ve been researching a lot lately. What did you think?', time: '10:32 AM' },
        { id: 3, sender: 'other', text: 'I loved your insights on AI-driven personalization. We\'re actually implementing something similar at Google.', time: '10:33 AM' },
        { id: 4, sender: 'me', text: 'That\'s awesome! I\'d love to hear more about your approach.', time: '10:35 AM' },
        { id: 5, sender: 'other', text: 'Sure! Would you be open to a quick call sometime this week?', time: '10:36 AM' },
        { id: 6, sender: 'me', text: 'Absolutely! I\'m free Thursday afternoon if that works for you.', time: '10:38 AM' },
        { id: 7, sender: 'other', text: 'That sounds great! Let me know when you\'re free to discuss.', time: '10:40 AM' }
    ];

    useEffect(() => {
        if (conversationId) {
            const conv = conversations.find(c => c.id === parseInt(conversationId));
            setSelectedConversation(conv);
        } else if (conversations.length > 0) {
            setSelectedConversation(conversations[0]);
        }
    }, [conversationId]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, selectedConversation]);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!messageInput.trim()) return;
        // Add message sending logic here
        setMessageInput('');
    };

    const filteredConversations = conversations.filter(conv =>
        conv.user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-secondary">
            <Navbar />
            <Sidebar />

            <div className="md:pl-64 pt-16">
                <div className="h-[calc(100vh-4rem)] flex">
                    {/* Conversations List */}
                    <div className={`w-full md:w-80 lg:w-96 border-r border-[rgb(var(--color-border))] bg-primary flex flex-col ${selectedConversation ? 'hidden md:flex' : 'flex'}`}>
                        {/* Header */}
                        <div className="p-4 border-b border-[rgb(var(--color-border))]">
                            <h1 className="text-xl font-bold text-primary mb-4">Messages</h1>
                            <div className="relative">
                                <SearchIcon size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                                <input
                                    type="text"
                                    placeholder="Search messages..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="input pl-10 py-2 bg-tertiary border-transparent"
                                />
                            </div>
                        </div>

                        {/* Conversations */}
                        <div className="flex-1 overflow-y-auto">
                            {filteredConversations.map(conv => (
                                <button
                                    key={conv.id}
                                    onClick={() => setSelectedConversation(conv)}
                                    className={`w-full p-4 flex items-start gap-3 hover:bg-tertiary transition-colors border-b border-[rgb(var(--color-border))] ${selectedConversation?.id === conv.id ? 'bg-tertiary' : ''
                                        }`}
                                >
                                    <div className="relative">
                                        <Avatar
                                            src={conv.user.avatar}
                                            name={conv.user.name}
                                            size="md"
                                        />
                                        {conv.user.online && (
                                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[rgb(var(--color-bg-primary))]"></div>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0 text-left">
                                        <div className="flex items-center justify-between">
                                            <p className="font-semibold text-primary truncate">{conv.user.name}</p>
                                            <span className="text-xs text-muted flex-shrink-0 ml-2">{conv.timestamp}</span>
                                        </div>
                                        <p className={`text-sm truncate ${conv.unread ? 'text-primary font-medium' : 'text-tertiary'}`}>
                                            {conv.lastMessage}
                                        </p>
                                    </div>
                                    {conv.unread > 0 && (
                                        <Badge variant="primary" className="flex-shrink-0">
                                            {conv.unread}
                                        </Badge>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Chat Area */}
                    <div className={`flex-1 flex flex-col bg-secondary ${!selectedConversation ? 'hidden md:flex' : 'flex'}`}>
                        {selectedConversation ? (
                            <>
                                {/* Chat Header */}
                                <div className="p-4 border-b border-[rgb(var(--color-border))] bg-primary flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={() => setSelectedConversation(null)}
                                            className="md:hidden p-2 -ml-2 text-secondary hover:text-primary"
                                        >
                                            ←
                                        </button>
                                        <Avatar
                                            src={selectedConversation.user.avatar}
                                            name={selectedConversation.user.name}
                                            size="md"
                                            online={selectedConversation.user.online}
                                        />
                                        <div>
                                            <p className="font-semibold text-primary">{selectedConversation.user.name}</p>
                                            <p className="text-xs text-tertiary">
                                                {selectedConversation.user.online ? 'Online' : 'Offline'}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button className="p-2 rounded-lg text-secondary hover:text-primary hover:bg-tertiary transition-colors">
                                            <PhoneIcon size={20} />
                                        </button>
                                        <button className="p-2 rounded-lg text-secondary hover:text-primary hover:bg-tertiary transition-colors">
                                            <VideoIcon size={20} />
                                        </button>
                                        <button className="p-2 rounded-lg text-secondary hover:text-primary hover:bg-tertiary transition-colors">
                                            <InfoIcon size={20} />
                                        </button>
                                    </div>
                                </div>

                                {/* Messages */}
                                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                                    {messages.map(msg => (
                                        <div
                                            key={msg.id}
                                            className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                                        >
                                            <div className={`max-w-[70%] ${msg.sender === 'me' ? 'order-1' : ''}`}>
                                                {msg.sender !== 'me' && (
                                                    <Avatar
                                                        src={selectedConversation.user.avatar}
                                                        name={selectedConversation.user.name}
                                                        size="sm"
                                                        className="mb-1"
                                                    />
                                                )}
                                                <div className={`px-4 py-2.5 rounded-2xl ${msg.sender === 'me'
                                                        ? 'gradient-bg text-white rounded-br-md'
                                                        : 'bg-tertiary text-primary rounded-bl-md'
                                                    }`}>
                                                    <p className="text-sm">{msg.text}</p>
                                                </div>
                                                <div className={`flex items-center gap-1 mt-1 ${msg.sender === 'me' ? 'justify-end' : ''}`}>
                                                    <span className="text-xs text-muted">{msg.time}</span>
                                                    {msg.sender === 'me' && (
                                                        <CheckCheckIcon size={14} className="text-blue-500" />
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    <div ref={messagesEndRef} />
                                </div>

                                {/* Message Input */}
                                <div className="p-4 border-t border-[rgb(var(--color-border))] bg-primary">
                                    <form onSubmit={handleSendMessage} className="flex items-center gap-3">
                                        <button
                                            type="button"
                                            className="p-2 rounded-lg text-secondary hover:text-primary hover:bg-tertiary transition-colors"
                                        >
                                            <PaperclipIcon size={20} />
                                        </button>
                                        <button
                                            type="button"
                                            className="p-2 rounded-lg text-secondary hover:text-primary hover:bg-tertiary transition-colors"
                                        >
                                            <ImageIcon size={20} />
                                        </button>
                                        <div className="flex-1 relative">
                                            <input
                                                type="text"
                                                placeholder="Type a message..."
                                                value={messageInput}
                                                onChange={(e) => setMessageInput(e.target.value)}
                                                className="input py-3 pr-12"
                                            />
                                            <button
                                                type="button"
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-primary"
                                            >
                                                <SmileIcon size={20} />
                                            </button>
                                        </div>
                                        <button
                                            type="submit"
                                            disabled={!messageInput.trim()}
                                            className="p-3 gradient-bg text-white rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 shadow-lg"
                                        >
                                            <SendIcon size={20} />
                                        </button>
                                    </form>
                                </div>
                            </>
                        ) : (
                            <div className="flex-1 flex items-center justify-center">
                                <div className="text-center">
                                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-tertiary flex items-center justify-center">
                                        <SendIcon size={32} className="text-muted" />
                                    </div>
                                    <h2 className="text-xl font-semibold text-primary mb-2">Your Messages</h2>
                                    <p className="text-tertiary">Select a conversation to start chatting</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Messages;
