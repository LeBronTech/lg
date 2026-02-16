import React, { useState, useEffect, useRef } from 'react';
import { X, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { StorySlide } from '../types';
import { STORY_SLIDES } from '../constants';

interface StoryOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const StoryOverlay: React.FC<StoryOverlayProps> = ({ isOpen, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const requestRef = useRef<number>();
  const startTimeRef = useRef<number>();

  useEffect(() => {
    if (!isOpen) {
        setCurrentIndex(0);
        setProgress(0);
        return;
    }

    const duration = STORY_SLIDES[currentIndex].duration * 1000;
    
    const animate = (time: number) => {
      if (!startTimeRef.current) startTimeRef.current = time;
      const elapsed = time - startTimeRef.current;
      const newProgress = Math.min((elapsed / duration) * 100, 100);
      
      setProgress(newProgress);

      if (elapsed < duration) {
        requestRef.current = requestAnimationFrame(animate);
      } else {
        goToNext();
      }
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex, isOpen]);

  const goToNext = () => {
    startTimeRef.current = undefined; // Reset start time for next slide
    if (currentIndex < STORY_SLIDES.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setProgress(0);
    } else {
      onClose();
    }
  };

  const goToPrev = () => {
    startTimeRef.current = undefined;
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setProgress(0);
    }
  };

  if (!isOpen) return null;

  const currentSlide = STORY_SLIDES[currentIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      {/* Background Container */}
      <div className={`w-full h-full max-w-md relative flex flex-col ${currentSlide.bgColor} transition-colors duration-1000`}>
        
        {/* Progress Bars */}
        <div className="absolute top-4 left-0 w-full px-2 flex gap-1 z-20">
          {STORY_SLIDES.map((slide, idx) => (
            <div key={slide.id} className="h-1 flex-1 bg-white/30 rounded-full overflow-hidden">
              <div 
                className="h-full bg-white transition-all duration-100 ease-linear"
                style={{ 
                    width: idx < currentIndex ? '100%' : idx === currentIndex ? `${progress}%` : '0%' 
                }}
              />
            </div>
          ))}
        </div>

        {/* Close Button */}
        <button 
            onClick={onClose} 
            className="absolute top-8 right-4 z-30 text-white/80 hover:text-white"
        >
            <X size={24} />
        </button>

        {/* Touch Areas for Navigation - z-10 */}
        <div className="absolute inset-0 flex z-10">
            <div className="w-1/3 h-full" onClick={goToPrev}></div>
            <div className="w-2/3 h-full" onClick={goToNext}></div>
        </div>

        {/* Content - z-20 (Above touch areas) but pointer-events-none (so taps fall through to navigation), EXCEPT for button which is pointer-events-auto */}
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center relative z-20 pointer-events-none">
            {currentSlide.type === 'photo' && currentSlide.image && (
                 <div className="w-full aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl mb-8 animate-slide-up">
                    <img src={currentSlide.image} alt="Story" className="w-full h-full object-cover" />
                 </div>
            )}

            {currentSlide.type !== 'photo' && (
                <div className="mb-8 p-4 bg-white/10 backdrop-blur-md rounded-full w-24 h-24 flex items-center justify-center animate-pulse-slow">
                    <span className="text-4xl">✨</span>
                </div>
            )}

            <h2 className="text-4xl font-extrabold text-white mb-6 drop-shadow-md animate-slide-up leading-tight">
                {currentSlide.content}
            </h2>
            
            {currentSlide.subContent && (
                <p className="text-xl text-white/90 font-medium animate-slide-up" style={{ animationDelay: '0.2s' }}>
                    {currentSlide.subContent}
                </p>
            )}

            {/* CTA Button */}
            {currentSlide.link && (
                <a 
                    href={currentSlide.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-8 bg-white text-blue-600 font-bold py-3 px-8 rounded-full shadow-lg hover:scale-105 transition-transform animate-slide-up pointer-events-auto relative z-50 flex items-center gap-2"
                    style={{ animationDelay: '0.4s' }}
                    onClick={(e) => e.stopPropagation()} // Prevent navigation when clicking button
                >
                    <ExternalLink size={20} />
                    {currentSlide.linkText || "Ver Link"}
                </a>
            )}
        </div>

      </div>
    </div>
  );
};

export default StoryOverlay;