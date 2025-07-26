import { GetPostRes } from './GetPostRes';

export interface ListPostRes {
  count: number;
  next: string | null;
  previous: string | null;
  results: GetPostRes[];
}
