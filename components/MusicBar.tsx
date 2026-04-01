import React, { useState } from 'react';
import YouTube, { YouTubeProps } from 'react-youtube';
import { Heart, Share2, ListMusic, Volume2, VolumeX, X } from 'lucide-react';
import { SONG_TITLE, ARTIST_NAME, YOUTUBE_ID } from '../constants';
import { motion, AnimatePresence } from 'motion/react';

const MusicBar: React.FC = () => {
  const [liked, setLiked] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [showLyrics, setShowLyrics] = useState(false);

  const lyrics = `Lembra, quando a vida nos juntou
Quando a música tocou
Cedo ali reconheci
Já sabia, era amor

Tão descomplicado assim
Quando dei por mim, me vi
Já completamente seu
Chego a me perguntar

Por que que eu procurei outros olhares?
Eu já naveguei em tantos mares
Eu cheguei a ver terra firme, mas eu me afoguei
Por que gastei todo esse tempo em vão?
Se a minha vida começou quando encontrei
Quando encontrei você, amor

E vi que não preciso mais andar sozinho
Seu amor é o motivo de hoje eu dizer que sou feliz, amor
Feliz porque eu posso dividir meus dias com você
E não me preocupar como será o amanhã
Se estamos juntos

Veja, tanta vida pra viver
Tudo que eu puder fazer
Só pra ver você sorrir
Ver crescer o nosso amor

Posso olhar pra frente e ver
Lá bem longe ainda estou
Segurando a sua mão
E eu nunca vou soltar

Porque já procurei outros olhares
Eu já naveguei em tantos mares
Eu cheguei a ver terra firme, mas eu me afoguei
Por que gastei todo esse tempo em vão?
Se a minha vida começou quando encontrei
Quando encontrei você, amor

E vi que não preciso mais andar sozinho
Seu amor é o motivo de hoje eu dizer que sou feliz, amor
Feliz porque eu posso dividir meus dias com você
E não me preocupar como será o amanhã
Se estamos juntos

E não me preocupar como será o amanhã
Se estamos sempre juntos`;

  const onPlayerReady: YouTubeProps['onReady'] = (event) => {
    setIsReady(true);
    if (isMuted) {
      event.target.mute();
    }
  };

  const opts: YouTubeProps['opts'] = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 0, // Desativando autoplay inicial para evitar bloqueio do navegador
      controls: 1,
      modestbranding: 1,
      rel: 0,
    },
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Nossa Música - Léo & Gê',
          text: `Ouça nossa música especial: ${SONG_TITLE} - ${ARTIST_NAME}`,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copiado para a área de transferência!');
    }
  };

  return (
    <div className="bg-gradient-to-b from-[#1e1e1e] to-black rounded-3xl p-6 shadow-2xl mb-6 border border-white/5 relative overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <span className="text-2xl font-bold text-blue-500 tracking-wide">Nossa música</span>
        <button onClick={handleShare} className="text-gray-400 hover:text-white transition-colors">
            <Share2 size={20} />
        </button>
      </div>

      {/* Mini YouTube Player Container */}
      <div className="w-full aspect-video bg-zinc-900 rounded-xl overflow-hidden shadow-2xl mb-6 relative border border-white/10">
        {!isReady && (
          <div className="absolute inset-0 flex items-center justify-center bg-zinc-900 z-10">
            <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        <YouTube
          videoId={YOUTUBE_ID}
          opts={opts}
          onReady={onPlayerReady}
          className="w-full h-full"
          iframeClassName="w-full h-full"
        />
      </div>
      
      {/* Track Info */}
      <div className="flex justify-between items-center mb-6">
          <div className="flex-1 pr-4">
              <h2 className="text-xl font-bold text-white leading-tight mb-1 truncate">{SONG_TITLE}</h2>
              <p className="text-gray-400 text-sm font-medium truncate">{ARTIST_NAME}</p>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => setIsMuted(!isMuted)} className="text-gray-400 hover:text-white transition-colors">
                {isMuted ? <VolumeX size={22} /> : <Volume2 size={22} />}
            </button>
            <button onClick={() => setLiked(!liked)}>
                <Heart className={`w-7 h-7 transition-colors ${liked ? 'text-blue-500 fill-blue-500' : 'text-white'}`} />
            </button>
          </div>
      </div>

      {/* Bottom Actions */}
      <div className="flex justify-between items-center px-2 text-gray-400 border-t border-white/5 pt-4">
          <button onClick={handleShare} className="hover:text-white transition-colors flex items-center gap-2">
              <Share2 size={18} />
              <span className="text-xs">Compartilhar</span>
          </button>
          <div 
            className="flex items-center gap-2 cursor-pointer hover:text-white transition-colors"
            onClick={() => setShowLyrics(true)}
          >
             <span className="text-xs font-bold uppercase tracking-wide">Lyrics</span>
             <ListMusic size={18} />
          </div>
      </div>

      {/* Lyrics Modal */}
      <AnimatePresence>
        {showLyrics && (
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-6"
                onClick={() => setShowLyrics(false)}
            >
                <motion.div 
                    initial={{ scale: 0.9, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, y: 20 }}
                    className="bg-zinc-900 w-full max-w-md h-[80vh] rounded-3xl overflow-hidden border border-white/10 flex flex-col"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="p-6 border-b border-white/10 flex justify-between items-center bg-zinc-900/50 backdrop-blur-sm sticky top-0 z-10">
                        <div>
                            <h3 className="text-white font-bold text-lg leading-tight">{SONG_TITLE}</h3>
                            <p className="text-blue-400 text-xs font-medium">{ARTIST_NAME}</p>
                        </div>
                        <button 
                            onClick={() => setShowLyrics(false)}
                            className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-full transition-colors"
                        >
                            <X size={20} />
                        </button>
                    </div>
                    
                    <div className="flex-1 overflow-y-auto p-8 no-scrollbar">
                        <pre className="text-gray-200 text-center font-sans whitespace-pre-wrap leading-relaxed text-lg italic">
                            {lyrics}
                        </pre>
                        <div className="h-12" /> {/* Bottom spacing */}
                    </div>
                </motion.div>
            </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MusicBar;

