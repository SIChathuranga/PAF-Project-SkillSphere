import React from 'react';
import { Link } from 'react-router-dom';
import {
  TrendingUpIcon,
  UsersIcon,
  CalendarIcon,
  SparklesIcon,
  ExternalLinkIcon,
  FlameIcon
} from 'lucide-react';
import { Avatar, Badge, Card } from '../ui';

const RightSidebar = () => {
  // Sample data - will be replaced with Firebase data
  const trendingTopics = [
    { name: 'React 19', posts: '2.4k', trend: 'up' },
    { name: 'AI in 2024', posts: '1.8k', trend: 'up' },
    { name: 'Remote Work', posts: '1.2k', trend: 'stable' },
    { name: 'TypeScript', posts: '980', trend: 'up' },
    { name: 'Web3', posts: '756', trend: 'down' },
  ];

  const suggestedConnections = [
    {
      id: 1,
      name: 'Sarah Chen',
      headline: 'Senior UX Designer at Google',
      avatar: null,
      mutualConnections: 12
    },
    {
      id: 2,
      name: 'Michael Brown',
      headline: 'Full Stack Developer',
      avatar: null,
      mutualConnections: 8
    },
    {
      id: 3,
      name: 'Emily Davis',
      headline: 'Product Manager at Meta',
      avatar: null,
      mutualConnections: 5
    },
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: 'React Conf 2024',
      date: 'Jan 15, 2024',
      attendees: 234,
      type: 'Virtual'
    },
    {
      id: 2,
      title: 'AI/ML Workshop',
      date: 'Jan 20, 2024',
      attendees: 89,
      type: 'In-Person'
    },
  ];

  return (
    <aside className="hidden lg:block lg:col-span-3 space-y-4">
      {/* Trending Topics */}
      <Card className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <FlameIcon size={18} className="text-orange-500" />
            <h3 className="font-semibold text-primary">Trending Topics</h3>
          </div>
          <Link to="/explore" className="text-xs text-brand hover:underline">
            See all
          </Link>
        </div>

        <div className="space-y-3">
          {trendingTopics.map((topic, index) => (
            <Link
              key={topic.name}
              to={`/topic/${topic.name.toLowerCase().replace(' ', '-')}`}
              className="flex items-center justify-between p-2 -mx-2 rounded-lg hover:bg-tertiary transition-colors group"
            >
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-muted w-5">
                  {index + 1}
                </span>
                <div>
                  <p className="text-sm font-medium text-primary group-hover:text-brand">
                    #{topic.name}
                  </p>
                  <p className="text-xs text-muted">{topic.posts} posts</p>
                </div>
              </div>
              {topic.trend === 'up' && (
                <TrendingUpIcon size={14} className="text-green-500" />
              )}
            </Link>
          ))}
        </div>
      </Card>

      {/* Suggested Connections */}
      <Card className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <UsersIcon size={18} className="text-brand" />
            <h3 className="font-semibold text-primary">People You May Know</h3>
          </div>
          <Link to="/network" className="text-xs text-brand hover:underline">
            See all
          </Link>
        </div>

        <div className="space-y-4">
          {suggestedConnections.map((person) => (
            <div key={person.id} className="flex items-start gap-3">
              <Avatar
                src={person.avatar}
                name={person.name}
                size="md"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-primary truncate">
                  {person.name}
                </p>
                <p className="text-xs text-tertiary truncate">
                  {person.headline}
                </p>
                <p className="text-xs text-muted mt-1">
                  {person.mutualConnections} mutual connections
                </p>
                <button className="mt-2 px-4 py-1.5 text-xs font-medium text-brand border border-brand rounded-full hover:bg-blue-50 dark:hover:bg-blue-950 transition-colors">
                  Connect
                </button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Upcoming Events */}
      <Card className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <CalendarIcon size={18} className="text-purple-500" />
            <h3 className="font-semibold text-primary">Upcoming Events</h3>
          </div>
          <Link to="/events" className="text-xs text-brand hover:underline">
            See all
          </Link>
        </div>

        <div className="space-y-3">
          {upcomingEvents.map((event) => (
            <Link
              key={event.id}
              to={`/events/${event.id}`}
              className="block p-3 -mx-1 rounded-lg hover:bg-tertiary transition-colors group"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-primary group-hover:text-brand">
                    {event.title}
                  </p>
                  <p className="text-xs text-tertiary mt-1">{event.date}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant={event.type === 'Virtual' ? 'primary' : 'secondary'} size="sm">
                      {event.type}
                    </Badge>
                    <span className="text-xs text-muted">
                      {event.attendees} attending
                    </span>
                  </div>
                </div>
                <ExternalLinkIcon size={14} className="text-muted group-hover:text-brand" />
              </div>
            </Link>
          ))}
        </div>
      </Card>

      {/* Premium Promo */}
      <Card variant="glass" className="p-4 gradient-bg text-white">
        <div className="flex items-center gap-2 mb-2">
          <SparklesIcon size={18} />
          <h3 className="font-semibold">Get SkillSphere Premium</h3>
        </div>
        <p className="text-sm text-white/80 mb-3">
          Unlock exclusive features, analytics, and unlimited learning content.
        </p>
        <button className="w-full py-2 bg-white text-blue-600 rounded-lg text-sm font-medium hover:bg-white/90 transition-colors">
          Try Premium Free
        </button>
      </Card>

      {/* Footer Links */}
      <div className="px-2 text-xs text-muted">
        <div className="flex flex-wrap gap-x-3 gap-y-1">
          <a href="#" className="hover:text-brand hover:underline">About</a>
          <a href="#" className="hover:text-brand hover:underline">Accessibility</a>
          <a href="#" className="hover:text-brand hover:underline">Help Center</a>
          <a href="#" className="hover:text-brand hover:underline">Privacy</a>
          <a href="#" className="hover:text-brand hover:underline">Terms</a>
          <a href="#" className="hover:text-brand hover:underline">Advertising</a>
        </div>
        <p className="mt-3">© 2024 SkillSphere. All rights reserved.</p>
      </div>
    </aside>
  );
};

export default RightSidebar;