import { LogSeverity } from '../../types/api/LogSeverity';

// TODO: implement vendor
export const logServerException = (
  response: Response,
  payload: unknown,
  tag: string,
  severity: LogSeverity = 'log'
): void => console.log(response, payload, tag, severity);
