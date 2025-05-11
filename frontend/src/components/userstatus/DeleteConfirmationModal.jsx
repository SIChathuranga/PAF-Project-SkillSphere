import React, { useState } from 'react';
import { AlertTriangleIcon, Loader2Icon } from 'lucide-react';
import Button from '../ui/Button';

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, status }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleConfirm = async () => {
    setIsDeleting(true);
    try {
      await onConfirm();
    } finally {
      setIsDeleting(false);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4 text-center">
        <div className="fixed inset-0 bg-black bg-opacity-25 transition-opacity" />
        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:w-full sm:max-w-lg">
          <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                <AlertTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
              </div>
              <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Delete Status Update
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Are you sure you want to delete this status update? This
                    action cannot be undone.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <Button onClick={handleConfirm} className="w-full sm:w-auto sm:ml-3" disabled={isDeleting}>
              {isDeleting ? (
                <>
                  <Loader2Icon size={16} className="animate-spin mr-2" />
                  Deleting...
                </>
              ) : 'Delete'}
            </Button>
            <Button
              variant="secondary"
              onClick={onClose}
              className="mt-3 w-full sm:w-auto sm:mt-0"
              disabled={isDeleting}
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
