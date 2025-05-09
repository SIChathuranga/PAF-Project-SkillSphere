import React, { useState } from 'react';
import StatusForm from './StatusForm';
import StatusCard from './StatusCard';
import { Loader2Icon } from 'lucide-react';

const StatusFeed = ({ statuses, isLoading, onCreateStatus, onUpdateStatus, onDeleteStatus }) => {
  const [editingStatus, setEditingStatus] = useState(null);

  const handleCreate = async ({ description, image }) => {
    await onCreateStatus(description, image);
  };

  const handleUpdate = async ({ description, image }) => {
    if (editingStatus) {
      await onUpdateStatus(editingStatus.id, description, image);
      setEditingStatus(null);
    }
  };

  const handleDelete = async (id) => {
    await onDeleteStatus(id);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <StatusForm onSubmit={editingStatus ? handleUpdate : handleCreate} initialData={editingStatus || undefined} isEditing={!!editingStatus} />
      {isLoading ? (
        <div className="flex justify-center items-center py-8">
          <Loader2Icon size={24} className="animate-spin text-blue-500" />
        </div>
      ) : statuses.length === 0 ? (
        <div className="text-center py-8 text-gray-500">No status updates yet. Be the first to share!</div>
      ) : (
        <div className="mt-6 space-y-4">
          {statuses.map((status) => (
            <StatusCard key={status.id} status={status} onEdit={setEditingStatus} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
};

export default StatusFeed;
