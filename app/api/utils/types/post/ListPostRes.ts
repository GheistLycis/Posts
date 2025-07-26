export interface ListPostRes {
  count: number;
  next: string | null;
  previous: string | null;
  results: Post[];
}

interface Post {
  id: number;
  username: string;
  /** ISO datetime */
  created_datetime: string;
  title: string;
  content: string;
}
