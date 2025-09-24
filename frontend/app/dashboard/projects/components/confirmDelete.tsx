'use client';

import React from "react";

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
}

export default function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm Delete",
  message = "Are you sure you want to delete this item?",
}: DeleteConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/30 z-40 transition-opacity"
      />

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-sm p-6 relative z-50">
          {/* Title */}
          <h3 className="text-lg font-semibold mb-4">{title}</h3>
          {/* Message */}
          <p className="mb-4">{message}</p>

          {/* Actions */}
          <div className="flex justify-end space-x-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
