import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { TopicCardRenderer } from '../TopicCardRenderer';

describe('TopicCardRenderer', () => {
  it('renders MeCard with education, GPA, and work experience', () => {
    render(<TopicCardRenderer topicId="me" />);
    expect(screen.getByText('Mansoura University')).toBeInTheDocument();
    expect(screen.getByText('GPA: 3.7 / 4.0')).toBeInTheDocument();
    expect(screen.getByText('AI Engineer Intern')).toBeInTheDocument();
  });

  it('renders ProjectsCard with 4 projects, clickable repo image links, and PopChoice live demo button', () => {
    render(<TopicCardRenderer topicId="projects" />);
    expect(screen.getByText('Engineering Projects')).toBeInTheDocument();
    expect(screen.getByText('4 Featured Systems')).toBeInTheDocument();
    expect(screen.getByText('GenLearn')).toBeInTheDocument();
    expect(screen.getByText('Research Agent with LangGraph')).toBeInTheDocument();

    const genlearnImg = screen.getByAltText('GenLearn Project Architecture');
    const genlearnLink = genlearnImg.closest('a');
    expect(genlearnLink).toHaveAttribute('href', 'https://github.com/Gen-Learn');
    expect(genlearnLink).toHaveAttribute('target', '_blank');

    const liveDemoLink = screen.getByRole('link', { name: /Live Demo/i });
    expect(liveDemoLink).toHaveAttribute('href', 'https://popchoice.ziyadfouda.site/');
    expect(liveDemoLink).toHaveAttribute('target', '_blank');
  });

  it('renders SkillsCard with skills and 6 credentials', () => {
    render(<TopicCardRenderer topicId="skills" />);
    expect(screen.getByText('Skills & Certifications')).toBeInTheDocument();
    expect(screen.getByText('6 Verified Credentials')).toBeInTheDocument();
    expect(screen.getByText('AI Engineering Specialization')).toBeInTheDocument();
  });

  it('renders FunCard with Valorant image, Mshmsh & Bessela cats, Family, and Abyusif Wa7ed Wa7ed without em-dashes, and ContactCard accurately', () => {
    const { rerender } = render(<TopicCardRenderer topicId="fun" />);
    expect(screen.getByText('Fun Facts & Musings')).toBeInTheDocument();
    expect(screen.getByText('Cat Person - Mshmsh & Bessela')).toBeInTheDocument();
    expect(screen.getAllByText(/Valorant/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Mshmsh/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Bessela/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/Family Is Everything/i)).toBeInTheDocument();
    expect(screen.getByAltText('Family')).toHaveAttribute('src', '/images/fun/family.webp');
    expect(screen.getAllByText(/Abyusif/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Wa7ed Wa7ed/i).length).toBeGreaterThan(0);

    rerender(<TopicCardRenderer topicId="contact" />);
    expect(screen.getByText('ziyad.fouda7@gmail.com')).toBeInTheDocument();
  });

  it('renders styled fallback header when external project or certificate image fails to load', () => {
    render(<TopicCardRenderer topicId="projects" />);
    const genlearnImg = screen.getByAltText('GenLearn Project Architecture');
    fireEvent.error(genlearnImg);
    expect(screen.queryByAltText('GenLearn Project Architecture')).not.toBeInTheDocument();
    expect(screen.getByTestId('project-fallback-genlearn')).toBeInTheDocument();
  });

  it('opens and closes the image lightbox modal when clicking a certificate in SkillsCard or a photo in FunCard', () => {
    const { rerender } = render(<TopicCardRenderer topicId="skills" />);
    const certImg = screen.getByAltText('AI Engineering Specialization');
    fireEvent.click(certImg);

    const modal = screen.getByTestId('image-lightbox-modal');
    expect(modal).toBeInTheDocument();

    const closeBtn = screen.getByRole('button', { name: /Close lightbox/i });
    fireEvent.click(closeBtn);
    expect(screen.queryByTestId('image-lightbox-modal')).not.toBeInTheDocument();

    rerender(<TopicCardRenderer topicId="fun" />);
    const catImg = screen.getByAltText('Mshmsh');
    fireEvent.click(catImg);
    expect(screen.getByTestId('image-lightbox-modal')).toBeInTheDocument();
  });
});
