import React, { useState } from 'react';
import { MoreHorizontalIcon, PencilIcon, TrashIcon, ClockIcon } from 'lucide-react';
import Card from '../ui/Card';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import StatusModal from './StatusModal';

const StatusCard = ({ status, onEdit, onDelete }) => {
  const [showActions, setShowActions] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);

  const formatTimestamp = (date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
  };

  const handleDelete = async () => {
    if (onDelete) {
      await onDelete(status.id);
      setShowDeleteModal(false);
    }
  };

  return (
    <>
      <Card className="mb-4 cursor-pointer hover:shadow-md transition-shadow duration-200" onClick={() => setShowStatusModal(true)}>
        <div className="p-4">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
                {status.username[0].toUpperCase()}
              </div>
              <div className="ml-3">
                <p className="font-medium text-gray-900">{status.username}</p>
                <div className="flex items-center text-sm text-gray-500">
                  <ClockIcon size={14} className="mr-1" />
                  <span>{formatTimestamp(new Date(status.createdAt))}</span>
                  {status.updatedAt && <span className="ml-2 text-gray-400">(edited)</span>}
                </div>
              </div>
            </div>

            {(onEdit || onDelete) && (
              <div className="relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowActions(!showActions);
                  }}
                  className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                  aria-label="More options"
                >
                  <MoreHorizontalIcon size={20} className="text-gray-500" />
                </button>

                {showActions && (
                  <div className="absolute right-0 mt-1 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                      {onEdit && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onEdit(status);
                            setShowActions(false);
                          }}
                          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          role="menuitem"
                        >
                          <PencilIcon size={16} className="mr-2" />
                          Edit
                        </button>
                      )}
                      {onDelete && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowDeleteModal(true);
                            setShowActions(false);
                          }}
                          className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                          role="menuitem"
                        >
                          <TrashIcon size={16} className="mr-2" />
                          Delete
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <p className="text-gray-800 whitespace-pre-wrap">{status.description}</p>

          {status.imageUrl && (
            <div className="mt-4">
              <img src={status.imageUrl} alt="Status" className="rounded-lg max-h-96 w-full object-cover" />
            </div>
          )}
        </div>
      </Card>

      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        status={status}
      />

      <StatusModal
        isOpen={showStatusModal}
        onClose={() => setShowStatusModal(false)}
        status={status}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </>
  );
};

export default StatusCard;
