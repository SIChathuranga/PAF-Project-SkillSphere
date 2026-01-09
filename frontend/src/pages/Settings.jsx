import React, { useState } from 'react';
import {
    SettingsIcon,
    UserIcon,
    BellIcon,
    LockIcon,
    PaletteIcon,
    GlobeIcon,
    ShieldIcon,
    CreditCardIcon,
    TrashIcon,
    LogOutIcon,
    ChevronRightIcon,
    SunIcon,
    MoonIcon,
    MonitorIcon
} from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Sidebar from '../components/layout/Sidebar';
import { Card, Button, Input, Avatar, Badge } from '../components/ui';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

const Settings = () => {
    const [activeSection, setActiveSection] = useState('profile');
    const { userProfile, logout } = useAuth();
    const { theme, setLightTheme, setDarkTheme, toggleTheme } = useTheme();

    const sections = [
        { id: 'profile', icon: UserIcon, label: 'Profile Settings' },
        { id: 'account', icon: LockIcon, label: 'Account & Security' },
        { id: 'notifications', icon: BellIcon, label: 'Notifications' },
        { id: 'appearance', icon: PaletteIcon, label: 'Appearance' },
        { id: 'privacy', icon: ShieldIcon, label: 'Privacy' },
        { id: 'language', icon: GlobeIcon, label: 'Language & Region' },
        { id: 'billing', icon: CreditCardIcon, label: 'Billing & Plans' }
    ];

    return (
        <div className="min-h-screen bg-secondary">
            <Navbar />
            <Sidebar />

            <div className="md:pl-64 pt-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    {/* Header */}
                    <div className="mb-6">
                        <h1 className="text-2xl font-bold text-primary flex items-center gap-2">
                            <SettingsIcon size={28} className="text-brand" />
                            Settings
                        </h1>
                        <p className="text-tertiary mt-1">Manage your account settings and preferences</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                        {/* Sidebar Navigation */}
                        <div className="lg:col-span-1">
                            <Card className="p-2">
                                <nav className="space-y-1">
                                    {sections.map(section => (
                                        <button
                                            key={section.id}
                                            onClick={() => setActiveSection(section.id)}
                                            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${activeSection === section.id
                                                    ? 'gradient-bg text-white shadow-lg'
                                                    : 'text-secondary hover:text-primary hover:bg-tertiary'
                                                }`}
                                        >
                                            <section.icon size={18} />
                                            {section.label}
                                        </button>
                                    ))}
                                </nav>

                                <div className="border-t border-[rgb(var(--color-border))] mt-4 pt-4">
                                    <button
                                        onClick={logout}
                                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-950 transition-colors"
                                    >
                                        <LogOutIcon size={18} />
                                        Sign Out
                                    </button>
                                </div>
                            </Card>
                        </div>

                        {/* Content */}
                        <div className="lg:col-span-3 space-y-4">
                            {activeSection === 'profile' && (
                                <>
                                    <Card className="p-6">
                                        <h2 className="text-lg font-semibold text-primary mb-4">Profile Information</h2>

                                        {/* Avatar */}
                                        <div className="flex items-center gap-4 mb-6">
                                            <Avatar
                                                src={userProfile?.photoURL}
                                                name={userProfile?.displayName}
                                                size="2xl"
                                            />
                                            <div>
                                                <Button variant="secondary" size="sm">
                                                    Change Photo
                                                </Button>
                                                <p className="text-xs text-tertiary mt-1">JPG, PNG or GIF. Max 5MB</p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <Input
                                                label="First Name"
                                                defaultValue={userProfile?.displayName?.split(' ')[0] || ''}
                                            />
                                            <Input
                                                label="Last Name"
                                                defaultValue={userProfile?.displayName?.split(' ').slice(1).join(' ') || ''}
                                            />
                                            <Input
                                                label="Email"
                                                type="email"
                                                defaultValue={userProfile?.email || ''}
                                                containerClassName="md:col-span-2"
                                            />
                                            <Input
                                                label="Headline"
                                                defaultValue={userProfile?.headline || ''}
                                                containerClassName="md:col-span-2"
                                            />
                                        </div>

                                        <div className="mt-4">
                                            <label className="label">Bio</label>
                                            <textarea
                                                rows={4}
                                                className="input resize-none"
                                                defaultValue={userProfile?.bio || ''}
                                                placeholder="Tell us about yourself..."
                                            />
                                        </div>

                                        <div className="flex justify-end mt-6">
                                            <Button>Save Changes</Button>
                                        </div>
                                    </Card>

                                    <Card className="p-6">
                                        <h2 className="text-lg font-semibold text-primary mb-4">Social Links</h2>
                                        <div className="space-y-4">
                                            <Input label="Website" placeholder="https://yourwebsite.com" />
                                            <Input label="LinkedIn" placeholder="https://linkedin.com/in/username" />
                                            <Input label="GitHub" placeholder="https://github.com/username" />
                                            <Input label="Twitter" placeholder="https://twitter.com/username" />
                                        </div>
                                        <div className="flex justify-end mt-6">
                                            <Button>Save Links</Button>
                                        </div>
                                    </Card>
                                </>
                            )}

                            {activeSection === 'account' && (
                                <>
                                    <Card className="p-6">
                                        <h2 className="text-lg font-semibold text-primary mb-4">Change Password</h2>
                                        <div className="space-y-4">
                                            <Input type="password" label="Current Password" />
                                            <Input type="password" label="New Password" />
                                            <Input type="password" label="Confirm New Password" />
                                        </div>
                                        <div className="flex justify-end mt-6">
                                            <Button>Update Password</Button>
                                        </div>
                                    </Card>

                                    <Card className="p-6">
                                        <h2 className="text-lg font-semibold text-primary mb-4">Two-Factor Authentication</h2>
                                        <p className="text-tertiary mb-4">
                                            Add an extra layer of security to your account by enabling two-factor authentication.
                                        </p>
                                        <Button variant="secondary">Enable 2FA</Button>
                                    </Card>

                                    <Card className="p-6 border-red-200 dark:border-red-800">
                                        <h2 className="text-lg font-semibold text-red-500 mb-4">Danger Zone</h2>
                                        <p className="text-tertiary mb-4">
                                            Once you delete your account, there is no going back. Please be certain.
                                        </p>
                                        <Button variant="danger" icon={<TrashIcon size={16} />}>
                                            Delete Account
                                        </Button>
                                    </Card>
                                </>
                            )}

                            {activeSection === 'appearance' && (
                                <Card className="p-6">
                                    <h2 className="text-lg font-semibold text-primary mb-4">Theme</h2>
                                    <p className="text-tertiary mb-4">Choose your preferred color scheme</p>

                                    <div className="grid grid-cols-3 gap-4">
                                        <button
                                            onClick={setLightTheme}
                                            className={`p-4 rounded-xl border-2 transition-all ${theme === 'light'
                                                    ? 'border-brand bg-blue-50 dark:bg-blue-950'
                                                    : 'border-[rgb(var(--color-border))] hover:border-brand/50'
                                                }`}
                                        >
                                            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-white border flex items-center justify-center">
                                                <SunIcon size={24} className="text-yellow-500" />
                                            </div>
                                            <p className="font-medium text-primary">Light</p>
                                            <p className="text-xs text-tertiary">Bright and clean</p>
                                        </button>

                                        <button
                                            onClick={setDarkTheme}
                                            className={`p-4 rounded-xl border-2 transition-all ${theme === 'dark'
                                                    ? 'border-brand bg-blue-50 dark:bg-blue-950'
                                                    : 'border-[rgb(var(--color-border))] hover:border-brand/50'
                                                }`}
                                        >
                                            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-slate-800 flex items-center justify-center">
                                                <MoonIcon size={24} className="text-blue-400" />
                                            </div>
                                            <p className="font-medium text-primary">Dark</p>
                                            <p className="text-xs text-tertiary">Easy on the eyes</p>
                                        </button>

                                        <button
                                            className="p-4 rounded-xl border-2 border-[rgb(var(--color-border))] hover:border-brand/50 transition-all"
                                        >
                                            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-br from-white to-slate-800 flex items-center justify-center">
                                                <MonitorIcon size={24} className="text-gray-500" />
                                            </div>
                                            <p className="font-medium text-primary">System</p>
                                            <p className="text-xs text-tertiary">Match device</p>
                                        </button>
                                    </div>
                                </Card>
                            )}

                            {activeSection === 'notifications' && (
                                <Card className="p-6">
                                    <h2 className="text-lg font-semibold text-primary mb-4">Notification Preferences</h2>

                                    <div className="space-y-4">
                                        {[
                                            { label: 'Email notifications', desc: 'Receive updates via email' },
                                            { label: 'Push notifications', desc: 'Get real-time alerts' },
                                            { label: 'Connection requests', desc: 'When someone wants to connect' },
                                            { label: 'Messages', desc: 'New message notifications' },
                                            { label: 'Post interactions', desc: 'Likes, comments, and shares' },
                                            { label: 'Learning reminders', desc: 'Continue your learning plans' }
                                        ].map((item, i) => (
                                            <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-tertiary">
                                                <div>
                                                    <p className="font-medium text-primary">{item.label}</p>
                                                    <p className="text-sm text-tertiary">{item.desc}</p>
                                                </div>
                                                <label className="relative inline-flex items-center cursor-pointer">
                                                    <input type="checkbox" defaultChecked className="sr-only peer" />
                                                    <div className="w-11 h-6 bg-gray-300 peer-focus:ring-2 peer-focus:ring-brand/20 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand"></div>
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </Card>
                            )}

                            {activeSection === 'privacy' && (
                                <Card className="p-6">
                                    <h2 className="text-lg font-semibold text-primary mb-4">Privacy Settings</h2>

                                    <div className="space-y-4">
                                        {[
                                            { label: 'Profile visibility', desc: 'Who can see your profile', value: 'Public' },
                                            { label: 'Activity status', desc: 'Show when you\'re online', value: 'Connections' },
                                            { label: 'Profile views', desc: 'Show who viewed your profile', value: 'Everyone' },
                                            { label: 'Search visibility', desc: 'Appear in search results', value: 'Yes' }
                                        ].map((item, i) => (
                                            <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-tertiary">
                                                <div>
                                                    <p className="font-medium text-primary">{item.label}</p>
                                                    <p className="text-sm text-tertiary">{item.desc}</p>
                                                </div>
                                                <button className="flex items-center gap-2 text-sm text-brand">
                                                    {item.value}
                                                    <ChevronRightIcon size={16} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </Card>
                            )}

                            {activeSection === 'language' && (
                                <Card className="p-6">
                                    <h2 className="text-lg font-semibold text-primary mb-4">Language & Region</h2>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="label">Language</label>
                                            <select className="input">
                                                <option>English (US)</option>
                                                <option>English (UK)</option>
                                                <option>Spanish</option>
                                                <option>French</option>
                                                <option>German</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="label">Timezone</label>
                                            <select className="input">
                                                <option>(GMT-8:00) Pacific Time</option>
                                                <option>(GMT-5:00) Eastern Time</option>
                                                <option>(GMT+0:00) London</option>
                                                <option>(GMT+5:30) India Standard Time</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="flex justify-end mt-6">
                                        <Button>Save Preferences</Button>
                                    </div>
                                </Card>
                            )}

                            {activeSection === 'billing' && (
                                <Card className="p-6">
                                    <div className="flex items-center justify-between mb-6">
                                        <div>
                                            <h2 className="text-lg font-semibold text-primary">Current Plan</h2>
                                            <p className="text-tertiary">You're currently on the free plan</p>
                                        </div>
                                        <Badge variant="secondary" size="lg">Free</Badge>
                                    </div>

                                    <div className="p-6 rounded-xl gradient-bg text-white">
                                        <h3 className="text-xl font-bold mb-2">Upgrade to Premium</h3>
                                        <p className="text-white/80 mb-4">
                                            Get unlimited access to learning plans, advanced analytics, and priority support.
                                        </p>
                                        <ul className="space-y-2 mb-4">
                                            {['Unlimited learning plans', 'Advanced profile analytics', 'Priority support', 'Premium badge'].map(feature => (
                                                <li key={feature} className="flex items-center gap-2">
                                                    <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs">✓</span>
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                        <Button className="bg-white text-blue-600 hover:bg-white/90">
                                            Upgrade for $9.99/month
                                        </Button>
                                    </div>
                                </Card>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
