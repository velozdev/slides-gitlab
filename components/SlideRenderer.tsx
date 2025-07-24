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
    
    // Reset all list items
    listItems.forEach((item: HTMLLIElement) => {
      item.classList.remove('animate-in');
      item.style.opacity = '0';
      item.style.transform = 'translateX(-20px)';
    });

    // Show items up to currentItem
    listItems.forEach((item: HTMLLIElement, index: number) => {
      if (index <= currentItem) {
        item.style.opacity = '1';
        item.style.transform = 'translateX(0)';
        item.classList.add('animate-in');
      }
    });
  }, [currentSlide, slides, currentItem]);

  return (
    <div ref={slideRef} className="slide-container">
      <div dangerouslySetInnerHTML={{ __html: slides[currentSlide] }} />
    </div>
  );
};

export default SlideRenderer;