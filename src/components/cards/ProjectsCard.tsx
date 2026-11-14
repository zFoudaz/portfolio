'use client';

import React, { useState } from 'react';
import { ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PORTFOLIO_DATA } from '@/data/portfolioData';
import { ProjectItem } from '@/types/portfolio';

function ProjectVisualHeader({ project }: { project: ProjectItem }) {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <a
      href={project.repoUrl}
      target="_blank"
      rel="noreferrer"
      draggable={false}
      title={`View ${project.title} on GitHub`}
      className="block relative group overflow-hidden border-b-2 border-black bg-[#1a1a1a]"
    >
      {imgFailed ? (
        <div
          data-testid={`project-fallback-${project.id}`}
          className="w-full h-44 sm:h-52 bg-gradient-to-br from-black via-[#1f1f1f] to-[#333333] flex flex-col items-center justify-center p-4 text-center"
        >
          <span className="px-2.5 py-0.5 rounded bg-[#ED1C24] text-white font-mono text-[10px] font-bold uppercase tracking-wider mb-2">
            {project.techFocus}
          </span>
          <span className="text-white font-black text-lg tracking-tight">{project.title}</span>
        </div>
      ) : (
        <img
          src={project.imageUrl}
          alt={project.imageAlt}
          onError={() => setImgFailed(true)}
          draggable={false}
          className="w-full h-44 sm:h-52 object-cover transition-transform duration-300 group-hover:scale-105 pointer-events-none"
        />
      )}
      <div className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-full bg-black/85 text-white text-[10px] font-mono font-bold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity border border-white/20">
        <span>GitHub Repo</span>
        <ExternalLink className="w-3 h-3" />
      </div>
    </a>
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

export function ProjectsCard() {
  const { projects } = PORTFOLIO_DATA;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const handleSelect = (idx: number) => {
    if (idx === currentIndex) return;
    setDirection(idx > currentIndex ? 1 : -1);
    setCurrentIndex(idx);
  };

  const currentProject = projects[currentIndex];

  return (
    <div className="w-full bg-white p-4 sm:p-8 rounded-2xl sm:rounded-tl-sm border-2 border-black space-y-4 sm:space-y-5 shadow-sm">
      {/* Card Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-black pb-3 sm:pb-4">
        <div>
          <span className="px-3 py-1 rounded-full bg-[#ED1C24] text-white text-xs font-bold uppercase tracking-wider">
            Production AI Systems
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-black mt-2">Engineering Projects</h3>
        </div>
      </div>

      {/* Navigation Controls Bar */}
      <div className="flex items-center justify-between gap-2 bg-[#F5F5F5] p-2.5 sm:p-3 rounded-xl border border-black">
        {/* Slide Indicator Pills with WCAG 2.5.8 touch target */}
        <div className="flex items-center gap-0.5 sm:gap-1">
          {projects.map((project, idx) => {
            const isActive = currentIndex === idx;
            return (
              <button
                key={project.id}
                type="button"
                onClick={() => handleSelect(idx)}
                aria-label={`Go to project ${idx + 1}`}
                aria-current={isActive ? 'true' : undefined}
                title={project.title}
                className="p-1 sm:p-1.5 flex items-center justify-center cursor-pointer min-w-[28px] min-h-[28px]"
              >
                <span
                  className={`h-2.5 rounded-full transition-all border border-black ${
                    isActive
                      ? 'w-6 sm:w-8 bg-[#ED1C24] border-[#ED1C24]'
                      : 'w-2.5 sm:w-3 bg-white hover:bg-black/20'
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
            {String(currentIndex + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
          </span>
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous project"
            title="Previous project"
            className="p-1.5 rounded-full bg-white hover:bg-black hover:text-white text-black border border-black transition-colors active:scale-95 cursor-pointer shadow-2xs"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next project"
            title="Next project"
            className="p-1.5 rounded-full bg-[#ED1C24] hover:bg-black text-white border border-black transition-colors active:scale-95 cursor-pointer shadow-2xs"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Interactive Single-Card Slide Display with Drag Support (mode="wait" prevents CLS stacking) */}
      <div className="relative overflow-hidden min-h-[460px] sm:min-h-[430px]">
        <AnimatePresence custom={direction} mode="wait" initial={false}>
          <motion.div
            key={currentProject.id}
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
              <ProjectVisualHeader project={currentProject} />
              <div className="p-4 sm:p-6 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-1.5">
                  <span
                    className={`px-2.5 py-0.5 rounded-full ${
                      currentProject.isAccentBadge ? 'bg-[#ED1C24]' : 'bg-black'
                    } text-white text-[10px] font-bold uppercase tracking-wider`}
                  >
                    {currentProject.badge}
                  </span>
                  <span className="text-xs font-mono font-bold text-black">
                    {currentProject.techFocus}
                  </span>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h4 className="text-xl sm:text-2xl font-black text-black">{currentProject.title}</h4>
                  {currentProject.liveUrl && (
                    <a
                      href={currentProject.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#ED1C24] hover:bg-black text-white text-xs font-bold border border-black transition-colors shadow-sm flex-shrink-0"
                    >
                      <span>Live Demo</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-[#333333] leading-relaxed">
                  {currentProject.description}
                </p>

                <ul className="text-xs sm:text-sm text-[#333333] space-y-1.5 pt-1">
                  {currentProject.highlights.map((h) => (
                    <li key={h.label}>
                      • <strong>{h.label}</strong> {h.detail}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="p-4 sm:p-6 pt-0">
              <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-black text-[11px] font-bold">
                <div className="flex flex-wrap gap-1.5">
                  {currentProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 bg-white border border-black rounded-full text-black shadow-2xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="text-[10px] font-mono text-[#666666] hidden sm:inline">
                  ← Drag or swipe to navigate →
                </span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
