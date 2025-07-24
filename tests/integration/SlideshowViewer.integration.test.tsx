import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { useParams } from 'next/navigation';
import SlideshowViewerClient from '../../app/slides/[slug]/SlideshowViewerClient';

// Mock Next.js router
vi.mock('next/navigation', () => ({
  useParams: vi.fn(),
}));

// Mock localStorage
const mockLocalStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
});

// Mock window.location
Object.defineProperty(window, 'location', {
  value: {
    search: '',
    href: '',
  },
  writable: true,
});

describe('SlideshowViewer Integration', () => {
  const mockSlidesIndex = [
    {
      name: 'test-presentation',
      import: `# Slide 1
Welcome to the presentation

# Slide 2
1. **Main Point**
   - Supporting detail 1
   - Supporting detail 2
2. **Another Point**
   - More details

# Slide 3
- Simple list item 1
- Simple list item 2`
    }
  ];

  beforeEach(() => {
    vi.mocked(useParams).mockReturnValue({ slug: 'test-presentation' });
    mockLocalStorage.getItem.mockReturnValue(null);
    window.location.search = '';
  });

  it('should render presentation overview correctly', async () => {
    render(<SlideshowViewerClient slidesIndex={mockSlidesIndex} />);

    // Wait for slides to load
    await screen.findByText('Slide 1');
    
    expect(screen.getByText('3 slides')).toBeInTheDocument();
    expect(screen.getByText('Start Presentation')).toBeInTheDocument();
    
    // Check that all slides are shown in overview
    expect(screen.getByText('Slide 1: Slide 1')).toBeInTheDocument();
    expect(screen.getByText('Slide 2: Slide 2')).toBeInTheDocument();
    expect(screen.getByText('Slide 3: Slide 3')).toBeInTheDocument();
  });

  it('should render nested lists correctly in overview', async () => {
    render(<SlideshowViewerClient slidesIndex={mockSlidesIndex} />);

    await screen.findByText('Slide 1');

    // Check that nested list structure is rendered
    expect(screen.getByText('Main Point')).toBeInTheDocument();
    expect(screen.getByText('Supporting detail 1')).toBeInTheDocument();
    expect(screen.getByText('Supporting detail 2')).toBeInTheDocument();
    expect(screen.getByText('Another Point')).toBeInTheDocument();
  });

  it('should enter presentation mode and use SlideRenderer', async () => {
    render(<SlideshowViewerClient slidesIndex={mockSlidesIndex} />);

    await screen.findByText('Start Presentation');
    
    // Start presentation
    fireEvent.click(screen.getByText('Start Presentation'));

    // Should now be in presentation mode
    expect(screen.getByText('Slide 1 of 3')).toBeInTheDocument();
    expect(screen.getByText('Welcome to the presentation')).toBeInTheDocument();
    
    // Should use SlideRenderer component (check for slide-container class)
    expect(document.querySelector('.slide-container')).toBeInTheDocument();
  });

  it('should navigate between slides in presentation mode', async () => {
    render(<SlideshowViewerClient slidesIndex={mockSlidesIndex} />);

    await screen.findByText('Start Presentation');
    fireEvent.click(screen.getByText('Start Presentation'));

    // Should start on slide 1
    expect(screen.getByText('Slide 1')).toBeInTheDocument();
    expect(screen.getByText('Welcome to the presentation')).toBeInTheDocument();

    // Navigate to next slide with keyboard
    fireEvent.keyDown(document, { key: 'ArrowRight' });

    // Should be on slide 2
    expect(screen.getByText('Slide 2')).toBeInTheDocument();
    expect(screen.getByText('Main Point')).toBeInTheDocument();
  });

  it('should handle direct presentation mode from URL', async () => {
    // Mock URL with present=true
    window.location.search = '?present=true';

    render(<SlideshowViewerClient slidesIndex={mockSlidesIndex} />);

    await screen.findByText('Slide 1 of 3');

    // Should start directly in presentation mode
    expect(screen.getByText('Slide 1')).toBeInTheDocument();
    expect(document.querySelector('.slide-container')).toBeInTheDocument();
  });

  it('should apply theme and font settings', async () => {
    mockLocalStorage.getItem.mockImplementation((key) => {
      if (key === 'slideshow-theme') return 'corporate';
      if (key === 'slideshow-font') return 'font-serif';
      return null;
    });

    render(<SlideshowViewerClient slidesIndex={mockSlidesIndex} />);

    await screen.findByText('Start Presentation');

    // Check that theme class is applied to body
    expect(document.body).toHaveClass('theme-corporate');
  });

  it('should handle empty or invalid slide data', () => {
    const emptySlidesIndex = [
      {
        name: 'empty-presentation',
        import: ''
      }
    ];

    vi.mocked(useParams).mockReturnValue({ slug: 'empty-presentation' });

    expect(() => {
      render(<SlideshowViewerClient slidesIndex={emptySlidesIndex} />);
    }).not.toThrow();
  });

  it('should handle slide not found', () => {
    vi.mocked(useParams).mockReturnValue({ slug: 'non-existent-slide' });

    expect(() => {
      render(<SlideshowViewerClient slidesIndex={mockSlidesIndex} />);
    }).not.toThrow();
  });
});
