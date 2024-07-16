const notarize = require("@electron/notarize").notarize
const version = '0.0.6'
const appleId = process.env.APPLE_ID;
const appleIdPassword = process.env.APPLE_ID_PASSWORD;
const teamId = process.env.APPLE_TEAM_ID;

// @ts-ignore
notarize({
  appPath: `/Users/archie/VisualStudioCode/Work/music-plugin/halbestunde-plugin/release/${version}/Halbestunde-Mac-${version}-Installer.dmg`,
  appleId,
  appleIdPassword,
  teamId,
});
