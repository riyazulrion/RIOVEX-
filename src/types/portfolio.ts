export type MediaType = 'image' | 'video';

export interface WorkItem {
  id: string;
  num: string;
  title: string;
  category: string;
  tag: string;
  description: string;
  defaultImage: string;
  customMediaUrl?: string;
  aspectRatio?: string;
}

export interface SkillRow {
  num: string;
  title: string;
}

export interface ToastMessage {
  id: string;
  message: string;
  type?: 'success' | 'info';
}
