export type ContentStatus = 'Draft' | 'In Review' | 'Approved' | 'Rejected';

export interface ContentItem {
  id: number;
  title: string;
  category: string;
  author: string;
  updatedAt: string;
  status: ContentStatus;
  summary: string;
  body: string;
}
