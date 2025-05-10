// src/components/comment/commentinput.jsx
import React, { useState } from 'react';

const CommentInput = ({ onSubmit, placeholder = 'Write a comment...' }) => {
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (comment.trim() && !isSubmitting) {
      setIsSubmitting(true);
      try {
        await onSubmit(comment);
        setComment('');
      } catch (error) {
        console.error('Failed to submit comment:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="flex space-x-2 mt-4">
      <div className="flex-shrink-0">
        <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
          JD
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <div className="bg-gray-100 rounded-2xl px-4 py-2">
          <div className="flex items-center">
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={placeholder}
              disabled={isSubmitting}
              className="w-full bg-transparent focus:outline-none text-sm text-gray-800 placeholder:text-gray-500 disabled:opacity-50"
            />
            {comment.trim() && (
              <button 
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="ml-2 text-blue-600 hover:text-blue-700 text-sm font-medium flex-shrink-0 disabled:opacity-50"
              >
                {isSubmitting ? 'Posting...' : 'Post'}
              </button>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-4 mt-1 text-xs">
          <button type="button" className="text-gray-500 hover:text-blue-600 font-medium">
            Like
          </button>
          <button type="button" className="text-gray-500 hover:text-blue-600 font-medium">
            Reply
          </button>
          <span className="text-gray-500">Press Enter to post</span>
        </div>
      </div>
      <div className="relative">
        {/* Empty space to maintain alignment with comment items */}
        <div className="p-1 w-6 h-6 opacity-0">
          <div className="w-6 h-6"></div>
        </div>
      </div>
    </div>
  );
};

export default CommentInput;