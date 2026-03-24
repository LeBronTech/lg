import React, { useState, useEffect, useRef } from 'react';
import { START_DATE, TIMELINE_EVENTS, MAP_LOCATIONS, WORD_GAME_SECRET, GALLERY_IMAGES, COUPLE_NAMES } from '../constants';
import { Heart, MapPin, Star, Camera, Phone, Users, Unlock, X, Maximize2, Calendar, Fingerprint, FileSignature, CheckCircle2, ZoomIn, ZoomOut, ChevronRight, ChevronLeft, BookOpen } from 'lucide-react';
import { TimelineEvent, MapLocation, GalleryImage } from '../types';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { useBackHandler } from '../hooks/useBackHandler';
import { motion, AnimatePresence } from 'motion/react';

// --- Relationship Timer Component ---
export const RelationshipTimer: React.FC = () => {
    const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const [isFuture, setIsFuture] = useState(false);

    useEffect(() => {
        const calculateTime = () => {
            const now = new Date();
            const start = new Date(START_DATE);
            const diff = start.getTime() - now.getTime();
            
            // If diff is positive, date is in future (Countdown)
            // If diff is negative, date is past (Relationship time)
            setIsFuture(diff > 0);
            
            const absDiff = Math.abs(diff);

            const days = Math.floor(absDiff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((absDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((absDiff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((absDiff % (1000 * 60)) / 1000);

            setTime({ days, hours, minutes, seconds });
        };

        const timer = setInterval(calculateTime, 1000);
        calculateTime();
        return () => clearInterval(timer);
    }, []);

    const TimeUnit = ({ val, label }: { val: number, label: string }) => (
        <div className="flex flex-col items-center bg-white/5 rounded-lg p-2 min-w-[60px] border border-white/10">
            <span className="text-xl md:text-2xl font-bold text-white">{val}</span>
            <span className="text-[10px] text-gray-400 uppercase tracking-wider">{label}</span>
        </div>
    );

    return (
        <div className="bg-[#1A1A1A] rounded-2xl p-4 mb-6 border border-white/5 w-full">
            <h3 className="text-blue-400 font-bold mb-3 flex items-center justify-center gap-2 text-center leading-tight">
                <Heart size={16} className="fill-blue-400 flex-shrink-0" /> 
                {isFuture ? "Contagem regressiva para o nosso Sim" : "Namorando há..."}
            </h3>
            <div className="flex justify-center gap-3">
                <TimeUnit val={time.days} label="Dias" />
                <TimeUnit val={time.hours} label="Horas" />
                <TimeUnit val={time.minutes} label="Min" />
                <TimeUnit val={time.seconds} label="Seg" />
            </div>
            {!isFuture && (
                <p className="text-center text-xs text-gray-500 mt-3 animate-pulse px-4">
                    Cada dia ao teu lado, é uma nova oportunidade de ser o casal mais brega do mundo 💙
                </p>
            )}
        </div>
    );
};

// --- Timeline Component (Enhanced) ---
export const TimelineWidget: React.FC = () => {
    const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);
    useBackHandler(!!selectedEvent, () => setSelectedEvent(null));

    return (
        <>
            <div className="rounded-2xl mb-8 relative">
                <div className="flex items-center justify-between mb-6 px-2">
                    <h3 className="text-white font-bold text-xl">Nossa História</h3>
                    <span className="text-[10px] text-blue-300 bg-blue-500/10 px-2 py-1 rounded-full border border-blue-500/20">
                        Clique para ver detalhes
                    </span>
                </div>
                
                <div className="relative space-y-8 px-2">
                    {/* Glowing Central Line */}
                    <div className="absolute left-[19px] top-2 bottom-2 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-transparent rounded-full opacity-50 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                    
                    {TIMELINE_EVENTS.map((event: TimelineEvent, index) => (
                        <div 
                            key={event.id} 
                            className="relative flex items-start gap-4 group cursor-pointer"
                            onClick={() => setSelectedEvent(event)}
                        >
                            {/* Icon Node */}
                            <div className="relative z-10 flex-shrink-0 mt-8">
                                <div className="w-10 h-10 bg-black border-2 border-blue-500 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.4)] group-hover:scale-110 transition-transform duration-300 bg-gradient-to-br from-gray-900 to-black">
                                    {event.icon === 'heart' && <Heart size={16} className="text-pink-500 fill-pink-500" />}
                                    {event.icon === 'star' && <Star size={16} className="text-yellow-500 fill-yellow-500" />}
                                    {event.icon === 'map' && <MapPin size={16} className="text-blue-500" />}
                                    {event.icon === 'camera' && <Camera size={16} className="text-green-500" />}
                                    {event.icon === 'phone' && <Phone size={16} className="text-purple-500" />}
                                    {event.icon === 'users' && <Users size={16} className="text-orange-500" />}
                                </div>
                            </div>

                            {/* Card Content */}
                            <div className="flex-1 bg-gradient-to-br from-white/10 to-white/5 border border-white/10 p-4 rounded-2xl shadow-lg backdrop-blur-sm group-hover:bg-white/15 group-hover:border-blue-500/30 transition-all duration-300 active:scale-95">
                                <div className="flex justify-between items-start mb-2">
                                    <span className="text-xs font-bold text-blue-300 bg-blue-900/30 px-2 py-0.5 rounded flex items-center gap-1">
                                        <Calendar size={10} />
                                        {event.date}
                                    </span>
                                    <Maximize2 size={12} className="text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                                
                                <h4 className="text-white font-bold text-lg leading-tight mb-2">{event.title}</h4>
                                
                                {event.image && (
                                    <div className="w-full aspect-[21/9] rounded-lg overflow-hidden mb-3 relative">
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                                        <img src={event.image} alt={event.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
                                    </div>
                                )}
                                
                                <p className="text-sm text-gray-300 line-clamp-2 leading-relaxed">
                                    {event.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Expanded Modal */}
            {selectedEvent && (
                <div 
                    className="fixed inset-0 z-[70] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 animate-in fade-in duration-200"
                >
                    {/* Backdrop click to close */}
                    <div className="absolute inset-0" onClick={() => setSelectedEvent(null)} />

                    <div 
                        className="relative w-full max-w-md bg-[#121212] rounded-3xl overflow-hidden shadow-2xl border border-white/10 flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-300"
                        onClick={(e) => e.stopPropagation()}
                    >
                         {/* Floating Close Button */}
                        <button 
                            onClick={() => setSelectedEvent(null)}
                            className="absolute top-4 right-4 z-50 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full backdrop-blur-md border border-white/10 shadow-lg transition-all active:scale-90 flex items-center justify-center"
                        >
                            <X size={20} />
                        </button>

                        {/* Scrollable Content Container */}
                        <div className="overflow-y-auto overscroll-contain no-scrollbar">
                            {selectedEvent.image && (
                                <div className="w-full relative">
                                    {/* Changed from aspect-square/object-cover to auto height/object-contain (or default) to show full image */}
                                    <img 
                                        src={selectedEvent.image} 
                                        alt={selectedEvent.title} 
                                        className="w-full h-auto object-contain bg-black" 
                                    />
                                    
                                    {/* Overlay Gradient for text readability if text overlaps, though layout below handles it too */}
                                    <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#121212] to-transparent pointer-events-none" />
                                </div>
                            )}
                            
                            <div className="p-6 relative z-10">
                                <div className="mb-4">
                                     <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded mb-2 inline-block shadow-lg">
                                        {selectedEvent.date}
                                     </span>
                                     <h2 className="text-3xl font-bold text-white leading-tight drop-shadow-md">
                                        {selectedEvent.title}
                                     </h2>
                                </div>

                                <div className="flex items-center gap-2 mb-4 text-blue-400">
                                    <div className="h-px bg-blue-500/30 flex-1" />
                                    {selectedEvent.icon === 'heart' && <Heart size={20} className="fill-current" />}
                                    {selectedEvent.icon === 'star' && <Star size={20} className="fill-current" />}
                                    {selectedEvent.icon === 'phone' && <Phone size={20} className="fill-current" />}
                                    {selectedEvent.icon === 'users' && <Users size={20} className="fill-current" />}
                                    <div className="h-px bg-blue-500/30 flex-1" />
                                </div>
                                <p className="text-gray-200 text-lg leading-relaxed font-light">
                                    {selectedEvent.description}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

// --- Places Timeline Widget (Replacing Map) ---
export const PlacesTimelineWidget: React.FC = () => {
    const [selectedLocation, setSelectedLocation] = useState<MapLocation | null>(null);
    const [isExpanded, setIsExpanded] = useState(false);
    useBackHandler(!!selectedLocation, () => setSelectedLocation(null));

    const displayedLocations = isExpanded ? MAP_LOCATIONS : MAP_LOCATIONS.slice(0, 4);

    return (
        <div className="bg-[#1A1A1A] rounded-2xl p-5 mb-6 border border-white/5 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-white font-bold text-lg">Lugares do Nosso Amor</h3>
                    <p className="text-blue-300 text-xs">Brasília & Valparaíso</p>
                </div>
                <MapPin size={20} className="text-blue-400" />
            </div>

            <div className="space-y-4">
                {displayedLocations.map((loc, index) => {
                    const isFourth = !isExpanded && index === 3;
                    return (
                        <div 
                            key={loc.id}
                            className={`flex items-center gap-4 bg-white/5 p-3 rounded-xl border border-white/10 cursor-pointer hover:bg-white/10 transition-colors group relative overflow-hidden ${isFourth ? 'opacity-80' : ''}`}
                            onClick={() => setSelectedLocation(loc)}
                        >
                            {isFourth && (
                                <div className="absolute inset-0 bg-blue-600/20 backdrop-blur-[1px] pointer-events-none border border-blue-500/30 rounded-xl"></div>
                            )}
                            <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-zinc-800 flex items-center justify-center">
                                {loc.image ? (
                                    <img src={loc.image} alt={loc.name} className="w-full h-full object-cover" />
                                ) : (
                                    <MapPin size={20} className="text-blue-500/50" />
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <h4 className="text-white font-bold text-sm truncate">{loc.name}</h4>
                                <p className="text-gray-400 text-xs truncate">{loc.description}</p>
                            </div>
                            <div className="text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Maximize2 size={14} />
                            </div>
                        </div>
                    );
                })}
            </div>

            {MAP_LOCATIONS.length > 4 && (
                <button 
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="w-full mt-4 py-3 text-blue-400 text-xs font-bold border border-blue-500/20 rounded-xl bg-blue-500/5 hover:bg-blue-500/10 transition-all flex items-center justify-center gap-2 uppercase tracking-widest"
                >
                    {isExpanded ? (
                        <>Ver menos <ZoomOut size={14} /></>
                    ) : (
                        <>Ver mais {MAP_LOCATIONS.length - 4} locais <ZoomIn size={14} /></>
                    )}
                </button>
            )}

            {/* Location Detail Modal */}
            {selectedLocation && (
                <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200" onClick={() => setSelectedLocation(null)}>
                    <div className="bg-[#1A1A1A] border border-white/10 rounded-3xl overflow-hidden max-w-sm w-full shadow-2xl relative animate-in zoom-in-95 duration-300" onClick={(e) => e.stopPropagation()}>
                        <button className="absolute top-4 right-4 z-10 text-white/70 hover:text-white bg-black/40 rounded-full p-2 backdrop-blur-md" onClick={() => setSelectedLocation(null)}>
                            <X size={20} />
                        </button>
                        
                        {selectedLocation.image ? (
                            <div className="w-full aspect-square overflow-hidden">
                                <img src={selectedLocation.image} alt={selectedLocation.name} className="w-full h-full object-cover" />
                            </div>
                        ) : (
                            <div className="w-full aspect-video bg-blue-500/10 flex items-center justify-center">
                                <MapPin size={48} className="text-blue-500/30" />
                            </div>
                        )}

                        <div className="p-8 text-center">
                            <h4 className="text-2xl font-bold text-white mb-3">{selectedLocation.name}</h4>
                            <p className="text-gray-300 text-lg italic leading-relaxed">"{selectedLocation.description || 'Um lugar especial...'}"</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

// --- Word Game Widget ---
export const WordGameWidget: React.FC = () => {
    const [guess, setGuess] = useState("");
    const [status, setStatus] = useState<'playing' | 'won' | 'lost'>('playing');
    const [hintIndex, setHintIndex] = useState(0);
    const [isError, setIsError] = useState(false);
    const [winCount, setWinCount] = useState(0);

    const hints = [
        "É como eu te chamo carinhosamente...",
        "São duas palavras...",
        "Começa com 'M' e termina com 'M'...",
        "Dica final: 'meu ...'"
    ];

    useEffect(() => {
        const savedWins = localStorage.getItem('word_game_wins');
        if (savedWins) {
            const count = parseInt(savedWins, 10);
            setWinCount(count);
            if (count > 0) {
                setStatus('won');
            }
        }
    }, []);

    const handleGuess = () => {
        if (guess.toLowerCase().trim() === WORD_GAME_SECRET.toLowerCase()) {
            const newCount = winCount + 1;
            setWinCount(newCount);
            localStorage.setItem('word_game_wins', newCount.toString());
            setStatus('won');
        } else {
            setIsError(true);
            setHintIndex((prev) => Math.min(prev + 1, hints.length - 1));
            setTimeout(() => {
                setIsError(false);
                setGuess("");
            }, 1000);
        }
    };

    const getWinMessage = () => {
        if (winCount === 1) return "Você ganhou um beijo! 💋";
        if (winCount === 2) return "aaa espertinha vc ja acertou mas ganhou outro beijo 💋";
        if (winCount === 3) return "ta querendo mais um? 💋";
        return "tabom eu ja nao tenho mais frases ganhou mil milhoes de beijos 💋";
    };

    return (
        <motion.div 
            animate={{ 
                backgroundColor: isError ? "rgba(236, 72, 153, 0.8)" : "rgba(30, 58, 138, 0.9)" 
            }}
            transition={{ duration: 0.3 }}
            className="rounded-2xl p-5 mb-6 text-center border border-white/10 shadow-xl overflow-hidden relative"
        >
            <h3 className="text-white font-bold text-lg mb-1">Qual a palavra secreta</h3>
            <p className="text-blue-200 text-xs mb-4">Adivinhe para ganhar um prêmio</p>

            {status === 'won' ? (
                <div className="py-4 animate-slide-up bg-white/5 rounded-xl border border-white/10">
                    <Heart className="mx-auto text-pink-500 fill-pink-500 mb-2 animate-bounce" size={40} />
                    <p className="text-xl font-bold text-white mb-1">Parabéns!</p>
                    <p className="text-lg text-blue-100 font-handwriting px-4 leading-tight">
                        {getWinMessage()}
                    </p>
                    <button 
                        onClick={() => {
                            setStatus('playing');
                            setGuess("");
                        }}
                        className="mt-4 text-[10px] text-blue-300 underline uppercase tracking-widest opacity-50 hover:opacity-100"
                    >
                        Tentar novamente?
                    </button>
                </div>
            ) : (
                <div className="space-y-3">
                    <AnimatePresence mode="wait">
                        {isError && (
                            <motion.p 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="text-white font-bold text-sm bg-black/20 py-1 rounded-lg mb-2"
                            >
                                {hints[hintIndex - 1] || "Tente novamente!"}
                            </motion.p>
                        )}
                    </AnimatePresence>

                    <div className="flex gap-2">
                        <input 
                            type="text" 
                            value={guess}
                            onChange={(e) => setGuess(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleGuess()}
                            className="bg-white/10 border border-white/20 rounded-lg px-3 py-3 text-white w-full outline-none focus:border-blue-500 text-center text-sm placeholder:text-white/20"
                            placeholder="Escreva aqui..."
                        />
                        <button 
                            onClick={handleGuess}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-bold text-sm transition-colors shadow-lg active:scale-95"
                        >
                            OK
                        </button>
                    </div>
                    <p className="text-[10px] text-blue-300/50 uppercase tracking-tighter">Dica: {hints[0]}</p>
                </div>
            )}
        </motion.div>
    );
};

// --- Gallery Widget (Memory Book) ---
export const GalleryWidget: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [direction, setDirection] = useState(0); // 1 for next, -1 for prev
    const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

    useBackHandler(isOpen, () => {
        if (selectedImage) {
            setSelectedImage(null);
        } else {
            setIsOpen(false);
        }
    });

    // Group images in pairs
    const pages: GalleryImage[][] = [];
    for (let i = 0; i < GALLERY_IMAGES.length; i += 2) {
        pages.push(GALLERY_IMAGES.slice(i, i + 2));
    }

    const totalPages = pages.length;

    const nextPage = () => {
        if (currentPage < totalPages - 1) {
            setDirection(1);
            setCurrentPage(prev => prev + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 0) {
            setDirection(-1);
            setCurrentPage(prev => prev - 1);
        }
    };

    const toggleBook = () => {
        setIsOpen(!isOpen);
        if (!isOpen) setCurrentPage(0);
    };

    return (
        <>
            <div className="bg-[#1A1A1A] rounded-2xl p-5 mb-6 border border-white/5 shadow-xl overflow-hidden">
                <h3 className="text-white font-bold text-lg mb-4 flex justify-between items-center">
                    Livro de Memórias
                    <BookOpen size={16} className="text-blue-400" />
                </h3>

                <div className="relative flex justify-center items-center py-4 perspective-1000">
                    <AnimatePresence mode="wait">
                        {!isOpen ? (
                            // --- Book Cover ---
                            <motion.div
                                key="cover"
                                initial={{ rotateY: -90, opacity: 0 }}
                                animate={{ rotateY: 0, opacity: 1 }}
                                exit={{ rotateY: -90, opacity: 0 }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                                onClick={toggleBook}
                                className="w-full max-w-[280px] aspect-[3/4] bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900 rounded-r-2xl rounded-l-md shadow-2xl cursor-pointer border-y border-r border-white/20 flex flex-col items-center justify-center p-6 text-center relative overflow-hidden group"
                                style={{ transformOrigin: "left" }}
                            >
                                {/* Spine detail */}
                                <div className="absolute left-0 top-0 bottom-0 w-4 bg-black/30 border-r border-white/10" />
                                
                                <div className="absolute inset-0 opacity-10 pointer-events-none">
                                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent"></div>
                                </div>

                                <div className="relative z-10 space-y-4">
                                    <div className="w-20 h-20 mx-auto bg-white/10 rounded-full flex items-center justify-center border border-white/20 group-hover:scale-110 transition-transform duration-500">
                                        <Heart size={40} className="text-blue-400 fill-blue-400/20" />
                                    </div>
                                    <div>
                                        <h4 className="text-2xl font-serif font-bold text-white tracking-widest uppercase">{COUPLE_NAMES}</h4>
                                        <p className="text-blue-300 text-xs font-serif italic mt-1">Nossa História em Fotos</p>
                                    </div>
                                    <div className="h-px w-12 bg-blue-500/50 mx-auto"></div>
                                    <span className="text-[10px] text-gray-400 uppercase tracking-[0.2em] font-bold">Abrir Livro</span>
                                </div>
                            </motion.div>
                        ) : (
                            // --- Open Book (Single Page View) ---
                            <motion.div
                                key="book-open"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="w-full max-w-[320px] bg-[#fdfaf1] rounded-r-xl shadow-2xl relative min-h-[420px] border-y border-r border-black/10 overflow-hidden"
                            >
                                {/* Page Spine Shadow */}
                                <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black/20 to-transparent z-20" />
                                
                                {/* Header */}
                                <div className="p-4 border-b border-black/5 flex justify-between items-center bg-black/5">
                                    <button onClick={toggleBook} className="text-black/50 hover:text-black">
                                        <X size={18} />
                                    </button>
                                    <span className="text-[10px] font-serif font-bold text-black/40 uppercase tracking-widest">Página {currentPage + 1} de {totalPages}</span>
                                </div>

                                {/* Page Content with Turn Animation */}
                                <div className="relative h-full p-4 flex flex-col gap-4">
                                    <AnimatePresence custom={direction} mode="popLayout">
                                        <motion.div
                                            key={currentPage}
                                            custom={direction}
                                            initial={{ rotateY: direction > 0 ? 90 : -90, opacity: 0 }}
                                            animate={{ rotateY: 0, opacity: 1 }}
                                            exit={{ rotateY: direction > 0 ? -90 : 90, opacity: 0 }}
                                            transition={{ duration: 0.5, ease: "easeInOut" }}
                                            className="flex flex-col gap-4 h-full"
                                            style={{ transformOrigin: direction > 0 ? "left" : "right" }}
                                        >
                                            {pages[currentPage].map((img) => (
                                                <div 
                                                    key={img.id} 
                                                    className="relative flex-1 rounded-lg overflow-hidden shadow-md border border-black/5 group cursor-pointer"
                                                    onClick={() => setSelectedImage(img)}
                                                >
                                                    <img src={img.url} alt={img.caption} className="w-full h-full object-cover" />
                                                    <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-sm p-2">
                                                        <p className="text-[10px] text-white font-medium text-center italic">{img.caption}</p>
                                                    </div>
                                                </div>
                                            ))}
                                            {pages[currentPage].length === 1 && (
                                                <div className="flex-1 bg-black/5 rounded-lg border border-dashed border-black/10 flex items-center justify-center">
                                                    <Heart size={24} className="text-black/10" />
                                                </div>
                                            )}
                                        </motion.div>
                                    </AnimatePresence>
                                </div>

                                {/* Navigation Controls */}
                                <div className="absolute bottom-4 left-0 right-0 flex justify-between px-4 z-30">
                                    <button 
                                        onClick={prevPage} 
                                        disabled={currentPage === 0}
                                        className={`p-2 rounded-full bg-black/5 hover:bg-black/10 transition-colors ${currentPage === 0 ? 'opacity-0' : 'opacity-100'}`}
                                    >
                                        <ChevronLeft size={20} className="text-black" />
                                    </button>
                                    <button 
                                        onClick={nextPage} 
                                        disabled={currentPage === totalPages - 1}
                                        className={`p-2 rounded-full bg-black/5 hover:bg-black/10 transition-colors ${currentPage === totalPages - 1 ? 'opacity-0' : 'opacity-100'}`}
                                    >
                                        <ChevronRight size={20} className="text-black" />
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Fullscreen Image Modal */}
            {selectedImage && (
                <div 
                    className="fixed inset-0 z-[110] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 animate-in fade-in duration-200"
                    onClick={() => setSelectedImage(null)}
                >
                    <button className="absolute top-6 right-6 text-white/80 hover:text-white p-2 bg-black/50 rounded-full z-50">
                        <X size={24} />
                    </button>
                    <img 
                        src={selectedImage.url} 
                        alt={selectedImage.caption} 
                        className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl" 
                        onClick={(e) => e.stopPropagation()} 
                    />
                    <div className="absolute bottom-10 left-0 right-0 text-center pointer-events-none">
                        <p className="text-white font-bold text-xl drop-shadow-lg bg-black/50 inline-block px-4 py-2 rounded-full backdrop-blur-sm">
                            {selectedImage.caption}
                        </p>
                    </div>
                </div>
            )}
        </>
    );
};

// --- Contract Widget ---
export const ContractWidget: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [signatures, setSignatures] = useState({ leo: false, ge: false });
    const [scanning, setScanning] = useState({ leo: false, ge: false });
    
    useBackHandler(isOpen, () => setIsOpen(false));

    const handleSign = (person: 'leo' | 'ge') => {
        if (signatures[person] || scanning[person]) return;

        setScanning(prev => ({ ...prev, [person]: true }));

        // Simulate scanning delay
        setTimeout(() => {
            setScanning(prev => ({ ...prev, [person]: false }));
            setSignatures(prev => ({ ...prev, [person]: true }));
        }, 1500);
    };

    const allSigned = signatures.leo && signatures.ge;

    return (
        <>
            <div 
                className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-5 mb-24 border border-white/10 cursor-pointer hover:border-blue-500/50 transition-colors relative overflow-hidden group"
                onClick={() => setIsOpen(true)}
            >
                <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                    <FileSignature size={60} className="text-white" />
                </div>
                <div className="flex items-center gap-3 mb-2">
                    <div className="bg-blue-600/20 p-2 rounded-lg">
                        <Fingerprint className="text-blue-400" size={24} />
                    </div>
                    <h3 className="text-white font-bold text-lg">Contrato de Namoro</h3>
                </div>
                <p className="text-gray-400 text-sm mb-3">Documento oficial de compromisso eterno.</p>
                <div className="flex items-center gap-2 text-xs font-bold text-blue-400">
                    <span>TOQUE PARA ASSINAR</span>
                    <Unlock size={12} />
                </div>
            </div>

            {/* Contract Modal */}
            {isOpen && (
                <div className="fixed inset-0 z-[80] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
                    <button 
                        onClick={() => setIsOpen(false)}
                        className="absolute top-6 right-6 text-white/50 hover:text-white"
                    >
                        <X size={24} />
                    </button>

                    <div className="w-full max-w-sm bg-[#fff] text-black rounded-sm p-8 shadow-2xl relative rotate-1 transform transition-transform">
                        {/* Paper Texture Effect */}
                        <div className="absolute inset-0 bg-[#f4e4bc] opacity-20 pointer-events-none mix-blend-multiply"></div>
                        
                        <div className="relative z-10 flex flex-col items-center text-center h-full">
                            <h2 className="font-serif text-2xl font-bold mb-1 uppercase tracking-widest border-b-2 border-black pb-2 w-full">Contrato</h2>
                            <p className="font-serif text-xs italic mb-6">De Amor & Compromisso</p>

                            <div className="text-left w-full text-sm font-serif leading-relaxed space-y-2 mb-8 opacity-90">
                                <p>Eu, <strong>Léo</strong>, e eu, <strong>Gê</strong>, prometemos solenemente:</p>
                                <ul className="list-disc pl-4 space-y-1">
                                    <li>Nos amar incondicionalmente.</li>
                                    <li>Ter paciência nos dias difíceis.</li>
                                    <li>Compartilhar sonhos e memes.</li>
                                    <li>Ser o porto seguro um do outro.</li>
                                    <li>Construir uma eternidade juntos.</li>
                                </ul>
                            </div>

                            {/* Signatures Area */}
                            <div className="w-full flex justify-between items-end mt-auto gap-4">
                                {/* Léo's Signature */}
                                <div className="flex flex-col items-center flex-1">
                                    <div 
                                        className={`w-16 h-20 border-2 rounded-lg mb-2 flex items-center justify-center cursor-pointer transition-all relative overflow-hidden ${signatures.leo ? 'border-blue-600 bg-blue-50' : 'border-dashed border-gray-400 hover:bg-gray-50'}`}
                                        onMouseDown={() => handleSign('leo')}
                                        onTouchStart={() => handleSign('leo')}
                                    >
                                        {signatures.leo ? (
                                            <Fingerprint size={40} className="text-blue-600 opacity-80" />
                                        ) : scanning.leo ? (
                                            <div className="absolute inset-0 bg-blue-200 animate-pulse"></div>
                                        ) : (
                                            <span className="text-[10px] text-gray-400 text-center px-1">Toque digital</span>
                                        )}
                                    </div>
                                    <div className="h-px w-full bg-black mb-1"></div>
                                    <span className="font-serif text-xs font-bold uppercase">Léo</span>
                                </div>

                                {/* Gê's Signature */}
                                <div className="flex flex-col items-center flex-1">
                                    <div 
                                        className={`w-16 h-20 border-2 rounded-lg mb-2 flex items-center justify-center cursor-pointer transition-all relative overflow-hidden ${signatures.ge ? 'border-pink-600 bg-pink-50' : 'border-dashed border-gray-400 hover:bg-gray-50'}`}
                                        onMouseDown={() => handleSign('ge')}
                                        onTouchStart={() => handleSign('ge')}
                                    >
                                        {signatures.ge ? (
                                            <Fingerprint size={40} className="text-pink-600 opacity-80" />
                                        ) : scanning.ge ? (
                                            <div className="absolute inset-0 bg-pink-200 animate-pulse"></div>
                                        ) : (
                                            <span className="text-[10px] text-gray-400 text-center px-1">Toque digital</span>
                                        )}
                                    </div>
                                    <div className="h-px w-full bg-black mb-1"></div>
                                    <span className="font-serif text-xs font-bold uppercase">Gê</span>
                                </div>
                            </div>

                            {allSigned && (
                                <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
                                    <div className="bg-white/90 px-6 py-4 rounded-xl border-4 border-double border-green-600 transform -rotate-12 animate-in zoom-in duration-300 shadow-xl">
                                        <div className="flex flex-col items-center text-green-700">
                                            <CheckCircle2 size={40} className="mb-2" />
                                            <span className="font-serif font-bold text-xl uppercase tracking-widest border-2 border-green-700 px-2 py-1">Oficializado</span>
                                            <span className="text-[10px] mt-1 uppercase">{new Date().toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};