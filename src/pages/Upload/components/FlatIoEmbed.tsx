import { useEffect, useRef } from 'react';
import Embed from 'flat-embed';
import { flatIoApiKey, flatIoAppId } from '@constants/index';
import { GradientButton } from '@styles/index';
import { generateListKey } from '@utils/helpers';



async function uploadMidiToFlatIO(midiFileURL: string) {
  try {
    // 1. Fetch the MIDI file from the URL
    const response = await fetch(midiFileURL);
    if (!response.ok) {
      throw new Error(`Failed to fetch MIDI file: ${response.statusText}`);
    }
    const midiBlob = await response.blob();
    console.log({ midiBlob });

    // 2. Prepare the FormData for the upload
    const formData = new FormData();
    formData.append('file', midiBlob, `${generateListKey()}.mid`); // Replace 'your_midi_file.mid' with a suitable filename

    // 3. Upload the file to Flat.io
    const uploadResponse = await fetch(`https://api.flat.io/v2/scores`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${flatIoApiKey}`,
        'Content-Type': 'vnd.recordare.musicxml+xml',
      },
      body: formData,
    });

    if (!uploadResponse.ok) {
      const errorData = await uploadResponse.json();
      throw new Error(`Failed to upload file: ${uploadResponse.statusText}. Details: ${JSON.stringify(errorData)}`);
    }

    const uploadData = await uploadResponse.json();
    const fileId = uploadData.id;

    console.log('File uploaded successfully. File ID:', fileId);
    return fileId;

  } catch (error) {
    console.error('Error uploading MIDI file:', error);
    throw error; // Re-throw the error for the calling function to handle
  }
}

async function createFlatIOScore(fileId: string) {
  try {
    const scoreResponse = await fetch('https://api.flat.io/v2/scores', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${flatIoApiKey}`,
      },
      body: JSON.stringify({
        file: fileId,
      }),
    });

    if (!scoreResponse.ok) {
      const errorData = await scoreResponse.json();
      throw new Error(`Failed to create score: ${scoreResponse.statusText}. Details: ${JSON.stringify(errorData)}`);
    }

    const scoreData = await scoreResponse.json();
    const scoreId = scoreData.id;

    console.log('Score created successfully. Score ID:', scoreId);
    return scoreId;

  } catch (error) {
    console.error('Error creating Flat.io score:', error);
    throw error; // Re-throw the error for the calling function to handle
  }
}

// Example usage (replace with your actual values)
async function processMidi(midiFileURL: string) {
  try {
    const fileId = await uploadMidiToFlatIO(midiFileURL);
    const scoreId = await createFlatIOScore(fileId);
    const embedUrl = `https://flat.io/embed/${scoreId}`;
    console.log("Embed URL:", embedUrl);
        // Now you can use the embedUrl in your electron webview.
    return embedUrl;

  } catch (error) {
    console.error('Processing failed:', error);
    // Handle the error appropriately in your application
  }
}

// Example call, replace with your actual values.
// processMidi('YOUR_MIDI_FILE_URL', 'YOUR_ACCESS_TOKEN');


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
                <GradientButton onClick={() => {
                    uploadMidiToFlatIO(
                      'https://www.musicimpressions.de/demos_midi/d_CR5757.mid',
                    );
                }}>New Upload</GradientButton>
            </div>
            <div className='h-full bg-blue-200' ref={embedRef}>

            </div>
        </div>
    )
}


export default FlatIoEmbed;