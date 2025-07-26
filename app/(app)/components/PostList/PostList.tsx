'use client';
import ConfirmationModal from '@components/ConfirmationModal/ConfirmationModal';
import { Spinner } from '@heroui/react';
import { FC, RefObject } from 'react';
import CommentsDrawer from './components/CommentsDrawer/CommentsDrawer';
import EditModal from './components/EditModal/EditModal';
import Post from './components/Post/Post';
import { usePostList } from './hooks/usePostList';

const PostList: FC = () => {
  const {
    isCommentsDrawerOpen,
    setIsCommentsDrawerOpen,
    confirmationModalRef,
    editModalRef,
    hasNextPage,
    handleDelete,
    isLoading,
    loaderRef,
    posts,
    refetch,
    scrollerRef,
    handleViewComments,
  } = usePostList();

  return (
    <>
      <EditModal ref={editModalRef} onEdit={refetch} />

      <ConfirmationModal
        ref={confirmationModalRef}
        onConfirm={handleDelete as never}
      />

      <CommentsDrawer
        isOpen={isCommentsDrawerOpen}
        setIsOpen={setIsCommentsDrawerOpen}
      />

      <div className="flex flex-col gap-2">
        {!posts.length && !isLoading && (
          <p className="text-subtitle self-center text-lg italic">
            No posts to list here
          </p>
        )}

        <div
          ref={scrollerRef as RefObject<HTMLDivElement>}
          className="flex h-[1000px] flex-col gap-4 overflow-y-auto shadow-[inset_0_10px_10px_-10px_rgba(0,0,0,.3),inset_0_-10px_10px_-10px_rgba(0,0,0,.3)]"
        >
          {posts.map((post) => (
            <Post
              key={post.id}
              post={post}
              onDelete={() => confirmationModalRef.current?.open(post.id)}
              onEdit={() => editModalRef.current?.open(post.id)}
              onViewComments={() => handleViewComments(post.id)}
            />
          ))}

          {hasNextPage && <Spinner ref={loaderRef} size="lg" />}
        </div>
      </div>
    </>
  );
};

export default PostList;
