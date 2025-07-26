import { createContext } from 'react';

export type SessionContext = EmptySession | LoadedSession;

type EmptySession = {
  [K in keyof LoadedSession]?: undefined;
};

interface LoadedSession {
  user: User;
}

interface User {
  name: string;
  postsLiked: number[];
}

const SessionContext = createContext<SessionContext | undefined>(undefined);

export default SessionContext;
