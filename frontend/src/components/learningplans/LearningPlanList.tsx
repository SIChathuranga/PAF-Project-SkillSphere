import React, { Component } from 'react';
import LearningPlanCard from './LearningPlanCard';
interface LearningPlanListProps {
  isCompany?: boolean;
}
const LearningPlanList = ({
  isCompany = false
}: LearningPlanListProps) => {
  const SAMPLE_LEARNING_PLANS = [{
    id: 1,
    company: {
      name: 'TechCorp Academy',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    timestamp: '2 days ago',
    sections: [{
      title: 'Introduction to React Fundamentals',
      description: 'Learn the core concepts of React including components, props, and state management.',
      isCompleted: false
    }, {
      title: 'Advanced Component Patterns',
      description: 'Explore advanced patterns like render props, HOCs, and custom hooks.',
      isCompleted: false
    }, {
      title: 'State Management with Redux',
      description: 'Master global state management using Redux and middleware.',
      isCompleted: false
    }],
    stats: {
      likes: 245,
      comments: 18,
      followers: 156
    },
    isFollowing: false
  }, {
    id: 2,
    company: {
      name: 'Design Masters'
    },
    timestamp: '5 days ago',
    sections: [{
      title: 'UI Design Principles',
      description: 'Understanding core principles of user interface design.',
      isCompleted: false
    }, {
      title: 'Color Theory in Practice',
      description: 'Learn how to use color effectively in digital designs.',
      isCompleted: false
    }, {
      title: 'Typography Fundamentals',
      description: 'Master the art of selecting and combining typefaces.',
      isCompleted: false
    }],
    stats: {
      likes: 189,
      comments: 12,
      followers: 98
    },
    isFollowing: true
  }];
  const handleToggleFollow = (planId: number) => {
    console.log('Toggle follow for plan:', planId);
  };
  const handleToggleComplete = (planId: number, sectionIndex: number) => {
    console.log('Toggle complete for plan:', planId, 'section:', sectionIndex);
  };
  return <div className="space-y-6">
      {SAMPLE_LEARNING_PLANS.map(plan => <LearningPlanCard key={plan.id} plan={plan} isCompany={isCompany} onToggleFollow={handleToggleFollow} onToggleComplete={handleToggleComplete} />)}
    </div>;
};
export default LearningPlanList;