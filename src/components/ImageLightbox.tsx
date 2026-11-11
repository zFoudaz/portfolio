'use client';

import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

export interface LightboxImage {
  src: string;
  title: string;
  subtitle?: string;
}

export function ImageLightbox({
  image,
  onClose,
}: {
  image: LightboxImage | null;
  onClose: () => void;
}): React.JSX.Element | null {
  useEffect(() => {
    if (!image) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [image, onClose]);

  if (!image || typeof document === 'undefined') return null;

  return createPortal(
    <div
      data-testid="image-lightbox-modal"
      onClick={onClose}
      className="fixed inset-0 z-[100] m-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl bg-white rounded-2xl border-2 border-black shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Top bar */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b-2 border-black bg-[#F5F5F5]">
          <div>
            <h4 className="text-sm sm:text-base font-black text-black">{image.title}</h4>
            {image.subtitle && (
              <div className="text-xs font-mono text-[#555555]">{image.subtitle}</div>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close lightbox"
            className="w-8 h-8 rounded-full bg-black hover:bg-[#ED1C24] text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Full-resolution image */}
        <div className="bg-[#141414] flex items-center justify-center max-h-[75vh] overflow-auto p-3 sm:p-6">
          <img
            src={image.src}
            alt={image.title}
            className="max-h-[68vh] w-auto object-contain rounded border border-black/20"
          />
        </div>
      </div>
    </div>,
    document.body
  );
}
