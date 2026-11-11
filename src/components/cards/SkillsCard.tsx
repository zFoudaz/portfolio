'use client';

import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '@/data/portfolioData';
import { CertificateItem } from '@/types/portfolio';

function CertificateVisualHeader({ cert }: { cert: CertificateItem }) {
  const [imgFailed, setImgFailed] = useState(false);

  if (imgFailed) {
    return (
      <div className="w-full h-32 bg-gradient-to-br from-[#222222] to-black border-b-2 border-black flex flex-col items-center justify-center p-3 text-center">
        <span className="text-[10px] font-mono font-bold text-[#ED1C24] uppercase tracking-wider">
          {cert.issuer}
        </span>
        <span className="text-white text-xs font-bold mt-1 line-clamp-2">{cert.title}</span>
      </div>
    );
  }

  return (
    <img
      src={cert.imageUrl}
      alt={cert.title}
      onError={() => setImgFailed(true)}
      className="w-full h-32 object-cover border-b-2 border-black bg-[#1a1a1a]"
    />
  );
}

export function SkillsCard() {
  const { skills, certificates } = PORTFOLIO_DATA;

  return (
    <div className="w-full bg-white p-6 sm:p-8 rounded-2xl rounded-tl-sm border-2 border-black space-y-6 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-black pb-4">
        <div>
          <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-900 border border-purple-300 text-xs font-bold uppercase tracking-wider">
            Technical Stack
          </span>
          <h3 className="text-3xl font-black text-black mt-2">Skills &amp; Certifications</h3>
        </div>
        <span className="text-xs font-mono font-bold text-[#555555]">6 Verified Credentials</span>
      </div>

      {/* Skills Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {skills.map((group) => (
          <div
            key={group.category}
            className="bg-[#DCDCDC] p-5 rounded-lg border-2 border-black space-y-3"
          >
            <div className="text-xs font-black uppercase text-black border-b border-black pb-1">
              {group.category}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="px-2.5 py-1 rounded-full bg-white border border-black text-xs font-bold text-black"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Certificates 3-Column Grid */}
      <div className="space-y-4 pt-3">
        <div className="text-xs font-bold uppercase tracking-wider text-black border-b border-black pb-2">
          Certified Industry Credentials
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {certificates.map((cert) => (
            <div
              key={cert.title}
              className="bg-[#F5F5F5] rounded-lg border-2 border-black overflow-hidden flex flex-col justify-between"
            >
              <div>
                <CertificateVisualHeader cert={cert} />
                <div className="p-3.5 space-y-1">
                  <div className="text-xs font-bold text-black">{cert.title}</div>
                  <div className="text-[11px] font-mono text-[#555555]">{cert.issuer}</div>
                </div>
              </div>
              <div className="p-3.5 pt-0">
                <span className="inline-block px-2 py-0.5 rounded-full bg-black text-white text-[10px] font-bold">
                  {cert.badge}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
