import { describe, it, expect } from 'vitest';
import { TOPIC_OPTIONS, PORTFOLIO_DATA, matchTopicFromInput } from '../portfolioData';

describe('portfolioData & keyword routing', () => {
  it('defines all 5 core topics in order', () => {
    expect(TOPIC_OPTIONS.map((t) => t.id)).toEqual(['me', 'projects', 'skills', 'fun', 'contact']);
  });

  it('matches keywords to the appropriate TopicId', () => {
    expect(matchTopicFromInput('Tell me about your projects and GenLearn')).toBe('projects');
    expect(matchTopicFromInput('What python and pytorch skills do you have?')).toBe('skills');
    expect(matchTopicFromInput('How can I contact or email you?')).toBe('contact');
    expect(matchTopicFromInput('Tell me something fun')).toBe('fun');
    expect(matchTopicFromInput('Who is Ziyad? education and experience')).toBe('me');
  });

  it('returns null for empty or unrecognized freeform input', () => {
    expect(matchTopicFromInput('   ')).toBeNull();
    expect(matchTopicFromInput('What is the weather in Cairo?')).toBeNull();
  });

  it('contains all 4 projects and 6 certificates with local webp images and repo/live links', () => {
    expect(PORTFOLIO_DATA.projects).toHaveLength(4);
    expect(PORTFOLIO_DATA.certificates).toHaveLength(6);

    const [genlearn, researchAgent, popchoice, studyTracker] = PORTFOLIO_DATA.projects;
    expect(genlearn.imageUrl).toBe('/images/projects/genlearn.webp');
    expect(genlearn.repoUrl).toBe('https://github.com/Gen-Learn');

    expect(researchAgent.imageUrl).toBe('/images/projects/research_agent.webp');
    expect(researchAgent.repoUrl).toBe('https://github.com/zFoudaz/Research-agent-with-LangGraph');

    expect(popchoice.imageUrl).toBe('/images/projects/pop_choice.webp');
    expect(popchoice.repoUrl).toBe('https://github.com/zFoudaz/popChoice-api');
    expect(popchoice.liveUrl).toBe('https://popchoice.ziyadfouda.site/');

    expect(studyTracker.imageUrl).toBe('/images/projects/study_tracker_app.webp');
    expect(studyTracker.repoUrl).toBe('https://github.com/zFoudaz/Study-Tracker-App');

    PORTFOLIO_DATA.certificates.forEach((cert) => {
      expect(cert.imageUrl).toMatch(/^\/images\/certificates\/.+\.webp$/);
    });

    expect(PORTFOLIO_DATA.funFacts.map((f) => f.title)).toEqual([
      'My Family Is Everything',
      'Cat Person - Mshmsh & Bessela',
      'Abyusif - Wa7ed Wa7ed',
      'Competitive Gaming (Valorant)',
    ]);
  });
});
