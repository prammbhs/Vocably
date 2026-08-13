export interface UserProfile {
  id: string;
  name: string;
  username: string;
  avatarUrl: string;
  joinedDate: string;
  streak: number;
  xp: number;
  gems: number;
  hearts: number;
  maxHearts: number;
  dailyXpGoal: number;
  dailyXpEarned: number;
  league: string;
  rank: number;
  lessonsCompleted: number;
}

export interface LeaderboardEntry {
  rank: number;
  id: string;
  name: string;
  username: string;
  avatarUrl: string;
  xp: number;
  isCurrentUser?: boolean;
}
