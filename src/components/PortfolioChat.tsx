'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from './Header';
import { BottomDock } from './BottomDock';
import { TopicCardRenderer } from './cards/TopicCardRenderer';
import { TOPIC_OPTIONS, matchTopicFromInput } from '@/data/portfolioData';
import { TopicId, ChatMessageItem } from '@/types/portfolio';

export function PortfolioChat(): React.JSX.Element {
  const [messages, setMessages] = useState<ChatMessageItem[]>([]);
  const [visitedTopics, setVisitedTopics] = useState<TopicId[]>([]);
  const [activeTopic, setActiveTopic] = useState<TopicId | null>(null);
  const [pendingCount, setPendingCount] = useState(0);

  const latestMessageRef = useRef<HTMLDivElement | null>(null);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const msgCounterRef = useRef(0);

  const nextId = (prefix: string) => {
    msgCounterRef.current += 1;
    return `${prefix}-${msgCounterRef.current}`;
  };

  useEffect(() => {
    return () => {
      timersRef.current.forEach((t) => clearTimeout(t));
    };
  }, []);

  useEffect(() => {
    if (messages.length > 0 && latestMessageRef.current) {
      latestMessageRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [messages, pendingCount]);

  const handleSelectTopic = useCallback((topicId: TopicId, customUserQuery?: string) => {
    const topicMeta = TOPIC_OPTIONS.find((t) => t.id === topicId);
    const queryText = customUserQuery || topicMeta?.queryText || topicId;

    const userMsg: ChatMessageItem = {
      id: nextId('user'),
      role: 'user',
      text: queryText,
      topicId,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setActiveTopic(topicId);
    setVisitedTopics((prev) => (prev.includes(topicId) ? prev : [...prev, topicId]));
    setPendingCount((c) => c + 1);

    const timer = setTimeout(() => {
      const botMsg: ChatMessageItem = {
        id: nextId('assistant'),
        role: 'assistant',
        topicId,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, botMsg]);
      setPendingCount((c) => Math.max(0, c - 1));
    }, 320);

    timersRef.current.push(timer);
  }, []);

  const handleCustomSubmit = useCallback(
    (text: string) => {
      const trimmed = text.trim();
      if (!trimmed) return;

      const matchedTopic = matchTopicFromInput(trimmed);
      if (matchedTopic) {
        handleSelectTopic(matchedTopic, trimmed);
        return;
      }

      const userMsg: ChatMessageItem = {
        id: nextId('user'),
        role: 'user',
        text: trimmed,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, userMsg]);
      setPendingCount((c) => c + 1);

      const timer = setTimeout(() => {
        const fallbackMsg: ChatMessageItem = {
          id: nextId('assistant'),
          role: 'assistant',
          text: "My live AI chatbot assistant is being connected next! In the meantime, click any topic below (Me, Projects, Skills, Fun, or Contact) or ask about my projects, experience, or stack.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, fallbackMsg]);
        setPendingCount((c) => Math.max(0, c - 1));
      }, 320);

      timersRef.current.push(timer);
    },
    [handleSelectTopic]
  );

  const handleClearChat = useCallback(() => {
    timersRef.current.forEach((t) => clearTimeout(t));
    timersRef.current = [];
    setMessages([]);
    setPendingCount(0);
    setActiveTopic(null);
  }, []);

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col antialiased selection:bg-[#ED1C24] selection:text-white pb-44">
      <Header onContactClick={() => handleSelectTopic('contact')} />

      <main id="chat-container" className="w-full px-4 py-8 flex-1">
        <div id="messages-list" className="max-w-4xl mx-auto space-y-8">
          {/* Intro Welcome Message */}
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-start gap-3"
          >
            <div className="w-9 h-9 rounded-full bg-black text-white flex-shrink-0 flex items-center justify-center font-bold text-xs border border-black">
              ZF
            </div>
            <div className="space-y-4 max-w-2xl w-full">
              <div className="bg-white p-5 sm:p-6 rounded-2xl rounded-tl-sm border-2 border-black shadow-sm space-y-3">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-black text-white text-[10px] font-mono font-bold">
                    SYSTEM ONLINE
                  </span>
                  <span className="text-xs text-[#666666]">Portfolio Chatbot Assistant</span>
                </div>
                <p className="text-sm sm:text-base font-semibold text-black">
                  Welcome to my portfolio! I’m{' '}
                  <strong className="text-[#ED1C24]">Ziyad Fouda</strong>, AI Engineer and Computer
                  Engineering graduate.
                </p>
                <p className="text-sm text-[#333333] leading-relaxed">
                  Click any topic in the bottom dock (<strong>Me</strong>,{' '}
                  <strong>Projects</strong>, <strong>Skills</strong>, <strong>Fun</strong>, or{' '}
                  <strong>Contact</strong>) to render it right here in our conversation, or type a
                  question in the prompt bar below.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Dynamic Conversation History */}
          <AnimatePresence initial={false}>
            {messages.map((msg, index) => {
              const isLatest = index === messages.length - 1;
              const topicMeta = msg.topicId
                ? TOPIC_OPTIONS.find((t) => t.id === msg.topicId)
                : undefined;

              if (msg.role === 'user') {
                return (
                  <motion.div
                    key={msg.id}
                    ref={isLatest ? latestMessageRef : undefined}
                    initial={{ opacity: 0, y: 12, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                    className="flex justify-end scroll-mt-24"
                    data-testid="user-query-bubble"
                  >
                    <div className="bg-black text-white px-4 py-2 rounded-full font-semibold text-xs sm:text-sm flex items-center gap-2 border border-black shadow-sm max-w-md">
                      <span>{topicMeta?.userEmoji || '👤'}</span>
                      <span>{msg.text}</span>
                    </div>
                  </motion.div>
                );
              }

              return (
                <motion.div
                  key={msg.id}
                  ref={isLatest ? latestMessageRef : undefined}
                  initial={{ opacity: 0, y: 16, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-start gap-3 scroll-mt-24"
                >
                  <div className="w-9 h-9 rounded-full bg-black text-white flex-shrink-0 flex items-center justify-center font-bold text-xs border border-black">
                    ZF
                  </div>
                  {msg.topicId ? (
                    <TopicCardRenderer topicId={msg.topicId} />
                  ) : (
                    <div className="bg-white p-5 rounded-2xl rounded-tl-sm border-2 border-black shadow-sm space-y-3 max-w-2xl">
                      <p className="text-sm text-[#333333] leading-relaxed">{msg.text}</p>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {TOPIC_OPTIONS.map((t) => (
                          <button
                            key={`fallback-${msg.id}-${t.id}`}
                            type="button"
                            onClick={() => handleSelectTopic(t.id)}
                            className="px-3 py-1 rounded-full bg-[#DCDCDC] hover:bg-black hover:text-white text-black text-xs font-bold border border-black transition-colors cursor-pointer"
                          >
                            {t.icon} {t.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}

            {/* Typing Indicator */}
            {pendingCount > 0 && (
              <motion.div
                key="typing-indicator"
                ref={latestMessageRef}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.18 }}
                className="flex items-center gap-3 scroll-mt-24"
                data-testid="typing-indicator"
              >
                <div className="w-9 h-9 rounded-full bg-black text-white flex-shrink-0 flex items-center justify-center font-bold text-xs border border-black">
                  ZF
                </div>
                <div className="bg-white px-4 py-3 rounded-2xl rounded-tl-sm border-2 border-black shadow-sm flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#ED1C24] animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-2 h-2 rounded-full bg-black animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-2 h-2 rounded-full bg-black animate-bounce" />
                  <span className="text-xs font-mono text-[#555555] ml-1">rendering_card...</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <BottomDock
        onSelectTopic={(id) => handleSelectTopic(id)}
        onSubmitCustom={handleCustomSubmit}
        onClearChat={handleClearChat}
        visitedTopics={visitedTopics}
        activeTopic={activeTopic}
        isTyping={pendingCount > 0}
        hasMessages={messages.length > 0}
      />
    </div>
  );
}
