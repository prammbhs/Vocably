import { CourseData } from '@/types/course';
import { mockCourse } from '@/lib/mock/course';
import { fetchApi } from './client';

export async function getLearningPath(): Promise<CourseData> {
  const data = await fetchApi<CourseData>('/course/path');
  if (data && Array.isArray(data.units)) {
    return data;
  }
  return mockCourse;
}
