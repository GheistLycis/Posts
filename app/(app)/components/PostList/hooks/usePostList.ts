import { ConfirmationModalHandle } from '@components/ConfirmationModal/ConfirmationModal';
import { useInfiniteScroll } from '@heroui/use-infinite-scroll';
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchApi } from '@utils/fetch/fetch';
import { ListPostRes } from 'app/api/utils/types/post/ListPostRes';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {
  Dispatch,
  RefObject,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { postCreatedEvent } from '../../NewPost/hooks/useNewPost';
import { commentsDrawerQuery } from '../components/CommentsDrawer/hooks/useCommentsDrawer';
import { EditModalHandle } from '../components/EditModal/EditModal';

interface UsePostList {
  isCommentsDrawerOpen: boolean;
  setIsCommentsDrawerOpen: Dispatch<SetStateAction<boolean>>;
  confirmationModalRef: RefObject<ConfirmationModalHandle | null>;
  editModalRef: RefObject<EditModalHandle | null>;
  handleDelete: (id: number) => void;
  hasNextPage: boolean;
  isLoading: boolean;
  loaderRef: RefObject<HTMLElement>;
  posts: ListPostRes['results'];
  refetch: () => void;
  scrollerRef: RefObject<HTMLElement>;
  handleViewComments: (id: number) => void;
}

const PAGE_SIZE = 5;

export const usePostList = (): UsePostList => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const confirmationModalRef = useRef<ConfirmationModalHandle>(null);
  const editModalRef = useRef<EditModalHandle>(null);

  const [isCommentsDrawerOpen, setIsCommentsDrawerOpen] = useState(
    searchParams.has(commentsDrawerQuery)
  );

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

  const handleViewComments = useCallback(
    (id: number) => {
      const updatedURLParams = new URLSearchParams(searchParams);

      updatedURLParams.set(commentsDrawerQuery, id.toString());
      router.push(`${pathname}?${updatedURLParams}`, { scroll: false });
    },
    [searchParams, router, pathname]
  );

  useEffect(() => {
    const onPostsChange = () => refetch();

    document.addEventListener(postCreatedEvent.type, onPostsChange);

    return () =>
      document.removeEventListener(postCreatedEvent.type, onPostsChange);
  }, [refetch]);

  // * making state shareable by link
  useEffect(() => {
    setIsCommentsDrawerOpen(searchParams.has(commentsDrawerQuery));
  }, [searchParams.has(commentsDrawerQuery)]);

  useEffect(() => {
    if (!isCommentsDrawerOpen) {
      const updatedURLParams = new URLSearchParams(searchParams);

      updatedURLParams.delete(commentsDrawerQuery);
      router.push(`${pathname}?${updatedURLParams}`);
    }
  }, [isCommentsDrawerOpen]);

  return {
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
  };
};
