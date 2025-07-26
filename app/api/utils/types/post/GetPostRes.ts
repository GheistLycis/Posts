export interface GetPostRes {
  id: number;
  username: string;
  /** ISO datetime */
  created_datetime: string;
  title: string;
  content: string;
}
