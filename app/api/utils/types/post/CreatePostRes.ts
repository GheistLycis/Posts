export interface CreatePostRes {
  id: number;
  username: string;
  title: string;
  content: string;
  author_ip: string;
  /** ISO datetime */
  created_datetime: string;
}
