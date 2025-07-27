'use client';
import { Badge, Popover, PopoverContent, PopoverTrigger } from '@heroui/react';
import { FC } from 'react';
import { MdNotifications } from 'react-icons/md';
import { useNotifications } from './hooks/useNotifications';

const Notifications: FC = () => {
  const { notifications } = useNotifications();

  return notifications.length ? (
    <Popover showArrow placement="left-start">
      <Badge
        content={notifications.length < 100 ? notifications.length : '99+'}
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

      <PopoverContent className="flex flex-col gap-4">
        {notifications.map(({ title, message, created_at }) => (
          <div
            key={created_at}
            className="bg-gray/10 flex flex-col gap-1 rounded-lg border-0 px-2 py-1"
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
  ) : (
    <MdNotifications size={24} />
  );
};

export default Notifications;
