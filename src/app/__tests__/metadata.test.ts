import { describe, it, expect, vi } from 'vitest';

vi.mock('next/font/google', () => ({
  Inter: () => ({ variable: '--font-inter' }),
  JetBrains_Mono: () => ({ variable: '--font-jetbrains-mono' }),
}));

import { metadata } from '../layout';
import OgImage, { alt, size, contentType } from '../opengraph-image';

describe('SEO Metadata & OpenGraph Image', () => {
  it('configures favicon.ico and OpenGraph / Twitter preview metadata in layout.tsx', () => {
    expect(metadata.title).toBe('Ziyad Fouda - Interactive AI Engineer Portfolio');
    expect(metadata.icons).toEqual({
      icon: '/favicon.ico',
      shortcut: '/favicon.ico',
      apple: '/favicon.ico',
    });
    expect(metadata.openGraph).toMatchObject({
      title: 'Ziyad Fouda - Interactive AI Engineer Portfolio',
      type: 'website',
      siteName: 'Ziyad Fouda Portfolio',
    });
    expect(metadata.twitter).toMatchObject({
      card: 'summary_large_image',
      title: 'Ziyad Fouda - Interactive AI Engineer Portfolio',
    });
  });

  it('exports a 1200x630 neo-brutalist OpenGraph image generator', async () => {
    expect(size).toEqual({ width: 1200, height: 630 });
    expect(contentType).toBe('image/png');
    expect(alt).toContain('Ziyad Fouda');

    const response = await OgImage();
    expect(response).toBeDefined();
    expect(response.status).toBe(200);
  });
});
