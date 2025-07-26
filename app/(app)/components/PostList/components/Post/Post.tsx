'use client';
import { Tooltip } from '@heroui/react';
import { ListPostRes } from 'app/api/utils/types/post/ListPostRes';
import { FC, RefObject } from 'react';
import { MdDeleteForever } from 'react-icons/md';
import { PiNotePencil } from 'react-icons/pi';
import { EditModalHandle } from '../EditModal/EditModal';
import { usePost } from './hooks/usePost';

interface PostProps {
  onUpdate: () => void;
  confirmationComponentRef: unknown;
  editComponentRef: RefObject<EditModalHandle | null>;
  post: ListPostRes['results'][number];
}

const Post: FC<PostProps> = ({
  onUpdate,
  confirmationComponentRef,
  editComponentRef,
  post,
}) => {
  const { handleDelete, postAge, user } = usePost({
    confirmationComponentRef,
    onUpdate,
    post,
  });

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
                onClick={handleDelete}
                className="cursor-pointer duration-200 hover:opacity-50"
              />
            </Tooltip>

            <Tooltip content="Edit post">
              <PiNotePencil
                size={28}
                onClick={() => editComponentRef.current?.open(post.id)}
                className="cursor-pointer duration-200 hover:opacity-50"
              />
            </Tooltip>
          </div>
        )}
      </div>

      {/* TODO: toggle-collapse + motion */}
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
