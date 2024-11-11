import { useEffect } from "react";
import posthog from 'posthog-js';
import { EVENTS } from "@constants/index";
import { AppLoading } from "@styles/index";
const InitLoading = () => {
     useEffect(()=> {
    posthog.capture(`halbestunde_muse_${EVENTS.APP_LOAD}`, { time: new Date() });
  }, [])
    return (
      <div className="flex flex-col h-full w-full items-center justify-center gap-4">
        <h2>Getting Started</h2>
        <AppLoading/>
      </div>
    );

}

export default InitLoading