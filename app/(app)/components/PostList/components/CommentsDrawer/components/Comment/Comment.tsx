'use client';
import { GetPostRes } from 'app/api/utils/types/post/GetPostRes';
import { FC } from 'react';
import { useComment } from './hooks/useComment';

interface CommentProps {
  author: string;
  comment: GetPostRes['comments'][number];
}

const Comment: FC<CommentProps> = ({ author, comment }) => {
  const { commentWithMentions } = useComment({ content: comment.content });

  return (
    <div className="border-gray rounded-2xl border p-4">
      <p className="text-subtitle max-w-full truncate">
        @{comment.username + (author === comment.username ? ' (author)' : '')}
      </p>

      <div className="break-words whitespace-pre-wrap">
        {commentWithMentions}
      </div>
    </div>
  );
};

export default Comment;
