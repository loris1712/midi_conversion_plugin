require('dotenv').config();
const { notarize } = require('electron-notarize');

const appleId = process.env.APPLE_ID;
const appleIdPassword = process.env.APPLE_ID_PASSWORD;
const teamId = process.env.APPLE_TEAM_ID;


exports.default = async function notarizing(context) {
  const { electronPlatformName, appOutDir } = context;
  if (electronPlatformName !== 'darwin') {
    return;
  }

  const appName = context.packager.appInfo.productFilename;

  // @ts-ignore
  return await notarize({
    tool: "notarytool",
    appBundleId: 'plugin.halbestunde',
    appPath: `${appOutDir}/${appName}.app`,
    appleId: appleId,
    appleIdPassword: appleIdPassword,
    teamId: teamId,
  });
};
