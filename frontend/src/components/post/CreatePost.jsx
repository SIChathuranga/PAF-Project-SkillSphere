import React, { useState } from 'react';
import Card from '../ui/Card';
import axios from 'axios';

const CreatePost = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [description, setDescription] = useState('');
  const [username] = useState('JD'); // Placeholder, should come from auth
  const [successMessage, setSuccessMessage] = useState('');

  // Handle post submission
  const handlePostSubmit = async (e) => {
    e.preventDefault(); // Prevent the form from refreshing the page

    if (!description.trim()) return; // Prevent submission if description is empty

    const postData = { username, description };

    try {
      // Send post data to backend
      const response = await axios.post('http://localhost:8080/posts', postData);
      
      if (response.status === 200) {
        setDescription('');
        setIsExpanded(false);
        setSuccessMessage('Post created successfully!'); // Success message
      } else {
        console.error('Error posting:', response);
        setSuccessMessage('Error creating post.');
      }
    } catch (error) {
      console.error('Error creating post:', error);
      setSuccessMessage('Error creating post.');
    }
  };

  return (
    <Card className="mb-4">
      <div className="flex items-start space-x-3">
        <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white flex-shrink-0">
          {username}
        </div>
        <div className="flex-1">
          {!isExpanded ? (
            <div
              className="w-full px-4 py-2 bg-gray-50 rounded-lg text-gray-500 cursor-text"
              onClick={() => setIsExpanded(true)}
            >
              Share a skill or knowledge...
            </div>
          ) : (
            <>
              {/* Form element */}
              <form onSubmit={handlePostSubmit}>
                {/* Textarea for description */}
                <textarea
                  className="w-full px-4 py-2 bg-gray-50 rounded-lg text-gray-900 focus:outline-none"
                  placeholder="Share a skill or knowledge..."
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)} // Bind value to description state
                />
                {/* Submit button */}
                <div className="flex justify-end mt-2">
                  <button
                    className="bg-blue-600 text-white px-6 py-1.5 rounded-full text-sm font-medium hover:bg-blue-700 transition-colors"
                    type="submit" // Use submit type for form submission
                  >
                    Post
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
      {/* Success message */}
      {successMessage && <div className="mt-2 text-center text-sm text-green-500">{successMessage}</div>}
    </Card>
  );
};

export default CreatePost;
