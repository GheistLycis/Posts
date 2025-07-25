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
}

const SessionContext = createContext<SessionContext | undefined>(undefined);

export default SessionContext;
