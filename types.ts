export interface StorySlide {
  id: number;
  type: 'intro' | 'stats' | 'photo' | 'music' | 'text';
  content: string;
  subContent?: string;
  image?: string;
  duration: number; // in seconds
  bgColor: string;
  link?: string;
  linkText?: string;
}

export interface TimelineEvent {
  id: number;
  date: string;
  title: string;
  description: string;
  icon: 'heart' | 'map' | 'star' | 'camera' | 'phone' | 'users';
  image?: string;
}

export interface MapLocation {
  id: number;
  name: string;
  status: 'visited' | 'dream';
  coords: { x: number; y: number }; // Percentage for abstract map
}

export interface GalleryImage {
  id: number;
  url: string;
  caption: string;
}