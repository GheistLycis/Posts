import { useInfiniteScroll } from '@heroui/use-infinite-scroll';
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchApi } from '@utils/fetch/fetch';
import { ListPostRes } from 'app/api/utils/types/post/ListPostRes';
import { RefObject, useEffect } from 'react';
import { postCreatedEvent } from '../../NewPost/hooks/useNewPost';

interface UsePostList {
  hasNextPage: boolean;
  isLoading: boolean;
  loaderRef: RefObject<HTMLElement>;
  posts: ListPostRes['results'];
  refetch: () => void;
  scrollerRef: RefObject<HTMLElement>;
}

const PAGE_SIZE = 5;

export const usePostList = (): UsePostList => {
  const { data, hasNextPage, isLoading, fetchNextPage, refetch } =
    useInfiniteQuery({
      queryFn: ({ pageParam }) =>
        fetchApi<ListPostRes>(
          `/api/post?limit=${PAGE_SIZE}&offset=${pageParam}`
        ),
      queryKey: ['posts'],
      initialPageParam: 0,
      getNextPageParam: ({ next }) => {
        const offSet = next?.match(/[?&]offset=(\d+)/);

        return offSet ? +offSet[1] : undefined;
      },
    });

  const posts = data?.pages.flatMap(({ results }) => results) ?? [];

  const [loaderRef, scrollerRef] = useInfiniteScroll({
    hasMore: hasNextPage,
    onLoadMore: fetchNextPage,
  });

  useEffect(() => {
    const onPostCreated = () => refetch();

    document.addEventListener(postCreatedEvent.type, onPostCreated);

    return () =>
      document.removeEventListener(postCreatedEvent.type, onPostCreated);
  }, [refetch]);

  return { hasNextPage, isLoading, loaderRef, posts, refetch, scrollerRef };
};
