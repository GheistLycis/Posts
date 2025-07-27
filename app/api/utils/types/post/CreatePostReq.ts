export interface CreatePostReq {
  title: string;
  content: string;
  /** ISO datetime */
  file?: string;
}
