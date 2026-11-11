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

  it('contains all 4 projects and 6 certificates without Stitch debug filenames', () => {
    expect(PORTFOLIO_DATA.projects).toHaveLength(4);
    expect(PORTFOLIO_DATA.certificates).toHaveLength(6);
  });
});
