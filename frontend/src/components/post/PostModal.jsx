import React, { useEffect } from 'react';
import { XIcon, ThumbsUpIcon, MessageSquareIcon, ShareIcon, BookmarkIcon, MoreHorizontalIcon, PlayIcon, GlobeIcon, UsersIcon } from 'lucide-react';
// import CommentInput from './CommentInput';
// import CommentList from './CommentList';

const PostModal = ({ isOpen, onClose, post }) => {
  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // Close modal when clicking overlay
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const sampleComments = [
    {
      id: 1,
      user: {
        name: 'Sarah Miller',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      },
      text: 'This looks amazing! Love how smooth the transition is. Would you mind sharing what tools you used?',
      timestamp: '2h ago',
      likes: 5,
      replies: [
        {
          id: 2,
          user: {
            name: 'Jamie Larson',
            image: post.user.image
          },
          text: 'Thanks Sarah! I used Principle for the prototyping and After Effects for the final animation.',
          timestamp: '1h ago',
          likes: 2
        }
      ]
    }
  ];

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center overflow-y-auto"
      onClick={handleOverlayClick}
    >
      <div
        className="relative bg-white rounded-xl shadow-xl max-w-3xl w-full mx-4 my-8 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()} // Prevent clicks inside modal from closing it
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-2 hover:bg-gray-100 rounded-full z-10 transition-colors"
        >
          <XIcon size={24} className="text-gray-500" />
        </button>
        <div className="overflow-y-auto flex-1">
          {/* Post Content */}
          <div className="p-6 border-b border-gray-200">
            {/* Author info */}
            <div className="flex items-start mb-4">
              <div className="relative">
                <div className="h-12 w-12 rounded-full overflow-hidden bg-gray-200 flex-shrink-0 border-2 border-white ring-2 ring-gray-100">
                  {post.user.image ? (
                    <img src={post.user.image} alt={post.user.name} className="h-full w-full object-cover" />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center bg-blue-500 text-white font-medium">
                      {post.user.name.charAt(0)}
                    </div>
                  )}
                </div>
              </div>
              <div className="ml-3 flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold text-gray-900">{post.user.name}</p>
                  <span className="text-gray-400">•</span>
                  <button className="text-gray-500 hover:text-gray-700 text-sm flex items-center gap-1">
                    {post.visibility === 'public' ? <GlobeIcon size={14} /> : <UsersIcon size={14} />}
                  </button>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <p>{post.user.role}</p>
                  <span>•</span>
                  <p>{post.user.timestamp}</p>
                </div>
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <MoreHorizontalIcon size={20} className="text-gray-400" />
              </button>
            </div>
            {/* Post content */}
            <div className="space-y-4">
              {post.title && (
                <h2 className="text-xl font-semibold text-gray-900">{post.title}</h2>
              )}
              <div className="text-gray-800 whitespace-pre-wrap">{post.content.text}</div>
              {/* Skills tags */}
              {post.skills && (
                <div className="flex flex-wrap gap-2">
                  {post.skills.map((skill) => (
                    <span
                      key={skill}
                      className="bg-blue-50 text-blue-600 px-2.5 py-1 rounded-full text-sm font-medium hover:bg-blue-100 cursor-pointer transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}
              {/* Media content */}
              {(post.content.images?.length || post.content.video) && (
                <div className="rounded-lg overflow-hidden bg-gray-100">
                  {post.content.video ? (
                    <div className="relative aspect-video">
                      <img
                        src={post.content.video.thumbnail}
                        alt="Video thumbnail"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-black bg-opacity-50 rounded-full p-4">
                          <PlayIcon size={24} className="text-white" />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="grid gap-1">
                      {post.content.images?.map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={`Post image ${index + 1}`}
                          className="w-full"
                        />
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
            {/* Engagement metrics */}
            <div className="flex items-center justify-between text-sm text-gray-500 mt-6">
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <div className="flex items-center bg-blue-100 text-blue-800 rounded-full px-2 py-1">
                    <ThumbsUpIcon size={14} className="mr-1" />
                    <span>{post.stats.likes}</span>
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                <span>{post.stats.comments} comments</span>
                <span>•</span>
                <span>{post.stats.shares} shares</span>
              </div>
            </div>
            {/* Action buttons */}
            <div className="flex justify-between mt-4 pt-4 border-t border-gray-100">
              <button className="flex items-center text-gray-600 hover:text-blue-600 font-medium px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                <ThumbsUpIcon size={20} className="mr-2" />
                Like
              </button>
              <button className="flex items-center text-gray-600 hover:text-blue-600 font-medium px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                <MessageSquareIcon size={20} className="mr-2" />
                Comment
              </button>
              <button className="flex items-center text-gray-600 hover:text-blue-600 font-medium px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                <ShareIcon size={20} className="mr-2" />
                Share
              </button>
              <button className="flex items-center text-gray-600 hover:text-blue-600 font-medium px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                <BookmarkIcon size={20} className="mr-2" />
                Save
              </button>
            </div>
          </div>
          {/* Comments section 
          <div className="py-4">
            <CommentList comments={sampleComments} />
          </div> */}
        </div>
        {/* Fixed comment input at bottom 
        <div className="border-t border-gray-200 bg-white rounded-b-xl">
          <CommentInput onSubmit={(text) => console.log('New comment:', text)} />
        </div>*/}
      </div>
    </div>
  );
};

export default PostModal;
