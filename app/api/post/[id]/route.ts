import { handleBffException } from 'app/api/utils/functions/handleBffException';
import { handleFailedRequest } from 'app/api/utils/functions/handleFailedRequest';
import { Handler } from 'app/api/utils/types/api/Handler';
import { GetPostRes } from 'app/api/utils/types/post/GetPostRes';
import { NextResponse } from 'next/server';
import { mockComments } from '../route';

const API_URL = process.env.API_URL;
const LOG_TAG = 'post/:id';

export const GET: Handler<GetPostRes, 'id'> = async (req, ctx) => {
  try {
    const { id } = await ctx.params;
    const res = await fetch(`${API_URL}/${id}/`, {
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-cache',
    });

    if (!res.ok)
      return await handleFailedRequest(res, `${req.method} - ${LOG_TAG}`);

    const resPayload: GetPostRes = await res.json();

    resPayload.comments = mockComments;

    return NextResponse.json(resPayload);
  } catch (error) {
    return handleBffException(error, `${req.method} - ${LOG_TAG}`);
  }
};

export const PATCH: Handler<unknown, 'id'> = async (req, ctx) => {
  try {
    const [{ id }, body] = await Promise.all([ctx.params, req.json()]);
    const res = await fetch(`${API_URL}/${id}/`, {
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

export const DELETE: Handler<null, 'id'> = async (req, ctx) => {
  try {
    const { id } = await ctx.params;
    const res = await fetch(`${API_URL}/${id}/`, {
      method: req.method,
      headers: { 'Content-Type': 'application/json' },
    });

    if (!res.ok)
      return await handleFailedRequest(res, `${req.method} - ${LOG_TAG}`);

    return NextResponse.json(null);
  } catch (error) {
    return handleBffException(error, `${req.method} - ${LOG_TAG}`);
  }
};
