import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { PortfolioChat } from '../PortfolioChat';

describe('PortfolioChat interactive flow', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    window.HTMLElement.prototype.scrollIntoView = vi.fn();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders only the intro welcome message initially (no topic cards pre-rendered)', () => {
    render(<PortfolioChat />);
    expect(screen.getByText(/SYSTEM ONLINE/i)).toBeInTheDocument();
    expect(screen.queryByText('Engineering Projects')).not.toBeInTheDocument();
    expect(screen.queryByText('Mansoura University')).not.toBeInTheDocument();
  });

  it('appends user bubble and renders topic card smoothly when a topic pill is clicked', () => {
    render(<PortfolioChat />);
    const projectsBtn = screen.getByRole('button', { name: /Projects/i });
    fireEvent.click(projectsBtn);

    // User query appears immediately
    expect(screen.getByText('What are your top projects? (Projects)')).toBeInTheDocument();

    // Advance timer past typing animation
    act(() => {
      vi.advanceTimersByTime(400);
    });

    expect(screen.getByText('Engineering Projects')).toBeInTheDocument();
    expect(screen.getByText('GenLearn')).toBeInTheDocument();
  });

  it('appends multiple topics in conversation history order', () => {
    render(<PortfolioChat />);
    fireEvent.click(screen.getByRole('button', { name: /Me/i }));
    act(() => {
      vi.advanceTimersByTime(400);
    });

    fireEvent.click(screen.getByRole('button', { name: /Fun/i }));
    act(() => {
      vi.advanceTimersByTime(400);
    });

    expect(screen.getByText('Mansoura University')).toBeInTheDocument();
    expect(screen.getByText('Fun Facts & Musings')).toBeInTheDocument();
  });

  it('ignores whitespace-only input and handles unmatched freeform questions gracefully', () => {
    render(<PortfolioChat />);
    const input = screen.getByPlaceholderText(/Ask a question or click any topic above/i);
    const form = input.closest('form')!;

    fireEvent.change(input, { target: { value: '   ' } });
    fireEvent.submit(form);
    expect(screen.queryByTestId('user-query-bubble')).not.toBeInTheDocument();

    fireEvent.change(input, { target: { value: 'What is the weather?' } });
    fireEvent.submit(form);
    act(() => {
      vi.advanceTimersByTime(400);
    });

    expect(screen.getByText('What is the weather?')).toBeInTheDocument();
    expect(screen.getByText(/AI chatbot assistant is being connected/i)).toBeInTheDocument();
  });
});
