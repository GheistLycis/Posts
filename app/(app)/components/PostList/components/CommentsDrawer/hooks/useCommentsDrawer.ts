import { useQuery } from '@tanstack/react-query';
import { fetchApi } from '@utils/fetch/fetch';
import { useIsMobile } from '@utils/useIsMobile/useIsMobile';
import { GetPostRes } from 'app/api/utils/types/post/GetPostRes';
import { useSearchParams } from 'next/navigation';

interface UseCommentsDrawer {
  isMobile: boolean;
  comments: GetPostRes['comments'];
  isLoading: boolean;
}

export const commentsDrawerQuery = 'comments_d';

export const useCommentsDrawer = (): UseCommentsDrawer => {
  const isMobile = useIsMobile();
  const searchParams = useSearchParams();

  const { data, isLoading } = useQuery({
    queryFn: () =>
      fetchApi<GetPostRes>(
        `/api/post/${searchParams.get(commentsDrawerQuery)}`
      ),
    queryKey: ['post', searchParams.get(commentsDrawerQuery)],
    enabled: !!searchParams.get(commentsDrawerQuery),
  });

  const comments = data?.comments ?? [];

  return { isMobile, comments, isLoading };
};
