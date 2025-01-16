import React, { FC } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

interface ModalProps {
  children?: React.ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
}

export const Modal: FC<ModalProps> = ({
  children,
  isOpen = false,
  onClose,
}) => {
  const mouseDownRef = React.useRef<boolean>(false);
  if (!isOpen) return null;
  return createPortal(
    <div
      className="fixed inset-0 bg-secondary/50  flex items-center justify-center"
      onMouseUp={() => {
        if (!mouseDownRef.current && onClose) onClose();
        mouseDownRef.current = false;
      }}
    >
      <div
        className="relative max-w-[600px] w-full p-4 bg-white rounded-md shadow"
        onClick={(e: React.MouseEvent) => {
          e.stopPropagation();
        }}
        onMouseUp={(e: React.MouseEvent) => {
          e.stopPropagation();
          mouseDownRef.current = false;
        }}
        onMouseDown={() => {
          mouseDownRef.current = true;
        }}
      >
        {children}

        <button
          onClick={() => {
            onClose?.();
          }}
          className="absolute top-1 right-1 "
        >
          {<X color="red" size={16} />}
        </button>
      </div>
    </div>,
    document.body
  );
};
