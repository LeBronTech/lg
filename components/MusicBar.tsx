import React, { useState, useEffect, useRef } from 'react';
import { Heart, Play, Pause, SkipBack, SkipForward, Shuffle, Repeat, Share2, ListMusic } from 'lucide-react';
import { SONG_TITLE, ARTIST_NAME, YOUTUBE_ID } from '../constants';

const MusicBar: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [liked, setLiked] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Fake progress simulation for the aesthetic
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => (prev >= 100 ? 0 : prev + 0.5));
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const togglePlay = () => {
    const newState = !isPlaying;
    setIsPlaying(newState);
    
    if (iframeRef.current && iframeRef.current.contentWindow) {
        const command = newState ? 'playVideo' : 'pauseVideo';
        iframeRef.current.contentWindow.postMessage(JSON.stringify({
            event: 'command',
            func: command,
            args: []
        }), '*');
    }
  };

  return (
    <div className="bg-gradient-to-b from-[#1e1e1e] to-black rounded-3xl p-6 shadow-2xl mb-6 border border-white/5 relative overflow-hidden">
        
      {/* Header - Updated as per request */}
      <div className="flex justify-between items-center mb-4">
        <span className="text-2xl font-bold text-blue-500 tracking-wide">Nossa música</span>
        <MoreHorizontalIcon />
      </div>

      {/* Album Art (YouTube Iframe) */}
      <div className="w-full aspect-square bg-black rounded-lg overflow-hidden shadow-2xl mb-6 relative group">
          <iframe 
              ref={iframeRef}
              width="100%" 
              height="100%" 
              src={`https://www.youtube.com/embed/${YOUTUBE_ID}?enablejsapi=1&autoplay=1&controls=0&modestbranding=1&rel=0&showinfo=0&loop=1&playlist=${YOUTUBE_ID}`} 
              title="YouTube music player" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
              className="absolute inset-0 w-full h-full pointer-events-none"
          ></iframe>
      </div>
      
      {/* Track Info */}
      <div className="flex justify-between items-end mb-2">
          <div className="flex-1 pr-4">
              <h2 className="text-xl font-bold text-white leading-tight mb-1 truncate">{SONG_TITLE}</h2>
              <p className="text-gray-400 text-sm font-medium truncate">{ARTIST_NAME}</p>
          </div>
          <button onClick={() => setLiked(!liked)} className="mb-1">
            <Heart className={`w-6 h-6 transition-colors ${liked ? 'text-green-500 fill-green-500' : 'text-white'}`} />
          </button>
      </div>

      {/* Progress Bar (Visual Only) */}
      <div className="w-full mb-6 group">
        <div className="w-full bg-gray-700 rounded-full h-1 cursor-pointer">
          <div 
            className="bg-white h-1 rounded-full relative group-hover:bg-green-500 transition-colors" 
            style={{ width: `${progress}%` }}
          >
             <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 shadow-sm"></div>
          </div>
        </div>
        <div className="flex justify-between text-[10px] text-gray-400 mt-2 font-medium">
            <span>2:14</span>
            <span>4:48</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-between items-center mb-6">
        <button className="text-gray-400 hover:text-white transition-colors">
            <Shuffle size={20} />
        </button>
        <button className="text-white hover:scale-110 transition-transform">
            <SkipBack size={28} fill="currentColor" />
        </button>
        <button 
            onClick={togglePlay}
            className="w-16 h-16 bg-white rounded-full flex items-center justify-center hover:scale-105 transition-transform shadow-lg"
        >
          {isPlaying ? (
            <Pause className="text-black w-8 h-8 fill-black" />
          ) : (
            <Play className="text-black w-8 h-8 fill-black ml-1" />
          )}
        </button>
        <button className="text-white hover:scale-110 transition-transform">
            <SkipForward size={28} fill="currentColor" />
        </button>
        <button className="text-gray-400 hover:text-white transition-colors">
            <Repeat size={20} />
        </button>
      </div>

      {/* Bottom Actions */}
      <div className="flex justify-between items-center px-2 text-gray-400">
          <button className="hover:text-white transition-colors">
              <Share2 size={18} />
          </button>
          <div className="flex items-center gap-2 cursor-pointer hover:text-white transition-colors">
             <span className="text-xs font-bold uppercase tracking-wide">Lyrics</span>
             <ListMusic size={18} />
          </div>
      </div>
    </div>
  );
};

const MoreHorizontalIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="1" />
        <circle cx="19" cy="12" r="1" />
        <circle cx="5" cy="12" r="1" />
    </svg>
)

export default MusicBar;