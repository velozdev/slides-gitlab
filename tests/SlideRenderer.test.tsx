import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, cleanup } from '@testing-library/react';
import SlideRenderer from '../components/SlideRenderer';

// Mock setTimeout and clearTimeout
const mockSetTimeout = vi.fn();
const mockClearTimeout = vi.fn();

beforeEach(() => {
  vi.stubGlobal('setTimeout', mockSetTimeout);
  vi.stubGlobal('clearTimeout', mockClearTimeout);
  // Reset mocks
  mockSetTimeout.mockClear();
  mockClearTimeout.mockClear();
});

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe('SlideRenderer', () => {
  it('should render slide content correctly', () => {
    const slides = [
      '<ul><li class="list-item unordered">Item 1</li><li class="list-item unordered">Item 2</li></ul>'
    ];

    const { container } = render(
      <SlideRenderer currentSlide={0} slides={slides} />
    );

    expect(container.querySelector('.slide-container')).toBeInTheDocument();
    expect(container.innerHTML).toContain('Item 1');
    expect(container.innerHTML).toContain('Item 2');
  });

  it('should find and reset list items on mount', () => {
    const slides = [
      '<ul><li class="list-item unordered">Item 1</li><li class="list-item unordered">Item 2</li></ul>'
    ];

    const { container } = render(
      <SlideRenderer currentSlide={0} slides={slides} />
    );

    const listItems = container.querySelectorAll('li.list-item');
    expect(listItems).toHaveLength(2);

    // Verify that list items have been reset (opacity and transform)
    listItems.forEach(item => {
      const htmlItem = item as HTMLElement;
      expect(htmlItem.style.opacity).toBe('0');
      expect(htmlItem.style.transform).toBe('translateX(-20px)');
      expect(htmlItem.classList.contains('animate-in')).toBe(false);
    });
  });

  it('should handle nested list items correctly', () => {
    const slides = [
      `<ul class="space-y-3 my-4 list-disc list-inside text-left">
        <li class="list-item unordered">Main Item 1
          <ul class="space-y-3 my-4 list-disc list-inside text-left">
            <li class="list-item unordered">Sub Item 1.1</li>
            <li class="list-item unordered">Sub Item 1.2</li>
          </ul>
        </li>
        <li class="list-item unordered">Main Item 2</li>
      </ul>`
    ];

    const { container } = render(
      <SlideRenderer currentSlide={0} slides={slides} />
    );

    const listItems = container.querySelectorAll('li.list-item');
    expect(listItems).toHaveLength(4); // Main Item 1, Sub Item 1.1, Sub Item 1.2, Main Item 2

    // Verify all list items are reset
    listItems.forEach(item => {
      const htmlItem = item as HTMLElement;
      expect(htmlItem.style.opacity).toBe('0');
      expect(htmlItem.style.transform).toBe('translateX(-20px)');
    });
  });

  it('should set up animation timer on mount', () => {
    const slides = [
      '<ul><li class="list-item unordered">Item 1</li></ul>'
    ];

    render(<SlideRenderer currentSlide={0} slides={slides} />);

    // Verify setTimeout was called for animation delay
    expect(mockSetTimeout).toHaveBeenCalledWith(expect.any(Function), 100);
  });

  it('should clean up timer on unmount', () => {
    const slides = [
      '<ul><li class="list-item unordered">Item 1</li></ul>'
    ];

    const { unmount } = render(
      <SlideRenderer currentSlide={0} slides={slides} />
    );

    // Simulate timer creation
    const mockTimerId = 'mock-timer-id';
    mockSetTimeout.mockReturnValue(mockTimerId);

    unmount();

    expect(mockClearTimeout).toHaveBeenCalledWith(mockTimerId);
  });

  it('should reset and re-animate when currentSlide changes', () => {
    const slides = [
      '<ul><li class="list-item unordered">Slide 1 Item</li></ul>',
      '<ul><li class="list-item unordered">Slide 2 Item</li></ul>'
    ];

    const { rerender, container } = render(
      <SlideRenderer currentSlide={0} slides={slides} />
    );

    // Clear previous calls
    mockSetTimeout.mockClear();

    // Change to slide 1
    rerender(<SlideRenderer currentSlide={1} slides={slides} />);

    // Verify content changed
    expect(container.innerHTML).toContain('Slide 2 Item');
    expect(container.innerHTML).not.toContain('Slide 1 Item');

    // Verify animation timer was set up again
    expect(mockSetTimeout).toHaveBeenCalledWith(expect.any(Function), 100);
  });

  it('should handle slides with no list items gracefully', () => {
    const slides = [
      '<p>Just a paragraph with no lists</p>'
    ];

    const { container } = render(
      <SlideRenderer currentSlide={0} slides={slides} />
    );

    expect(container.innerHTML).toContain('Just a paragraph with no lists');
    
    // Should still set up timer even with no list items
    expect(mockSetTimeout).toHaveBeenCalledWith(expect.any(Function), 100);
  });

  it('should handle empty slides array', () => {
    const slides: string[] = [];

    expect(() => {
      render(<SlideRenderer currentSlide={0} slides={slides} />);
    }).not.toThrow();
  });

  it('should handle currentSlide index out of bounds', () => {
    const slides = ['<p>Only slide</p>'];

    expect(() => {
      render(<SlideRenderer currentSlide={5} slides={slides} />);
    }).not.toThrow();
  });

  it('should apply transition classes from ListProcessor', () => {
    const slides = [
      '<ul><li class="list-item unordered transition-all duration-300 ease-in-out">Item with transitions</li></ul>'
    ];

    const { container } = render(
      <SlideRenderer currentSlide={0} slides={slides} />
    );

    const listItem = container.querySelector('li.list-item');
    expect(listItem).toHaveClass('transition-all', 'duration-300', 'ease-in-out');
  });

  it('should handle mixed ordered and unordered lists', () => {
    const slides = [
      `<ol class="space-y-3 my-4 list-decimal list-inside text-left">
        <li class="list-item ordered">Ordered Item 1
          <ul class="space-y-3 my-4 list-disc list-inside text-left">
            <li class="list-item unordered">Sub Item 1</li>
          </ul>
        </li>
      </ol>
      <ul class="space-y-3 my-4 list-disc list-inside text-left">
        <li class="list-item unordered">Unordered Item 1</li>
      </ul>`
    ];

    const { container } = render(
      <SlideRenderer currentSlide={0} slides={slides} />
    );

    const orderedItems = container.querySelectorAll('li.list-item.ordered');
    const unorderedItems = container.querySelectorAll('li.list-item.unordered');
    
    expect(orderedItems).toHaveLength(1);
    expect(unorderedItems).toHaveLength(2); // Sub Item 1 + Unordered Item 1

    // All should be reset
    const allItems = container.querySelectorAll('li.list-item');
    allItems.forEach(item => {
      const htmlItem = item as HTMLElement;
      expect(htmlItem.style.opacity).toBe('0');
      expect(htmlItem.style.transform).toBe('translateX(-20px)');
    });
  });
});
