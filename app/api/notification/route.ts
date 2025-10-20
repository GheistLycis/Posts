import { Notification } from '../utils/types/notification/Notification';

const encoder = new TextEncoder();
export const notificationsQueue: Notification[] = [];

export const GET = () => {
  let interval: NodeJS.Timeout;
  const stream = new ReadableStream({
    start: (controller) => {
      const notification: Notification = {
        title: 'Hello Posts!',
        message:
          "Hope you like the result. It was a really fun project to do! Although I'm not too creative, this is a little plus I thought to add to the project.",
        created_at: new Date().toISOString(),
      };

      controller.enqueue(
        encoder.encode(`data: ${JSON.stringify(notification)}\n\n`)
      );

      // TODO: debug
      interval = setInterval(() => {
        if (!notificationsQueue.length) return;

        const notification = notificationsQueue.shift()!;
        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify(notification)}\n\n`)
        );
      }, 2000);
    },
    cancel: () => clearInterval(interval),
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  });
};
