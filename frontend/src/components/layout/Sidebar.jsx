import React from 'react';
import { Link } from 'react-router-dom';
import { HomeIcon, CameraIcon, BookOpenIcon, UsersIcon, MessageSquareIcon, BookmarkIcon } from 'lucide-react';
const Sidebar = () => {
  const navigation = [{
    name: 'Feed',
    icon: HomeIcon,
    href: '#',
    current: true
  }, {
    name: 'Status',
    icon: CameraIcon,
    href: '#',
    current: false
  }, {
    name: 'Learning Plans',
    icon: BookOpenIcon,
    href: '#',
    current: false
  }, {
    name: 'Network',
    icon: UsersIcon,
    href: '#',
    current: false
  }, {
    name: 'Messages',
    icon: MessageSquareIcon,
    href: '#',
    current: false
  }];
  return <div className="hidden md:flex md:flex-col md:w-64 md:fixed md:inset-y-0 pt-16 bg-white border-r border-gray-200">
      <div className="h-full flex flex-col justify-between overflow-y-auto">
        <div className="px-4 py-6">
          {/* User profile summary */}
          <div className="pb-5 mb-5 border-b border-gray-200">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white">
                JD
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">John Doe</p>
                <p className="text-xs text-gray-500">UX Designer at TechCorp</p>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4 text-center text-xs">
              <div className="bg-gray-50 rounded-md p-2">
                <p className="font-medium text-gray-900">127</p>
                <p className="text-gray-500">Connections</p>
              </div>
              <div className="bg-gray-50 rounded-md p-2">
                <p className="font-medium text-gray-900">1.2k</p>
                <p className="text-gray-500">Post Views</p>
              </div>
            </div>
          </div>
          {/* Navigation */}
          <nav className="space-y-1 pb-5 mb-5 border-b border-gray-200">
            {navigation.map(item => <Link key={item.name} to={item.href} className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${item.current ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:text-blue-700 hover:bg-blue-50'}`}>
                <item.icon className={`mr-3 flex-shrink-0 h-5 w-5 ${item.current ? 'text-blue-700' : 'text-gray-500 group-hover:text-blue-700'}`} aria-hidden="true" />
                {item.name}
              </Link>)}
          </nav>
          {/* Bookmarked content */}
          <div>
            <h3 className="px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Bookmarked
            </h3>
            <div className="mt-2 space-y-1">
              <Link to="#" className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-700 hover:text-blue-700 hover:bg-blue-50">
                <BookmarkIcon className="mr-3 flex-shrink-0 h-5 w-5 text-gray-500" />
                Advanced UI Design Techniques
              </Link>
              <Link to="#" className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-700 hover:text-blue-700 hover:bg-blue-50">
                <BookmarkIcon className="mr-3 flex-shrink-0 h-5 w-5 text-gray-500" />
                React Performance Optimization
              </Link>
            </div>
          </div>
        </div>
        {/* Footer */}
        <div className="px-4 py-4 border-t border-gray-200">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 16V12M12 8H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="ml-3">
              <Link to="#" className="text-sm text-gray-600 hover:text-blue-600">
                Help & Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default Sidebar;