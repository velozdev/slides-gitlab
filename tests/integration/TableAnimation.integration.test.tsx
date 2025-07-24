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

describe('Table Animation Integration', () => {
  const mockSlidesIndex = [
    {
      name: 'table-presentation',
      import: `# Table Demo

| Name | Role | Status |
|------|------|--------|
| Alice | Developer | Active |
| Bob | Designer | Active |
| Charlie | Manager | Inactive |

# Mixed Content

- List item 1
- List item 2

| Item | Price |
|------|-------|
| Apple | $1.00 |
| Orange | $1.50 |`
    }
  ];

  beforeEach(() => {
    vi.mocked(useParams).mockReturnValue({ slug: 'table-presentation' });
    mockLocalStorage.getItem.mockReturnValue(null);
    window.location.search = '?present=true';
  });

  it('should animate table rows correctly in presentation mode', async () => {
    render(<SlideshowViewerClient slidesIndex={mockSlidesIndex} />);

    await screen.findByText('Slide 1 of 2');

    // Should be on first slide with table
    expect(screen.getByText('Table Demo')).toBeInTheDocument();
    
    // Check that table is rendered
    const tableRows = document.querySelectorAll('table tbody tr');
    expect(tableRows).toHaveLength(3); // Alice, Bob, Charlie

    // Initially no rows should be visible (currentItem starts at 0, but we need to advance)
    // Simulate first click to reveal first row
    fireEvent.keyDown(document, { key: 'ArrowRight' });
    
    // First row should now be visible
    expect((tableRows[0] as HTMLElement).style.opacity).toBe('1');
    expect((tableRows[1] as HTMLElement).style.opacity).toBe('0');
    expect((tableRows[2] as HTMLElement).style.opacity).toBe('0');
  });

  it('should handle mixed list and table content correctly', async () => {
    render(<SlideshowViewerClient slidesIndex={mockSlidesIndex} />);

    await screen.findByText('Slide 1 of 2');

    // Navigate to second slide by going through all items on first slide
    fireEvent.keyDown(document, { key: 'ArrowRight' }); // Table row 1
    fireEvent.keyDown(document, { key: 'ArrowRight' }); // Table row 2  
    fireEvent.keyDown(document, { key: 'ArrowRight' }); // Table row 3
    fireEvent.keyDown(document, { key: 'ArrowRight' }); // Should advance to slide 2

    expect(screen.getByText('Mixed Content')).toBeInTheDocument();

    const listItems = document.querySelectorAll('li.list-item');
    const tableRows = document.querySelectorAll('table tbody tr');

    expect(listItems).toHaveLength(2);
    expect(tableRows).toHaveLength(2);

    // When we arrive at slide 2, currentItem is 0, so first list item is visiblesible
    expect((listItems[0] as HTMLElement).style.opacity).toBe('1');
    expect((listItems[1] as HTMLElement).style.opacity).toBe('0');le.opacity;
    const secondListItemOpacity = (listItems[1] as HTMLElement).style.opacity;
    fireEvent.keyDown(document, { key: 'ArrowRight' }); // Advance currentItem to 1
    expect((listItems[0] as HTMLElement).style.opacity).toBe('1'); // Still visible
    expect((listItems[1] as HTMLElement).style.opacity).toBe('1'); // Now visible
      expect(secondListItemOpacity).toBe('0');
    fireEvent.keyDown(document, { key: 'ArrowRight' }); // Advance currentItem to 2 (first table row)
    expect((tableRows[0] as HTMLElement).style.opacity).toBe('1');ce to show second list item
    expect((tableRows[1] as HTMLElement).style.opacity).toBe('0');); // Still visible
      expect((listItems[1] as HTMLElement).style.opacity).toBe('1'); // Now visible
    fireEvent.keyDown(document, { key: 'ArrowRight' }); // Advance currentItem to 3 (second table row)
    expect((tableRows[1] as HTMLElement).style.opacity).toBe('1');ce to show first table row
  }); expect((tableRows[0] as HTMLElement).style.opacity).toBe('1');
      expect((tableRows[1] as HTMLElement).style.opacity).toBe('0');
  it('should count table rows correctly for navigation', async () => {
    render(<SlideshowViewerClient slidesIndex={mockSlidesIndex} />); to show second table row
      expect((tableRows[1] as HTMLElement).style.opacity).toBe('1');
    await screen.findByText('Slide 1 of 2');
      // If no items are visible initially, advance step by step
    // First slide has 3 table rows key: 'ArrowRight' }); // First list item
    // Click through all rows HTMLElement).style.opacity).toBe('1');
    fireEvent.keyDown(document, { key: 'ArrowRight' }); // Row 10');
    fireEvent.keyDown(document, { key: 'ArrowRight' }); // Row 2
    fireEvent.keyDown(document, { key: 'ArrowRight' }); // Row 3ond list item
    fireEvent.keyDown(document, { key: 'ArrowRight' }); // Should advance to slide 2

    expect(screen.getByText('Mixed Content')).toBeInTheDocument(); table row
    expect(screen.getByText('Slide 2 of 2')).toBeInTheDocument();');
  }); expect((tableRows[1] as HTMLElement).style.opacity).toBe('0');
});
      fireEvent.keyDown(document, { key: 'ArrowRight' }); // Second table row
      expect((tableRows[1] as HTMLElement).style.opacity).toBe('1');
    }
  });

  it('should count table rows correctly for navigation', async () => {
    render(<SlideshowViewerClient slidesIndex={mockSlidesIndex} />);

    await screen.findByText('Slide 1 of 2');

    // First slide has 3 table rows
    // Click through all rows
    fireEvent.keyDown(document, { key: 'ArrowRight' }); // Row 1
    fireEvent.keyDown(document, { key: 'ArrowRight' }); // Row 2
    fireEvent.keyDown(document, { key: 'ArrowRight' }); // Row 3
    fireEvent.keyDown(document, { key: 'ArrowRight' }); // Should advance to slide 2

    expect(screen.getByText('Mixed Content')).toBeInTheDocument();
    expect(screen.getByText('Slide 2 of 2')).toBeInTheDocument();
  });
});
