'use client';

import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '@/data/portfolioData';
import { ProjectItem } from '@/types/portfolio';

function ProjectVisualHeader({ project }: { project: ProjectItem }) {
  const [imgFailed, setImgFailed] = useState(false);

  if (imgFailed) {
    return (
      <div
        data-testid={`project-fallback-${project.id}`}
        className="w-full h-44 bg-gradient-to-br from-black via-[#1f1f1f] to-[#333333] border-b-2 border-black flex flex-col items-center justify-center p-4 text-center"
      >
        <span className="px-2.5 py-0.5 rounded bg-[#ED1C24] text-white font-mono text-[10px] font-bold uppercase tracking-wider mb-2">
          {project.techFocus}
        </span>
        <span className="text-white font-black text-lg tracking-tight">{project.title}</span>
      </div>
    );
  }

  return (
    <img
      src={project.imageUrl}
      alt={project.imageAlt}
      onError={() => setImgFailed(true)}
      className="w-full h-44 object-cover border-b-2 border-black bg-[#1a1a1a]"
    />
  );
}

export function ProjectsCard() {
  const { projects } = PORTFOLIO_DATA;

  return (
    <div className="w-full bg-white p-6 sm:p-8 rounded-2xl rounded-tl-sm border-2 border-black space-y-6 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-black pb-4">
        <div>
          <span className="px-3 py-1 rounded-full bg-[#ED1C24] text-white text-xs font-bold uppercase tracking-wider">
            Production AI Systems
          </span>
          <h3 className="text-3xl font-black text-black mt-2">Engineering Projects</h3>
        </div>
        <span className="text-xs font-mono font-bold text-[#555555]">4 Featured Systems</span>
      </div>

      {/* Projects 2x2 Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-[#DCDCDC] rounded-lg border-2 border-black overflow-hidden flex flex-col justify-between"
          >
            <div>
              <ProjectVisualHeader project={project} />
              <div className="p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span
                    className={`px-2.5 py-0.5 rounded-full ${
                      project.isAccentBadge ? 'bg-[#ED1C24]' : 'bg-black'
                    } text-white text-[10px] font-bold uppercase tracking-wider`}
                  >
                    {project.badge}
                  </span>
                  <span className="text-xs font-mono font-bold text-black">
                    {project.techFocus}
                  </span>
                </div>
                <h4 className="text-xl font-black text-black">{project.title}</h4>
                <p className="text-xs text-[#333333] leading-relaxed">{project.description}</p>
                <ul className="text-xs text-[#333333] space-y-1.5 pt-1">
                  {project.highlights.map((h) => (
                    <li key={h.label}>
                      • <strong>{h.label}</strong> {h.detail}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="p-5 pt-0">
              <div className="flex flex-wrap gap-1.5 pt-3 border-t border-black text-[11px] font-bold">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 bg-white border border-black rounded-full text-black"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
