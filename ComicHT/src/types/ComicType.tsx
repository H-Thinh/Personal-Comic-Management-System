export interface ComicType {
  id: number;
  slug: string;
  title: string;
  content: string;
  chapters: { id: number; title: string; createdAt: string; order: number }[];
  author: {
    id: number;
    name: string;
  };
  coverImage: string;
  views: number;
  genres: {
    id: number;
    name: string;
  }[];
  rates: {
    id: number;
    rating: number;
    status: "active" | "inactive";
  }[];
}
