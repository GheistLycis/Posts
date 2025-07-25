import { NextRequest, NextResponse } from 'next/server';
import { BffErrorPayload } from './BffErrorPayload';

export type Handler<TRes = unknown, TParams extends string = never> = (
  req: NextRequest,
  ctx: { params: Promise<Record<TParams, string>> }
) => Promise<NextResponse<TRes | BffErrorPayload>>;
