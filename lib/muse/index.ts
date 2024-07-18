import { createRequire } from 'module';
const require = createRequire(import.meta.url);
require('../lib/mac/MuseClientSdk.node');



class Muse {
  handle: any;
  connected: boolean;
  museSdk: any;

  constructor(isDev: boolean) {
    let result;
    if (isDev) {
      const museSdk: MuseSdk = require('../lib/mac/MuseClientSdk.node');
      this.museSdk = museSdk;
      result = museSdk.initializeTestMode(true);
    } else {
      const museSdk: MuseSdk = require('../lib/mac/MuseClientSdk.node');
      this.museSdk = museSdk;
      result = museSdk.initialize();
    }
    const { status, handle } = result;
    this.connected = status === 0;
    if (this.connected) {
      this.handle = handle;
    }
  }

  getUserInfo() {
    const userInfoResult = this.museSdk?.getUserInfo(this.handle);
    const { userInfo } = userInfoResult ?? {};
    return userInfo;
  }

  getActiveSubscription() {
    const subscriptionResult = this.museSdk?.getActivationStatus();
    return subscriptionResult;
  }
}

export default Muse;
