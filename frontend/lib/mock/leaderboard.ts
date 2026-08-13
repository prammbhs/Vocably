import { LeaderboardEntry } from '@/types/user';

export const mockLeaderboard: LeaderboardEntry[] = [
  {
    rank: 1,
    id: 'user_lb_1',
    name: 'Sarah Connor',
    username: 'sarah_c',
    avatarUrl: 'https://api.dicebear.com/7.x/bottts/svg?seed=Sarah',
    xp: 680,
  },
  {
    rank: 2,
    id: 'user_lb_2',
    name: 'Alex Rivera',
    username: 'arivera',
    avatarUrl: 'https://api.dicebear.com/7.x/bottts/svg?seed=Alex',
    xp: 590,
  },
  {
    rank: 3,
    id: 'user_lb_3',
    name: 'Elena Rostova',
    username: 'elena_r',
    avatarUrl: 'https://api.dicebear.com/7.x/bottts/svg?seed=Elena',
    xp: 520,
  },
  {
    rank: 4,
    id: 'user_1',
    name: 'Paramjit Patel',
    username: 'paramjit',
    avatarUrl: 'https://api.dicebear.com/7.x/bottts/svg?seed=VocablyLearner',
    xp: 450,
    isCurrentUser: true,
  },
  {
    rank: 5,
    id: 'user_lb_5',
    name: 'Kenji Sato',
    username: 'kenjis',
    avatarUrl: 'https://api.dicebear.com/7.x/bottts/svg?seed=Kenji',
    xp: 410,
  },
  {
    rank: 6,
    id: 'user_lb_6',
    name: 'Chloe Bennett',
    username: 'chloe_b',
    avatarUrl: 'https://api.dicebear.com/7.x/bottts/svg?seed=Chloe',
    xp: 380,
  },
];
