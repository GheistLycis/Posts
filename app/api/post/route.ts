import { handleBffException } from 'app/api/utils/functions/handleBffException';
import { Handler } from 'app/api/utils/types/api/Handler';
import { NextResponse } from 'next/server';
import { handleFailedRequest } from '../utils/functions/handleFailedRequest';
import { CreatePostRes } from '../utils/types/post/CreatePostRes';
import { GetPostRes } from '../utils/types/post/GetPostRes';
import { ListPostRes } from '../utils/types/post/ListPostRes';

const API_URL = process.env.API_URL;
const LOG_TAG = 'post';
export const mockComments: GetPostRes['comments'] = [
  {
    id: 1,
    username: 'John Doe',
    content: 'Lorem ipsum dolor sit amet @Men-tion',
  },
  { id: 2, username: 'John Doe 2', content: 'Lorem ipsum dolor sit\n amet' },
  {
    id: 3,
    username: 'John Doe 3',
    content: 'Lorem ipsum dolor sit amet @mention',
  },
  { id: 4, username: 'John Doe 4', content: 'Lorem ipsum dolor sit amet' },
  { id: 5, username: 'John Doe 5', content: 'Lorem ipsum dolor sit amet' },
  {
    id: 6,
    username: 'John Doe 6',
    content: 'Lorem ipsum dolor @Men_tion sit amet',
  },
  { id: 7, username: 'John Doe 7', content: 'Lorem ipsum dolor sit amet' },
  {
    id: 8,
    username: 'John Doe 8',
    content: 'Lorem ipsum dolor @Men.tion sit amet',
  },
  { id: 9, username: 'John Doe 9', content: 'Lorem ipsum dolor sit amet' },
  { id: 10, username: 'John Doe 10', content: 'Lorem ipsum dolor sit amet' },
];

export const GET: Handler<ListPostRes> = async (req) => {
  try {
    const res = await fetch(`${API_URL}/${req.nextUrl.search}`, {
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-cache',
    });

    if (!res.ok)
      return await handleFailedRequest(res, `${req.method} - ${LOG_TAG}`);

    const resPayload: ListPostRes = await res.json();

    resPayload.results.forEach((post, i) => {
      if (i % 2) post.username = 'John Doe';
      post.likes = Math.floor(Math.random() * 10);
      post.comments = mockComments;
    });

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
