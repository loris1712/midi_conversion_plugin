import { useEffect } from "react";
import posthog from 'posthog-js';
import loadingGif from '@assets/loading.gif'
import { EVENTS } from "@constants/index";
const InitLoading = () => {
     useEffect(()=> {
    posthog.capture(`halbestunde_muse_${EVENTS.APP_LOAD}`, { time: new Date() });
  }, [])
    return (
      <div className="flex flex-col h-full w-full items-center justify-center">
        <img className="w-[180px]" src={loadingGif} />
      </div>
    );

}

export default InitLoading