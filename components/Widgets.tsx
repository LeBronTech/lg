import React, { useState, useEffect } from 'react';
import { START_DATE, TIMELINE_EVENTS, MAP_LOCATIONS, WORD_GAME_SECRET, GALLERY_IMAGES } from '../constants';
import { Heart, MapPin, Star, Camera, Phone, Users, Unlock } from 'lucide-react';
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

// --- Timeline Component ---
export const TimelineWidget: React.FC = () => {
    return (
        <div className="rounded-2xl mb-6">
            <h3 className="text-white font-bold text-lg mb-6 pl-2">Nossa História</h3>
            <div className="relative space-y-8">
                {/* Central Line */}
                <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-blue-500 to-purple-900 rounded-full" />
                
                {TIMELINE_EVENTS.map((event: TimelineEvent, index) => {
                    const isEven = index % 2 === 0;
                    return (
                        <div key={event.id} className={`relative flex items-center ${isEven ? 'flex-row' : 'flex-row-reverse'}`}>
                            
                            {/* Content Side */}
                            <div className={`w-1/2 ${isEven ? 'pr-6 text-right' : 'pl-6 text-left'}`}>
                                <div className="bg-[#1A1A1A] p-3 rounded-xl border border-white/10 shadow-lg">
                                    <span className="text-xs text-blue-400 font-bold mb-1 block">
                                        {event.date}
                                    </span>
                                    <h4 className="text-white font-bold text-sm mb-1">{event.title}</h4>
                                    
                                    {event.image && (
                                        <div className="w-full aspect-video rounded-lg overflow-hidden mb-2 mt-2">
                                            <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                                        </div>
                                    )}
                                    <p className="text-xs text-gray-400 leading-relaxed">{event.description}</p>
                                </div>
                            </div>

                            {/* Center Icon */}
                            <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-black border-2 border-blue-500 rounded-full flex items-center justify-center z-10 shadow-[0_0_10px_rgba(59,130,246,0.5)]">
                                {event.icon === 'heart' && <Heart size={14} className="text-pink-500 fill-pink-500" />}
                                {event.icon === 'star' && <Star size={14} className="text-yellow-500 fill-yellow-500" />}
                                {event.icon === 'map' && <MapPin size={14} className="text-blue-500" />}
                                {event.icon === 'camera' && <Camera size={14} className="text-green-500" />}
                                {event.icon === 'phone' && <Phone size={14} className="text-purple-500" />}
                                {event.icon === 'users' && <Users size={14} className="text-orange-500" />}
                            </div>

                            {/* Empty Side for spacing */}
                            <div className="w-1/2"></div>
                        </div>
                    );
                })}
            </div>
        </div>
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