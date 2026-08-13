import { LeaderboardEntry } from '@/types/user';
import { mockLeaderboard } from '@/lib/mock/leaderboard';
import { fetchApi } from './client';

export async function getLeaderboard(): Promise<LeaderboardEntry[]> {
  const data = await fetchApi<LeaderboardEntry[]>('/leaderboard');
  if (Array.isArray(data)) {
    return data;
  }
  return mockLeaderboard;
}
