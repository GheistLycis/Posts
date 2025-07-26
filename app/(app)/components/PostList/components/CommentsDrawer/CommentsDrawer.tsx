'use client';
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  Spinner,
} from '@heroui/react';
import { Dispatch, FC, SetStateAction } from 'react';
import { FaCommentMedical } from 'react-icons/fa';
import Comment from './Comment/Comment';
import { useCommentsDrawer } from './hooks/useCommentsDrawer';

interface CommentsDrawerProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const CommentsDrawer: FC<CommentsDrawerProps> = ({ isOpen, setIsOpen }) => {
  const { isMobile, comments, isLoading } = useCommentsDrawer();

  return (
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
          ) : comments.length ? (
            comments.map((comment) => (
              <Comment key={comment.id} comment={comment} />
            ))
          ) : (
            <p className="text-subtitle self-center italic md:text-lg">
              No comments yet. Be the first!
            </p>
          )}
        </DrawerBody>

        <DrawerFooter>
          <Button
            onPress={() => {}}
            startContent={<FaCommentMedical />}
            size="sm"
            className="bg-primary font-bold text-white md:text-base"
          >
            Leave a comment
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default CommentsDrawer;
