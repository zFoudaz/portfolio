'use client';

import React from 'react';
import { PORTFOLIO_DATA } from '@/data/portfolioData';

export function ContactCard() {
  const { contact } = PORTFOLIO_DATA;

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
        {contact.map((channel) => (
          <a
            key={channel.label}
            href={channel.href}
            target={channel.external ? '_blank' : undefined}
            rel={channel.external ? 'noreferrer' : undefined}
            className="p-5 bg-[#DCDCDC] hover:bg-black hover:text-white group rounded-lg border-2 border-black transition-all space-y-1 block"
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
        ))}
      </div>
    </div>
  );
}
