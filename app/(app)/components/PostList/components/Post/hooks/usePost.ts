import { useSessionContext } from '@contexts/SessionContext/useSessionContext';
import { ListPostRes } from 'app/api/utils/types/post/ListPostRes';
import { useCallback, useMemo } from 'react';

interface UsePostProps {
  confirmationModalRef: unknown;
  editModalRef: unknown;
  onUpdate: () => void;
  post: ListPostRes['results'][number];
}

interface UsePost {
  handleDelete: () => void;
  handleEdit: () => void;
  postAge: string;
  user?: string;
}

const MINUTE = 60 * 1000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const MONTH = 30 * DAY;
const YEAR = 365 * DAY;

export const usePost = ({ post }: UsePostProps): UsePost => {
  const { user } = useSessionContext();

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

  const handleDelete = useCallback(() => {}, []);

  const handleEdit = useCallback(() => {}, []);

  return { handleDelete, handleEdit, user: user?.name, postAge };
};
