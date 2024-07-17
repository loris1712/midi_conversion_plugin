import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const initializeTestMode = require('muse-client-js').initializeTestMode;

export const initialzeTest = () => {
  const init = initializeTestMode(true);
  console.log({init})
};
