export type EventCardType = {
  id: string;
  title: string;
  date: string;
  place: string;
  badge?: string;
  image: { uri: string };
  colors: string[];
};

export const eventsData: EventCardType[] = [
  {
    id: '1',
    title: 'Match de Basketball',
    date: "Aujourd'hui, 19h00",
    place: 'Palais des Sports',
    image: {
      uri: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=1200&h=800&fit=crop',
    },
    colors: ['#1a1a2e', '#0f3460'],
  },
  {
    id: '2',
    title: 'Entraînement Football',
    date: 'Demain, 18h00',
    place: 'Stade Municipal',
    badge: 'Inscrit',
    image: {
      uri: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=1200&h=800&fit=crop',
    },
    colors: ['#1b4332', '#2d6a4f'],
  },
  {
    id: '3',
    title: 'Championnat Handball',
    date: 'Mer, 20h30',
    place: 'Complexe Sportif',
    image: {
      uri: 'https://images.unsplash.com/photo-1551958219-acbc608c6377?w=1200&h=800&fit=crop',
    },
    colors: ['#1e3a5f', '#2a5a8a'],
  },
  {
    id: '4',
    title: 'Tournoi de Tennis',
    date: 'Jeu, 14h00',
    place: 'Tennis Club',
    badge: 'Capitaine',
    image: {
      uri: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=1200&h=800&fit=crop',
    },
    colors: ['#1a472a', '#2c6b3f'],
  },
  {
    id: '5',
    title: 'Match de Rugby',
    date: 'Ven, 20h00',
    place: 'Stade Central',
    badge: 'En jeu',
    image: {
      uri: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=1200&h=800&fit=crop',
    },
    colors: ['#1b3a2f', '#2e5c4a'],
  },
  {
    id: '6',
    title: 'Session de Volleyball',
    date: 'Sam, 17h00',
    place: 'Gymnase Olympique',
    image: {
      uri: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=1200&h=800&fit=crop',
    },
    colors: ['#2b1d4e', '#4a3572'],
  },
  {
    id: '7',
    title: 'Course Athlétisme',
    date: 'Dim, 10h00',
    place: 'Piste Nationale',
    image: {
      uri: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=1200&h=800&fit=crop',
    },
    colors: ['#1a1f3a', '#2d3561'],
  },
  {
    id: '8',
    title: 'Combat de Boxe',
    date: 'Lun, 19h30',
    place: 'Club de Boxe',
    badge: 'Inscrit',
    image: {
      uri: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=1200&h=800&fit=crop',
    },
    colors: ['#2b0d0d', '#4a1616'],
  },
  {
    id: '9',
    title: 'Entraînement Natation',
    date: 'Mar, 18h30',
    place: 'Piscine Olympique',
    image: {
      uri: 'https://images.unsplash.com/photo-1519315901367-f34ff9154487?w=1200&h=800&fit=crop',
    },
    colors: ['#0d1f2d', '#1a3a4f'],
  },
  {
    id: '10',
    title: 'Match de Badminton',
    date: 'Mer, 19h00',
    place: 'Centre Sportif',
    badge: 'Capitaine',
    image: {
      uri: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=1200&h=800&fit=crop',
    },
    colors: ['#1d2d1a', '#354d2f'],
  },
];