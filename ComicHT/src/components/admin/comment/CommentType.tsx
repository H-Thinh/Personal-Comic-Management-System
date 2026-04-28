export interface Comments {
  id: number;
  comic: { id: number; title: string };
  user: { id: number; name: string };
  content: string;
  status: "active" | "inactive";
  createdAt: string;
}
