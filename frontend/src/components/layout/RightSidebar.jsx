import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUpIcon, UserPlusIcon, BookOpenIcon } from 'lucide-react';
import Card from '../ui/Card';
const RightSidebar = () => {
  return <div className="hidden lg:block lg:col-span-3">
      <div className="sticky top-20">
        {/* Trending Skills */}
        <Card className="mb-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-gray-900 flex items-center">
              <TrendingUpIcon size={16} className="mr-2 text-blue-600" />
              Trending Skills
            </h3>
            <Link to="#" className="text-xs text-blue-600 hover:text-blue-800">
              View all
            </Link>
          </div>
          <div className="space-y-3">
            {[{
            name: 'React Native',
            count: 1250
          }, {
            name: 'UI Animation',
            count: 986
          }, {
            name: 'TypeScript',
            count: 752
          }, {
            name: 'Data Visualization',
            count: 621
          }].map((skill, index) => <div key={index} className="flex items-center justify-between">
                <Link to="#" className="text-sm text-gray-800 hover:text-blue-600">
                  #{skill.name}
                </Link>
                <span className="text-xs text-gray-500">
                  {skill.count} posts
                </span>
              </div>)}
          </div>
        </Card>
        {/* Suggested Connections */}
        <Card className="mb-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-gray-900 flex items-center">
              <UserPlusIcon size={16} className="mr-2 text-blue-600" />
              Suggested Connections
            </h3>
            <Link to="#" className="text-xs text-blue-600 hover:text-blue-800">
              View all
            </Link>
          </div>
          <div className="space-y-4">
            {[{
            name: 'Alex Morgan',
            role: 'Frontend Developer',
            image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            mutualConnections: 4
          }, {
            name: 'Taylor Kim',
            role: 'UX Designer',
            image: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            mutualConnections: 2
          }].map((person, index) => <div key={index} className="flex items-center">
                <img className="h-10 w-10 rounded-full" src={person.image} alt={person.name} />
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    {person.name}
                  </p>
                  <p className="text-xs text-gray-500">{person.role}</p>
                  <p className="text-xs text-gray-500">
                    {person.mutualConnections} mutual connections
                  </p>
                </div>
                <button className="ml-2 flex-shrink-0 text-xs font-medium text-blue-600 hover:text-blue-800">
                  Connect
                </button>
              </div>)}
          </div>
        </Card>
        {/* Popular Learning Plans */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-gray-900 flex items-center">
              <BookOpenIcon size={16} className="mr-2 text-blue-600" />
              Popular Learning Plans
            </h3>
            <Link to="#" className="text-xs text-blue-600 hover:text-blue-800">
              Browse all
            </Link>
          </div>
          <div className="space-y-3">
            {[{
            title: 'Mastering React Hooks',
            author: 'Jamie Larson',
            followers: 1823
          }, {
            title: 'UX Research Fundamentals',
            author: 'Sara Chen',
            followers: 945
          }].map((plan, index) => <div key={index} className="border border-gray-100 rounded-lg p-3 bg-gray-50">
                <p className="text-sm font-medium text-gray-900">
                  {plan.title}
                </p>
                <p className="text-xs text-gray-500">By {plan.author}</p>
                <div className="mt-2 flex justify-between items-center">
                  <span className="text-xs text-gray-500">
                    {plan.followers} followers
                  </span>
                  <button className="text-xs font-medium text-blue-600 hover:text-blue-800">
                    Save
                  </button>
                </div>
              </div>)}
          </div>
        </Card>
      </div>
    </div>;
};
export default RightSidebar;