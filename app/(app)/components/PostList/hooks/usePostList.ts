import { useInfiniteScroll } from '@heroui/use-infinite-scroll';
import { useQuery } from '@tanstack/react-query';
import { fetchApi } from '@utils/fetch/fetch';
import { ListPostRes } from 'app/api/utils/types/post/ListPostRes';
import { RefObject, useCallback, useEffect, useMemo, useState } from 'react';
import { postCreatedEvent } from '../../NewPost/hooks/useNewPost';

interface UsePostList {
  hasMore: boolean;
  isLoading: boolean;
  loaderRef: RefObject<HTMLElement>;
  posts: ListPostRes['results'];
  refreshList: () => void;
  scrollerRef: RefObject<HTMLElement>;
}

const PAGE_SIZE = 5;

export const usePostList = (): UsePostList => {
  const [page, setPage] = useState(0);
  const { data, refetch, isLoading } = useQuery({
    queryFn: () => fetchApi<ListPostRes>('/api/post'),
    queryKey: ['posts'],
  });

  const posts = useMemo(
    () => data?.results.slice(0, (page + 1) * PAGE_SIZE) ?? [],
    [data, page]
  );

  const hasMore = useMemo(
    () => posts.length < (data?.results.length ?? 0),
    [posts, data]
  );

  const [loaderRef, scrollerRef] = useInfiniteScroll({
    hasMore,
    onLoadMore: () => setTimeout(() => setPage(page + 1), 500), // * mocking API delay
  });

  const refreshList = useCallback(() => {
    setPage(0);
    refetch();
  }, [setPage, refetch]);

  useEffect(() => {
    const onPostCreated = () => refreshList();

    document.addEventListener(postCreatedEvent.type, onPostCreated);

    return () =>
      document.removeEventListener(postCreatedEvent.type, onPostCreated);
  }, [refreshList]);

  return { hasMore, isLoading, loaderRef, posts, refreshList, scrollerRef };
};
