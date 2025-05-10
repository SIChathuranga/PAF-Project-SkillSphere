import React from 'react';
import { Link } from 'react-router-dom';
import { BellIcon, MessageSquareIcon, SearchIcon } from 'lucide-react';
const Navbar = () => {
  return <nav className="bg-white border-b border-gray-200 fixed w-full z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            {/* Logo */}
            <Link to="/home" className="flex items-center">
              <div className="bg-gradient-to-r from-blue-600 to-blue-400 w-8 h-8 rounded-lg flex items-center justify-center">
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                  <line x1="9" y1="9" x2="9.01" y2="9"></line>
                  <line x1="15" y1="9" x2="15.01" y2="9"></line>
                </svg>
              </div>
              <span className="ml-2 text-xl font-bold text-gray-800">
                SkillSphere
              </span>
            </Link>
          </div>
          {/* Search */}
          <div className="hidden md:flex md:flex-1 md:items-center md:justify-center px-2 lg:ml-6 lg:justify-center">
            <div className="max-w-lg w-full">
              <label htmlFor="search" className="sr-only">
                Search
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <SearchIcon size={18} className="text-gray-400" />
                </div>
                <input id="search" name="search" className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 sm:text-sm" placeholder="Search for skills, people, or content" type="search" />
              </div>
            </div>
          </div>
          {/* Right navigation */}
          <div className="flex items-center">
            <button className="p-2 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <BellIcon size={20} />
            </button>
            <button className="p-2 ml-2 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <MessageSquareIcon size={20} />
            </button>
            <div className="ml-3 relative">
              <div>
                <button className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  <span className="sr-only">Open user menu</span>
                  <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                    JD
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Mobile search - visible on mobile only */}
      <div className="md:hidden p-2 border-t border-gray-200">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon size={18} className="text-gray-400" />
          </div>
          <input className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm" placeholder="Search for skills, people, or content" type="search" />
        </div>
      </div>
    </nav>;
};
export default Navbar;