import React, { useState, useEffect } from 'react';
import { START_DATE, TIMELINE_EVENTS, MAP_LOCATIONS, WORD_GAME_SECRET, GALLERY_IMAGES } from '../constants';
import { Heart, MapPin, Star, Camera, Phone, Users, Unlock, X, Maximize2, Calendar } from 'lucide-react';
import { TimelineEvent } from '../types';

// --- Relationship Timer Component ---
export const RelationshipTimer: React.FC = () => {
    const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const [isFuture, setIsFuture] = useState(false);

    useEffect(() => {
        const calculateTime = () => {
            const now = new Date();
            const start = new Date(START_DATE);
            const diff = start.getTime() - now.getTime();
            
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
        <div className="bg-[#1A1A1A] rounded-2xl p-4 mb-6 border border-white/5">
            <h3 className="text-blue-400 font-bold mb-3 flex items-center gap-2">
                <Heart size={16} className="fill-blue-400" /> 
                {isFuture ? "Contagem regressiva para 01/03/26" : "Juntos desde Março 2026"}
            </h3>
            <div className="flex justify-center gap-3">
                <TimeUnit val={time.days} label="Dias" />
                <TimeUnit val={time.hours} label="Horas" />
                <TimeUnit val={time.minutes} label="Min" />
                <TimeUnit val={time.seconds} label="Seg" />
            </div>
        </div>
    );
};

// --- Timeline Component (Enhanced) ---
export const TimelineWidget: React.FC = () => {
    const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);

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
                    className="fixed inset-0 z-[70] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center p-6 animate-in fade-in duration-200"
                    onClick={() => setSelectedEvent(null)}
                >
                    <button className="absolute top-6 right-6 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors z-20">
                        <X size={24} />
                    </button>

                    <div 
                        className="w-full max-w-md bg-[#121212] rounded-3xl overflow-hidden shadow-2xl border border-white/10 flex flex-col max-h-[80vh]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {selectedEvent.image && (
                            <div className="w-full aspect-square relative">
                                <img src={selectedEvent.image} alt={selectedEvent.title} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent" />
                                <div className="absolute bottom-4 left-4 right-4">
                                     <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded mb-2 inline-block shadow-lg">
                                        {selectedEvent.date}
                                     </span>
                                     <h2 className="text-3xl font-bold text-white leading-tight drop-shadow-md">
                                        {selectedEvent.title}
                                     </h2>
                                </div>
                            </div>
                        )}
                        
                        <div className="p-6 overflow-y-auto">
                            {!selectedEvent.image && (
                                <div className="mb-4">
                                     <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded mb-2 inline-block">
                                        {selectedEvent.date}
                                     </span>
                                     <h2 className="text-3xl font-bold text-white leading-tight">
                                        {selectedEvent.title}
                                     </h2>
                                </div>
                            )}
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
            )}
        </>
    );
};

// --- Map Widget ---
export const MapWidget: React.FC = () => {
    return (
        <div className="bg-[#1A1A1A] rounded-2xl p-5 mb-6 overflow-hidden relative min-h-[200px] border border-white/5">
            <h3 className="text-white font-bold text-lg mb-2 relative z-10">Jornada no Mapa</h3>
            <p className="text-gray-400 text-xs mb-4 relative z-10">Nossos lugares especiais</p>
            
            <div className="absolute inset-0 top-16 bg-gradient-to-br from-gray-900 to-black">
                 {/* Abstract Map Dots */}
                 {MAP_LOCATIONS.map((loc) => (
                     <div 
                        key={loc.id}
                        className="absolute flex flex-col items-center group cursor-pointer"
                        style={{ left: `${loc.coords.x}%`, top: `${loc.coords.y}%` }}
                     >
                         <MapPin 
                            size={24} 
                            className={`transform transition-all duration-300 group-hover:-translate-y-2 ${loc.status === 'visited' ? 'text-blue-500 fill-blue-500' : 'text-gray-600'}`} 
                        />
                         <span className="text-[10px] font-bold bg-blue-900/80 px-2 py-0.5 rounded text-white mt-1 opacity-100 transition-opacity whitespace-nowrap">
                             {loc.name}
                         </span>
                     </div>
                 ))}
                 
                 {/* Decorative connecting line */}
                 <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
                     <path d="M 50% 50% Q 65% 35% 80% 30%" stroke="#3B82F6" strokeWidth="2" fill="none" strokeDasharray="4 4" />
                 </svg>
            </div>
        </div>
    );
};

// --- Word Game Widget ---
export const WordGameWidget: React.FC = () => {
    const [guess, setGuess] = useState("");
    const [status, setStatus] = useState<'playing' | 'won' | 'lost'>('playing');

    const handleGuess = () => {
        if (guess.toUpperCase() === WORD_GAME_SECRET) {
            setStatus('won');
        } else {
            setGuess("");
            // Simple visual shake or feedback could go here
            alert("Tente novamente! Dica: Dura para sempre...");
        }
    };

    return (
        <div className="bg-gradient-to-r from-blue-900 to-slate-900 rounded-2xl p-5 mb-6 text-center border border-white/10">
            <h3 className="text-white font-bold text-lg mb-1">Jogo de Palavras</h3>
            <p className="text-blue-200 text-xs mb-4">Adivinhe a palavra secreta</p>

            {status === 'won' ? (
                <div className="py-4 animate-slide-up">
                    <Unlock className="mx-auto text-yellow-400 mb-2" size={32} />
                    <p className="text-xl font-bold text-white">Você acertou! 🎉</p>
                    <p className="text-sm text-white/80">A resposta é {WORD_GAME_SECRET}</p>
                </div>
            ) : (
                <div className="space-y-3">
                    <div className="flex justify-center gap-1 mb-2">
                        {WORD_GAME_SECRET.split('').map((_, i) => (
                            <div key={i} className="w-6 h-8 border-b-2 border-white/30 flex items-center justify-center text-sm font-bold">
                                {guess[i] || ""}
                            </div>
                        ))}
                    </div>
                    
                    <div className="flex gap-2">
                        <input 
                            type="text" 
                            maxLength={WORD_GAME_SECRET.length}
                            value={guess}
                            onChange={(e) => setGuess(e.target.value.toUpperCase())}
                            className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white w-full outline-none focus:border-blue-500 uppercase tracking-widest text-center text-sm"
                            placeholder="???"
                        />
                        <button 
                            onClick={handleGuess}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-bold text-sm transition-colors"
                        >
                            OK
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

// --- Gallery Widget ---
export const GalleryWidget: React.FC = () => {
    return (
        <div className="bg-[#1A1A1A] rounded-2xl p-5 mb-24 border border-white/5">
            <h3 className="text-white font-bold text-lg mb-4 flex justify-between items-center">
                Galeria
                <Camera size={16} className="text-gray-400" />
            </h3>
            <div className="grid grid-cols-2 gap-3">
                {GALLERY_IMAGES.map((img) => (
                    <div key={img.id} className="relative aspect-square rounded-xl overflow-hidden group">
                        <img src={img.url} alt={img.caption} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
                            <span className="text-xs font-medium text-white">{img.caption}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};