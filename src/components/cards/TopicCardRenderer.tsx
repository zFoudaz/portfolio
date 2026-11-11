'use client';

import React from 'react';
import { TopicId } from '@/types/portfolio';
import { MeCard } from './MeCard';
import { ProjectsCard } from './ProjectsCard';
import { SkillsCard } from './SkillsCard';
import { FunCard } from './FunCard';
import { ContactCard } from './ContactCard';

export function TopicCardRenderer({ topicId }: { topicId: TopicId }): React.JSX.Element {
  switch (topicId) {
    case 'me':
      return <MeCard />;
    case 'projects':
      return <ProjectsCard />;
    case 'skills':
      return <SkillsCard />;
    case 'fun':
      return <FunCard />;
    case 'contact':
      return <ContactCard />;
  }
}
