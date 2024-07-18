import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const museSdk: MuseSdk = require('../lib/mac/MuseClientSdk.node');

class Muse {
  handle: any;
  connected: boolean;

  constructor(isDev: boolean) {
    let result;
    if (isDev) {
      result = museSdk.initializeTestMode(true);
    } else {
      result = museSdk.initialize();
    }
    const { status, handle } = result;
    this.connected = status === 0;
    if (this.connected) {
      this.handle = handle;
    }
  }

  getUserInfo() {
    const userInfoResult = museSdk.getUserInfo(this.handle);
    const { status, userInfo } = userInfoResult;
    return userInfo;
  }

  getActiveSubscription() {
    const subscriptionResult = museSdk.getActivationStatus();
    return subscriptionResult;
  }
}

export default Muse;
