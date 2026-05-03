export interface Streak {
  current: number;
  goal: number;
  flameActive: boolean;
}

export interface User {
  id: string;
  displayName: string;
  initial: string;
  avatarUrl?: string;
  plan: 'free' | 'pro';
  streak: Streak;
}
