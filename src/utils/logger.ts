import * as Sentry from '@sentry/electron/renderer';

export const log = (...args: any) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(...args);
  } else {
    Sentry.captureEvent({ ...args });
  }
};
