import { handleBffException } from 'app/api/utils/functions/handleBffException';
import { Handler } from 'app/api/utils/types/api/Handler';
import { NextResponse } from 'next/server';
import { handleFailedRequest } from '../utils/functions/handleFailedRequest';
import { CreatePostRes } from '../utils/types/post/CreatePostRes';
import { ListPostRes } from '../utils/types/post/ListPostRes';

const API_URL = process.env.API_URL;
const LOG_TAG = 'post';

export const GET: Handler<ListPostRes> = async (req) => {
  try {
    const res = await fetch(`${API_URL}/${req.nextUrl.search}`, {
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-cache',
    });

    if (!res.ok)
      return await handleFailedRequest(res, `${req.method} - ${LOG_TAG}`);

    const resPayload: ListPostRes = await res.json();

    resPayload.results.forEach(
      (post) => (post.likes = Math.floor(Math.random() * 10))
    );

    return NextResponse.json(resPayload);
  } catch (error) {
    return handleBffException(error, `${req.method} - ${LOG_TAG}`);
  }
};

export const POST: Handler<CreatePostRes> = async (req) => {
  try {
    const body = await req.json();
    const res = await fetch(`${API_URL}/`, {
      method: req.method,
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    });

    if (!res.ok)
      return await handleFailedRequest(res, `${req.method} - ${LOG_TAG}`);

    return NextResponse.json(await res.json());
  } catch (error) {
    return handleBffException(error, `${req.method} - ${LOG_TAG}`);
  }
};
