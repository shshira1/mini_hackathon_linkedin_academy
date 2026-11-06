export interface LessonTip {
  title: string;
  summary: string;
  proTip: string;
  badgeText?: string;
  visualMockup?: {
    type: 'headline' | 'about' | 'connection' | 'comment' | 'project' | 'followup';
    title: string;
    body: string;
    author?: string;
  };
}

export interface QuizOption {
  id: string;
  text: string;
}

export interface LessonQuiz {
  question: string;
  options: QuizOption[];
  correctOptionId: string;
  explanation: string;
}

export interface LessonPractice {
  prompt: string;
  contextHint: string;
  placeholder: string;
  starterSuggestions: string[];
  category: 'headline' | 'about' | 'connection' | 'comment' | 'project' | 'followup';
  defaultInput?: string;
}

export interface Lesson {
  id: string;
  unitId: number;
  unitTitle: string;
  unitSubtitle: string;
  unitColor: string; // e.g. blue, indigo, violet
  title: string;
  shortTitle: string;
  duration: string;
  xpReward: number;
  icon: string;
  tip: LessonTip;
  quiz: LessonQuiz;
  practice: LessonPractice;
}

export interface SavedItem {
  id: string;
  lessonId: string;
  category: 'headline' | 'about' | 'connection' | 'comment' | 'project' | 'followup';
  title: string;
  content: string;
  improvedContent: string;
  score: number;
  createdAt: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earned: boolean;
  unlockedAt?: string;
}
