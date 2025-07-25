'use client';
import { Spinner } from '@heroui/react';
import { FC, RefObject } from 'react';
import Post from './components/Post/Post';
import { usePostList } from './hooks/usePostList';

const PostList: FC = () => {
  const { hasMore, isLoading, loaderRef, posts, refreshList, scrollerRef } =
    usePostList();

  return (
    <div
      ref={scrollerRef as RefObject<HTMLDivElement>}
      className="flex flex-col gap-2"
    >
      {!posts.length && !isLoading && (
        <p className="text-subtitle self-center text-lg italic">
          No posts to list here
        </p>
      )}

      {posts.map((post) => (
        <Post key={post.id} onUpdate={refreshList} post={post} />
      ))}

      {(isLoading || hasMore) && <Spinner ref={loaderRef} size="lg" />}
    </div>
  );
};

export default PostList;
