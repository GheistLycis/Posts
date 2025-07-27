import { notificationsQueue } from 'app/api/notification/route';
import { handleBffException } from 'app/api/utils/functions/handleBffException';
import { Handler } from 'app/api/utils/types/api/Handler';
import { CommentPostReq } from 'app/api/utils/types/post/CommentPostReq';
import { CommentPostRes } from 'app/api/utils/types/post/CommentPostRes';
import { NextResponse } from 'next/server';
import { mockComments } from '../../route';

const LOG_TAG = 'post/:id/comment';

export const POST: Handler<CommentPostRes, 'id'> = async (req, ctx) => {
  try {
    const { id } = await ctx.params;
    const body: CommentPostReq = await req.json();
    const latestId = mockComments[mockComments.length - 1].id;
    const username = req.cookies.get('user')?.value ?? '';
    const newComment = {
      id: latestId + 1,
      content: body.content,
      username,
    };

    mockComments.push(newComment);
    notificationsQueue.push({
      title: 'Someone commented on your post!',
      message: `${username} commented on ${id}`,
      created_at: new Date().toISOString(),
    });

    return NextResponse.json(newComment);
  } catch (error) {
    return handleBffException(error, `${req.method} - ${LOG_TAG}`);
  }
};
