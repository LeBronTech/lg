import { TimelineEvent, MapLocation, GalleryImage } from './types';

export const COUPLE_NAMES = "Léo & Gê";
// March 1, 2026, 12:30
export const START_DATE = new Date("2026-03-01T12:30:00"); 
export const SONG_TITLE = "Tantos Mares";
export const ARTIST_NAME = "Pedro Valença";
export const YOUTUBE_ID = "vCPCfvXjXIs";

// Image mapping based on user request:
// 1. Hero/Main: qJbwiNt.jpg
// 2. First Call: qJbwml4.jpg
// 3. First Meeting (Mass): qJbNKib.jpg
// 4. First Date (New): q2xtQna.png
// 5. First Kiss: qJbsjJ1.jpg

const IMAGES = {
  hero: "https://iili.io/qJbwiNt.jpg", 
  videoCall: "https://iili.io/qJbwml4.jpg",
  meeting: "https://iili.io/qJbNKib.jpg",
  firstDate: "https://iili.io/q2xtQna.png",
  kiss: "https://iili.io/qJbsjJ1.jpg",
  eternity: "https://iili.io/qnZv51S.jpg",
  providencia: "https://iili.io/qnZm1LB.jpg",
  caminhada: "https://iili.io/qnt3aWJ.jpg",
  basilica: "https://iili.io/qVCgxee.jpg",
};

export const TIMELINE_EVENTS: TimelineEvent[] = [
  { 
    id: 1, 
    date: "31 Jan 2026", 
    title: "A Escolha", 
    description: "Já conversávamos e nos conhecíamos, mas foi aqui que você disse que tinha me escolhido. Meu coração disparou.", 
    icon: 'phone',
    image: IMAGES.videoCall 
  },
  { 
    id: 2, 
    date: "01 Fev 2026", 
    title: "Primeira Missa", 
    description: "Não foi só uma missa, foi a primeira vez que peguei na sua mão. Senti ali que não queria soltar nunca mais.", 
    icon: 'users',
    image: IMAGES.meeting
  },
  { 
    id: 5, 
    date: "01 Fev 2026", 
    title: "Nosso Café", 
    description: "Na padaria, fiz uma flor de guardanapo para você. Ali, entre conversas e café, nos conhecemos melhor.", 
    icon: 'camera',
    image: IMAGES.firstDate
  },
  { 
    id: 3, 
    date: "03 Fev 2026", 
    title: "Beijo e Verdade", 
    description: "Debaixo de chuva, cena de filme. Olhei nos seus olhos, confessei que gostava de você de verdade... e nos beijamos.", 
    icon: 'heart',
    image: IMAGES.kiss
  },
  { 
    id: 4, 
    date: "01 Mar 2026", 
    title: "O Início de uma Eternidade", 
    description: "O dia que iniciamos nossa história. Hoje, quero firmar meu compromisso contigo. Você é minha melhor escolha, meu riso fácil e minha paz. Aceita namorar comigo?", 
    icon: 'star',
    image: IMAGES.eternity
  },
  { 
    id: 6, 
    date: "02 Mar 2026", 
    title: "Caminhada e Terço", 
    description: "Nossa primeira caminhada juntos e o nosso primeiro terço. Um momento de oração e conexão que fortaleceu ainda mais o que estamos construindo.", 
    icon: 'heart',
    image: IMAGES.caminhada
  },
];

// Locations approx:
export const MAP_LOCATIONS: MapLocation[] = [
  { id: 5, name: "Retiro JSC", description: "Onde nos vimos pela primeira vez", status: 'visited', coords: { x: 45, y: 80 } }, 
  { id: 3, name: "Igreja Santa Mãe de Deus", description: "Onde tudo começou", status: 'visited', coords: { x: 55, y: 50 } }, 
  { id: 2, name: "Comunidade Shalom", description: "Apresentei minha família santa", status: 'visited', coords: { x: 35, y: 45 } }, 
  { id: 4, name: "Nossa Sra. da Providência", description: "Onde rezamos nosso primeiro terço juntos. Um momento de muita paz e entrega.", image: IMAGES.providencia, status: 'visited', coords: { x: 40, y: 55 } }, 
  { id: 6, name: "Paróquia São José", description: "O início de uma eternidade", status: 'visited', coords: { x: 50, y: 35 } }, 
  { id: 7, name: "Zoológico de Brasília", description: "Passeio especial", status: 'visited', coords: { x: 60, y: 30 } },
  { id: 8, name: "Paróquia N.S. de Fátima", description: "Nossa primeira missão juntos", status: 'visited', coords: { x: 20, y: 50 } }, 
  { id: 9, name: "Basílica", description: "Nossa primeira vigília juntos", image: IMAGES.basilica, status: 'visited', coords: { x: 70, y: 40 } },
];

export const GALLERY_IMAGES: GalleryImage[] = [
  { id: 1, url: IMAGES.videoCall, caption: "A escolha" },
  { id: 2, url: IMAGES.meeting, caption: "Mãos dadas" },
  { id: 5, url: IMAGES.firstDate, caption: "Flor de guardanapo" },
  { id: 3, url: IMAGES.kiss, caption: "Beijo e confissão" },
  { id: 4, url: IMAGES.eternity, caption: "Início da Eternidade" },
  { id: 6, url: IMAGES.providencia, caption: "Nossa Sra. da Providência" },
  { id: 7, url: IMAGES.basilica, caption: "Basílica" },
];

export const WORD_GAME_SECRET = "VIDA";

export const LOVE_PHRASES = [
  "A nossa vida começou quando nos encontramos… e que loucura boa viver isso juntos 💙",
  "Sonhei acordado com vc o dia todo.",
  "Essa coisinha tá muito linda, eu vou beijar ela 😂",
  "Tu ta lascando com meu sono.",
  "Não sei o que foi que tu fez não. Quando eu vi já tava te beijando.",
  "Continuarei sendo a mulher mais feliz e sortuda desse mundo.",
  "Por mais uma vida cheios de dias lindos ao seu lado.",
  "Eu tento dar o meu melhor meu bem, vc merece 💙",
  "Eu quero é ser santo eu!",
  "Fiquei feliz de ouvir sua voz 💙",
  "O amor é azulzinho 💙",
  "Se vc não existisse eu te inventava 💙"
];