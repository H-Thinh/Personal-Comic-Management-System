export interface CommentType {
  id: number;
  content: string;
  nameUser: string;
  chapter: number | null;
  parentId: number | null;
  status: string;
  createdAt: string;
  updatedAt: string;
  replies: CommentType[];
}
