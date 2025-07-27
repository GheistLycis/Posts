import { useIsMobile } from '@utils/useIsMobile/useIsMobile';
import { Notification } from 'app/api/utils/types/notification/Notification';
import { useCallback, useEffect, useState } from 'react';

interface UseNotifications {
  notifications: Notification[];
  unseenNotifications: Set<string>;
  handleOpenChange: (isOpen: boolean) => void;
  isMobile: boolean;
}

export const useNotifications = (): UseNotifications => {
  const isMobile = useIsMobile();
  const [userHasInteracted, setUserHasInteracted] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unseenNotifications, setUnseenNotifications] = useState<
    Set<Notification['created_at']>
  >(new Set());

  const handleOpenChange = useCallback(
    (isOpen: boolean) => isOpen && setUnseenNotifications(new Set()),
    []
  );

  useEffect(() => {
    const enableNotifications = () => {
      setUserHasInteracted(true);
      window.removeEventListener('click', enableNotifications);
    };

    window.addEventListener('click', enableNotifications);

    return () => window.removeEventListener('click', enableNotifications);
  }, []);

  useEffect(() => {
    if (!userHasInteracted) return;

    const eventSource = new EventSource('/api/notification');

    eventSource.onmessage = (event) => {
      const newNotification = JSON.parse(event.data);

      setNotifications((v) => [...v, newNotification]);
      setUnseenNotifications((v) => new Set(v).add(newNotification));
      new Audio('/notification.wav').play();
    };
    eventSource.onerror = (err) => {
      console.error('SSE error:', err);
      eventSource.close();
    };

    return () => eventSource.close();
  }, [userHasInteracted]);

  return { isMobile, notifications, unseenNotifications, handleOpenChange };
};
