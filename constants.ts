import { StorySlide, TimelineEvent, MapLocation, GalleryImage } from './types';

export const COUPLE_NAMES = "Léo & Gê";
// March 1, 2026, 13:00
export const START_DATE = new Date("2026-03-01T13:00:00"); 
export const SONG_TITLE = "Tantos Mares";
export const ARTIST_NAME = "Pedro Valença";
export const YOUTUBE_ID = "vCPCfvXjXIs";

// Image mapping based on user request:
// 1. Hero/Main: qJbwiNt.jpg
// 2. First Call: qJbwml4.jpg
// 3. First Meeting: qJbNKib.jpg
// 4. First Kiss: qJbsjJ1.jpg

const IMAGES = {
  hero: "https://iili.io/qJbwiNt.jpg", 
  videoCall: "https://iili.io/qJbwml4.jpg",
  meeting: "https://iili.io/qJbNKib.jpg",
  kiss: "https://iili.io/qJbsjJ1.jpg",
};

export const STORY_SLIDES: StorySlide[] = [
  {
    id: 1,
    type: 'intro',
    content: "Nossa Jornada Começa",
    subContent: "Prepare-se para o nosso futuro juntos.",
    duration: 4,
    bgColor: "bg-gradient-to-br from-blue-900 to-black"
  },
  {
    id: 2,
    type: 'photo',
    content: "Onde tudo começa",
    image: IMAGES.hero,
    duration: 5,
    bgColor: "bg-black"
  },
  {
    id: 3,
    type: 'music',
    content: "Nossa Canção",
    subContent: "Tantos Mares - Pedro Valença",
    duration: 5,
    bgColor: "bg-gradient-to-br from-slate-900 to-black"
  },
  {
    id: 4,
    type: 'text',
    content: "Contando os dias...",
    subContent: "Para sermos um só.",
    duration: 5,
    bgColor: "bg-gradient-to-br from-indigo-900 to-black"
  },
  {
    id: 5,
    type: 'text',
    content: "Para todas as notas a ti um dia dedicada",
    subContent: "Ouça com carinho 💙",
    duration: 10,
    bgColor: "bg-gradient-to-br from-blue-800 to-black",
    link: "https://youtu.be/vCPCfvXjXIs",
    linkText: "Ver Clipe"
  }
];

export const TIMELINE_EVENTS: TimelineEvent[] = [
  { 
    id: 1, 
    date: "31 Jan 2026", 
    title: "Primeira Ligação", 
    description: "Quando ouvimos a voz um do outro pela primeira vez.", 
    icon: 'phone',
    image: IMAGES.videoCall 
  },
  { 
    id: 2, 
    date: "01 Fev 2026", 
    title: "Primeiro Encontro", 
    description: "O momento em que os olhares se cruzaram pessoalmente.", 
    icon: 'users',
    image: IMAGES.meeting
  },
  { 
    id: 3, 
    date: "03 Fev 2026", 
    title: "Primeiro Beijo", 
    description: "Um momento mágico e inesquecível.", 
    icon: 'heart',
    image: IMAGES.kiss
  },
  { 
    id: 4, 
    date: "01 Mar 2026", 
    title: "O Início", 
    description: "O começo oficial da nossa história de amor.", 
    icon: 'star',
    image: IMAGES.hero
  },
];

// Locations approx:
export const MAP_LOCATIONS: MapLocation[] = [
  { id: 2, name: "Comunidade Shalom", status: 'visited', coords: { x: 35, y: 45 } }, // Was Minha Casa
  { id: 3, name: "Igreja Santa Mãe de Deus", status: 'visited', coords: { x: 55, y: 50 } }, 
  { id: 4, name: "Nossa Sra. da Providência", status: 'visited', coords: { x: 40, y: 55 } }, 
  { id: 5, name: "Retiro JSC", status: 'visited', coords: { x: 45, y: 80 } }, // Was Casa Dela
];

export const GALLERY_IMAGES: GalleryImage[] = [
  { id: 1, url: IMAGES.videoCall, caption: "A primeira chamada" },
  { id: 2, url: IMAGES.meeting, caption: "O encontro" },
  { id: 3, url: IMAGES.kiss, caption: "O beijo" },
  { id: 4, url: IMAGES.hero, caption: "Nós dois" },
];

export const WORD_GAME_SECRET = "VIDA";

export const LOVE_PHRASES = [
  "Mal posso esperar pelo dia em que 'você e eu' seremos 'nós' para sempre. 💙",
  "Você é a minha notificação favorita.",
  "Meu lugar favorito no mundo é ao seu lado.",
  "Cada dia com você é um presente de Deus.",
  "O nosso amor é a melhor melodia.",
  "Contando os segundos para te ver de novo."
];