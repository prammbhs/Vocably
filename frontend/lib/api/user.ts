import { UserProfile } from '@/types/user';
import { mockUser } from '@/lib/mock/user';
import { fetchApi } from './client';

export async function getUserProfile(): Promise<UserProfile> {
  const data = await fetchApi<UserProfile>('/user/profile');
  if (data && data.name && data.streak !== undefined) {
    return data;
  }
  return mockUser;
}
