import React, { useState } from 'react';
import { PlayCircle, Share2, MoreHorizontal, X } from 'lucide-react';
import { COUPLE_NAMES } from './constants';
import MusicBar from './components/MusicBar';
import { RelationshipTimer, TimelineWidget, MapWidget, WordGameWidget, GalleryWidget } from './components/Widgets';
import StoryOverlay from './components/StoryOverlay';

const FloatingHearts = () => {
    // Generate an array of random positions for hearts
    const hearts = Array.from({ length: 15 }).map((_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 15}s`,
        scale: 0.5 + Math.random() * 0.5,
        opacity: 0.3 + Math.random() * 0.4
    }));

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
            {hearts.map((h) => (
                <div 
                    key={h.id}
                    className="absolute bottom-0 text-2xl animate-float-up"
                    style={{ 
                        left: h.left, 
                        animationDelay: h.animationDelay,
                        fontSize: `${h.scale}rem`,
                        opacity: h.opacity
                    }}
                >
                    💙
                </div>
            ))}
        </div>
    );
};

const App: React.FC = () => {
  const [isStoryOpen, setIsStoryOpen] = useState(false);
  const [showFullHero, setShowFullHero] = useState(false);
  const heroImage = "https://iili.io/qJbwiNt.jpg";
  const logoImage = "https://iili.io/qJbDx6v.png";

  return (
    <div className="min-h-screen bg-black text-white flex justify-center">
      {/* Mobile Container Limit */}
      <div className="w-full max-w-md bg-black min-h-screen relative shadow-2xl overflow-hidden">
        
        {/* Floating Hearts Background */}
        <FloatingHearts />

        {/* Status Bar Fake */}
        <div className="w-full h-12 flex justify-between items-center px-6 text-xs font-bold text-gray-400 z-20 relative">
             <span>9:41</span>
             <span className="text-blue-500">Futuro juntos 💙</span>
             <MoreHorizontal size={16} />
        </div>

        {/* Main Content Scrollable */}
        <div className="h-[calc(100vh-80px)] overflow-y-auto px-4 pb-10 no-scrollbar relative z-10">
            
            {/* Music Player Hero */}
            <MusicBar />

            {/* About the Couple / Timer */}
            <div className="relative mb-6">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 blur-2xl opacity-20 rounded-full"></div>
                <div className="relative bg-[#1A1A1A] rounded-2xl overflow-hidden border border-white/5">
                    <div 
                        className="w-full aspect-square bg-cover bg-center cursor-pointer group" 
                        style={{ backgroundImage: `url(${heroImage})` }}
                        onClick={() => setShowFullHero(true)}
                    >
                        <div className="w-full h-full bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 flex flex-col justify-end items-center text-center transition-opacity group-hover:opacity-90">
                             <img src={logoImage} alt="Logo" className="w-20 h-20 mb-3 object-contain drop-shadow-md" />
                             <h2 className="text-3xl font-bold drop-shadow-lg text-white tracking-wide">{COUPLE_NAMES}</h2>
                        </div>
                    </div>
                    <div className="p-4">
                        <RelationshipTimer />
                    </div>
                </div>
            </div>

            {/* Special Message Card */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-6 mb-6 relative overflow-hidden group shadow-lg shadow-blue-900/20">
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-blue-200 mb-2">Mensagem especial</h3>
                <p className="text-lg font-bold text-white leading-snug mb-4">
                    "Mal posso esperar pelo dia em que 'você e eu' seremos 'nós' para sempre. 💙"
                </p>
                <button className="bg-white text-blue-900 px-4 py-2 rounded-full text-xs font-bold shadow-lg hover:scale-105 transition-transform">
                    Ler carta
                </button>
            </div>

            {/* Widgets */}
            <TimelineWidget />
            <MapWidget />
            <WordGameWidget />
            <GalleryWidget />

        </div>

        {/* Floating Action Button / Bottom "Retrospectiva" Banner */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black to-transparent z-40">
             <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-4 shadow-lg shadow-blue-900/30 flex items-center justify-between cursor-pointer hover:scale-[1.02] transition-transform"
                  onClick={() => setIsStoryOpen(true)}
             >
                 <div className="flex items-center gap-3">
                     <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center animate-pulse">
                        <PlayCircle className="text-white fill-white/20" />
                     </div>
                     <div>
                         <h3 className="font-bold text-white leading-none">Nossa História</h3>
                         <p className="text-xs text-blue-200">Reviva os momentos</p>
                     </div>
                 </div>
                 <button className="bg-white text-blue-600 text-xs font-bold px-4 py-2 rounded-full">
                     Ver agora
                 </button>
             </div>
        </div>

        {/* Fullscreen Story Mode */}
        <StoryOverlay isOpen={isStoryOpen} onClose={() => setIsStoryOpen(false)} />

        {/* Fullscreen Hero Image Modal */}
        {showFullHero && (
            <div 
                className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
                onClick={() => setShowFullHero(false)}
            >
                <button className="absolute top-6 right-6 text-white/80 hover:text-white p-2 bg-black/50 rounded-full">
                    <X size={24} />
                </button>
                <img 
                    src={heroImage} 
                    alt="Couple Fullscreen" 
                    className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl scale-100" 
                    onClick={(e) => e.stopPropagation()} 
                />
            </div>
        )}

      </div>
    </div>
  );
};

export default App;