import { renderMentions } from '@utils/renderMentions/renderMentions';
import { JSX, useMemo } from 'react';

interface UseCommentProps {
  content: string;
}

interface UseComment {
  commentWithMentions: JSX.Element[];
}

export const useComment = ({ content }: UseCommentProps): UseComment => {
  const commentWithMentions = useMemo(() => renderMentions(content), [content]);

  return { commentWithMentions };
};
