import React, { useState, useRef } from 'react';
import { ImageIcon, XIcon, Loader2Icon } from 'lucide-react';
import Button from '../ui/Button';
import Card from '../ui/Card';

const StatusForm = ({ onSubmitSuccess, isEditing = false, initialData }) => {
  const [description, setDescription] = useState(initialData?.description || '');
  const [imagePreview, setImagePreview] = useState(initialData?.imageUrl);
  const [image, setImage] = useState(undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const characterLimit = 500;
  const remainingCharacters = characterLimit - description.length;

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size should be less than 5MB');
        return;
      }
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      setError(null);
    }
  };

  const removeImage = () => {
    setImage(undefined);
    setImagePreview(undefined);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const uploadImageToImgbb = async (image) => {
    const apiKey = 'b799ee1cdd85a85b131e3d3d1c3b19dd'; // Replace this with your actual imgbb API key
    const formData = new FormData();
    formData.append('image', image);

    const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new Error('Image upload failed');
    }

    const data = await response.json();
    return data.data.url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (description.trim().length === 0) {
      setError('Please enter a status update');
      return;
    }
    if (description.length > characterLimit) {
      setError(`Status must be ${characterLimit} characters or less`);
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      let imageUrl = '';
      if (image) {
        imageUrl = await uploadImageToImgbb(image);
      } else if (imagePreview) {
        imageUrl = imagePreview;
      }

      const response = await fetch('http://localhost:8080/api/userstatus', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          description: description.trim(),
          imageUrl
        })
      });

      if (!response.ok) {
        throw new Error('Failed to post status');
      }

      if (!isEditing) {
        setDescription('');
        setImage(undefined);
        setImagePreview(undefined);
      }

      if (onSubmitSuccess) {
        onSubmitSuccess();
      }
    } catch (err) {
      setError('Failed to post status. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Share your knowledge or ask a question..."
            className={`w-full min-h-[120px] p-3 border rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              remainingCharacters < 0
                ? 'border-red-500'
                : remainingCharacters < 50
                ? 'border-yellow-500'
                : 'border-gray-300'
            }`}
            aria-label="Status update"
            disabled={isSubmitting}
          />
          <div className="flex justify-between text-sm mt-1">
            <span
              className={`${
                remainingCharacters < 0
                  ? 'text-red-500'
                  : remainingCharacters < 50
                  ? 'text-yellow-500'
                  : 'text-gray-500'
              }`}
            >
              {remainingCharacters} characters remaining
            </span>
          </div>
        </div>

        {imagePreview && (
          <div className="relative">
            <img
              src={imagePreview}
              alt="Status preview"
              className="max-h-64 rounded-lg object-cover"
            />
            <button
              type="button"
              onClick={removeImage}
              className="absolute top-2 right-2 p-1 bg-gray-800 bg-opacity-50 rounded-full text-white hover:bg-opacity-70 transition-colors"
              aria-label="Remove image"
            >
              <XIcon size={16} />
            </button>
          </div>
        )}

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              className="hidden"
              aria-label="Upload image"
            />
            <Button
              type="button"
              variant="secondary"
              onClick={() => fileInputRef.current?.click()}
              disabled={isSubmitting}
              icon={<ImageIcon size={18} />}
            >
              Add Image
            </Button>
          </div>
          <Button type="submit" disabled={isSubmitting || description.length > characterLimit}>
            {isSubmitting ? (
              <>
                <Loader2Icon size={18} className="animate-spin" />
                <span>Posting...</span>
              </>
            ) : isEditing ? (
              'Update'
            ) : (
              'Post'
            )}
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default StatusForm;
