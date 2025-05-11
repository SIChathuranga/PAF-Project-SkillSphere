// LearningPlanList.jsx
import React, { useEffect, useState } from 'react';

const Card = ({ className = '', children }) => {
  return <div className={`rounded-xl border bg-white p-6 shadow-sm ${className}`}>{children}</div>;
};

const LearningPlanCard = ({ plan, isCompany = false, onToggleFollow, onToggleComplete }) => {
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

  const handleComplete = async (index) => {
    await onToggleComplete(plan.id, index);
    const updated = [...completedSections];
    updated[index] = !updated[index];
    setCompletedSections(updated);
  };

  return (
    <Card className="mb-4">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-900 font-medium border-2 border-white ring-2 ring-gray-100">
            {plan.company.image ? (
              <img src={plan.company.image} alt={plan.company.name} className="h-full w-full rounded-full object-cover" />
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
                <span className="inline-flex items-center gap-1 text-sm text-green-600 bg-green-50 px-2 py-1 rounded-full">✅ Complete!</span>
              )}
            </div>
            <span className="text-sm font-medium text-gray-700">{Math.round(completionProgress)}%</span>
          </div>
          <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ease-out ${completionProgress === 100 ? 'bg-green-500' : 'bg-gradient-to-r from-blue-500 to-blue-600'}`}
              style={{ width: `${completionProgress}%` }}
            />
          </div>
        </div>
      )}

      <div className="space-y-3">
        {plan.sections.map((section, index) => (
          <div key={index} className={`flex gap-3 p-4 rounded-xl transition-colors ${completedSections[index] ? 'bg-blue-50/50 ring-1 ring-blue-100' : 'hover:bg-gray-50'}`}>
            {!isCompany && (
              <div className="pt-0.5">
                <label className="relative flex items-center cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={completedSections[index]}
                    onChange={() => handleComplete(index)}
                    className="sr-only peer"
                  />
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 transition-all ${completedSections[index] ? 'bg-blue-600 border-transparent' : 'border-gray-300 bg-white group-hover:border-blue-500'}`}>
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
          onClick={() => onToggleFollow(plan.id)}
          className="text-sm text-blue-600 hover:underline"
        >
          {plan.isFollowing ? 'Unfollow' : 'Follow'}
        </button>
      </div>
    </Card>
  );
};

const LearningPlanInsider = ({ isCompany = false }) => {
  const [plans, setPlans] = useState([]);
  const [filteredPlans, setFilteredPlans] = useState([]);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('recent');
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const pageSize = 5;

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await fetch('/api/learning-plans');
        const data = await res.json();
        setPlans(data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch plans", err);
      }
    };
    fetchPlans();
  }, []);

  useEffect(() => {
    const searchFiltered = plans.filter(plan =>
      plan.company.name.toLowerCase().includes(search.toLowerCase())
    );

    const sorted = [...searchFiltered].sort((a, b) => {
      if (sortBy === 'popular') return b.stats.followers - a.stats.followers;
      if (sortBy === 'likes') return b.stats.likes - a.stats.likes;
      return new Date(b.timestamp) - new Date(a.timestamp);
    });

    setFilteredPlans(sorted.slice(0, page * pageSize));
  }, [plans, search, sortBy, page]);

  const handleToggleFollow = async (planId) => {
    await fetch(`/api/learning-plans/${planId}/follow`, { method: 'POST' });
    setPlans(prev =>
      prev.map(plan =>
        plan.id === planId ? { ...plan, isFollowing: !plan.isFollowing } : plan
      )
    );
  };

  const handleToggleComplete = async (planId, sectionIndex) => {
    await fetch(`/api/learning-plans/${planId}/sections/${sectionIndex}`, { method: 'PATCH' });
  };

  if (loading) return <p>Loading learning plans...</p>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search plans..."
          className="px-3 py-2 border rounded w-full max-w-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="ml-4 px-2 py-2 border rounded"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="recent">Newest</option>
          <option value="popular">Most Followers</option>
          <option value="likes">Most Likes</option>
        </select>
      </div>

      {filteredPlans.map(plan => (
        <LearningPlanCard
          key={plan.id}
          plan={plan}
          isCompany={isCompany}
          onToggleFollow={handleToggleFollow}
          onToggleComplete={handleToggleComplete}
        />
      ))}

      {filteredPlans.length < plans.length && (
        <button
          onClick={() => setPage(prev => prev + 1)}
          className="text-sm text-blue-600 hover:underline"
        >
          Load More
        </button>
      )}
    </div>
  );
};

export default LearningPlanInsider;