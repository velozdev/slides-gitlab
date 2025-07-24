import React, { useEffect, useRef } from 'react';

interface SlideRendererProps {
  currentSlide: number;
  slides: string[];
}

const SlideRenderer: React.FC<SlideRendererProps> = ({ currentSlide, slides }) => {
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

    // Animate items in sequence, including nested items
    const animateListItems = (): void => {
      listItems.forEach((item: HTMLLIElement, index: number) => {
        setTimeout(() => {
          item.style.opacity = '1';
          item.style.transform = 'translateX(0)';
          item.classList.add('animate-in');
        }, index * 200); // Stagger animation by 200ms
      });
    };

    // Start animation after a brief delay
    const timer: NodeJS.Timeout = setTimeout(animateListItems, 100);

    return () => clearTimeout(timer);
  }, [currentSlide, slides]);

  return (
    <div ref={slideRef} className="slide-container">
      <div dangerouslySetInnerHTML={{ __html: slides[currentSlide] }} />
    </div>
  );
};

export default SlideRenderer;