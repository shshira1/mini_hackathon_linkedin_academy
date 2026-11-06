import { Badge, SavedItem } from '../types';

export const INITIAL_SAVED_ITEMS: SavedItem[] = [
  {
    id: 'saved-1',
    lessonId: 'headline',
    category: 'headline',
    title: 'LinkedIn Profile Headline',
    content:
      'Sophomore Business Administration & Communications Major | Digital Marketing & Analytics | Seeking Summer 2027 Internships',
    improvedContent:
      'Sophomore Business & Communications Major | Digital Strategy, Content Marketing & Analytics | Seeking Summer 2027 Internships',
    score: 9,
    createdAt: 'Yesterday',
  },
  {
    id: 'saved-2',
    lessonId: 'about',
    category: 'about',
    title: 'LinkedIn About Summary',
    content:
      'I am an undergraduate student passionate about bridging creative communication and data analytics. On campus, I organize student leadership summits and manage digital outreach for 1,200+ attendees. Always excited to connect with alumni and fellow student leaders!',
    improvedContent:
      'I am an undergraduate student passionate about bridging creative strategy and data-driven problem solving. On campus, I coordinate student leadership workshops and manage digital campaigns reaching 1,200+ attendees across student organizations.\n\nAlways excited to connect with alumni, mentors, and fellow student leaders: alex@university.edu',
    score: 9,
    createdAt: 'Today',
  },
];

export const ALL_BADGES: Badge[] = [
  {
    id: 'badge-headline',
    name: 'Headline Hero',
    description: 'Crafted a high-converting keyword-optimized headline',
    icon: 'Sparkles',
    earned: true,
    unlockedAt: 'Day 3',
  },
  {
    id: 'badge-about',
    name: 'Storyteller',
    description: 'Hooked readers with a 3-part personal About narrative',
    icon: 'BookOpen',
    earned: true,
    unlockedAt: 'Day 4',
  },
  {
    id: 'badge-alum',
    name: 'Network Alum',
    description: 'Sent a high-response personalized alumni connection note',
    icon: 'Send',
    earned: false,
  },
  {
    id: 'badge-fair',
    name: 'Fair Closer',
    description: 'Followed up with a recruiter within 24 hours of meeting',
    icon: 'Clock',
    earned: false,
  },
  {
    id: 'badge-comment',
    name: 'Value Creator',
    description: 'Left a high-ROI comment that generated professional engagement',
    icon: 'MessageSquare',
    earned: false,
  },
  {
    id: 'badge-project',
    name: 'Product Builder',
    description: 'Transformed class coursework into a tangible product showcase',
    icon: 'Award',
    earned: false,
  },
  {
    id: 'badge-streak',
    name: 'On Fire (4+ Days)',
    description: 'Practiced professional skills 4 consecutive days in a row',
    icon: 'Flame',
    earned: true,
    unlockedAt: 'Day 4',
  },
  {
    id: 'badge-perfect',
    name: 'AI Distinction',
    description: 'Received a 9 or 10 evaluation score from Gemini AI',
    icon: 'CheckCircle2',
    earned: true,
    unlockedAt: 'Today',
  },
];
