import { useEffect, useRef } from 'react';
import Embed from 'flat-embed';
import { flatIoAppId } from '@constants/index';
import { GradientButton } from '@styles/index';

const FlatIoEmbed = () => {

    const embedRef = useRef<any>();
    const scoreKey = '67b509b78ecb0da7aea0921a';
    const userId = '67b3bf7d4fce81439d990b99';
    useEffect(() => {
      if (embedRef.current) {
        const embed = new Embed(embedRef.current, {
          score: scoreKey,
          width: '100%',
          height: '100%',
          embedParams: {
            mode: 'edit',
            locale: 'en-GB',
            appId: flatIoAppId,
            userId: userId,
            sharingKey:
              '274ede5cc1bcaa7fcd1c0c64e16d1b223b55dd8721c14f9af575317a022def1f7ed53017bd7cdf13d0cc51c3acb8cfba4b56a8dd46d9f98c4e863bd226c1fa71',
          },
        });
      }
    }, [embedRef.current]);

    return (
        <div className="h-full w-full flex flex-col gap-4 p-4">
            <div className='h-10 w-full flex flex-row items-center justify-between'>
                <div/>
                <GradientButton>New Upload</GradientButton>
            </div>
            <div className='h-full bg-blue-200' ref={embedRef}>

            </div>
        </div>
    )
}


export default FlatIoEmbed;