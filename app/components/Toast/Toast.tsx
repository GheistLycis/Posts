import { ReactNode } from 'react';
import {
  CheckmarkIcon,
  ErrorIcon,
  toast as reactHotToast,
} from 'react-hot-toast';

export type ToastProps = {
  message: string;
  icon?: ReactNode;
  duration?: number;
};

export const toast = {
  success: ({
    message,
    duration = 5000,
    icon = <CheckmarkIcon />,
  }: ToastProps) => {
    return reactHotToast.custom(
      (t) => {
        return (
          <div
            className={`${
              t.visible ? 'animate-enter' : 'animate-leave'
            } ring-opacity-5 pointer-events-auto flex items-center gap-2 rounded-lg bg-white p-3 shadow-lg ring-1 ring-black`}
          >
            {icon}
            {message}
          </div>
        );
      },
      { duration, position: 'bottom-center' }
    );
  },
  error: ({ message, duration = 5000, icon = <ErrorIcon /> }: ToastProps) => {
    return reactHotToast.custom(
      (t) => {
        return (
          <div
            className={`${
              t.visible ? 'animate-enter' : 'animate-leave'
            } ring-opacity-5 light:bg-background pointer-events-auto flex items-center gap-2 rounded-lg bg-white p-3 shadow-lg ring-1 ring-black`}
          >
            {icon}
            {message}
          </div>
        );
      },
      { duration, position: 'bottom-center' }
    );
  },
  default: ({ message, duration = 5000, icon }: ToastProps) => {
    return reactHotToast.custom(
      (t) => {
        return (
          <div
            className={`${
              t.visible ? 'animate-enter' : 'animate-leave'
            } ring-opacity-5 light:bg-background pointer-events-auto flex items-center gap-2 rounded-lg bg-white p-3 shadow-lg ring-1 ring-black`}
          >
            {icon}
            {message}
          </div>
        );
      },
      { duration, position: 'bottom-center' }
    );
  },
};
