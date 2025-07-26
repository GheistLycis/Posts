import { ConfirmationModalHandle } from '@components/ConfirmationModal/ConfirmationModal';
import { useInfiniteScroll } from '@heroui/use-infinite-scroll';
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchApi } from '@utils/fetch/fetch';
import { ListPostRes } from 'app/api/utils/types/post/ListPostRes';
import { RefObject, useCallback, useEffect, useRef } from 'react';
import { postCreatedEvent } from '../../NewPost/hooks/useNewPost';
import { EditModalHandle } from '../components/EditModal/EditModal';

interface UsePostList {
  confirmationModalRef: RefObject<ConfirmationModalHandle | null>;
  editModalRef: RefObject<EditModalHandle | null>;
  handleDelete: (id: number) => void;
  hasNextPage: boolean;
  isLoading: boolean;
  loaderRef: RefObject<HTMLElement>;
  posts: ListPostRes['results'];
  refetch: () => void;
  scrollerRef: RefObject<HTMLElement>;
}

const PAGE_SIZE = 5;

export const usePostList = (): UsePostList => {
  const confirmationModalRef = useRef<ConfirmationModalHandle>(null);
  const editModalRef = useRef<EditModalHandle>(null);

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

  const handleDelete = useCallback(
    (id: number) => {
      fetchApi<null>(`/api/post/${id}`, {
        method: 'DELETE',
        successToast: 'Post deleted!',
        errorToast: 'Failed to delete post',
      }).then(() => refetch());
    },
    [refetch]
  );

  useEffect(() => {
    const onPostsChange = () => refetch();

    document.addEventListener(postCreatedEvent.type, onPostsChange);

    return () =>
      document.removeEventListener(postCreatedEvent.type, onPostsChange);
  }, [refetch]);

  return {
    confirmationModalRef,
    editModalRef,
    hasNextPage,
    handleDelete,
    isLoading,
    loaderRef,
    posts,
    refetch,
    scrollerRef,
  };
};
