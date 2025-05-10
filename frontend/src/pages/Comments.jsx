// src/App.js
import React, { useState } from 'react';
import CommentForm from '../components/comment/commentform';

function Comments() {
  // Sample posts data
  const [posts] = useState([
    {
      id: 'post123',
      title: 'Getting Started with Spring Boot and React',
      content: 'Spring Boot is a great framework for building Java applications quickly and efficiently. When paired with React on the frontend, you can create powerful full-stack applications.',
      author: 'John Developer',
      date: '2025-05-09'
    },
    {
      id: 'post456',
      title: 'Building a Comment System with Spring and MongoDB',
      content: 'In this tutorial, we will build a complete comment system using Spring Boot for the backend API and MongoDB as our database. We\'ll also create a clean React interface for users to interact with our comments.',
      author: 'Jane Coder',
      date: '2025-05-08'
    }
  ]);

  const [currentPostId, setCurrentPostId] = useState('post123');

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-6xl mx-auto py-6 px-4">
          <h1 className="text-2xl font-bold text-gray-900">Blog Posts with Full CRUD Comments</h1>
        </div>
      </header>
      
      <main className="max-w-6xl mx-auto py-6 px-4">
        {/* Post Selection */}
        <div className="mb-6">
          <label htmlFor="post-select" className="block text-sm font-medium text-gray-700">
            Select a Post
          </label>
          <select 
            id="post-select"
            value={currentPostId}
            onChange={(e) => setCurrentPostId(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          >
            {posts.map(post => (
              <option key={post.id} value={post.id}>
                {post.title}
              </option>
            ))}
          </select>
        </div>
        
        {/* Post Content */}
        {posts.find(post => post.id === currentPostId) && (
          <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
            <div className="px-4 py-5 sm:px-6">
              <h2 className="text-lg leading-6 font-medium text-gray-900">
                {posts.find(post => post.id === currentPostId).title}
              </h2>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                By {posts.find(post => post.id === currentPostId).author} • 
                {new Date(posts.find(post => post.id === currentPostId).date).toLocaleDateString()}
              </p>
            </div>
            <div className="border-t border-gray-200">
              <div className="px-4 py-5 sm:p-6">
                <p className="text-gray-900">
                  {posts.find(post => post.id === currentPostId).content}
                </p>
              </div>
            </div>
          </div>
        )}
        
        {/* Comment Section */}
        <div className="mt-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Discussion</h3>
          <CommentForm postId={currentPostId} />
        </div>
      </main>
      
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-6xl mx-auto py-6 px-4">
          <p className="text-center text-gray-500 text-sm">
            &copy; 2025 Blog App. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Comments;