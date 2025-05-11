// src/components/comment/commentitem.jsx
import React, { useState } from 'react';
import { ThumbsUpIcon, MoreHorizontalIcon, EditIcon, TrashIcon } from 'lucide-react';

const CommentItem = ({ comment, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(comment.comment || '');
  const [showOptions, setShowOptions] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  
  // Format the date to a readable format
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return 'just now';
      }
      
      const now = new Date();
      const diffInSeconds = Math.floor((now - date) / 1000);
      
      if (diffInSeconds < 60) return 'just now';
      if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
      if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
      return `${Math.floor(diffInSeconds / 86400)}d ago`;
    } catch (error) {
      return 'just now';
    }
  };
  
  const handleUpdate = async () => {
    if (editText.trim() && editText !== comment.comment && !isUpdating) {
      setIsUpdating(true);
      try {
        await onUpdate(comment.id, editText);
        setIsEditing(false);
      } catch (error) {
        console.error('Failed to update comment:', error);
      } finally {
        setIsUpdating(false);
      }
    }
  };

  const handleDelete = async () => {
    if (!isDeleting) {
      setIsDeleting(true);
      try {
        await onDelete(comment.id);
        setShowOptions(false);
      } catch (error) {
        console.error('Failed to delete comment:', error);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleUpdate();
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
        {isEditing ? (
          <div className="bg-white border border-gray-200 rounded-2xl px-4 py-2">
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full focus:outline-none"
              autoFocus
              disabled={isUpdating}
            />
            <div className="flex justify-end space-x-2 mt-2">
              <button 
                onClick={() => {
                  setIsEditing(false);
                  setEditText(comment.comment);
                }}
                disabled={isUpdating}
                className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700 disabled:opacity-50"
              >
                Cancel
              </button>
              <button 
                onClick={handleUpdate}
                disabled={isUpdating}
                className="px-3 py-1 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
              >
                {isUpdating ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-gray-100 rounded-2xl px-4 py-2">
            <p className="font-medium text-sm text-gray-900">User</p>
            <p className="text-sm text-gray-800">{comment.comment}</p>
          </div>
        )}
        <div className="flex items-center space-x-4 mt-1 text-xs">
          <button className="text-gray-500 hover:text-blue-600 font-medium">
            Like
          </button>
          <button className="text-gray-500 hover:text-blue-600 font-medium">
            Reply
          </button>
          <span className="text-gray-500">
            {formatDate(comment.createdAt)}
          </span>
        </div>
      </div>
      <div className="relative">
        <button 
          className="p-1 hover:bg-gray-100 rounded-full"
          onClick={() => setShowOptions(!showOptions)}
        >
          <MoreHorizontalIcon size={16} className="text-gray-400" />
        </button>
        
        {showOptions && (
          <div className="absolute right-0 mt-1 w-36 bg-white rounded-md shadow-lg z-10 border border-gray-200">
            <button 
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => {
                setIsEditing(true);
                setShowOptions(false);
              }}
            >
              <EditIcon size={14} className="mr-2" />
              Edit
            </button>
            <button 
              className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              <TrashIcon size={14} className="mr-2" />
              {isDeleting ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentItem;