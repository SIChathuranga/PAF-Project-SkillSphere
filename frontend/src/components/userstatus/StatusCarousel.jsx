import React, { useState, useRef } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, UploadIcon, Loader2Icon } from 'lucide-react';
import StatusModal from './StatusModal';
import Button from '../ui/Button';

const StatusCarousel = ({ statuses, isLoading, onUpdateStatus, onDeleteStatus }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef(null);

  const currentStatus = statuses[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : statuses.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex < statuses.length - 1 ? prevIndex + 1 : 0));
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleUpload = async (file) => {
    setUploading(true);
    setUploadProgress(0);
    try {
      // Simulate file upload progress
      const uploadSimulation = setInterval(() => {
        setUploadProgress((prev) => {
          const next = prev + 10;
          if (next >= 100) {
            clearInterval(uploadSimulation);
          }
          return next;
        });
      }, 100);

      // Simulate delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const imageUrl = URL.createObjectURL(file);
      await onUpdateStatus(currentStatus.id, currentStatus.description, imageUrl);
    } catch (error) {
      console.error('Upload failed', error);
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      handleUpload(file);
    }
  };

  if (isLoading || statuses.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2Icon size={32} className="animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="relative max-w-2xl mx-auto mt-8 rounded-lg overflow-hidden border shadow-lg bg-white">
      <div className="relative h-96 flex items-center justify-center bg-gray-100 cursor-pointer" onClick={handleOpenModal}>
        {currentStatus.imageUrl ? (
          <img src={currentStatus.imageUrl} alt="Status" className="h-full w-full object-cover" />
        ) : (
          <div className="text-center text-gray-400 px-4">No image. Click to view status.</div>
        )}
        <div className="absolute inset-0 bg-black bg-opacity-10 hover:bg-opacity-20 transition-opacity" />
      </div>

      <div className="absolute top-1/2 left-0 transform -translate-y-1/2">
        <button onClick={handlePrev} className="bg-white p-2 rounded-r hover:bg-gray-100 shadow">
          <ChevronLeftIcon size={24} />
        </button>
      </div>
      <div className="absolute top-1/2 right-0 transform -translate-y-1/2">
        <button onClick={handleNext} className="bg-white p-2 rounded-l hover:bg-gray-100 shadow">
          <ChevronRightIcon size={24} />
        </button>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-semibold">{currentStatus.username}'s Status</h3>
          <Button
            onClick={() => fileInputRef.current.click()}
            variant="outline"
            icon={<UploadIcon size={16} />}
            className="text-blue-600 border-blue-600 hover:bg-blue-50"
            disabled={uploading}
          >
            {uploading ? 'Uploading...' : 'Upload Image'}
          </Button>
        </div>

        {uploading && (
          <div className="relative pt-1">
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
              <div style={{ width: `${uploadProgress}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500 transition-all duration-300" />
            </div>
          </div>
        )}

        <p className="text-gray-700 whitespace-pre-wrap">{currentStatus.description}</p>
      </div>

      <StatusModal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        status={currentStatus}
        onEdit={(status) => {}}
        onDelete={onDeleteStatus}
      />

      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        ref={fileInputRef}
      />
    </div>
  );
};

export default StatusCarousel;
