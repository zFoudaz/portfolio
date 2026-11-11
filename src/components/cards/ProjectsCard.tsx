'use client';

import React, { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { PORTFOLIO_DATA } from '@/data/portfolioData';
import { ProjectItem } from '@/types/portfolio';

function ProjectVisualHeader({ project }: { project: ProjectItem }) {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <a
      href={project.repoUrl}
      target="_blank"
      rel="noreferrer"
      title={`View ${project.title} on GitHub`}
      className="block relative group overflow-hidden border-b-2 border-black bg-[#1a1a1a]"
    >
      {imgFailed ? (
        <div
          data-testid={`project-fallback-${project.id}`}
          className="w-full h-44 bg-gradient-to-br from-black via-[#1f1f1f] to-[#333333] flex flex-col items-center justify-center p-4 text-center"
        >
          <span className="px-2.5 py-0.5 rounded bg-[#ED1C24] text-white font-mono text-[10px] font-bold uppercase tracking-wider mb-2">
            {project.techFocus}
          </span>
          <span className="text-white font-black text-lg tracking-tight">{project.title}</span>
        </div>
      ) : (
        <img
          src={project.imageUrl}
          alt={project.imageAlt}
          onError={() => setImgFailed(true)}
          className="w-full h-44 object-cover transition-transform duration-300 group-hover:scale-105"
        />
      )}
      <div className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-full bg-black/85 text-white text-[10px] font-mono font-bold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity border border-white/20">
        <span>GitHub Repo</span>
        <ExternalLink className="w-3 h-3" />
      </div>
    </a>
  );
}

export function ProjectsCard() {
  const { projects } = PORTFOLIO_DATA;

  return (
    <div className="w-full bg-white p-4 sm:p-8 rounded-2xl sm:rounded-tl-sm border-2 border-black space-y-5 sm:space-y-6 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-black pb-3 sm:pb-4">
        <div>
          <span className="px-3 py-1 rounded-full bg-[#ED1C24] text-white text-xs font-bold uppercase tracking-wider">
            Production AI Systems
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-black mt-2">Engineering Projects</h3>
        </div>
        <span className="text-xs font-mono font-bold text-[#555555]">4 Featured Systems</span>
      </div>

      {/* Projects 2x2 Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-[#DCDCDC] rounded-lg border-2 border-black overflow-hidden flex flex-col justify-between"
          >
            <div>
              <ProjectVisualHeader project={project} />
              <div className="p-4 sm:p-5 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-1.5">
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
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h4 className="text-lg sm:text-xl font-black text-black">{project.title}</h4>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ED1C24] hover:bg-black text-white text-xs font-bold border border-black transition-colors shadow-sm flex-shrink-0"
                    >
                      <span>Live Demo</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
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
            <div className="p-4 sm:p-5 pt-0">
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
