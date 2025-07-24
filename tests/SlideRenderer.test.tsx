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
      <SlideRenderer currentSlide={0} slides={slides} currentItem={0} />
    );

    expect(container.querySelector('.slide-container')).toBeInTheDocument();
    expect(container.innerHTML).toContain('Item 1');
    expect(container.innerHTML).toContain('Item 2');
  });

  it('should show items up to currentItem', () => {
    const slides = [
      '<ul><li class="list-item unordered">Item 1</li><li class="list-item unordered">Item 2</li><li class="list-item unordered">Item 3</li></ul>'
    ];

    const { container } = render(
      <SlideRenderer currentSlide={0} slides={slides} currentItem={1} />
    );

    const listItems = container.querySelectorAll('li.list-item');
    expect(listItems).toHaveLength(3);

    // First two items should be visible
    expect((listItems[0] as HTMLElement).style.opacity).toBe('1');
    expect((listItems[1] as HTMLElement).style.opacity).toBe('1');
    // Third item should be hidden
    expect((listItems[2] as HTMLElement).style.opacity).toBe('0');
  });

  it('should reset all items when currentSlide changes', () => {
    const slides = [
      '<ul><li class="list-item unordered">Slide 1 Item</li></ul>',
      '<ul><li class="list-item unordered">Slide 2 Item</li></ul>'
    ];

    const { rerender, container } = render(
      <SlideRenderer currentSlide={0} slides={slides} currentItem={0} />
    );

    // Change to slide 1 with currentItem 0 (no items shown yet)
    rerender(<SlideRenderer currentSlide={1} slides={slides} currentItem={-1} />);

    const listItems = container.querySelectorAll('li.list-item');
    expect(listItems).toHaveLength(1);
    expect((listItems[0] as HTMLElement).style.opacity).toBe('0');
  });

  it('should handle nested list items correctly with currentItem', () => {
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
      <SlideRenderer currentSlide={0} slides={slides} currentItem={2} />
    );

    const listItems = container.querySelectorAll('li.list-item');
    expect(listItems).toHaveLength(4);

    // First 3 items should be visible (currentItem = 2, so items 0, 1, 2)
    expect((listItems[0] as HTMLElement).style.opacity).toBe('1');
    expect((listItems[1] as HTMLElement).style.opacity).toBe('1');
    expect((listItems[2] as HTMLElement).style.opacity).toBe('1');
    // Fourth item should be hidden
    expect((listItems[3] as HTMLElement).style.opacity).toBe('0');
  });

  it('should handle slides with no list items gracefully', () => {
    const slides = [
      '<p>Just a paragraph with no lists</p>'
    ];
    const { container } = render(
      <SlideRenderer currentSlide={0} slides={slides} currentItem={0} />
    );

    expect(container.innerHTML).toContain('Just a paragraph with no lists');
  });

  it('should handle empty slides array', () => {
    const slides: string[] = [];
    expect(() => {
      render(<SlideRenderer currentSlide={0} slides={slides} currentItem={0} />);
    }).not.toThrow();
  });

  it('should handle currentSlide index out of bounds', () => {
    const slides = ['<p>Only slide</p>'];
    expect(() => {
      render(<SlideRenderer currentSlide={5} slides={slides} currentItem={0} />);
    }).not.toThrow();
  });

  it('should apply transition classes from ListProcessor', () => {
    const slides = [
      '<ul><li class="list-item unordered transition-all duration-300 ease-in-out">Item with transitions</li></ul>'
    ];
    const { container } = render(
      <SlideRenderer currentSlide={0} slides={slides} currentItem={0} />
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
      <SlideRenderer currentSlide={0} slides={slides} currentItem={0} />
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
    });
  });
});
