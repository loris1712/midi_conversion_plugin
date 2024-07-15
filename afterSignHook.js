const notarize = require('@electron/notarize').notarize

const appleId = process.env.APPLE_ID;
const appleIdPassword = process.env.APPLE_ID_PASSWORD;
const teamId = process.env.APPLE_TEAM_ID;

await notarize({
  appleId,
  appleIdPassword,
  teamId
});