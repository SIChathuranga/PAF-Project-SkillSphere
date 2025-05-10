import React from 'react';
import { XIcon, ClockIcon, PencilIcon, TrashIcon } from 'lucide-react';
import Button from '../ui/Button';

const StatusModal = ({ isOpen, onClose, status, onEdit, onDelete }) => {
  if (!isOpen) return null;

  const formatTimestamp = (date) => {
    return new Date(date).toLocaleString('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short'
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto"
      aria-labelledby="status-modal"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex min-h-screen items-center justify-center p-4">
        <div
          className="fixed inset-0 bg-black bg-opacity-25 transition-opacity"
          aria-hidden="true"
          onClick={onClose}
        />
        <div className="relative transform overflow-hidden rounded-lg bg-white shadow-xl transition-all max-w-2xl w-full">
          <div className="absolute right-0 top-0 p-4">
            <button
              onClick={onClose}
              className="rounded-full p-1 hover:bg-gray-100 transition-colors"
              aria-label="Close modal"
            >
              <XIcon size={20} className="text-gray-500" />
            </button>
          </div>
          <div className="p-6">
            <div className="flex items-center mb-4">
              <div className="h-12 w-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
                {status.username[0].toUpperCase()}
              </div>
              <div className="ml-3">
                <p className="font-medium text-gray-900">{status.username}</p>
                <div className="flex items-center text-sm text-gray-500">
                  <ClockIcon size={14} className="mr-1" />
                  <span>{formatTimestamp(new Date(status.createdAt))}</span>
                  {status.updatedAt && (
                    <span className="ml-2 text-gray-400">
                      (edited {formatTimestamp(new Date(status.updatedAt))})
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="prose max-w-none">
              <p className="text-gray-800 whitespace-pre-wrap">{status.description}</p>
            </div>

            {status.imageUrl && (
              <div className="mt-4">
                <img
                  src={status.imageUrl}
                  alt="Status"
                  className="rounded-lg max-h-[500px] w-full object-cover"
                />
              </div>
            )}

            {(onEdit || onDelete) && (
              <div className="mt-6 flex justify-end space-x-3 border-t pt-4">
                {onEdit && (
                  <Button
                    variant="secondary"
                    onClick={() => {
                      onEdit(status);
                      onClose();
                    }}
                    icon={<PencilIcon size={16} />}
                  >
                    Edit
                  </Button>
                )}
                {onDelete && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      onDelete(status.id);
                      onClose();
                    }}
                    icon={<TrashIcon size={16} />}
                    className="text-red-600 border-red-600 hover:bg-red-50"
                  >
                    Delete
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusModal;
