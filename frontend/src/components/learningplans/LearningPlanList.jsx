import React, { useState } from 'react';
import { PlusIcon, TrashIcon } from 'lucide-react';
import { FaCheckCircle } from 'react-icons/fa'; // Example: react-icons import

// Inline Card component
const Card = ({ className = '', children }) => {
  return (
    <div className={`rounded-xl border bg-white p-6 shadow-sm ${className}`}>
      {children}
    </div>
  );
};

// Inline Button component
const Button = ({ type = 'button', variant = 'primary', onClick, icon, children }) => {
  const baseStyle = 'inline-flex items-center px-4 py-2 border text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2';
  const variantStyle =
    variant === 'secondary'
      ? 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50 focus:ring-blue-500'
      : 'border-transparent text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-500';

  return (
    <button type={type} onClick={onClick} className={`${baseStyle} ${variantStyle}`}>
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
};

const LearningPlanForm = () => {
  const [learningPlans, setLearningPlans] = useState([
    { title: '', description: '' },
    { title: '', description: '' },
    { title: '', description: '' }
  ]);
  const [errors, setErrors] = useState([]);

  const handleAddMore = () => {
    setLearningPlans([...learningPlans, { title: '', description: '' }]);
  };

  const handleRemove = (index) => {
    const newPlans = learningPlans.filter((_, i) => i !== index);
    setLearningPlans(newPlans);
  };

  const handleChange = (index, field, value) => {
    const newPlans = [...learningPlans];
    newPlans[index][field] = value;
    setLearningPlans(newPlans);
  };

  const validatePlans = () => {
    const newErrors = learningPlans.map((plan, index) => {
      const titleError = !plan.title.trim();
      const descriptionError = !plan.description.trim();
      return {
        title: titleError ? 'Title is required' : '',
        description: descriptionError ? 'Description is required' : ''
      };
    });
    setErrors(newErrors);
    return newErrors.every(e => !e.title && !e.description);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validatePlans()) return;
    console.log('Submitting:', learningPlans);
  };

  return (
    <Card>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="border-b border-gray-200 pb-4">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <FaCheckCircle className="text-green-500" /> Create Learning Plan
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Add your learning plan sections below. Each section should have a clear title and description.
          </p>
        </div>

        <div className="space-y-6">
          {learningPlans.map((plan, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg space-y-4 relative">
              {index > 2 && (
                <button
                  type="button"
                  onClick={() => handleRemove(index)}
                  className="absolute right-2 top-2 p-1 text-gray-400 hover:text-red-500"
                >
                  <TrashIcon size={16} />
                </button>
              )}

              <div>
                <label htmlFor={`title-${index}`} className="block text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  type="text"
                  id={`title-${index}`}
                  value={plan.title}
                  onChange={(e) => handleChange(index, 'title', e.target.value)}
                  className="mt-1 block w-full rounded-md border px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm border-gray-300"
                  placeholder="Enter section title"
                  required
                />
                {errors[index]?.title && <p className="text-sm text-red-500 mt-1">{errors[index].title}</p>}
              </div>

              <div>
                <label htmlFor={`description-${index}`} className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  id={`description-${index}`}
                  value={plan.description}
                  onChange={(e) => handleChange(index, 'description', e.target.value)}
                  rows={3}
                  className="mt-1 block w-full rounded-md border px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm border-gray-300"
                  placeholder="Enter section description"
                  required
                />
                {errors[index]?.description && <p className="text-sm text-red-500 mt-1">{errors[index].description}</p>}
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <Button
            type="button"
            variant="secondary"
            onClick={handleAddMore}
            icon={<PlusIcon size={16} />}
          >
            Add More Section
          </Button>
          <Button type="submit">Publish Learning Plan</Button>
        </div>
      </form>
    </Card>
  );
};

export default LearningPlanForm;
