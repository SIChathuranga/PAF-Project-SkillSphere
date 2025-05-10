import React, { useEffect, useState } from 'react';
import Navbar from '../components/layout/Navbar';
import Sidebar from '../components/layout/Sidebar';
import RightSidebar from '../components/layout/RightSidebar';
import CreatePost from '../components/post/CreatePost';
import PostCard from '../components/post/PostCard';
import { CameraIcon, PlusIcon } from 'lucide-react';
import Button from '../components/ui/Button';
import axios from 'axios';

const Home = () => {
  const [posts, setPosts] = useState([]);

  // Fetch posts from the backend
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/posts'); // Adjust the URL to match your backend
        setPosts(response.data); // Set posts data in the state
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    fetchPosts();
  }, []); // Empty dependency array means this effect runs once when the component mounts

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Sidebar />
      <div className="pt-16 md:pl-64">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 py-6">
            <div className="lg:col-span-9">
              <div className="flex mb-4">
                <Button variant="secondary" className="flex-1 md:flex-none md:px-6 shadow-sm border-blue-100" icon={<CameraIcon size={18} />}>
                  Share a Status
                </Button>
              </div>
              <CreatePost />
              <div>
                {posts.length > 0 ? (
                  posts.map((post) => <PostCard key={post.postId} post={post} />)
                ) : (
                  <p>No posts available</p>
                )}
              </div>
            </div>
            <RightSidebar />
          </div>
        </div>
      </div>
      <div className="fixed right-4 bottom-4 md:hidden">
        <button className="bg-blue-600 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          <PlusIcon size={24} />
        </button>
      </div>
    </div>
  );
};

export default Home;
