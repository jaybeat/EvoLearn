import type { User } from '@/types/user';

export const seedUser: User = {
  id: 'user-local',
  displayName: '林同学',
  initial: '林',
  plan: 'free',
  streak: { current: 1, goal: 40, flameActive: true },
};
