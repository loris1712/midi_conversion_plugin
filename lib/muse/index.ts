import { createRequire } from 'module';
const require = createRequire(import.meta.url);

let node_path = '../lib/muse-mac-v2/MuseClientSdk.node';
if (process.platform == 'win32') node_path = '../lib/win/MuseClientSdk.node';
require(node_path);

class Muse {
  handle: any;
  connected: boolean;
  museSdk: any;

  constructor(isDev: boolean) {
    let result;
    if (isDev) {
      const museSdk: MuseSdk = require(node_path);
      this.museSdk = museSdk;
      result = museSdk.initializeTestMode(true);
    } else {
      const museSdk: MuseSdk = require(node_path);
      this.museSdk = museSdk;
      result = museSdk.initializeElectron(process.execPath);
    }
    const { status, handle } = result;
    this.connected = status === 0;
    if (this.connected) {
      this.handle = handle;
    }
  }

  getActivationStatus() {
    const subscriptionResult = this.museSdk?.getActivationStatus(this.handle);
    return subscriptionResult;
  }
  getUserInfo() {
    const userInfoResult = this.museSdk?.getUserInfo(this.handle);
    const { userInfo } = userInfoResult ?? {};
    return userInfo;
  }
  getSubscriptionOption() {
    const subscriptionOption = this.museSdk?.getSubscriptionOption(this.handle);
    return subscriptionOption;
  }
  finalize() {
    this.museSdk?.finalize();
  }
}

export default Muse;
