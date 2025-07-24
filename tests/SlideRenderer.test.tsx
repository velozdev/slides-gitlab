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
    
    // With currentItem=0, first item should be visible, rest should be hidden
    const allItems = container.querySelectorAll('li.list-item');
    expect((allItems[0] as HTMLElement).style.opacity).toBe('1'); // First item visible
    expect((allItems[1] as HTMLElement).style.opacity).toBe('0'); // Second item hidden
    expect((allItems[2] as HTMLElement).style.opacity).toBe('0'); // Third item hidden
  });

  it('should handle table rows correctly with currentItem', () => {
    const slides = [
      `<table>
        <thead>
          <tr><th>Header 1</th><th>Header 2</th></tr>
        </thead>
        <tbody>
          <tr><td>Row 1 Col 1</td><td>Row 1 Col 2</td></tr>
          <tr><td>Row 2 Col 1</td><td>Row 2 Col 2</td></tr>
          <tr><td>Row 3 Col 1</td><td>Row 3 Col 2</td></tr>
        </tbody>
      </table>`
    ];

    const { container } = render(
      <SlideRenderer currentSlide={0} slides={slides} currentItem={1} />
    );

    const tableRows = container.querySelectorAll('table tbody tr');
    expect(tableRows).toHaveLength(3);

    // First two rows should be visible
    expect((tableRows[0] as HTMLElement).style.opacity).toBe('1');
    expect((tableRows[1] as HTMLElement).style.opacity).toBe('1');
    // Third row should be hidden
    expect((tableRows[2] as HTMLElement).style.opacity).toBe('0');
  });

  it('should handle mixed lists and tables correctly', () => {
    const slides = [
      `<ul>
        <li class="list-item unordered">List Item 1</li>
        <li class="list-item unordered">List Item 2</li>
      </ul>
      <table>
        <thead>
          <tr><th>Header</th></tr>
        </thead>
        <tbody>
          <tr><td>Table Row 1</td></tr>
          <tr><td>Table Row 2</td></tr>
        </tbody>
      </table>`
    ];

    const { container } = render(
      <SlideRenderer currentSlide={0} slides={slides} currentItem={2} />
    );

    const listItems = container.querySelectorAll('li.list-item');
    const tableRows = container.querySelectorAll('table tbody tr');

    // First 2 list items should be visible
    expect((listItems[0] as HTMLElement).style.opacity).toBe('1');
    expect((listItems[1] as HTMLElement).style.opacity).toBe('1');

    // First table row should be visible (currentItem=2, so list items 0,1 then table row 0)
    expect((tableRows[0] as HTMLElement).style.opacity).toBe('1');
    // Second table row should be hidden
    expect((tableRows[1] as HTMLElement).style.opacity).toBe('0');
  });

  it('should reset table rows when slide changes', () => {
    const slides = [
      `<table><tbody><tr><td>Slide 1 Row</td></tr></tbody></table>`,
      `<table><tbody><tr><td>Slide 2 Row</td></tr></tbody></table>`
    ];

    const { rerender, container } = render(
      <SlideRenderer currentSlide={0} slides={slides} currentItem={0} />
    );

    // Change to slide 1 with no items revealed yet
    rerender(<SlideRenderer currentSlide={1} slides={slides} currentItem={-1} />);

    const tableRows = container.querySelectorAll('table tbody tr');
    expect(tableRows).toHaveLength(1);
    expect((tableRows[0] as HTMLElement).style.opacity).toBe('0');
  });

  it('should not affect table headers during animation', () => {
    const slides = [
      `<table>
        <thead>
          <tr><th>Always Visible Header</th></tr>
        </thead>
        <tbody>
          <tr><td>Animated Row</td></tr>
        </tbody>
      </table>`
    ];

    const { container } = render(
      <SlideRenderer currentSlide={0} slides={slides} currentItem={-1} />
    );

    const headerRows = container.querySelectorAll('table thead tr');
    const bodyRows = container.querySelectorAll('table tbody tr');

    // Header should not be affected by animation
    expect(headerRows).toHaveLength(1);
    expect((headerRows[0] as HTMLElement).style.opacity).toBe('');

    // Body row should be hidden
    expect((bodyRows[0] as HTMLElement).style.opacity).toBe('0');
  });
});
