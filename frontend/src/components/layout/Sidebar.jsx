import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  HomeIcon,
  UsersIcon,
  MessageSquareIcon,
  BookOpenIcon,
  CalendarIcon,
  UserCircleIcon,
  BookmarkIcon,
  SettingsIcon,
  TrendingUpIcon,
  AwardIcon
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Avatar, Badge } from '../ui';

const Sidebar = () => {
  const location = useLocation();
  const { userProfile, currentUser } = useAuth();

  const mainNavigation = [
    { name: 'Feed', icon: HomeIcon, href: '/home', badge: null },
    { name: 'Network', icon: UsersIcon, href: '/network', badge: '12' },
    { name: 'Messages', icon: MessageSquareIcon, href: '/messages', badge: '3' },
    { name: 'Learning', icon: BookOpenIcon, href: '/learning', badge: null },
    { name: 'Events', icon: CalendarIcon, href: '/events', badge: '2' },
    { name: 'Groups', icon: UsersIcon, href: '/groups', badge: null },
  ];

  const secondaryNavigation = [
    { name: 'Saved Posts', icon: BookmarkIcon, href: '/saved' },
    { name: 'My Profile', icon: UserCircleIcon, href: '/profile' },
    { name: 'Settings', icon: SettingsIcon, href: '/settings' },
  ];

  const isActive = (href) => {
    return location.pathname === href || location.pathname.startsWith(href + '/');
  };

  return (
    <aside className="hidden md:flex md:flex-col md:w-64 md:fixed md:inset-y-0 md:pt-20 bg-primary border-r border-[rgb(var(--color-border))] z-30">
      <div className="flex flex-col h-full overflow-y-auto">
        {/* User Profile Card */}
        <div className="p-4">
          <div className="card p-4">
            <div className="flex items-center gap-3">
              <Avatar
                src={userProfile?.photoURL}
                name={userProfile?.displayName || currentUser?.email}
                size="lg"
                online
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-primary truncate">
                  {userProfile?.displayName || 'User'}
                </p>
                <p className="text-xs text-tertiary truncate">
                  {userProfile?.headline || 'Add a headline'}
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-2 mt-4">
              <div className="text-center p-2 rounded-lg bg-tertiary">
                <p className="text-lg font-bold text-primary">
                  {userProfile?.connections?.length || 0}
                </p>
                <p className="text-[10px] text-tertiary">Connections</p>
              </div>
              <div className="text-center p-2 rounded-lg bg-tertiary">
                <p className="text-lg font-bold text-primary">
                  {userProfile?.followers?.length || 0}
                </p>
                <p className="text-[10px] text-tertiary">Followers</p>
              </div>
              <div className="text-center p-2 rounded-lg bg-tertiary">
                <p className="text-lg font-bold text-primary">
                  {userProfile?.skills?.length || 0}
                </p>
                <p className="text-[10px] text-tertiary">Skills</p>
              </div>
            </div>

            {/* View Profile Button */}
            <Link
              to="/profile"
              className="block mt-4 text-center text-sm font-medium text-brand hover:underline"
            >
              View Profile
            </Link>
          </div>
        </div>

        {/* Main Navigation */}
        <nav className="flex-1 px-4 pb-4">
          <div className="mb-4">
            <p className="px-3 text-xs font-semibold text-muted uppercase tracking-wider mb-2">
              Main Menu
            </p>
            <div className="space-y-1">
              {mainNavigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`
                    flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium
                    transition-all duration-200 group
                    ${isActive(item.href)
                      ? 'gradient-bg text-white shadow-lg shadow-blue-500/20'
                      : 'text-secondary hover:text-primary hover:bg-tertiary'
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    <item.icon
                      size={20}
                      className={isActive(item.href) ? 'text-white' : 'text-muted group-hover:text-brand'}
                    />
                    {item.name}
                  </div>
                  {item.badge && (
                    <Badge
                      variant={isActive(item.href) ? 'neutral' : 'primary'}
                      size="sm"
                      className={isActive(item.href) ? 'bg-white/20 text-white' : ''}
                    >
                      {item.badge}
                    </Badge>
                  )}
                </Link>
              ))}
            </div>
          </div>

          {/* Secondary Navigation */}
          <div className="mb-4">
            <p className="px-3 text-xs font-semibold text-muted uppercase tracking-wider mb-2">
              Account
            </p>
            <div className="space-y-1">
              {secondaryNavigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`
                    flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium
                    transition-all duration-200 group
                    ${isActive(item.href)
                      ? 'gradient-bg text-white shadow-lg shadow-blue-500/20'
                      : 'text-secondary hover:text-primary hover:bg-tertiary'
                    }
                  `}
                >
                  <item.icon
                    size={20}
                    className={isActive(item.href) ? 'text-white' : 'text-muted group-hover:text-brand'}
                  />
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Upgrade Card */}
          <div className="card gradient-bg-secondary p-4 text-white">
            <div className="flex items-center gap-2 mb-2">
              <AwardIcon size={20} />
              <span className="font-semibold">Go Premium</span>
            </div>
            <p className="text-sm text-white/80 mb-3">
              Unlock exclusive features and stand out from the crowd.
            </p>
            <button className="w-full py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium transition-colors">
              Upgrade Now
            </button>
          </div>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-[rgb(var(--color-border))]">
          <div className="flex flex-wrap gap-2 text-xs text-muted">
            <a href="#" className="hover:text-brand">About</a>
            <span>•</span>
            <a href="#" className="hover:text-brand">Privacy</a>
            <span>•</span>
            <a href="#" className="hover:text-brand">Terms</a>
            <span>•</span>
            <a href="#" className="hover:text-brand">Help</a>
          </div>
          <p className="text-xs text-muted mt-2">© 2024 SkillSphere</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;