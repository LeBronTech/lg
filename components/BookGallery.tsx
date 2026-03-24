import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'motion/react';
import { GALLERY_IMAGES, COUPLE_NAMES } from '../constants';
import { ChevronLeft, ChevronRight, Heart, BookOpen } from 'lucide-react';

const PaperTexture = () => (
  <div className="absolute inset-0 opacity-15 pointer-events-none mix-blend-multiply" 
       style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/paper-fibers.png")' }}>
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
  const dragThreshold = 50;

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
      scale: 0.9,
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
      scale: 0.9,
      transition: {
        rotateY: { type: "spring" as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 }
      }
    })
  };

  const renderPageContent = () => {
    if (currentPage === 0) {
      // Cover Page
      return (
        <div className="flex-1 flex flex-col items-center justify-center text-center p-8 border-r-2 border-amber-900/10">
          <div className="w-24 h-24 bg-blue-500/10 rounded-full flex items-center justify-center mb-6 border-2 border-blue-500/20">
            <BookOpen size={48} className="text-blue-500" />
          </div>
          <h2 className="text-4xl font-handwriting text-amber-900 mb-2">Nosso Álbum</h2>
          <p className="text-amber-800/60 font-serif italic text-lg">{COUPLE_NAMES}</p>
          <div className="mt-8 flex gap-2">
            <Heart size={16} className="text-blue-400 fill-blue-400 animate-pulse" />
            <Heart size={16} className="text-blue-500 fill-blue-500 animate-pulse delay-75" />
            <Heart size={16} className="text-blue-400 fill-blue-400 animate-pulse delay-150" />
          </div>
          <p className="mt-12 text-xs text-amber-900/30 uppercase tracking-widest font-bold">Arraste para abrir</p>
        </div>
      );
    }

    const contentPageIndex = currentPage - 1;
    const pageImages = GALLERY_IMAGES.slice(contentPageIndex * imagesPerPage, (contentPageIndex * imagesPerPage) + imagesPerPage);

    return (
      <div className="flex-1 flex flex-row gap-4 items-center justify-center p-4">
        {pageImages.map((img, idx) => (
          <div 
            key={img.id} 
            className={`relative flex-1 max-w-[45%] group ${idx % 2 === 0 ? 'rotate-1' : '-rotate-1'} transition-transform hover:rotate-0`}
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
    <div className="mb-12 px-2 overflow-hidden">
      <h3 className="text-white font-bold text-xl mb-6 flex items-center gap-2 px-2">
        <Heart size={20} className="text-blue-500 fill-blue-500" />
        Álbum de Memórias
      </h3>

      <div className="relative aspect-[1.6/1] w-full max-w-lg mx-auto perspective-1000">
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
            className="absolute inset-0 bg-[#fdfaf1] rounded-lg shadow-[20px_0_50px_rgba(0,0,0,0.3)] border-l-8 border-amber-900/20 overflow-hidden flex flex-col cursor-grab active:cursor-grabbing"
          >
            <PaperTexture />
            
            {/* Spine Shadow Effect */}
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black/10 to-transparent pointer-events-none" />
            
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
