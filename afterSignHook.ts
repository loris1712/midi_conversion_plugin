require('dotenv').config();
const { notarize } = require('electron-notarize');
const path = require('path');

const package = require('./package.json');

const appleId = process.env.APPLE_ID;
const appleIdPassword = process.env.APPLE_ID_PASSWORD;
const teamId = process.env.APPLE_TEAM_ID;

exports.default = async function notarizing(context) {
  const { electronPlatformName, appOutDir } = context;
  if (electronPlatformName !== 'darwin') {
    return;
  }

  let appId = 'plugin.halbestunde';

  let appPath = path.join(
    context.appOutDir,
    `${context.packager.appInfo.productFilename}.app`,
  );

  // @ts-ignore
  return await notarize({
    tool: 'notarytool',
    appBundleId: appId,
    appPath: appPath,
    appleId: appleId,
    appleIdPassword: appleIdPassword,
    teamId: teamId,
  });
};
