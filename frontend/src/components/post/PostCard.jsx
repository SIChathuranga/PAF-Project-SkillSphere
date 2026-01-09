import React, { useState } from 'react';
import {
  ThumbsUpIcon,
  MessageSquareIcon,
  ShareIcon,
  BookmarkIcon,
  MoreHorizontalIcon,
  PlayIcon,
  EyeIcon,
  GlobeIcon,
  UsersIcon,
  EditIcon,
  TrashIcon,
  FlagIcon,
  LinkIcon
} from 'lucide-react';
import { Card, Avatar, Badge, Dropdown } from '../ui';
import { formatDistanceToNow } from '../../utils/dateUtils';

const PostCard = ({ post }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [likesCount, setLikesCount] = useState(post.stats?.likes || 0);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
  };

  // Get user display info
  const userName = post.user?.name || post.user?.displayName || 'Anonymous';
  const userHeadline = post.user?.headline || post.user?.role || '';
  const userAvatar = post.user?.avatar || post.user?.photoURL;
  const postContent = post.content?.text || post.description || '';
  const timestamp = post.createdAt
    ? formatDistanceToNow(new Date(post.createdAt))
    : post.user?.timestamp || 'Recently';

  return (
    <Card className="animate-slide-up">
      {/* Post header */}
      <div className="flex justify-between mb-4">
        <div className="flex items-start">
          <Avatar
            src={userAvatar}
            name={userName}
            size="lg"
            online={post.user?.online}
            className="ring-2 ring-[rgb(var(--color-bg-primary))]"
          />
          <div className="ml-3">
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold text-primary hover:text-brand cursor-pointer">
                {userName}
              </p>
              <span className="text-muted">•</span>
              <button className="text-muted hover:text-secondary text-sm flex items-center gap-1">
                {post.visibility === 'public' ? (
                  <GlobeIcon size={14} />
                ) : (
                  <UsersIcon size={14} />
                )}
              </button>
            </div>
            <p className="text-xs text-tertiary">{userHeadline}</p>
            <p className="text-xs text-muted">{timestamp}</p>
          </div>
        </div>

        <Dropdown
          trigger={
            <button className="p-2 rounded-lg text-muted hover:text-primary hover:bg-tertiary transition-colors">
              <MoreHorizontalIcon size={20} />
            </button>
          }
        >
          <Dropdown.Item icon={<BookmarkIcon size={16} />}>
            Save post
          </Dropdown.Item>
          <Dropdown.Item icon={<LinkIcon size={16} />}>
            Copy link
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item icon={<EditIcon size={16} />}>
            Edit post
          </Dropdown.Item>
          <Dropdown.Item icon={<TrashIcon size={16} />} danger>
            Delete post
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item icon={<FlagIcon size={16} />}>
            Report post
          </Dropdown.Item>
        </Dropdown>
      </div>

      {/* Post content */}
      <div className="space-y-4">
        {/* Title */}
        {post.title && (
          <h2 className="text-lg font-semibold text-primary">{post.title}</h2>
        )}

        {/* Text content */}
        <div className="relative">
          <p className={`text-secondary whitespace-pre-line ${!isExpanded && 'line-clamp-4'}`}>
            {postContent}
          </p>
          {postContent.length > 280 && !isExpanded && (
            <button
              onClick={() => setIsExpanded(true)}
              className="text-brand hover:underline text-sm font-medium mt-1"
            >
              See more
            </button>
          )}
        </div>

        {/* Skills tags */}
        {post.skills && post.skills.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.skills.map((skill) => (
              <Badge
                key={skill}
                variant="primary"
                className="cursor-pointer hover:opacity-80"
              >
                {skill}
              </Badge>
            ))}
          </div>
        )}

        {/* Media content */}
        {(post.content?.images?.length > 0 || post.content?.video) && (
          <div className={`grid ${post.content?.images?.length === 1 || post.content?.video
              ? 'grid-cols-1'
              : 'grid-cols-2'
            } gap-2 mt-4`}>
            {post.content?.video ? (
              <div className="relative rounded-xl overflow-hidden bg-gray-900 aspect-video group cursor-pointer">
                <img
                  src={post.content.video.thumbnail}
                  alt="Video thumbnail"
                  className="w-full h-full object-cover opacity-90 group-hover:opacity-75 transition-opacity"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                    <PlayIcon size={28} className="text-white ml-1" />
                  </div>
                </div>
                <div className="absolute bottom-2 right-2 bg-black/75 text-white text-xs px-2 py-1 rounded">
                  {Math.floor(post.content.video.duration / 60)}:{(post.content.video.duration % 60).toString().padStart(2, '0')}
                </div>
              </div>
            ) : (
              post.content?.images?.map((image, index) => (
                <div
                  key={index}
                  className={`rounded-xl overflow-hidden bg-tertiary cursor-pointer group ${post.content?.images?.length === 1 ? 'aspect-video' : 'aspect-square'
                    } ${post.content?.images?.length === 3 && index === 0 ? 'col-span-2' : ''}`}
                >
                  <img
                    src={image}
                    alt={`Post image ${index + 1}`}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Engagement metrics */}
      <div className="flex items-center justify-between text-xs text-muted mt-4 pb-3 border-b border-[rgb(var(--color-border))]">
        <div className="flex items-center space-x-4">
          <button className="flex items-center gap-1 hover:text-brand transition-colors">
            <div className={`flex items-center px-2 py-1 rounded-full ${isLiked ? 'bg-blue-100 dark:bg-blue-900' : 'bg-tertiary'}`}>
              <ThumbsUpIcon size={14} className={isLiked ? 'text-brand' : ''} />
              <span className={`ml-1 ${isLiked ? 'text-brand font-medium' : ''}`}>{likesCount}</span>
            </div>
          </button>
          {post.stats?.views && (
            <div className="flex items-center text-muted">
              <EyeIcon size={14} className="mr-1" />
              <span>{typeof post.stats.views === 'number' ? post.stats.views.toLocaleString() : post.stats.views}k</span>
            </div>
          )}
        </div>
        <div className="flex space-x-2">
          <span>{post.stats?.comments || 0} comments</span>
          <span>•</span>
          <span>{post.stats?.shares || 0} shares</span>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex justify-between py-2">
        <button
          onClick={handleLike}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all hover-lift ${isLiked
              ? 'text-brand bg-blue-50 dark:bg-blue-950'
              : 'text-secondary hover:text-primary hover:bg-tertiary'
            }`}
        >
          <ThumbsUpIcon size={18} className={isLiked ? 'fill-current' : ''} />
          {isLiked ? 'Liked' : 'Like'}
        </button>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-secondary hover:text-primary hover:bg-tertiary transition-colors">
          <MessageSquareIcon size={18} />
          Comment
        </button>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-secondary hover:text-primary hover:bg-tertiary transition-colors">
          <ShareIcon size={18} />
          Share
        </button>
        <button
          onClick={handleSave}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${isSaved
              ? 'text-brand bg-blue-50 dark:bg-blue-950'
              : 'text-secondary hover:text-primary hover:bg-tertiary'
            }`}
        >
          <BookmarkIcon size={18} className={isSaved ? 'fill-current' : ''} />
          {isSaved ? 'Saved' : 'Save'}
        </button>
      </div>

      {/* Top comment preview */}
      {post.topComment && (
        <div className="pt-3 border-t border-[rgb(var(--color-border))]">
          <div className="flex items-start gap-3">
            <Avatar
              name={post.topComment.user}
              size="sm"
            />
            <div className="flex-1 min-w-0">
              <div className="bg-tertiary rounded-2xl px-4 py-2.5">
                <span className="text-sm font-medium text-primary">{post.topComment.user}</span>
                <p className="text-sm text-secondary mt-0.5">{post.topComment.text}</p>
              </div>
              <div className="flex items-center gap-3 mt-1.5 text-xs text-muted">
                <button className="hover:text-brand font-medium">Like</button>
                <button className="hover:text-brand font-medium">Reply</button>
                {post.topComment.likes && (
                  <>
                    <span>•</span>
                    <div className="flex items-center">
                      <ThumbsUpIcon size={12} className="text-brand mr-1" />
                      <span>{post.topComment.likes}</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};

export default PostCard;
