import { useEffect } from "react";
import posthog from 'posthog-js';
import { EVENTS } from "@constants/index";

const NotAllowed = () => {
  useEffect(()=> {
    posthog.capture(`halbestunde_muse_${EVENTS.USER_UNAUTHORIZED}`, { time: new Date() });
  }, [])
    return (
      <div className="z-[100000] fixed top-0 right-0 left-0 bottom-0 h-screen w-screen bg-black/50 flex flex-col items-center justify-center backdrop-filter backdrop-blur-sm bg-opacity-10 ">
        <h1 className="font-bold">
          Please authorize via Muse Hub and try again!
        </h1>
        <ol className="flex flex-col items-center mt-4">
          <li className="text-[12px]">1. Close this application.</li>
          <li className="text-[12px]">2. Open Muse Hub.</li>
          <li className="text-[12px]">3. Start this application again.</li>
        </ol>
      </div>
    );
}

export default NotAllowed