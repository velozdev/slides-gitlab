import React, { useEffect, useRef } from 'react';

interface SlideRendererProps {
  currentSlide: number;
  slides: string[];
  currentItem: number;
}

const SlideRenderer: React.FC<SlideRendererProps> = ({ currentSlide, slides, currentItem }) => {
  const slideRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!slideRef.current) return;

    const listItems = slideRef.current.querySelectorAll('li.list-item') as NodeListOf<HTMLLIElement>;
    const tableRows = slideRef.current.querySelectorAll('table tbody tr') as NodeListOf<HTMLTableRowElement>;
    
    // Reset all list items
    listItems.forEach((item: HTMLLIElement) => {
      item.classList.remove('animate-in');
      item.style.opacity = '0';
      item.style.transform = 'translateX(-20px)';
    });

    // Reset all table rows (excluding header)
    tableRows.forEach((row: HTMLTableRowElement) => {
      row.classList.remove('animate-in');
      row.style.opacity = '0';
      row.style.transform = 'translateX(-20px)';
    });

    // Calculate total revealable items
    const totalListItems = listItems.length;
    let itemIndex = 0;

    // Show list items first
    listItems.forEach((item: HTMLLIElement, index: number) => {
      if (itemIndex <= currentItem) {
        item.style.opacity = '1';
        item.style.transform = 'translateX(0)';
        item.classList.add('animate-in');
      }
      itemIndex++;
    });

    // Then show table rows
    tableRows.forEach((row: HTMLTableRowElement, index: number) => {
      if (itemIndex <= currentItem) {
        row.style.opacity = '1';
        row.style.transform = 'translateX(0)';
        row.classList.add('animate-in');
      }
      itemIndex++;
    });
  }, [currentSlide, slides, currentItem]);

  return (
    <div ref={slideRef} className="slide-container"></div>
      <div dangerouslySetInnerHTML={{ __html: slides[currentSlide] }} />
    </div>
  );
};

export default SlideRenderer;