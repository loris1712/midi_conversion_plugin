declare module '*.svg' {
  import React = require('react');
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

declare interface MuseSdk {
  initializeTestMode: (val: boolean) => { status: any; handle: any };
  initializeElectron: (path: any) => { status: any; handle: any };
  finalize: () => any;
  getUserInfo: (handle: any) => any;
  getSku: () => any;
  getSubscriptionOption: () => any;
  getActivationStatus: () => any;
}

declare interface MuseResonse {
  userInfo: {
    uuid: string;
  };
  activeSub: {
    status: number;
    activationStatus: number;
  };
  subOption: {
    status: number;
  };
}
