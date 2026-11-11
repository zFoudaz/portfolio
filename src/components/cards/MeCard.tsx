'use client';

import React from 'react';
import { PORTFOLIO_DATA } from '@/data/portfolioData';

export function MeCard() {
  const { profile, experiences } = PORTFOLIO_DATA;

  return (
    <div className="w-full bg-white p-6 sm:p-8 rounded-2xl rounded-tl-sm border-2 border-black space-y-6 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-black pb-4">
        <div>
          <span className="px-3 py-1 rounded-full bg-black text-white text-xs font-bold uppercase tracking-wider">
            Summary &amp; Education
          </span>
          <h3 className="text-3xl font-black text-black mt-2">{profile.name}</h3>
          <div className="text-sm font-semibold text-[#333333]">{profile.role}</div>
        </div>
        <div className="flex flex-col sm:items-end gap-2">
          <div className="sm:text-right">
            <div className="text-xs font-mono font-bold text-[#ED1C24]">{profile.location}</div>
            <div className="text-xs font-mono text-[#555555]">{profile.graduation}</div>
          </div>
          <a
            href={profile.resumeUrl}
            target="_blank"
            rel="noreferrer"
            download
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F5F5F5] hover:bg-black hover:text-white text-black border border-black text-xs font-bold transition-colors w-fit"
          >
            <span>📄</span>
            <span>Download Resume PDF</span>
          </a>
        </div>
      </div>

      {/* Summary Statement */}
      <p className="text-sm sm:text-base text-[#333333] leading-relaxed">
        AI Engineer and Computer Engineering graduate with hands-on experience in machine learning,
        deep learning, Generative AI, and LLM application development. Experienced in building
        AI-powered applications and agentic workflows using{' '}
        <strong>Python, LangChain, LangGraph, Azure OpenAI, and RAG</strong>. Seeking an
        entry-level AI Engineering opportunity to build and deploy scalable AI solutions for
        real-world problems.
      </p>

      {/* Education & Stats Bento Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {profile.stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-[#DCDCDC] p-5 rounded-lg border-2 border-black space-y-1"
          >
            <div className="text-xs font-bold uppercase text-[#555555]">{stat.label}</div>
            <div
              className={`${
                stat.isHighlightSubtext ? 'text-2xl' : 'text-lg'
              } font-black text-black`}
            >
              {stat.value}
            </div>
            <div
              className={`text-xs ${
                stat.isHighlightSubtext ? 'font-bold text-[#00AA44]' : 'text-[#333333]'
              }`}
            >
              {stat.subtext}
            </div>
          </div>
        ))}
      </div>

      {/* Professional Experience Timeline Grid */}
      <div className="space-y-4 pt-2">
        <div className="text-xs font-bold uppercase tracking-wider text-black border-b border-black pb-2">
          Work Experience Timeline
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {experiences.map((exp) => (
            <div
              key={`${exp.role}-${exp.period}`}
              className="bg-[#F5F5F5] p-5 rounded-lg border-2 border-black space-y-2"
            >
              <div className="flex items-center justify-between text-xs">
                <span
                  className={`px-2 py-0.5 rounded ${
                    exp.isCurrent ? 'bg-[#ED1C24]' : 'bg-black'
                  } text-white font-bold text-[10px] uppercase`}
                >
                  {exp.badge}
                </span>
                <span
                  className={`font-mono ${
                    exp.isCurrent ? 'font-bold text-black' : 'text-[#555555]'
                  }`}
                >
                  {exp.period}
                </span>
              </div>
              <h4 className="text-base font-black text-black">{exp.role}</h4>
              <div className="text-xs font-semibold text-[#555555]">{exp.companyAndLocation}</div>
              <ul className="text-xs text-[#333333] space-y-1 pt-1 leading-relaxed">
                {exp.bullets.map((b, idx) => (
                  <li key={idx}>• {b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
