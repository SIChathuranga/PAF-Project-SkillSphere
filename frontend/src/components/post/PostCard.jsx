import React, { useState } from 'react';
import { ThumbsUpIcon, MessageSquareIcon, ShareIcon, BookmarkIcon, MoreHorizontalIcon, PlayIcon, EyeIcon, GlobeIcon, UsersIcon } from 'lucide-react';
import Card from '../ui/Card';
import PostModal from './PostModal';

const PostCard = ({ post }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePostClick = (e) => {
    // Don't open modal if clicking on action buttons
    if (e.target.closest('button') && !e.target.closest('[data-comment-button]')) {
      return;
    }
    setIsModalOpen(true);
  };

  const handleCommentClick = (e) => {
    e.stopPropagation(); // Prevent card click from triggering
    setIsModalOpen(true);
  };

  return (
    <>
      <Card className="mb-4 cursor-pointer" onClick={handlePostClick}>
        {/* Post header */}
        <div className="flex justify-between mb-4">
          <div className="flex items-start">
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
            <div className="ml-3">
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold text-gray-900">
                  {post.user.name}
                </p>
                <span className="text-gray-400">•</span>
                <button className="text-gray-500 hover:text-gray-700 text-sm flex items-center gap-1">
                  {post.visibility === 'public' ? <GlobeIcon size={14} /> : <UsersIcon size={14} />}
                  <span className="sr-only">{post.visibility}</span>
                </button>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <p>{post.user.role}</p>
                <span>•</span>
                <p>{post.user.timestamp}</p>
              </div>
            </div>
          </div>
          <button className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100">
            <MoreHorizontalIcon size={20} />
          </button>
        </div>
        {/* Post content */}
        <div className="space-y-4">
          {post.title && <h2 className="text-lg font-semibold text-gray-900">{post.title}</h2>}
          <div className="relative">
            <p className={`text-gray-800 ${!isExpanded && 'line-clamp-4'}`}>
              {post.content.text}
            </p>
            {post.content.text.length > 280 && !isExpanded && (
              <button
                onClick={() => setIsExpanded(true)}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium mt-1"
              >
                See more
              </button>
            )}
          </div>
          {/* Skills tags */}
          {post.skills && (
            <div className="flex flex-wrap gap-2">
              {post.skills.map((skill) => (
                <span
                  key={skill}
                  className="bg-blue-50 text-blue-600 px-2.5 py-1 rounded-full text-xs font-medium hover:bg-blue-100 cursor-pointer transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}
          {/* Media content */}
          {(post.content.images?.length || post.content.video) && (
            <div
              className={`grid ${post.content.images?.length === 1 || post.content.video ? 'grid-cols-1' : 'grid-cols-2'} gap-2 mt-4`}
            >
              {post.content.video ? (
                <div className="relative rounded-lg overflow-hidden bg-gray-900 aspect-video">
                  <img
                    src={post.content.video.thumbnail}
                    alt="Video thumbnail"
                    className="w-full h-full object-cover opacity-90"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-black bg-opacity-50 rounded-full p-4">
                      <PlayIcon size={24} className="text-white" />
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                    {Math.floor(post.content.video.duration)}s
                  </div>
                </div>
              ) : (
                post.content.images?.map((image, index) => (
                  <div
                    key={index}
                    className={`rounded-lg overflow-hidden bg-gray-100 ${
                      post.content.images?.length === 1 ? 'aspect-video' : 'aspect-square'
                    } ${post.content.images?.length === 3 && index === 0 ? 'col-span-2' : ''}`}
                  >
                    <img
                      src={image}
                      alt={`Post image ${index + 1}`}
                      className="h-full w-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))
              )}
            </div>
          )}
        </div>
        {/* Engagement metrics */}
        <div className="flex items-center justify-between text-xs text-gray-500 mt-4 pb-3 border-b border-gray-100">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <div className="flex items-center bg-blue-100 text-blue-800 rounded-full px-2 py-1">
                <ThumbsUpIcon size={12} className="mr-1" />
                <span>{post.stats.likes}</span>
              </div>
            </div>
            {post.stats.views && (
              <div className="flex items-center text-gray-500">
                <EyeIcon size={14} className="mr-1" />
                <span>{post.stats.views}</span>
              </div>
            )}
          </div>
          <div className="flex space-x-2">
            <span>{post.stats.comments} comments</span>
            <span>•</span>
            <span>{post.stats.shares} shares</span>
          </div>
        </div>
        {/* Action buttons */}
        <div className="flex justify-between py-3 border-b border-gray-100">
          <button className="flex items-center text-gray-600 hover:text-blue-600 text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
            <ThumbsUpIcon size={18} className="mr-2" />
            Like
          </button>
          <button
            data-comment-button
            className="flex items-center text-gray-600 hover:text-blue-600 text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
            onClick={handleCommentClick}
          >
            <MessageSquareIcon size={18} className="mr-2" />
            Comment
          </button>
          <button className="flex items-center text-gray-600 hover:text-blue-600 text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
            <ShareIcon size={18} className="mr-2" />
            Share
          </button>
          <button className="flex items-center text-gray-600 hover:text-blue-600 text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
            <BookmarkIcon size={18} className="mr-2" />
            Save
          </button>
        </div>
        {/* Top comment */}
        {post.topComment && (
          <div className="pt-3 flex items-start">
            <div className="h-8 w-8 rounded-full bg-gray-200 flex-shrink-0 mr-2">
              <div className="h-full w-full flex items-center justify-center bg-gray-300 text-gray-600 font-medium rounded-full">
                {post.topComment.user.charAt(0)}
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="bg-gray-50 rounded-2xl px-4 py-2.5 text-sm text-gray-800">
                <span className="font-medium">{post.topComment.user}</span>
                <p className="mt-0.5">{post.topComment.text}</p>
              </div>
              <div className="flex items-center gap-3 mt-1.5 text-xs text-gray-500">
                <button className="hover:text-blue-600">Like</button>
                <button className="hover:text-blue-600">Reply</button>
                {post.topComment.likes && (
                  <>
                    <span>•</span>
                    <div className="flex items-center">
                      <ThumbsUpIcon size={12} className="text-blue-600 mr-1" />
                      <span>{post.topComment.likes}</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </Card>
      <PostModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} post={post} />
    </>
  );
};

export default PostCard;
