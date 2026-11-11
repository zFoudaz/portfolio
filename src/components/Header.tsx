'use client';

import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import { PORTFOLIO_DATA } from '@/data/portfolioData';
import { Avatar } from './Avatar';

export function Header({ onContactClick }: { onContactClick: () => void }): React.JSX.Element {
  const { profile } = PORTFOLIO_DATA;
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    try {
      const saved =
        typeof window !== 'undefined' && window.localStorage
          ? window.localStorage.getItem('theme')
          : null;
      if (saved === 'dark') {
        document.documentElement.classList.add('dark');
        setIsDark(true);
      } else {
        document.documentElement.classList.remove('dark');
        setIsDark(false);
      }
    } catch {}
  }, []);

  const toggleDarkMode = () => {
    const nextDark = !document.documentElement.classList.contains('dark');
    if (nextDark) {
      document.documentElement.classList.add('dark');
      try {
        localStorage.setItem('theme', 'dark');
      } catch {}
    } else {
      document.documentElement.classList.remove('dark');
      try {
        localStorage.setItem('theme', 'light');
      } catch {}
    }
    setIsDark(nextDark);
  };

  return (
    <header className="sticky top-0 flex-none bg-white/95 backdrop-blur-md border-b-2 border-black z-30 transition-colors">
      <div className="max-w-5xl mx-auto px-3 sm:px-6 min-h-14 sm:min-h-16 py-2 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
          <div className="flex-shrink-0">
            <Avatar size="sm" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="font-black text-sm sm:text-base tracking-tight text-black whitespace-nowrap truncate">
                {profile.name}
              </span>
              <span
                className="w-2 h-2 rounded-full bg-[#00AA44] flex-shrink-0"
                title="Available for AI Engineering roles"
              />
            </div>
            <div className="text-[11px] sm:text-xs text-[#333333] font-medium truncate">
              AI Engineer<span className="hidden sm:inline"> • Mansoura, Egypt</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1 sm:gap-2.5 flex-shrink-0">
          <button
            type="button"
            onClick={toggleDarkMode}
            aria-label="Toggle dark mode"
            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            className="p-1.5 sm:p-2 rounded-full bg-[#F5F5F5] hover:bg-[#DCDCDC] text-black border border-black transition-colors cursor-pointer"
          >
            {isDark ? <Sun className="w-4 h-4 text-yellow-400" /> : <Moon className="w-4 h-4" />}
          </button>
          <a
            href={profile.resumeUrl}
            target="_blank"
            rel="noreferrer"
            download
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F5F5F5] hover:bg-[#DCDCDC] text-black text-xs font-bold border border-black transition-colors"
            title="Download Resume PDF"
          >
            <span>Resume</span>
          </a>
          <a
            href={profile.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="p-1.5 sm:p-2 text-black hover:bg-[#DCDCDC] rounded-full transition-colors"
            title="GitHub"
            aria-label="GitHub"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5 fill-current" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
          </a>
          <a
            href={profile.linkedinUrl}
            target="_blank"
            rel="noreferrer"
            className="p-1.5 sm:p-2 text-black hover:bg-[#DCDCDC] rounded-full transition-colors"
            title="LinkedIn"
            aria-label="LinkedIn"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5 fill-current" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
          </a>
          <button
            type="button"
            onClick={onContactClick}
            className="px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-[#ED1C24] hover:bg-black text-white text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
          >
            Contact
          </button>
        </div>
      </div>
    </header>
  );
}
