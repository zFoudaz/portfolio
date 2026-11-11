'use client';

import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '@/data/portfolioData';

export function Avatar({ size = 'sm' }: { size?: 'sm' | 'md' }): React.JSX.Element {
  const [imgFailed, setImgFailed] = useState(false);
  const { profile } = PORTFOLIO_DATA;

  const sizeClasses =
    size === 'md'
      ? 'w-10 h-10 text-sm border-2 border-black'
      : 'w-9 h-9 text-xs border border-black';

  if (imgFailed) {
    return (
      <div
        className={`${sizeClasses} rounded-full bg-black text-white flex-shrink-0 flex items-center justify-center font-bold`}
      >
        {profile.initials}
      </div>
    );
  }

  return (
    <img
      src={profile.avatarUrl}
      alt={profile.name}
      onError={() => setImgFailed(true)}
      className={`${sizeClasses} rounded-full object-cover flex-shrink-0 bg-black`}
    />
  );
}
