'use client';

import React, { useState } from 'react';
import { Maximize2 } from 'lucide-react';
import { PORTFOLIO_DATA } from '@/data/portfolioData';
import { ImageLightbox, LightboxImage } from '@/components/ImageLightbox';

function FunPhotoTile({
  src,
  caption,
  subtitle,
  onZoom,
}: {
  src: string;
  caption: string;
  subtitle: string;
  onZoom: (img: LightboxImage) => void;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    const isCat = caption === 'Mshmsh' || caption === 'Bessela';
    const isMusic =
      caption.toLowerCase().includes('abyusif') || caption.toLowerCase().includes('wa7ed');
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
    <div
      onClick={() => onZoom({ src, title: caption, subtitle })}
      className="bg-white rounded-lg border-2 border-black overflow-hidden group cursor-zoom-in relative"
      title={`Click to view ${caption} full size`}
    >
      <div className="relative overflow-hidden border-b border-black bg-[#1a1a1a]">
        <img
          src={src}
          alt={caption}
          onError={() => setFailed(true)}
          className="w-full h-36 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-2 right-2 px-2 py-1 rounded-full bg-black/85 text-white text-[10px] font-mono font-bold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity border border-white/20">
          <Maximize2 className="w-3 h-3" />
          <span>Zoom</span>
        </div>
      </div>
      <div className="px-2.5 py-1.5 text-center bg-white">
        <span className="text-xs font-black text-black">{caption}</span>
      </div>
    </div>
  );
}

export function FunCard() {
  const { funFacts } = PORTFOLIO_DATA;
  const [selectedImage, setSelectedImage] = useState<LightboxImage | null>(null);

  return (
    <div className="w-full bg-white p-4 sm:p-8 rounded-2xl sm:rounded-tl-sm border-2 border-black space-y-5 sm:space-y-6 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-black pb-3 sm:pb-4">
        <div>
          <span className="px-3 py-1 rounded-full bg-pink-100 text-pink-900 border border-pink-300 text-xs font-bold uppercase tracking-wider">
            Behind the Code
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-black mt-2">Fun Facts &amp; Musings</h3>
        </div>
        <span className="text-xs font-mono font-bold text-[#555555]">Click photos to zoom</span>
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
                  <FunPhotoTile
                    key={img.src}
                    src={img.src}
                    caption={img.caption}
                    subtitle={fact.title}
                    onZoom={setSelectedImage}
                  />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <ImageLightbox image={selectedImage} onClose={() => setSelectedImage(null)} />
    </div>
  );
}
