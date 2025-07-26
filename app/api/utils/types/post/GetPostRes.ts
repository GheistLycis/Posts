export interface GetPostRes {
  id: number;
  username: string;
  /** ISO datetime */
  created_datetime: string;
  title: string;
  content: string;
  likes: number;
  comments: { id: number; content: string; username: string }[];
}
