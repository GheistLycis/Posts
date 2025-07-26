import { useSessionContext } from '@contexts/SessionContext/useSessionContext';
import { fetchApi } from '@utils/fetch/fetch';
import { GetPostRes } from 'app/api/utils/types/post/GetPostRes';
import { useCallback, useMemo, useState } from 'react';

interface UsePostProps {
  post: GetPostRes;
}

interface UsePost {
  postAge: string;
  toggleLike: () => void;
  userHasLiked: boolean;
  likes: number;
  user?: string;
}

const MINUTE = 60 * 1000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const MONTH = 30 * DAY;
const YEAR = 365 * DAY;

export const usePost = ({ post }: UsePostProps): UsePost => {
  const { user } = useSessionContext();

  const [likes, setLikes] = useState(post.likes);
  const [userHasLiked, setUserHasLiked] = useState(
    user?.postsLiked.includes(post.id) ?? false
  );

  // TODO: useOptimistic?
  const toggleLike = useCallback(() => {
    const newUserHasLiked = !userHasLiked;

    setLikes((v) => v + (newUserHasLiked ? 1 : -1));
    setUserHasLiked(newUserHasLiked);
    fetchApi<null>(`/api/post/${post.id}/like`, {
      method: 'POST',
      errorToast: 'Sorry, an unexpected error has ocurred',
    }).catch(() => {
      setLikes((v) => v + (!newUserHasLiked ? 1 : -1));
      setUserHasLiked(!newUserHasLiked);
    });
  }, [post, userHasLiked]);

  const postAge = useMemo(() => {
    const age =
      new Date().getTime() - new Date(post.created_datetime).getTime();
    let value: number;
    let unit: string;

    if (age < HOUR) {
      value = Math.floor(age / MINUTE);
      unit = 'minute';
    } else if (age < DAY) {
      value = Math.floor(age / HOUR);
      unit = 'hour';
    } else if (age < MONTH) {
      value = Math.floor(age / DAY);
      unit = 'day';
    } else if (age < YEAR) {
      value = Math.floor(age / MONTH);
      unit = 'month';
    } else {
      value = Math.floor(age / YEAR);
      unit = 'year';
    }

    return `${value} ${unit}${value !== 1 ? 's' : ''} ago`;
  }, [post]);

  return {
    likes,
    userHasLiked,
    toggleLike,
    user: user?.name,
    postAge,
  };
};
