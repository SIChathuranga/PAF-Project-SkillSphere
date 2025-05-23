import React, { useEffect, useState } from 'react';
import {
  ThumbsUpIcon,
  MessageSquareIcon,
  ShareIcon,
  BookmarkIcon,
  CheckCircleIcon,
  CircleIcon
} from 'lucide-react';

// Inline Card component
const Card = ({ className = '', children }) => {
  return (
    <div className={`rounded-xl border bg-white p-6 shadow-sm ${className}`}>
      {children}
    </div>
  );
};

const LearningPlanCard = ({
  plan,
  isCompany = false,
  onToggleFollow,
  onToggleComplete
}) => {
  const [completionProgress, setCompletionProgress] = useState(0);
  const [completedSections, setCompletedSections] = useState(
    plan.sections.map(section => section.isCompleted || false)
  );

  useEffect(() => {
    if (!isCompany) {
      const completed = completedSections.filter(Boolean).length;
      const total = plan.sections.length;
      const progress = (completed / total) * 100;
      setCompletionProgress(progress);
    }
  }, [completedSections, isCompany, plan.sections.length]);

  const handleComplete = (index) => {
    const newCompletedSections = [...completedSections];
    newCompletedSections[index] = !newCompletedSections[index];
    setCompletedSections(newCompletedSections);
    onToggleComplete?.(plan.id, index);
  };

  return (
    <Card className="mb-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-900 flex-shrink-0 font-medium border-2 border-white ring-2 ring-gray-100">
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
            <p className="text-base font-medium text-gray-900">
              {plan.company.name}
            </p>
            <p className="text-sm text-gray-500">{plan.timestamp}</p>
          </div>
        </div>
      </div>

      {/* Progress Section */}
      {!isCompany && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-900">
                Your Progress
              </span>
              {completionProgress === 100 && (
                <span className="inline-flex items-center gap-1 text-sm text-green-600 bg-green-50 px-2 py-1 rounded-full">
                  <CheckCircleIcon size={14} />
                  Complete!
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

      {/* Learning Sections */}
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
                      <CheckCircleIcon size={16} className="text-white" />
                    ) : (
                      <CircleIcon
                        size={16}
                        className="text-transparent group-hover:text-blue-500"
                      />
                    )}
                  </div>
                </label>
              </div>
            )}
            <div>
              <h3 className="text-base font-medium text-gray-900">
                {section.title}
              </h3>
              <p className="mt-1 text-sm text-gray-600">{section.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Engagement Stats */}
      <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
        <div className="flex items-center space-x-6">
          <div className="flex items-center">
            <button className="text-gray-500 hover:text-blue-600">
              <ThumbsUpIcon size={18} />
            </button>
            <span className="ml-2 text-sm text-gray-600">{plan.stats.likes}</span>
          </div>
          <div className="flex items-center">
            <button className="text-gray-500 hover:text-blue-600">
              <MessageSquareIcon size={18} />
            </button>
            <span className="ml-2 text-sm text-gray-600">
              {plan.stats.comments}
            </span>
          </div>
          <div className="flex items-center">
            <button className="text-gray-500 hover:text-blue-600">
              <ShareIcon size={18} />
            </button>
          </div>
        </div>
        <button className="text-gray-500 hover:text-blue-600">
          <BookmarkIcon size={18} />
        </button>
      </div>
    </Card>
  );
};

export default LearningPlanCard;
