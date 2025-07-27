import { Notification } from 'app/api/utils/types/notification/Notification';
import { useEffect, useState } from 'react';

interface UseNotifications {
  notifications: Notification[];
}

export const useNotifications = (): UseNotifications => {
  const [userHasInteracted, setUserHasInteracted] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);

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
      setNotifications((v) => [...v, JSON.parse(event.data)]);
      new Audio('/notification.wav').play();
    };
    eventSource.onerror = (err) => {
      console.error('SSE error:', err);
      eventSource.close();
    };

    return () => eventSource.close();
  }, [userHasInteracted]);

  return { notifications };
};
