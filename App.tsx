import React, { useState, useEffect } from 'react';
import { PlayCircle, Share2, MoreHorizontal, X, Music, ExternalLink } from 'lucide-react';
import { COUPLE_NAMES, LOVE_PHRASES, START_DATE } from './constants';
import MusicBar from './components/MusicBar';
import { RelationshipTimer, TimelineWidget, PlacesTimelineWidget, WordGameWidget, ContractWidget } from './components/Widgets';
import { BookGallery } from './components/BookGallery';
import { useBackHandler } from './hooks/useBackHandler';
import confetti from 'canvas-confetti';

const FloatingHearts = () => {
    // Generate an array of random positions for hearts
    // Increased count for "rising all the time" feel
    const hearts = Array.from({ length: 20 }).map((_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 10}s`, // Varied delays
        scale: 0.5 + Math.random() * 0.5,
        opacity: 0.3 + Math.random() * 0.4
    }));

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
            {hearts.map((h) => (
                <div 
                    key={h.id}
                    className="absolute -bottom-10 text-2xl animate-float-up"
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

const CarouselCard = () => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % LOVE_PHRASES.length);
        }, 5000); // 5 seconds for better readability
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-6 mb-6 relative overflow-hidden group shadow-lg shadow-blue-900/20 min-h-[140px] flex flex-col justify-center">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-blue-200 mb-2 relative z-10">Mensagem especial</h3>
            
            <div className="relative h-16 w-full overflow-hidden">
                {LOVE_PHRASES.map((phrase, i) => (
                    <div 
                        key={i}
                        className={`absolute top-0 left-0 w-full transition-all duration-700 ease-in-out transform ${
                            i === index 
                                ? 'opacity-100 translate-x-0' 
                                : i < index 
                                    ? 'opacity-0 -translate-x-full' 
                                    : 'opacity-0 translate-x-full'
                        }`}
                    >
                        <p className="text-lg font-bold text-white leading-snug">
                            "{phrase}"
                        </p>
                    </div>
                ))}
            </div>
            
            <div className="flex gap-1 mt-2">
                {LOVE_PHRASES.map((_, i) => (
                    <div 
                        key={i} 
                        className={`h-1 rounded-full transition-all duration-300 ${i === index ? 'w-4 bg-white' : 'w-1 bg-white/30'}`} 
                    />
                ))}
            </div>
        </div>
    );
};

const App: React.FC = () => {
  const [showFullHero, setShowFullHero] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [isAnniversary, setIsAnniversary] = useState(false);
  const [monthsCount, setMonthsCount] = useState(0);
  
  useBackHandler(showFullHero, () => setShowFullHero(false));
  const heroImage = "https://iili.io/qJbwiNt.jpg";
  const logoImage = "https://iili.io/qJbDx6v.png";
  const playlistLink = "https://music.youtube.com/playlist?list=PLywkCchL3xu0hOF0xcwFdw31wqKJ3hH2y&jct=fXCYyVm59dhHIu-K081d7Q";

  useEffect(() => {
    const now = new Date();
    const start = new Date(START_DATE);
    
    // Check if it's the 1st of the month (anniversary day)
    if (now.getDate() === start.getDate()) {
        let months = (now.getFullYear() - start.getFullYear()) * 12;
        months += now.getMonth() - start.getMonth();
        
        if (months > 0) {
            setIsAnniversary(true);
            setMonthsCount(months);
            
            // Trigger confetti and hearts explosion
            const duration = 5 * 1000;
            const animationEnd = Date.now() + duration;
            const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

            const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

            const interval: any = setInterval(function() {
                const timeLeft = animationEnd - Date.now();

                if (timeLeft <= 0) {
                    return clearInterval(interval);
                }

                const particleCount = 50 * (timeLeft / duration);
                
                // Confetti
                confetti({
                    ...defaults,
                    particleCount,
                    origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
                });
                confetti({
                    ...defaults,
                    particleCount,
                    origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
                });
                
                // Blue Hearts (using custom shapes or just blue colors)
                confetti({
                    ...defaults,
                    particleCount: 10,
                    colors: ['#3b82f6', '#60a5fa', '#93c5fd'],
                    shapes: ['circle'], // Confetti doesn't have heart shape by default easily without complex setup, but we can use blue colors
                    origin: { x: Math.random(), y: Math.random() - 0.2 }
                });
            }, 250);
        }
    }
  }, []);

  if (!hasStarted) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-6 overflow-hidden relative">
        {/* Background Hearts for Anniversary */}
        {isAnniversary && <FloatingHearts />}
        
        <div className="max-w-md w-full text-center animate-in fade-in zoom-in duration-700 relative z-10">
            <div className="relative mb-8">
                <div className="absolute inset-0 bg-blue-500 blur-3xl opacity-20 rounded-full animate-pulse"></div>
                <img src={logoImage} alt="Logo" className="w-32 h-32 object-contain mx-auto relative z-10 drop-shadow-2xl" referrerPolicy="no-referrer" />
            </div>
            <h1 className="text-4xl font-handwriting font-bold mb-4 text-white">{COUPLE_NAMES}</h1>
            <p className="text-blue-200 mb-8 font-medium italic">"Onde cada detalhe conta a nossa história..."</p>
            
            {isAnniversary && (
                <div className="mb-6 animate-bounce">
                    <p className="text-2xl font-handwriting text-blue-400 drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]">
                        Feliz {monthsCount} {monthsCount === 1 ? 'mês' : 'meses'} de namoro! 💙
                    </p>
                </div>
            )}

            <button 
                onClick={() => setHasStarted(true)}
                className="bg-white text-black px-10 py-4 rounded-full font-bold text-lg shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:scale-105 active:scale-95 transition-all flex items-center gap-2 mx-auto"
            >
                Entrar <PlayCircle size={20} />
            </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex justify-center">
      {/* Mobile Container Limit with Gradient Background */}
      <div className="w-full max-w-md bg-gradient-to-b from-blue-950 via-[#050510] to-black min-h-screen relative shadow-2xl overflow-hidden">
        
        {/* Floating Hearts Background */}
        <FloatingHearts />

        {/* Status Bar Fake */}
        <div className="w-full h-12 flex justify-between items-center px-6 text-xs font-bold text-blue-200/50 z-20 relative">
             <span></span> {/* Removed Time */}
             <span className="text-blue-400">Futuro juntos 💙</span>
             <div className="w-4"></div> {/* Placeholder to maintain spacing */}
        </div>

        {/* Main Content Scrollable */}
        <div className="h-[calc(100vh-80px)] overflow-y-auto px-4 pb-10 no-scrollbar relative z-10">
            
            {/* Music Player Hero */}
            <MusicBar />

            {/* About the Couple / Timer */}
            <div className="relative mb-6">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 blur-2xl opacity-20 rounded-full"></div>
                <div className="relative bg-[#1A1A1A]/80 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/5">
                    {/* Main Image */}
                    <div 
                        className="w-full aspect-square bg-cover bg-top cursor-pointer group" 
                        style={{ backgroundImage: `url(${heroImage})` }}
                        onClick={() => setShowFullHero(true)}
                    >
                        {/* Removed text/logo from here */}
                    </div>
                    
                    {/* Content Section */}
                    <div className="p-6 flex flex-col items-center text-center">
                         <img src={logoImage} alt="Logo" className="w-16 h-16 object-contain drop-shadow-md mb-2" referrerPolicy="no-referrer" />
                         <h2 className="text-5xl font-handwriting font-bold drop-shadow-lg text-white tracking-wide mb-4">{COUPLE_NAMES}</h2>
                         
                         <RelationshipTimer />
                    </div>
                </div>
            </div>

            {/* Special Message Carousel */}
            <CarouselCard />

            {/* Widgets */}
            <TimelineWidget />
            <PlacesTimelineWidget />
            <WordGameWidget />
            <BookGallery />
            <ContractWidget />

            {/* Dedicated Music Button */}
             <div className="mb-6 text-center px-4">
                <p className="text-sm text-blue-200 italic font-medium mb-3">
                    "Por todas as músicas um dia a ti dedicada em uma nota 💙"
                </p>
                 <a 
                    href={playlistLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-4 shadow-lg shadow-blue-900/30 flex items-center justify-between cursor-pointer hover:scale-[1.02] transition-transform group"
                 >
                     <div className="flex items-center gap-3">
                         <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center group-hover:animate-spin-slow">
                            <Music className="text-white fill-white/20" />
                         </div>
                         <div>
                             <h3 className="font-bold text-white leading-none">Música Dedicada</h3>
                             <p className="text-xs text-blue-100">Nossa playlist especial 🎵</p>
                         </div>
                     </div>
                     <div className="bg-white/20 p-2 rounded-full">
                         <ExternalLink size={16} className="text-white" />
                     </div>
                 </a>
             </div>

            {/* Final Cursive Phrase */}
            <div className="mt-12 mb-16 text-center animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500">
                <p className="font-handwriting text-4xl text-blue-400 drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]">
                    Te Gosto Mil Milhões 💙
                </p>
            </div>

        </div>

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
                    referrerPolicy="no-referrer"
                />
            </div>
        )}

      </div>
    </div>
  );
};

export default App;