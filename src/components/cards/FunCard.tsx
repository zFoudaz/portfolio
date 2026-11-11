'use client';

import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '@/data/portfolioData';

function CatPhotoTile({ src, caption }: { src: string; caption: string }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    const isCat = caption === 'Mshmsh' || caption === 'Bessela';
    const isMusic = caption.toLowerCase().includes('abyusif') || caption.toLowerCase().includes('wa7ed');
    const isFamily = caption.toLowerCase().includes('family');
    return (
      <div className="bg-white/80 rounded-lg border-2 border-dashed border-black p-3 flex flex-col items-center justify-center text-center h-36">
        <span className="text-2xl mb-1">
          {isCat ? '🐾' : isMusic ? '🎵' : isFamily ? '❤️' : '🎯'}
        </span>
        <span className="text-xs font-black text-black">{caption}</span>
        <span className="text-[10px] font-mono text-[#555555] mt-0.5">
          Add {src.replace('/images/fun/', '')}
        </span>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border-2 border-black overflow-hidden">
      <img
        src={src}
        alt={caption}
        onError={() => setFailed(true)}
        className="w-full h-36 object-cover border-b border-black"
      />
      <div className="px-2.5 py-1.5 text-center bg-white">
        <span className="text-xs font-black text-black">{caption}</span>
      </div>
    </div>
  );
}

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
            className="p-5 bg-[#DCDCDC] rounded-lg border-2 border-black space-y-3 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="text-3xl">{fact.emoji}</div>
              <h4 className="font-black text-black text-base">{fact.title}</h4>
              <p className="text-xs sm:text-sm text-[#333333] leading-relaxed">
                {fact.description}
              </p>
            </div>

            {fact.images && fact.images.length > 0 && (
              <div
                className={`grid ${
                  fact.images.length > 1 ? 'grid-cols-2' : 'grid-cols-1'
                } gap-2.5 pt-2`}
              >
                {fact.images.map((img) => (
                  <CatPhotoTile key={img.src} src={img.src} caption={img.caption} />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
