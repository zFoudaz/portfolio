'use client';

import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '@/data/portfolioData';

export function ContactCard() {
  const { contact } = PORTFOLIO_DATA;
  const [copiedChannel, setCopiedChannel] = useState<string | null>(null);

  const handleCopy = async (label: string, text: string) => {
    try {
      await navigator.clipboard?.writeText(text);
    } catch {
      // Fallback if clipboard API fails in older browsers
    }
    setCopiedChannel(label);
    setTimeout(() => {
      setCopiedChannel((prev) => (prev === label ? null : prev));
    }, 2000);
  };

  return (
    <div className="w-full bg-white p-6 sm:p-8 rounded-2xl rounded-tl-sm border-2 border-black space-y-6 shadow-sm">
      <div className="flex items-center justify-between border-b-2 border-black pb-4">
        <div>
          <span className="px-3 py-1 rounded-full bg-[#ED1C24] text-white text-xs font-bold uppercase tracking-wider">
            Direct Communication
          </span>
          <h3 className="text-3xl font-black text-black mt-2">Get in Touch with Ziyad</h3>
        </div>
        <span className="text-xs font-mono font-bold text-[#00AA44]">● Ready to Connect</span>
      </div>

      <p className="text-sm text-[#333333] leading-relaxed">
        Seeking an entry-level AI Engineering opportunity to build and deploy scalable AI solutions
        for real-world problems. Let&apos;s discuss your agentic workflows and production LLM
        challenges.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {contact.map((channel) => {
          const isCopied = copiedChannel === channel.label;
          const hasActions = Boolean(channel.copyValue || channel.whatsappUrl);

          return (
            <div
              key={channel.label}
              className="p-5 bg-[#DCDCDC] hover:bg-black hover:text-white group rounded-lg border-2 border-black transition-all flex flex-col justify-between gap-3"
            >
              <a
                href={channel.href}
                target={channel.external ? '_blank' : undefined}
                rel={channel.external ? 'noreferrer' : undefined}
                className="space-y-1 block"
              >
                <div
                  className={`text-xs font-bold uppercase ${
                    channel.isAccentLabel
                      ? 'text-[#ED1C24] group-hover:text-[#ED1C24]'
                      : 'text-black group-hover:text-white'
                  }`}
                >
                  {channel.label}
                </div>
                <div className="text-base font-black text-black group-hover:text-white truncate">
                  {channel.value}
                </div>
                <div className="text-xs text-[#555555] group-hover:text-[#CCCCCC]">
                  {channel.sublabel}
                </div>
              </a>

              {hasActions && (
                <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-black/15 group-hover:border-white/20">
                  {channel.copyValue && (
                    <button
                      type="button"
                      onClick={() => handleCopy(channel.label, channel.copyValue!)}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold border border-black transition-colors ${
                        isCopied
                          ? 'bg-[#00AA44] text-white border-[#00AA44]'
                          : 'bg-white text-black hover:bg-[#ED1C24] hover:text-white hover:border-[#ED1C24]'
                      }`}
                    >
                      {isCopied ? (
                        <span>Copied! ✓</span>
                      ) : (
                        <>
                          <svg
                            className="w-3.5 h-3.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                            />
                          </svg>
                          <span>{channel.copyLabel ?? 'Copy'}</span>
                        </>
                      )}
                    </button>
                  )}

                  {channel.whatsappUrl && (
                    <a
                      href={channel.whatsappUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold bg-[#00AA44] text-white border border-black hover:bg-[#008F39] transition-colors"
                    >
                      <span>WhatsApp Chat</span>
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
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </a>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
