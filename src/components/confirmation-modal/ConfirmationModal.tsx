"use client";

import { ModalOverlay, Button } from "@/components";

interface ConfirmationModalProps {
  isOpen: boolean;
  title?: string;
  message?: string;
  onConfirm: () => void;
  onClose: () => void;
  confirmText?: string;
  cancelText?: string;
}

export function ConfirmationModal({
  isOpen,
  title = "Confirm Action",
  message = "Are you sure you want to proceed?",
  onConfirm,
  onClose,
  confirmText = "Yes, Delete",
  cancelText = "Cancel",
}: ConfirmationModalProps) {
  return (
    <ModalOverlay isOpen={isOpen} onClose={onClose}>
      <div className="">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">{title}</h2>
        </div>

        <p className="text-gray-600 mb-6 text-[0.8rem]">{message}</p>

        <div className="flex justify-end gap-3">
          <Button
            variant="primary-outline"
            onClick={onClose}
            title={cancelText}

        />
          <Button
            variant="primary"
            onClick={onConfirm}
            title={confirmText}
          />
        </div>
      </div>
    </ModalOverlay>
  );
}
