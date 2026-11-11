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
  onClearChat,
  visitedTopics,
  activeTopic,
  hasMessages,
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
    <footer className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t-2 border-black p-3 sm:p-4 z-50">
      <div className="max-w-4xl mx-auto space-y-2.5 sm:space-y-3">
        {/* Bar Title */}
        <div className="flex items-center justify-between">
          <div className="text-[11px] font-bold text-[#555555] uppercase tracking-wider flex items-center gap-1.5">
            <span>Ask About Topic</span>
          </div>
          <div className="flex items-center gap-3">
            {hasMessages && onClearChat && (
              <button
                type="button"
                onClick={onClearChat}
                className="text-[11px] font-mono font-bold text-[#ED1C24] hover:underline cursor-pointer"
              >
                reset_chat()
              </button>
            )}
            <div className="text-[11px] font-mono text-[#777777]">
              cv_data: loaded ({visitedTopics.length}/5 explored)
            </div>
          </div>
        </div>

        {/* Pill Buttons (Me, Projects, Skills, Fun, Contact) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {TOPIC_OPTIONS.map((topic) => {
            const isVisited = visitedTopics.includes(topic.id);
            const isActive = activeTopic === topic.id;
            return (
              <button
                key={topic.id}
                type="button"
                onClick={() => onSelectTopic(topic.id)}
                className={`topic-btn flex items-center gap-2 px-4 py-2 rounded-full font-bold text-xs border-2 border-black transition-all active:scale-95 shadow-sm whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-black text-white'
                    : isVisited
                    ? 'bg-[#F5F5F5] hover:bg-[#DCDCDC] text-black'
                    : 'bg-[#FFFFFF] hover:bg-[#DCDCDC] text-black'
                }`}
              >
                <span
                  className={`w-4 h-4 rounded-full ${topic.badgeClass} flex items-center justify-center text-[10px] font-bold`}
                >
                  {topic.icon}
                </span>
                <span>{topic.label}</span>
                {isVisited && !isActive && (
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-[#00AA44]"
                    title="Visited in chat"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Freeform message dispatch */}
        <form onSubmit={handleSubmit} className="relative flex items-center">
          <input
            id="user-input"
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Ask a question or click any topic above..."
            className="w-full pl-5 pr-14 py-3 rounded-full bg-[#F5F5F5] border-2 border-black text-xs sm:text-sm font-medium text-black placeholder-[#777777] focus:outline-none focus:bg-white transition-all shadow-inner"
          />
          <button
            type="submit"
            className="absolute right-2 w-9 h-9 rounded-full bg-[#ED1C24] hover:bg-black text-white flex items-center justify-center transition-colors shadow-sm cursor-pointer"
            title="Send"
            aria-label="Send"
          >
            <svg
              className="w-4 h-4 transform rotate-90"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M12 19V5m-7 7l7-7 7 7"
              />
            </svg>
          </button>
        </form>
      </div>
    </footer>
  );
}
