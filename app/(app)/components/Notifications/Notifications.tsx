'use client';
import { Badge, Popover, PopoverContent, PopoverTrigger } from '@heroui/react';
import { FC } from 'react';
import { MdNotifications } from 'react-icons/md';
import { useNotifications } from './hooks/useNotifications';

const Notifications: FC = () => {
  const { isMobile, handleOpenChange, notifications, unseenNotifications } =
    useNotifications();

  return (
    <Popover
      onOpenChange={handleOpenChange}
      showArrow
      placement={isMobile ? 'bottom-end' : 'left-start'}
    >
      {unseenNotifications.size ? (
        <Badge
          content={
            unseenNotifications.size < 100 ? unseenNotifications.size : '99+'
          }
          variant="faded"
          color="danger"
        >
          <PopoverTrigger>
            <MdNotifications
              size={24}
              className="cursor-pointer duration-200 outline-none hover:opacity-50"
            />
          </PopoverTrigger>
        </Badge>
      ) : (
        <PopoverTrigger>
          <MdNotifications
            size={24}
            className="cursor-pointer duration-200 outline-none hover:opacity-50"
          />
        </PopoverTrigger>
      )}

      <PopoverContent className="flex min-h-10 max-w-[300px] min-w-[300px] flex-col gap-4 md:max-w-[500px]">
        {!notifications.length && (
          <p className="text-subtitle italic">Your mail box is empty. Good!</p>
        )}

        {notifications.map(({ title, message, created_at }) => (
          <div
            key={created_at}
            className={`bg-gray/10 flex flex-col gap-1 rounded-lg border-0 px-2 py-1 ${unseenNotifications.has(created_at) ? 'opacity-80' : ''}`}
          >
            <div className="flex items-center justify-between gap-2">
              <p className="max-w-[30ch] truncate font-medium">{title}</p>

              <p className="text-subtitle text-nowrap">
                {new Date(created_at).toLocaleString().split(',')[0]}
              </p>
            </div>

            <p>{message}</p>
          </div>
        ))}
      </PopoverContent>
    </Popover>
  );
};

export default Notifications;
