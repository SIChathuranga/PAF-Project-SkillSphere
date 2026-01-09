import React, { useState, useRef } from 'react';
import {
  XIcon,
  ImageIcon,
  VideoIcon,
  FileTextIcon,
  SmileIcon,
  MapPinIcon,
  TagIcon,
  GlobeIcon,
  UsersIcon,
  ChevronDownIcon,
  PlusIcon
} from 'lucide-react';
import { Modal, Button, Avatar, Badge, Input } from '../ui';
import { useAuth } from '../../contexts/AuthContext';
import { db, storage } from '../../config/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const CreatePost = ({ onClose }) => {
  const { currentUser, userProfile } = useAuth();
  const [content, setContent] = useState('');
  const [images, setImages] = useState([]);
  const [video, setVideo] = useState(null);
  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState('');
  const [visibility, setVisibility] = useState('public');
  const [loading, setLoading] = useState(false);
  const [showSkillInput, setShowSkillInput] = useState(false);
  const fileInputRef = useRef(null);
  const videoInputRef = useRef(null);

  const popularSkills = [
    'React', 'JavaScript', 'Python', 'UI/UX', 'Machine Learning',
    'Node.js', 'TypeScript', 'AWS', 'Data Science', 'Mobile Dev'
  ];

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + images.length > 4) {
      alert('Maximum 4 images allowed');
      return;
    }

    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImages(prev => [...prev, { file, preview: e.target.result }]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setVideo({ file, preview: e.target.result });
      };
      reader.readAsDataURL(file);
      setImages([]); // Clear images if video is added
    }
  };

  const removeImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const addSkill = (skill) => {
    if (skill && !skills.includes(skill) && skills.length < 5) {
      setSkills([...skills, skill]);
      setSkillInput('');
    }
  };

  const removeSkill = (skill) => {
    setSkills(skills.filter(s => s !== skill));
  };

  const handleSubmit = async () => {
    if (!content.trim() && images.length === 0 && !video) {
      return;
    }

    try {
      setLoading(true);

      // Upload images to Firebase Storage
      const imageUrls = [];
      for (const img of images) {
        const imageRef = ref(storage, `posts/${currentUser.uid}/${Date.now()}_${img.file.name}`);
        await uploadBytes(imageRef, img.file);
        const url = await getDownloadURL(imageRef);
        imageUrls.push(url);
      }

      // Upload video if exists
      let videoUrl = null;
      if (video) {
        const videoRef = ref(storage, `posts/${currentUser.uid}/${Date.now()}_${video.file.name}`);
        await uploadBytes(videoRef, video.file);
        videoUrl = await getDownloadURL(videoRef);
      }

      // Create post in Firestore
      const postData = {
        userId: currentUser.uid,
        user: {
          name: userProfile?.displayName || currentUser.displayName,
          headline: userProfile?.headline || '',
          avatar: userProfile?.photoURL || currentUser.photoURL
        },
        content: {
          text: content,
          images: imageUrls,
          video: videoUrl ? { url: videoUrl } : null
        },
        skills,
        visibility,
        stats: {
          likes: 0,
          comments: 0,
          shares: 0,
          views: 0
        },
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };

      await addDoc(collection(db, 'posts'), postData);
      onClose();
    } catch (error) {
      console.error('Error creating post:', error);
      alert('Failed to create post. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={true} onClose={onClose} size="lg" title="Create a Post">
      {/* User Info */}
      <div className="flex items-center gap-3 mb-4">
        <Avatar
          src={userProfile?.photoURL}
          name={userProfile?.displayName || currentUser?.email}
          size="lg"
        />
        <div>
          <p className="font-semibold text-primary">
            {userProfile?.displayName || 'User'}
          </p>
          <button
            className="flex items-center gap-1 text-sm text-secondary bg-tertiary px-3 py-1 rounded-full hover:bg-hover transition-colors"
            onClick={() => setVisibility(visibility === 'public' ? 'connections' : 'public')}
          >
            {visibility === 'public' ? (
              <>
                <GlobeIcon size={14} />
                Public
              </>
            ) : (
              <>
                <UsersIcon size={14} />
                Connections Only
              </>
            )}
            <ChevronDownIcon size={14} />
          </button>
        </div>
      </div>

      {/* Text Input */}
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What skill are you working on? Share your knowledge..."
        className="w-full h-40 p-3 bg-transparent text-primary placeholder:text-muted focus:outline-none resize-none text-lg"
        autoFocus
      />

      {/* Image Preview */}
      {images.length > 0 && (
        <div className={`grid gap-2 mb-4 ${images.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
          {images.map((img, index) => (
            <div
              key={index}
              className={`relative rounded-xl overflow-hidden ${images.length === 1 ? 'h-64' : 'h-40'}`}
            >
              <img src={img.preview} alt="" className="w-full h-full object-cover" />
              <button
                onClick={() => removeImage(index)}
                className="absolute top-2 right-2 p-1.5 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
              >
                <XIcon size={16} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Video Preview */}
      {video && (
        <div className="relative rounded-xl overflow-hidden h-64 mb-4">
          <video src={video.preview} className="w-full h-full object-cover" controls />
          <button
            onClick={() => setVideo(null)}
            className="absolute top-2 right-2 p-1.5 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
          >
            <XIcon size={16} />
          </button>
        </div>
      )}

      {/* Skills Tags */}
      {skills.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {skills.map(skill => (
            <Badge key={skill} variant="primary" className="flex items-center gap-1">
              {skill}
              <button onClick={() => removeSkill(skill)} className="hover:text-white/80">
                <XIcon size={12} />
              </button>
            </Badge>
          ))}
        </div>
      )}

      {/* Skill Input */}
      {showSkillInput && (
        <div className="mb-4 p-4 bg-tertiary rounded-xl">
          <p className="text-sm font-medium text-primary mb-2">Add relevant skills (max 5)</p>
          <div className="flex gap-2 mb-3">
            <Input
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              placeholder="Type a skill..."
              onKeyPress={(e) => e.key === 'Enter' && addSkill(skillInput)}
              className="flex-1"
            />
            <Button
              size="sm"
              onClick={() => addSkill(skillInput)}
              disabled={!skillInput.trim()}
            >
              Add
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {popularSkills
              .filter(s => !skills.includes(s))
              .slice(0, 6)
              .map(skill => (
                <button
                  key={skill}
                  onClick={() => addSkill(skill)}
                  className="px-3 py-1 text-sm border border-[rgb(var(--color-border))] rounded-full text-secondary hover:border-brand hover:text-brand transition-colors"
                >
                  + {skill}
                </button>
              ))}
          </div>
        </div>
      )}

      {/* Media Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-[rgb(var(--color-border))]">
        <div className="flex items-center gap-1">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="p-2.5 rounded-lg text-green-500 hover:bg-green-50 dark:hover:bg-green-950 transition-colors"
            title="Add photos"
          >
            <ImageIcon size={22} />
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            className="hidden"
          />

          <button
            onClick={() => videoInputRef.current?.click()}
            className="p-2.5 rounded-lg text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950 transition-colors"
            title="Add video"
          >
            <VideoIcon size={22} />
          </button>
          <input
            ref={videoInputRef}
            type="file"
            accept="video/*"
            onChange={handleVideoUpload}
            className="hidden"
          />

          <button
            onClick={() => setShowSkillInput(!showSkillInput)}
            className={`p-2.5 rounded-lg transition-colors ${showSkillInput
                ? 'text-brand bg-blue-50 dark:bg-blue-950'
                : 'text-purple-500 hover:bg-purple-50 dark:hover:bg-purple-950'
              }`}
            title="Add skills"
          >
            <TagIcon size={22} />
          </button>

          <button
            className="p-2.5 rounded-lg text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-950 transition-colors"
            title="Add emoji"
          >
            <SmileIcon size={22} />
          </button>
        </div>

        <Button
          onClick={handleSubmit}
          disabled={(!content.trim() && images.length === 0 && !video) || loading}
          loading={loading}
        >
          Post
        </Button>
      </div>
    </Modal>
  );
};

export default CreatePost;
