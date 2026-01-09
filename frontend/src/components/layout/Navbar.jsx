import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  BellIcon,
  MessageSquareIcon,
  SearchIcon,
  MenuIcon,
  XIcon,
  UserIcon,
  SettingsIcon,
  LogOutIcon,
  HelpCircleIcon
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Avatar, Dropdown, Badge } from '../ui';
import ThemeToggle from '../common/ThemeToggle';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { currentUser, userProfile, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-primary/80 backdrop-blur-xl border-b border-[rgb(var(--color-border))]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Left: Logo & Search */}
          <div className="flex items-center gap-4 flex-1">
            {/* Logo */}
            <Link to="/home" className="flex items-center gap-2 flex-shrink-0">
              <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center shadow-lg shadow-blue-500/20">
                <svg viewBox="0 0 24 24" width="24" height="24" stroke="white" strokeWidth="2" fill="none">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                  <line x1="9" y1="9" x2="9.01" y2="9"></line>
                  <line x1="15" y1="9" x2="15.01" y2="9"></line>
                </svg>
              </div>
              <span className="hidden sm:block text-xl font-bold gradient-text">
                SkillSphere
              </span>
            </Link>

            {/* Search */}
            <form onSubmit={handleSearch} className="hidden md:block flex-1 max-w-md">
              <div className="relative">
                <SearchIcon
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
                />
                <input
                  type="text"
                  placeholder="Search skills, people, posts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input pl-10 py-2 bg-tertiary border-transparent focus:bg-primary focus:border-[rgb(var(--color-border))]"
                />
              </div>
            </form>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Notifications */}
            <button className="relative p-2.5 rounded-xl text-secondary hover:text-primary hover:bg-tertiary transition-colors">
              <BellIcon size={20} />
              <Badge dot variant="error" className="absolute top-1.5 right-1.5" />
            </button>

            {/* Messages */}
            <Link
              to="/messages"
              className="relative p-2.5 rounded-xl text-secondary hover:text-primary hover:bg-tertiary transition-colors"
            >
              <MessageSquareIcon size={20} />
              <span className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                3
              </span>
            </Link>

            {/* User Menu */}
            <Dropdown
              align="right"
              trigger={
                <button className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-tertiary transition-colors">
                  <Avatar
                    src={userProfile?.photoURL}
                    name={userProfile?.displayName || currentUser?.email}
                    size="sm"
                    online
                  />
                  <span className="hidden lg:block text-sm font-medium text-primary max-w-[120px] truncate">
                    {userProfile?.displayName?.split(' ')[0] || 'User'}
                  </span>
                </button>
              }
            >
              <div className="px-4 py-3 border-b border-[rgb(var(--color-border))]">
                <p className="text-sm font-medium text-primary">
                  {userProfile?.displayName || 'User'}
                </p>
                <p className="text-xs text-tertiary truncate">
                  {currentUser?.email}
                </p>
              </div>
              <Dropdown.Item
                icon={<UserIcon size={16} />}
                onClick={() => navigate('/profile')}
              >
                View Profile
              </Dropdown.Item>
              <Dropdown.Item
                icon={<SettingsIcon size={16} />}
                onClick={() => navigate('/settings')}
              >
                Settings
              </Dropdown.Item>
              <Dropdown.Item icon={<HelpCircleIcon size={16} />}>
                Help & Support
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item
                icon={<LogOutIcon size={16} />}
                danger
                onClick={handleLogout}
              >
                Sign Out
              </Dropdown.Item>
            </Dropdown>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-xl text-secondary hover:text-primary hover:bg-tertiary"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Search */}
      <div className="md:hidden px-4 pb-3">
        <form onSubmit={handleSearch}>
          <div className="relative">
            <SearchIcon
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
            />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input pl-10 py-2 bg-tertiary border-transparent"
            />
          </div>
        </form>
      </div>
    </nav>
  );
};

export default Navbar;