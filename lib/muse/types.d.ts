export interface MuseSdk {
  initializeTestMode: (val: boolean) => { status: any; handle: any };
  initializeElectron: (path: any) => { status: any; handle: any };
  finalize: () => any;
  getUserInfo: (handle: any) => any;
  getSku: () => any;
  getSubscriptionOption: () => any;
  getActivationStatus: () => any;
}

