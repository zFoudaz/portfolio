'use client';

import React from 'react';
import { PORTFOLIO_DATA } from '@/data/portfolioData';

export function FunCard() {
  const { funFacts } = PORTFOLIO_DATA;

  return (
    <div className="w-full bg-white p-6 sm:p-8 rounded-2xl rounded-tl-sm border-2 border-black space-y-6 shadow-sm">
      <div className="flex items-center justify-between border-b-2 border-black pb-4">
        <div>
          <span className="px-3 py-1 rounded-full bg-pink-100 text-pink-900 border border-pink-300 text-xs font-bold uppercase tracking-wider">
            Behind the Code
          </span>
          <h3 className="text-3xl font-black text-black mt-2">Fun Facts &amp; Musings</h3>
        </div>
        <span className="text-xs font-mono font-bold text-[#555555]">Personal Insights</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {funFacts.map((fact) => (
          <div
            key={fact.title}
            className="p-5 bg-[#DCDCDC] rounded-lg border-2 border-black space-y-2"
          >
            <div className="text-3xl">{fact.emoji}</div>
            <h4 className="font-black text-black text-base">{fact.title}</h4>
            <p className="text-xs sm:text-sm text-[#333333] leading-relaxed">{fact.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
