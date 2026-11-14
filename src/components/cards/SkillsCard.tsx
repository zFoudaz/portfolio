'use client';

import React, { useState } from 'react';
import { Maximize2, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PORTFOLIO_DATA } from '@/data/portfolioData';
import { CertificateItem } from '@/types/portfolio';
import { ImageLightbox, LightboxImage } from '@/components/ImageLightbox';

function CertificateVisualHeader({
  cert,
  onZoom,
}: {
  cert: CertificateItem;
  onZoom: (img: LightboxImage) => void;
}) {
  const [imgFailed, setImgFailed] = useState(false);

  if (imgFailed) {
    return (
      <div
        data-testid={`certificate-fallback-${cert.title}`}
        className="w-full h-44 sm:h-56 bg-gradient-to-br from-[#222222] to-black border-b-2 border-black flex flex-col items-center justify-center p-4 text-center"
      >
        <span className="text-[10px] font-mono font-bold text-[#ED1C24] uppercase tracking-wider">
          {cert.issuer}
        </span>
        <span className="text-white text-base font-bold mt-1 line-clamp-2">{cert.title}</span>
      </div>
    );
  }

  return (
    <div
      onClick={() =>
        onZoom({
          src: cert.imageUrl,
          title: cert.title,
          subtitle: `${cert.issuer} • ${cert.badge}`,
        })
      }
      className="relative group cursor-zoom-in overflow-hidden border-b-2 border-black bg-[#1a1a1a]"
      title={`Click to view ${cert.title} full size`}
    >
      <img
        src={cert.imageUrl}
        alt={cert.title}
        onError={() => setImgFailed(true)}
        draggable={false}
        className="w-full h-44 sm:h-56 object-cover transition-transform duration-300 group-hover:scale-105 pointer-events-none"
      />
      <div className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-full bg-black/85 text-white text-[10px] font-mono font-bold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity border border-white/20">
        <Maximize2 className="w-3 h-3" />
        <span>Click to Zoom</span>
      </div>
    </div>
  );
}

const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 60 : -60,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: {
      x: { type: 'spring', stiffness: 350, damping: 30 },
      opacity: { duration: 0.18 },
    },
  },
  exit: (dir: number) => ({
    x: dir > 0 ? -60 : 60,
    opacity: 0,
    transition: {
      x: { type: 'spring', stiffness: 350, damping: 30 },
      opacity: { duration: 0.18 },
    },
  }),
};

export function SkillsCard() {
  const { skills, certificates } = PORTFOLIO_DATA;
  const [selectedImage, setSelectedImage] = useState<LightboxImage | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % certificates.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + certificates.length) % certificates.length);
  };

  const handleSelect = (idx: number) => {
    if (idx === currentIndex) return;
    setDirection(idx > currentIndex ? 1 : -1);
    setCurrentIndex(idx);
  };

  const currentCert = certificates[currentIndex];

  return (
    <div className="w-full bg-white p-4 sm:p-8 rounded-2xl sm:rounded-tl-sm border-2 border-black space-y-5 sm:space-y-6 shadow-sm">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-black pb-3 sm:pb-4">
        <div>
          <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-900 border border-purple-300 text-xs font-bold uppercase tracking-wider">
            Technical Stack
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-black mt-2">Skills &amp; Certifications</h3>
        </div>
      </div>

      {/* Skills Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {skills.map((group) => (
          <div
            key={group.category}
            className="bg-[#DCDCDC] p-5 rounded-lg border-2 border-black space-y-3"
          >
            <div className="text-xs font-black uppercase text-black border-b border-black pb-1">
              {group.category}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="px-2.5 py-1 rounded-full bg-white border border-black text-xs font-bold text-black shadow-2xs"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Certificates Section Header & Slider Controls */}
      <div className="space-y-3 pt-3 border-t-2 border-black">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="text-xs font-bold uppercase tracking-wider text-black">
            Certified Industry Credentials
          </div>
          <span className="text-[11px] font-mono text-[#555555]">Click certificate to zoom</span>
        </div>

        {/* Navigation Controls Bar */}
        <div className="flex items-center justify-between gap-2 bg-[#F5F5F5] p-2.5 sm:p-3 rounded-xl border border-black">
          {/* Slide Indicator Pills with WCAG 2.5.8 touch target */}
          <div className="flex items-center gap-0.5 sm:gap-1">
            {certificates.map((cert, idx) => {
              const isActive = currentIndex === idx;
              return (
                <button
                  key={cert.title}
                  type="button"
                  onClick={() => handleSelect(idx)}
                  aria-label={`Go to certificate ${idx + 1}`}
                  aria-current={isActive ? 'true' : undefined}
                  title={cert.title}
                  className="p-1 sm:p-1.5 flex items-center justify-center cursor-pointer min-w-[26px] min-h-[26px]"
                >
                  <span
                    className={`h-2.5 rounded-full transition-all border border-black ${
                      isActive
                        ? 'w-5 sm:w-7 bg-[#ED1C24] border-[#ED1C24]'
                        : 'w-2 sm:w-2.5 bg-white hover:bg-black/20'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Counter and Prev / Next Arrow Controls */}
          <div className="flex items-center gap-2">
            <span
              aria-live="polite"
              className="font-mono text-xs font-bold text-black px-2 py-0.5 rounded bg-white border border-black shadow-2xs"
            >
              {String(currentIndex + 1).padStart(2, '0')} / {String(certificates.length).padStart(2, '0')}
            </span>
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous certificate"
              title="Previous certificate"
              className="p-1.5 rounded-full bg-white hover:bg-black hover:text-white text-black border border-black transition-colors active:scale-95 cursor-pointer shadow-2xs"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next certificate"
              title="Next certificate"
              className="p-1.5 rounded-full bg-[#ED1C24] hover:bg-black text-white border border-black transition-colors active:scale-95 cursor-pointer shadow-2xs"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Interactive Single-Certificate Slide Display with Drag Support */}
        <div className="relative overflow-hidden min-h-[340px] sm:min-h-[380px]">
          <AnimatePresence custom={direction} mode="wait" initial={false}>
            <motion.div
              key={currentCert.title}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(_, info) => {
                const isSwipeNext = info.offset.x < -50 || info.velocity.x < -300;
                const isSwipePrev = info.offset.x > 50 || info.velocity.x > 300;
                if (isSwipeNext) {
                  handleNext();
                } else if (isSwipePrev) {
                  handlePrev();
                }
              }}
              className="bg-[#DCDCDC] rounded-lg border-2 border-black overflow-hidden flex flex-col justify-between cursor-grab active:cursor-grabbing touch-pan-y"
            >
              <div>
                <CertificateVisualHeader cert={currentCert} onZoom={setSelectedImage} />
                <div className="p-4 sm:p-5 space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-1.5">
                    <span className="text-xs font-mono font-bold text-black">
                      {currentCert.issuer}
                    </span>
                  </div>
                  <h4 className="text-lg sm:text-xl font-black text-black">{currentCert.title}</h4>
                </div>
              </div>

              <div className="p-4 sm:p-5 pt-0 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() =>
                    setSelectedImage({
                      src: currentCert.imageUrl,
                      title: currentCert.title,
                      subtitle: `${currentCert.issuer} • ${currentCert.badge}`,
                    })
                  }
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white hover:bg-black hover:text-white text-black text-xs font-bold border border-black transition-colors cursor-pointer shadow-2xs"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>View Full Certificate</span>
                </button>
                <span className="text-[10px] font-mono text-[#666666] hidden sm:inline">
                  ← Drag or swipe to navigate →
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <ImageLightbox image={selectedImage} onClose={() => setSelectedImage(null)} />
    </div>
  );
}
