export interface Rates {
  id: number;
  comic: { id: number; title: string };
  user: { id: number; name: string };
  rating: number;
  status: "active" | "inactive";
}
