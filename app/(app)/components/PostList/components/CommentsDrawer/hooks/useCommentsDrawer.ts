import { useQuery } from '@tanstack/react-query';
import { fetchApi } from '@utils/fetch/fetch';
import { useIsMobile } from '@utils/useIsMobile/useIsMobile';
import { GetPostRes } from 'app/api/utils/types/post/GetPostRes';
import { useSearchParams } from 'next/navigation';
import { RefObject, useRef } from 'react';
import { CommentModalHandle } from '../components/CommentModal/CommentModal';

interface UseCommentsDrawer {
  commentModalRef: RefObject<CommentModalHandle | null>;
  isMobile: boolean;
  post?: GetPostRes;
  isLoading: boolean;
  refetch: () => void;
}

export const commentsDrawerQuery = 'comments_d';

export const useCommentsDrawer = (): UseCommentsDrawer => {
  const isMobile = useIsMobile();
  const searchParams = useSearchParams();
  const commentModalRef = useRef<CommentModalHandle>(null);

  const { data, isLoading, refetch } = useQuery({
    queryFn: () =>
      fetchApi<GetPostRes>(
        `/api/post/${searchParams.get(commentsDrawerQuery)}`
      ),
    queryKey: ['post', searchParams.get(commentsDrawerQuery)],
    enabled: !!searchParams.get(commentsDrawerQuery),
  });

  return { commentModalRef, isMobile, post: data, isLoading, refetch };
};
