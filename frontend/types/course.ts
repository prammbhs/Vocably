export type SkillStatus = 'LOCKED' | 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED';

export interface SkillNodeData {
  id: string;
  title: string;
  description: string;
  status: SkillStatus;
  progress: number; // 0 to 100
  totalLessons: number;
  completedLessons: number;
  iconName?: string;
  positionOffset?: number; // X-offset for winding path (-50 to 50)
}

export interface UnitData {
  id: string;
  unitNumber: number;
  sectionNumber: number;
  title: string;
  description: string;
  bannerColor?: string;
  skills: SkillNodeData[];
}

export interface CourseData {
  id: string;
  title: string;
  language: string;
  flagEmoji: string;
  units: UnitData[];
}
