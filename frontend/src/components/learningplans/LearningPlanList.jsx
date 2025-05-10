import React, { useState } from 'react';

// Inline Card component
const Card = ({ className = '', children }) => {
  return (
    <div className={`rounded-xl border bg-white p-6 shadow-sm ${className}`}>
      {children}
    </div>
  );
};

// Inline LearningPlanCard component (simplified version)
const LearningPlanCard = ({ plan, isCompany = false, onToggleFollow, onToggleComplete }) => {
  const [completionProgress, setCompletionProgress] = useState(0);
  const [completedSections, setCompletedSections] = useState(
    plan.sections.map(section => section.isCompleted || false)
  );

  React.useEffect(() => {
    if (!isCompany) {
      const completed = completedSections.filter(Boolean).length;
      const total = plan.sections.length;
      const progress = (completed / total) * 100;
      setCompletionProgress(progress);
    }
  }, [completedSections, isCompany, plan.sections.length]);

  const handleComplete = (index) => {
    const newCompleted = [...completedSections];
    newCompleted[index] = !newCompleted[index];
    setCompletedSections(newCompleted);
    onToggleComplete?.(plan.id, index);
  };

  return (
    <Card className="mb-4">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-900 font-medium border-2 border-white ring-2 ring-gray-100">
            {plan.company.image ? (
              <img
                src={plan.company.image}
                alt={plan.company.name}
                className="h-full w-full rounded-full object-cover"
              />
            ) : (
              plan.company.name.charAt(0)
            )}
          </div>
          <div className="ml-3">
            <p className="text-base font-medium text-gray-900">{plan.company.name}</p>
            <p className="text-sm text-gray-500">{plan.timestamp}</p>
          </div>
        </div>
      </div>

      {!isCompany && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-900">Your Progress</span>
              {completionProgress === 100 && (
                <span className="inline-flex items-center gap-1 text-sm text-green-600 bg-green-50 px-2 py-1 rounded-full">
                  ✅ Complete!
                </span>
              )}
            </div>
            <span className="text-sm font-medium text-gray-700">
              {Math.round(completionProgress)}%
            </span>
          </div>
          <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ease-out ${
                completionProgress === 100
                  ? 'bg-green-500'
                  : 'bg-gradient-to-r from-blue-500 to-blue-600'
              }`}
              style={{ width: `${completionProgress}%` }}
            />
          </div>
        </div>
      )}

      <div className="space-y-3">
        {plan.sections.map((section, index) => (
          <div
            key={index}
            className={`flex gap-3 p-4 rounded-xl transition-colors ${
              completedSections[index]
                ? 'bg-blue-50/50 ring-1 ring-blue-100'
                : 'hover:bg-gray-50'
            }`}
          >
            {!isCompany && (
              <div className="pt-0.5">
                <label className="relative flex items-center cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={completedSections[index]}
                    onChange={() => handleComplete(index)}
                    className="sr-only peer"
                  />
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center border-2 transition-all ${
                      completedSections[index]
                        ? 'bg-blue-600 border-transparent'
                        : 'border-gray-300 bg-white group-hover:border-blue-500'
                    }`}
                  >
                    {completedSections[index] ? (
                      <span className="text-white text-xs">✔</span>
                    ) : (
                      <span className="text-transparent group-hover:text-blue-500">○</span>
                    )}
                  </div>
                </label>
              </div>
            )}
            <div>
              <h3 className="text-base font-medium text-gray-900">{section.title}</h3>
              <p className="mt-1 text-sm text-gray-600">{section.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
        <div className="text-sm text-gray-600">
          👍 {plan.stats.likes} · 💬 {plan.stats.comments} · 👥 {plan.stats.followers}
        </div>
        <button
          onClick={() => onToggleFollow?.(plan.id)}
          className="text-sm text-blue-600 hover:underline"
        >
          {plan.isFollowing ? 'Unfollow' : 'Follow'}
        </button>
      </div>
    </Card>
  );
};

const LearningPlanList = ({ isCompany = false }) => {
  const SAMPLE_LEARNING_PLANS = [
    {
      id: 1,
      company: {
        name: 'TechCorp Academy',
        image:
          'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      },
      timestamp: '2 days ago',
      sections: [
        {
          title: 'Introduction to React Fundamentals',
          description:
            'Learn the core concepts of React including components, props, and state management.',
          isCompleted: false
        },
        {
          title: 'Advanced Component Patterns',
          description:
            'Explore advanced patterns like render props, HOCs, and custom hooks.',
          isCompleted: false
        },
        {
          title: 'State Management with Redux',
          description: 'Master global state management using Redux and middleware.',
          isCompleted: false
        }
      ],
      stats: {
        likes: 245,
        comments: 18,
        followers: 156
      },
      isFollowing: false
    },
    {
      id: 2,
      company: {
        name: 'Design Masters'
      },
      timestamp: '5 days ago',
      sections: [
        {
          title: 'UI Design Principles',
          description: 'Understanding core principles of user interface design.',
          isCompleted: false
        },
        {
          title: 'Color Theory in Practice',
          description: 'Learn how to use color effectively in digital designs.',
          isCompleted: false
        },
        {
          title: 'Typography Fundamentals',
          description: 'Master the art of selecting and combining typefaces.',
          isCompleted: false
        }
      ],
      stats: {
        likes: 189,
        comments: 12,
        followers: 98
      },
      isFollowing: true
    }
  ];

  const handleToggleFollow = (planId) => {
    console.log('Toggle follow for plan:', planId);
  };

  const handleToggleComplete = (planId, sectionIndex) => {
    console.log('Toggle complete for plan:', planId, 'section:', sectionIndex);
  };

  return (
    <div className="space-y-6">
      {SAMPLE_LEARNING_PLANS.map((plan) => (
        <LearningPlanCard
          key={plan.id}
          plan={plan}
          isCompany={isCompany}
          onToggleFollow={handleToggleFollow}
          onToggleComplete={handleToggleComplete}
        />
      ))}
    </div>
  );
};

export default LearningPlanList;
