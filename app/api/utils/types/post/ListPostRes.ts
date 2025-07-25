export interface ListPostRes {
  count: number;
  next: null;
  previous: null;
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
