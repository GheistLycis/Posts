'use client';
import { Tooltip } from '@heroui/react';
import { ListPostRes } from 'app/api/utils/types/post/ListPostRes';
import { FC } from 'react';
import { MdDeleteForever } from 'react-icons/md';
import { PiNotePencil } from 'react-icons/pi';
import { usePost } from './hooks/usePost';

interface PostProps {
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
  post: ListPostRes['results'][number];
}

const Post: FC<PostProps> = ({ onDelete, onEdit, post }) => {
  const { postAge, user } = usePost({ post });

  return (
    <div className="border-gray flex w-full max-w-[752px] flex-col gap-2 rounded-2xl border">
      <div className="bg-primary flex justify-between rounded-t-2xl border-0 p-4 text-white">
        <Tooltip content={post.title}>
          <p className="max-w-3/4 truncate font-bold md:text-[22px]">
            {post.title}
          </p>
        </Tooltip>

        {user === post.username && (
          <div className="flex items-center gap-4 md:gap-6">
            <Tooltip content="Delete post">
              <MdDeleteForever
                size={28}
                onClick={() => onDelete(post.id)}
                className="cursor-pointer duration-200 outline-none hover:opacity-50"
              />
            </Tooltip>

            <Tooltip content="Edit post">
              <PiNotePencil
                size={28}
                onClick={() => onEdit(post.id)}
                className="cursor-pointer duration-200 outline-none hover:opacity-50"
              />
            </Tooltip>
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="text-subtitle mb-2 flex justify-between gap-2 md:text-[18px]">
          <p className="max-w-[40ch] truncate">@{post.username}</p>

          <p className="text-nowrap">{postAge}</p>
        </div>

        <div>{post.content}</div>
      </div>
    </div>
  );
};

export default Post;
