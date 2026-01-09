import React, { useState, useEffect } from 'react';
import {
  ImageIcon,
  VideoIcon,
  FileTextIcon,
  CalendarIcon,
  SmileIcon,
  SendIcon
} from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Sidebar from '../components/layout/Sidebar';
import RightSidebar from '../components/layout/RightSidebar';
import CreatePost from '../components/post/CreatePost';
import PostCard from '../components/post/PostCard';
import { Card, Avatar, Spinner } from '../components/ui';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../config/firebase';
import { collection, query, orderBy, limit, onSnapshot, getDocs } from 'firebase/firestore';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const { userProfile, currentUser } = useAuth();

  useEffect(() => {
    // Set up real-time listener for posts
    const postsRef = collection(db, 'posts');
    const postsQuery = query(postsRef, orderBy('createdAt', 'desc'), limit(20));

    const unsubscribe = onSnapshot(postsQuery, (snapshot) => {
      const postsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setPosts(postsData);
      setLoading(false);
    }, (error) => {
      console.error('Error fetching posts:', error);
      setLoading(false);
      // Fallback to mock data for demo
      setPosts(mockPosts);
    });

    return () => unsubscribe();
  }, []);

  // Mock posts for demo
  const mockPosts = [
    {
      id: 1,
      user: {
        name: 'Sarah Chen',
        headline: 'Senior UX Designer at Google',
        avatar: null,
        online: true
      },
      content: {
        text: `🚀 Excited to share my thoughts on the future of AI in UX design!\n\nAfter spending months researching and implementing AI-powered design tools, I've compiled my key learnings. The intersection of artificial intelligence and user experience is creating unprecedented opportunities for designers.\n\nHere are my top 3 insights:\n\n1. AI assists, humans design - The best results come from human-AI collaboration\n2. Personalization at scale is now possible\n3. Ethical considerations must be front and center`,
        images: ['https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800']
      },
      skills: ['UX Design', 'AI/ML', 'Product Design'],
      stats: { likes: 234, comments: 45, shares: 12, views: 1.2 },
      visibility: 'public',
      createdAt: new Date(Date.now() - 3600000).toISOString(),
      topComment: {
        user: 'Michael Brown',
        text: 'This is exactly what I needed to read today! Would love to discuss this further.',
        likes: 5
      }
    },
    {
      id: 2,
      user: {
        name: 'Alex Morgan',
        headline: 'Full Stack Developer | React & Node.js',
        avatar: null,
        online: false
      },
      content: {
        text: `Just launched my new open-source project! 🎉\n\nIt's a React component library built with TypeScript, Tailwind CSS, and accessibility in mind.\n\n✅ 50+ components\n✅ Dark mode support\n✅ Fully accessible\n✅ Tree-shakeable\n\nCheck it out and let me know what you think!`
      },
      skills: ['React', 'TypeScript', 'Open Source'],
      stats: { likes: 567, comments: 89, shares: 45, views: 2.8 },
      visibility: 'public',
      createdAt: new Date(Date.now() - 7200000).toISOString(),
      topComment: {
        user: 'Emily Davis',
        text: 'Amazing work! Already added it to our project 🔥',
        likes: 12
      }
    },
    {
      id: 3,
      user: {
        name: 'David Kim',
        headline: 'Data Scientist | Machine Learning Engineer',
        avatar: null,
        online: true
      },
      content: {
        text: `🧠 Breaking down complex ML concepts:\n\nToday's topic: Transfer Learning\n\nTransfer learning allows us to leverage pre-trained models and adapt them to new tasks. This is especially useful when you have limited training data.\n\nKey benefits:\n• Faster training time\n• Better performance with less data\n• Reduced computational costs\n\nWhat ML topics would you like me to explain next?`,
        video: {
          thumbnail: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800',
          duration: 180
        }
      },
      skills: ['Machine Learning', 'Python', 'Data Science'],
      stats: { likes: 892, comments: 156, shares: 78, views: 5.4 },
      visibility: 'public',
      createdAt: new Date(Date.now() - 14400000).toISOString()
    }
  ];

  // Use mock posts if no real posts
  const displayPosts = posts.length > 0 ? posts : mockPosts;

  return (
    <div className="min-h-screen bg-secondary">
      <Navbar />
      <Sidebar />

      {/* Main Content */}
      <div className="md:pl-64 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Main Feed */}
            <div className="lg:col-span-9 space-y-4">
              {/* Create Post Card */}
              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <Avatar
                    src={userProfile?.photoURL}
                    name={userProfile?.displayName || currentUser?.email}
                    size="md"
                  />
                  <button
                    onClick={() => setShowCreatePost(true)}
                    className="flex-1 px-4 py-3 text-left text-muted bg-tertiary hover:bg-hover rounded-xl transition-colors"
                  >
                    What skill are you working on, {userProfile?.displayName?.split(' ')[0] || 'there'}?
                  </button>
                </div>

                {/* Quick Actions */}
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-[rgb(var(--color-border))]">
                  <button
                    onClick={() => setShowCreatePost(true)}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-secondary hover:text-primary hover:bg-tertiary rounded-lg transition-colors"
                  >
                    <ImageIcon size={20} className="text-green-500" />
                    Photo
                  </button>
                  <button
                    onClick={() => setShowCreatePost(true)}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-secondary hover:text-primary hover:bg-tertiary rounded-lg transition-colors"
                  >
                    <VideoIcon size={20} className="text-blue-500" />
                    Video
                  </button>
                  <button
                    onClick={() => setShowCreatePost(true)}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-secondary hover:text-primary hover:bg-tertiary rounded-lg transition-colors"
                  >
                    <FileTextIcon size={20} className="text-orange-500" />
                    Article
                  </button>
                  <button
                    onClick={() => setShowCreatePost(true)}
                    className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm font-medium text-secondary hover:text-primary hover:bg-tertiary rounded-lg transition-colors"
                  >
                    <CalendarIcon size={20} className="text-purple-500" />
                    Event
                  </button>
                </div>
              </Card>

              {/* Feed Tabs */}
              <div className="flex items-center gap-1 p-1 bg-tertiary rounded-xl">
                <button className="flex-1 py-2 px-4 text-sm font-medium rounded-lg gradient-bg text-white shadow-lg">
                  For You
                </button>
                <button className="flex-1 py-2 px-4 text-sm font-medium rounded-lg text-secondary hover:text-primary hover:bg-primary transition-colors">
                  Following
                </button>
                <button className="flex-1 py-2 px-4 text-sm font-medium rounded-lg text-secondary hover:text-primary hover:bg-primary transition-colors">
                  Recent
                </button>
              </div>

              {/* Posts Feed */}
              {loading ? (
                <div className="flex justify-center py-12">
                  <Spinner.Inline message="Loading posts..." />
                </div>
              ) : (
                <div className="space-y-4">
                  {displayPosts.map((post) => (
                    <PostCard key={post.id} post={post} />
                  ))}
                </div>
              )}

              {!loading && displayPosts.length === 0 && (
                <Card className="p-12 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-tertiary flex items-center justify-center">
                    <FileTextIcon size={32} className="text-muted" />
                  </div>
                  <h3 className="text-lg font-semibold text-primary mb-2">No posts yet</h3>
                  <p className="text-tertiary mb-4">
                    Be the first to share something with the community!
                  </p>
                  <button
                    onClick={() => setShowCreatePost(true)}
                    className="btn btn-primary"
                  >
                    Create a Post
                  </button>
                </Card>
              )}
            </div>

            {/* Right Sidebar */}
            <RightSidebar />
          </div>
        </div>
      </div>

      {/* Create Post Modal */}
      {showCreatePost && (
        <CreatePost onClose={() => setShowCreatePost(false)} />
      )}
    </div>
  );
};

export default Home;
