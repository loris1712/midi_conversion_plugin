import { createRequire } from 'module';
const require = createRequire(import.meta.url);

import {MuseSdk} from './types'

let node_path = '../lib/muse/mac/MuseClientSdk.node';
if (process.platform == 'win32') node_path = '../lib/muse/win/MuseClientSdk.node';

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
    return this.museSdk?.getActivationStatus(this.handle);
  }
  getUserInfo() {
    const userInfoResult = this.museSdk?.getUserInfo(this.handle);
    const { userInfo } = userInfoResult ?? {};
    return userInfo;
  }
  getSubscriptionOption() {
    return  this.museSdk?.getSubscriptionOption(this.handle);
  }
  finalize() {
    this.museSdk?.finalize();
  }
  getIsAllowed(){
    const userInfo = this.getUserInfo();
    const activeSub = this.getActivationStatus();
    const subOption = this.getSubscriptionOption();
    return { userInfo, activeSub, subOption };
  }
}

export default Muse;
