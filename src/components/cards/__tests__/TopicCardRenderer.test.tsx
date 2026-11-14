import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { TopicCardRenderer } from '../TopicCardRenderer';

describe('TopicCardRenderer', () => {
  it('renders MeCard with education, GPA, and work experience', () => {
    render(<TopicCardRenderer topicId="me" />);
    expect(screen.getByText('Mansoura University')).toBeInTheDocument();
    expect(screen.getByText('GPA: 3.7 / 4.0')).toBeInTheDocument();
    expect(screen.getByText('AI Engineer Intern')).toBeInTheDocument();
  });

  it('renders ProjectsCard as an interactive slider with single project focus, controls, and wrap-around', () => {
    render(<TopicCardRenderer topicId="projects" />);
    expect(screen.getByText('Engineering Projects')).toBeInTheDocument();
    expect(screen.getByText('4 Featured Systems')).toBeInTheDocument();

    // Initial slide: 01 / 04 and GenLearn
    expect(screen.getByText('01 / 04')).toBeInTheDocument();
    expect(screen.getByText('GenLearn')).toBeInTheDocument();
    expect(screen.queryByText('Research Agent with LangGraph')).not.toBeInTheDocument();

    const genlearnImg = screen.getByAltText('GenLearn Project Architecture');
    const genlearnLink = genlearnImg.closest('a');
    expect(genlearnLink).toHaveAttribute('href', 'https://github.com/Gen-Learn');
    expect(genlearnLink).toHaveAttribute('target', '_blank');

    // Next navigation
    const nextBtn = screen.getByRole('button', { name: /Next project/i });
    const prevBtn = screen.getByRole('button', { name: /Previous project/i });
    expect(nextBtn).toBeInTheDocument();
    expect(prevBtn).toBeInTheDocument();

    fireEvent.click(nextBtn);
    expect(screen.getByText('02 / 04')).toBeInTheDocument();
    expect(screen.getByText('Research Agent with LangGraph')).toBeInTheDocument();
    expect(screen.queryByText('GenLearn')).not.toBeInTheDocument();

    // Jump to slide 3 via indicator pill (PopChoice with Live Demo)
    const slide3Btn = screen.getByRole('button', { name: /Go to project 3/i });
    fireEvent.click(slide3Btn);
    expect(screen.getByText('03 / 04')).toBeInTheDocument();
    expect(screen.getByText('PopChoice')).toBeInTheDocument();

    const liveDemoLink = screen.getByRole('link', { name: /Live Demo/i });
    expect(liveDemoLink).toHaveAttribute('href', 'https://popchoice.ziyadfouda.site/');
    expect(liveDemoLink).toHaveAttribute('target', '_blank');

    // Wrap around: Go to slide 1, click Prev -> wraps to slide 4 (Study Tracker App)
    const slide1Btn = screen.getByRole('button', { name: /Go to project 1/i });
    fireEvent.click(slide1Btn);
    expect(screen.getByText('01 / 04')).toBeInTheDocument();

    fireEvent.click(prevBtn);
    expect(screen.getByText('04 / 04')).toBeInTheDocument();
    expect(screen.getByText('Study Tracker App')).toBeInTheDocument();
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
    expect(modal.parentElement).toBe(document.body);

    const closeBtn = screen.getByRole('button', { name: /Close lightbox/i });
    fireEvent.click(closeBtn);
    expect(screen.queryByTestId('image-lightbox-modal')).not.toBeInTheDocument();

    rerender(<TopicCardRenderer topicId="fun" />);
    const catImg = screen.getByAltText('Mshmsh');
    fireEvent.click(catImg);
    expect(screen.getByTestId('image-lightbox-modal')).toBeInTheDocument();
  });

  it('supports one-click Copy Email, Copy Phone, and direct WhatsApp link in ContactCard', async () => {
    const writeTextMock = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, {
      clipboard: { writeText: writeTextMock },
    });

    render(<TopicCardRenderer topicId="contact" />);

    const copyEmailBtn = screen.getByRole('button', { name: /Copy Email/i });
    const copyPhoneBtn = screen.getByRole('button', { name: /Copy Phone/i });
    const whatsappLink = screen.getByRole('link', { name: /WhatsApp Chat/i });

    expect(whatsappLink).toHaveAttribute('href', 'https://wa.me/201069640521');
    expect(whatsappLink).toHaveAttribute('target', '_blank');

    fireEvent.click(copyEmailBtn);
    expect(writeTextMock).toHaveBeenCalledWith('ziyad.fouda7@gmail.com');
    await waitFor(() => {
      expect(screen.getByText(/Copied! ✓/i)).toBeInTheDocument();
    });

    fireEvent.click(copyPhoneBtn);
    expect(writeTextMock).toHaveBeenCalledWith('+201069640521');
  });
});
