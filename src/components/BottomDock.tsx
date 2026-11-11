'use client';

import React, { useState } from 'react';
import { TOPIC_OPTIONS } from '@/data/portfolioData';
import { TopicId } from '@/types/portfolio';

export interface BottomDockProps {
  onSelectTopic: (topicId: TopicId) => void;
  onSubmitCustom: (text: string) => void;
  onClearChat?: () => void;
  visitedTopics: TopicId[];
  activeTopic?: TopicId | null;
  isTyping: boolean;
  hasMessages: boolean;
}

export function BottomDock({
  onSelectTopic,
  onSubmitCustom,
  activeTopic,
}: BottomDockProps): React.JSX.Element {
  const [inputVal, setInputVal] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = inputVal.trim();
    if (!trimmed) return;
    setInputVal('');
    onSubmitCustom(trimmed);
  };

  return (
    <footer className="fixed bottom-5 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <div
        data-testid="floating-chatbar"
        className="pointer-events-auto w-full max-w-[540px] bg-white rounded-[22px] border-[1.5px] border-black p-3 shadow-[0_8px_30px_rgb(0,0,0,0.08)] space-y-2.5"
      >
        {/* Top Row: Pill Buttons (Me, Projects, Skills, Fun, Contact) */}
        <div className="flex items-center justify-between gap-2 overflow-x-auto no-scrollbar">
          {TOPIC_OPTIONS.map((topic) => {
            const isActive = activeTopic === topic.id;
            return (
              <button
                key={topic.id}
                type="button"
                onClick={() => onSelectTopic(topic.id)}
                className={`topic-btn flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-full font-bold text-xs border-[1.5px] border-black transition-all active:scale-95 whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-black text-white'
                    : 'bg-white hover:bg-[#F5F5F5] text-black'
                }`}
              >
                <span
                  className={`w-4 h-4 rounded-full ${topic.badgeClass} flex items-center justify-center text-[10px] font-bold flex-shrink-0`}
                >
                  {topic.icon}
                </span>
                <span>{topic.label}</span>
              </button>
            );
          })}
        </div>

        {/* Bottom Row: Input & Red Right-Arrow Submit Button */}
        <form onSubmit={handleSubmit} className="relative flex items-center">
          <input
            id="user-input"
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Ask Ziyad anything..."
            className="w-full pl-4 pr-11 py-2.5 rounded-full bg-[#F5F5F5] border-[1.5px] border-black text-xs sm:text-sm font-medium text-black placeholder-[#888888] focus:outline-none focus:bg-white transition-all"
          />
          <button
            type="submit"
            className="absolute right-1.5 w-7 h-7 rounded-full bg-[#ED1C24] hover:bg-black text-white flex items-center justify-center transition-colors cursor-pointer"
            title="Send"
            aria-label="Send"
          >
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M5 12h14m-6-6l6 6-6 6"
              />
            </svg>
          </button>
        </form>
      </div>
    </footer>
  );
}
