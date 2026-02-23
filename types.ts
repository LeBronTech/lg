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
  description?: string;
  status: 'visited' | 'dream';
  coords: { x: number; y: number }; // Percentage for abstract map
}

export interface GalleryImage {
  id: number;
  url: string;
  caption: string;
}