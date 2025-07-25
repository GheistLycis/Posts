'use client';
import { ListPostRes } from 'app/api/utils/types/post/ListPostRes';
import { FC } from 'react';

interface PostProps {
  onUpdate: () => void;
  post: ListPostRes['results'][number];
}

const Post: FC<PostProps> = () => <div>POST</div>;

export default Post;
