import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'motion/react';
import { GALLERY_IMAGES, COUPLE_NAMES } from '../constants';
import { ChevronLeft, ChevronRight, Heart, BookOpen } from 'lucide-react';

const PaperTexture = () => (
  <div className="absolute inset-0 pointer-events-none mix-blend-multiply overflow-hidden">
    {/* Base yellowing/aging gradient */}
    <div className="absolute inset-0 bg-gradient-to-br from-amber-100/20 via-transparent to-amber-900/10" />
    {/* Fiber texture */}
    <div className="absolute inset-0 opacity-20" 
         style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/paper-fibers.png")' }}>
    </div>
    {/* Subtle stains/distress */}
    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_20%_30%,_#78350f_0%,_transparent_20%),radial-gradient(circle_at_80%_70%,_#78350f_0%,_transparent_25%)]" />
  </div>
);

const PageStack = () => (
  <div className="absolute inset-0 pointer-events-none">
    {/* Simulated pages on the right edge */}
    <div className="absolute top-1 bottom-1 -right-1 w-1 bg-white border-r border-black/10 shadow-sm" />
    <div className="absolute top-2 bottom-2 -right-2 w-1 bg-white/90 border-r border-black/10 shadow-sm" />
    <div className="absolute top-3 bottom-3 -right-3 w-1 bg-white/80 border-r border-black/10 shadow-sm" />
  </div>
);

const Ribbon = () => (
  <div className="absolute left-12 top-0 bottom-0 w-4 z-30 pointer-events-none">
    <div className="absolute inset-0 bg-blue-600 shadow-[2px_0_5px_rgba(0,0,0,0.3)]" />
    {/* Ribbon tail/v-cut at bottom */}
    <div className="absolute -bottom-2 left-0 right-0 h-4 bg-blue-600" style={{ clipPath: 'polygon(0% 0%, 100% 0%, 50% 100%)' }} />
  </div>
);

const Sticker = ({ position }: { position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' }) => {
  const rotations = {
    'top-left': '-rotate-45 -translate-x-2 -translate-y-2',
    'top-right': 'rotate-45 translate-x-2 -translate-y-2',
    'bottom-left': 'rotate-45 -translate-x-2 translate-y-2',
    'bottom-right': '-rotate-45 translate-x-2 translate-y-2'
  };
  
  return (
    <div className={`absolute ${position} w-8 h-3 bg-blue-400/30 backdrop-blur-sm border border-white/10 z-10 ${rotations[position]}`}></div>
  );
};

export const BookGallery: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0); // 0 is cover, 1+ are content pages
  const [direction, setDirection] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (currentPage > 0 && containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [currentPage]);
  
  const imagesPerPage = 2;
  const totalContentPages = Math.ceil(GALLERY_IMAGES.length / imagesPerPage);
  const totalPages = totalContentPages + 1; // +1 for cover

  const paginate = (newDirection: number) => {
    const next = currentPage + newDirection;
    if (next >= 0 && next < totalPages) {
      setDirection(newDirection);
      setCurrentPage(next);
    }
  };

  const dragX = useMotionValue(0);
  const dragThreshold = 20;

  const onDragEnd = () => {
    const x = dragX.get();
    if (x < -dragThreshold) {
      paginate(1);
    } else if (x > dragThreshold) {
      paginate(-1);
    }
  };

  const variants = {
    enter: (direction: number) => ({
      rotateY: direction > 0 ? 90 : -90,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      rotateY: 0,
      opacity: 1,
      scale: 1,
      transition: {
        rotateY: { type: "spring" as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 }
      }
    },
    exit: (direction: number) => ({
      rotateY: direction < 0 ? 90 : -90,
      opacity: 0,
      scale: 0.95,
      transition: {
        rotateY: { type: "spring" as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 }
      }
    })
  };

  const renderPageContent = () => {
    if (currentPage === 0) {
      // Cover Page - Aged Leather/Fabric Look
      return (
        <div className="flex-1 flex flex-col items-center justify-center text-center p-6 border-r-2 border-amber-900/30 relative bg-[#451a03]">
          {/* Leather texture overlay */}
          <div className="absolute inset-0 opacity-30 mix-blend-overlay" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/leather.png")' }} />
          
          <Ribbon />
          
          <div className="relative z-10">
            <motion.div 
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="mb-4"
            >
              <Heart size={80} className="text-blue-400 fill-blue-400 drop-shadow-[0_0_15px_rgba(96,165,250,0.5)]" />
            </motion.div>
            
            <h2 className="text-4xl font-handwriting text-amber-100 mb-1 drop-shadow-md">Nosso Álbum</h2>
            <div className="h-px w-24 bg-amber-100/30 mb-4 mx-auto" />
            
            <p className="text-2xl font-handwriting text-blue-300 italic drop-shadow-sm">{COUPLE_NAMES}</p>
            
            <div className="mt-8 flex gap-1.5 justify-center">
              <Heart size={12} className="text-blue-400 fill-blue-400 opacity-60" />
              <Heart size={12} className="text-blue-400 fill-blue-400 opacity-80" />
              <Heart size={12} className="text-blue-400 fill-blue-400 opacity-60" />
            </div>
            
            <p className="mt-10 text-[10px] text-amber-100/40 uppercase tracking-[0.3em] font-bold">Deslize para abrir</p>
          </div>
        </div>
      );
    }

    const contentPageIndex = currentPage - 1;
    const pageImages = GALLERY_IMAGES.slice(contentPageIndex * imagesPerPage, (contentPageIndex * imagesPerPage) + imagesPerPage);

    return (
      <div className="flex-1 flex flex-row gap-3 items-center justify-center p-3">
        {pageImages.map((img, idx) => (
          <div 
            key={img.id} 
            className={`relative flex-1 max-w-[48%] group ${idx % 2 === 0 ? 'rotate-1' : '-rotate-1'} transition-transform hover:rotate-0`}
          >
            <Sticker position="top-left" />
            <Sticker position="bottom-right" />
            <div className="bg-white p-1.5 shadow-lg border border-gray-100">
              <img 
                src={img.url} 
                alt={img.caption} 
                className="w-full aspect-[4/3] object-cover grayscale-[10%] sepia-[5%]" 
                referrerPolicy="no-referrer"
              />
              <p className="mt-1.5 text-center font-handwriting text-black text-sm leading-tight truncate">
                {img.caption}
              </p>
            </div>
          </div>
        ))}
        {pageImages.length === 0 && (
          <div className="flex-1 flex items-center justify-center text-amber-900/40 italic font-handwriting text-2xl">
            Fim do álbum... 💙
          </div>
        )}
      </div>
    );
  };

  return (
    <div ref={containerRef} className="mb-12 px-2 overflow-hidden scroll-mt-20 flex flex-col items-center">
      <div className="w-full max-w-lg">
        <h3 className="text-white font-bold text-xl mb-6 flex items-center gap-2 px-2">
          <Heart size={20} className="text-blue-500 fill-blue-500" />
          Álbum de Memórias
        </h3>
      </div>

      <div className="relative aspect-[1.3/1] w-full max-w-lg mx-auto perspective-1000">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={currentPage}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={onDragEnd}
            style={{ x: dragX, transformOrigin: direction > 0 ? "left center" : "right center" }}
            className={`absolute inset-0 rounded-lg shadow-[20px_0_50px_rgba(0,0,0,0.4)] border-l-[12px] border-amber-950/40 overflow-hidden flex flex-col cursor-grab active:cursor-grabbing ${currentPage === 0 ? 'bg-[#451a03]' : 'bg-[#fdfaf1]'}`}
          >
            <PageStack />
            <PaperTexture />
            
            {/* Spine Shadow Effect */}
            <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-black/30 to-transparent pointer-events-none z-20" />
            
            {renderPageContent()}

            {/* Page Number */}
            <div className="absolute bottom-3 right-6 text-[10px] text-amber-900/40 font-serif font-bold">
              {currentPage === 0 ? 'CAPA' : `PÁGINA ${currentPage}`}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Hints */}
        {currentPage === 0 && (
           <motion.div 
            animate={{ x: [0, 10, 0] }} 
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="absolute -right-8 top-1/2 -translate-y-1/2 text-white/30 hidden sm:block"
           >
             <ChevronRight size={32} />
           </motion.div>
        )}
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center gap-1.5 mt-6">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button 
            key={i} 
            onClick={() => {
              setDirection(i > currentPage ? 1 : -1);
              setCurrentPage(i);
            }}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${i === currentPage ? 'bg-blue-500 w-6' : 'bg-white/20 hover:bg-white/40'}`} 
          />
        ))}
      </div>
    </div>
  );
};
