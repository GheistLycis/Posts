'use client';
import { Tooltip } from '@heroui/react';
import { GetPostRes } from 'app/api/utils/types/post/GetPostRes';
import { FC } from 'react';
import { AiOutlineLike } from 'react-icons/ai';
import { FaRegComments } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';
import { PiNotePencil } from 'react-icons/pi';
import styles from './Post.module.css';
import { usePost } from './hooks/usePost';

interface PostProps {
  post: GetPostRes;
  onDelete: () => void;
  onEdit: () => void;
  onViewComments: () => void;
}

const Post: FC<PostProps> = ({ post, onDelete, onEdit, onViewComments }) => {
  const { postAge, userHasLiked, likes, toggleLike, user } = usePost({ post });

  return (
    <div className="border-gray flex w-full max-w-[752px] flex-col gap-2 rounded-2xl border">
      <div className="bg-primary flex justify-between rounded-t-2xl border-0 p-4 text-white">
        <Tooltip content={post.title}>
          <p className="max-w-3/4 truncate font-bold md:text-[22px]">
            {post.title}
          </p>
        </Tooltip>

        <div className="flex items-center gap-3 md:gap-5">
          {user === post.username && (
            <>
              <Tooltip content="Delete post">
                <MdDeleteForever
                  size={28}
                  onClick={onDelete}
                  className="cursor-pointer duration-200 outline-none hover:opacity-50"
                />
              </Tooltip>

              <Tooltip content="Edit post">
                <PiNotePencil
                  size={28}
                  onClick={onEdit}
                  className="cursor-pointer duration-200 outline-none hover:opacity-50"
                />
              </Tooltip>
            </>
          )}
        </div>
      </div>

      <div className="p-4">
        <div className="text-subtitle mb-2 flex justify-between gap-2 md:text-[18px]">
          <p className="max-w-[40ch] truncate">
            @{post.username + (user === post.username ? ' (you)' : '')}
          </p>

          <div className="flex items-center gap-2 md:gap-3">
            <div
              onClick={onViewComments}
              className="hover:text-primary flex cursor-pointer items-center gap-1 duration-200"
            >
              {post.comments.length}

              <FaRegComments />
            </div>

            <div
              onClick={toggleLike}
              className={`flex cursor-pointer items-center gap-1 ${userHasLiked ? `${styles.animate} text-primary` : 'hover:text-primary duration-200'}`}
            >
              {likes}

              <AiOutlineLike />
            </div>

            <p className="text-nowrap">{postAge}</p>
          </div>
        </div>

        <div className="break-words whitespace-pre-wrap">{post.content}</div>
      </div>
    </div>
  );
};

export default Post;
