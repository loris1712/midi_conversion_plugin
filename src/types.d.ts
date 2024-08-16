declare module '*.svg' {
  import React = require('react');
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
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
  dev: boolean;
}
