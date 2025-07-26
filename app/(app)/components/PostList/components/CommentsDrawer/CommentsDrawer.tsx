'use client';
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  Spinner,
} from '@heroui/react';
import dynamic from 'next/dynamic';
import { Dispatch, FC, SetStateAction } from 'react';
import { FaCommentMedical } from 'react-icons/fa';
import Comment from './components/Comment/Comment';
import { useCommentsDrawer } from './hooks/useCommentsDrawer';

interface CommentsDrawerProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const CommentModal = dynamic(
  () => import('./components/CommentModal/CommentModal')
);

const CommentsDrawer: FC<CommentsDrawerProps> = ({ isOpen, setIsOpen }) => {
  const { commentModalRef, isMobile, post, isLoading, refetch } =
    useCommentsDrawer();

  return (
    <>
      {post && (
        <CommentModal
          ref={commentModalRef}
          postId={post.id}
          onComment={refetch}
        />
      )}

      <Drawer
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        hideCloseButton
        placement={isMobile ? 'bottom' : 'right'}
        size="lg"
      >
        <DrawerContent>
          <DrawerBody className="flex flex-col gap-4 shadow-[inset_0_10px_10px_-10px_rgba(0,0,0,.3),inset_0_-10px_10px_-10px_rgba(0,0,0,.3)]">
            {isLoading ? (
              <Spinner size="lg" />
            ) : post?.comments.length ? (
              post?.comments.map((comment) => (
                <Comment
                  key={comment.id}
                  author={post.username}
                  comment={comment}
                />
              ))
            ) : (
              <p className="text-subtitle self-center italic md:text-lg">
                No comments yet. Be the first!
              </p>
            )}
          </DrawerBody>

          <DrawerFooter>
            <Button
              isDisabled={!post}
              onPress={() => commentModalRef.current?.open()}
              startContent={<FaCommentMedical />}
              size="sm"
              className="bg-primary font-bold text-white md:text-base"
            >
              Leave a comment
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default CommentsDrawer;
