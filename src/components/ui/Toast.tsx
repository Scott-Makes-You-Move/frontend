'use client';

import React, { useEffect, useRef } from 'react';
import clsx from 'clsx';

type ToastProps = {
  title: string;
  message: string;
  type?: 'error' | 'success' | 'info';
  onClose: () => void;
  duration?: number; // ms
};

const Toast: React.FC<ToastProps> = ({
  title,
  message,
  type = 'info',
  onClose,
  duration = 5000,
}) => {
  const toastRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (toastRef.current) toastRef.current.focus();
    const timeout = setTimeout(onClose, duration);
    return () => clearTimeout(timeout);
  }, [onClose, duration]);

  return (
    <div
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="toast-title"
      aria-describedby="toast-message"
      ref={toastRef}
      tabIndex={-1}
      className={clsx(
        'fixed bottom-4 left-4 z-50 max-w-sm p-4 rounded shadow-lg text-white focus:outline-none',
        {
          'bg-red-600': type === 'error',
          'bg-green-800': type === 'success',
          'bg-blue-600': type === 'info',
        },
      )}
    >
      <strong id="toast-title" className="block font-semibold">
        {title}
      </strong>
      <p id="toast-message" className="text-sm">
        {message}
      </p>
    </div>
  );
};

export default Toast;
