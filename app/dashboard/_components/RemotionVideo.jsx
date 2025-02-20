// import React, { useEffect } from 'react';
// import { AbsoluteFill, Img, Sequence, useVideoConfig, Audio, useCurrentFrame, interpolate } from 'remotion';

// function RemotionVideo({ script, imageList, audioFileUrl, captions, setDurationInFrame }) {
//   const { fps } = useVideoConfig();
//   const frame = useCurrentFrame();

//   // Ensure a valid duration in frames
//   const durationInFrames = captions?.length > 0 ? Math.round((captions[captions.length - 1]?.end / 1000) * fps) : 100;

//   // Update duration only when captions change
//   useEffect(() => {
//     if (setDurationInFrame && durationInFrames) {
//       setDurationInFrame(durationInFrames);
//     }
//   }, [captions, durationInFrames, setDurationInFrame]);

//   const getCurrentCaptions = () => {
//     const currentTime = (frame / fps) * 1000;
//     const currentCaption = captions?.find((word) => currentTime >= word.start && currentTime <= word.end);
//     return currentCaption ? currentCaption.text : '';
//   };

//   return (
//     <AbsoluteFill className="bg-black">
//       {imageList?.map((item, index) => {
//         const startTime = (index * durationInFrames) / imageList?.length;
//         const duration = durationInFrames;

//         const scale = interpolate(
//           frame,
//           [startTime, startTime + duration / 2, startTime + duration],
//           [1, 1.8, 1],
//           { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
//         );

//         return (
//           <Sequence key={index} from={startTime} durationInFrames={duration}>
//             <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
//               <Img
//                 src={item}
//                 style={{
//                   width: '100%',
//                   height: '100%',
//                   objectFit: 'cover',
//                   transform: `scale(${scale})`
//                 }}
//               />
//               <AbsoluteFill
//                 style={{
//                   color: 'white',
//                   justifyContent: 'center',
//                   bottom: 50,
//                   height: 150,
//                   textAlign: 'center',
//                   width: '100%',
//                 }}
//               >
//                 <h2 className="text-2xl">{getCurrentCaptions()}</h2>
//               </AbsoluteFill>
//             </AbsoluteFill>
//           </Sequence>
//         );
//       })}
//       {audioFileUrl && <Audio src={audioFileUrl} />}
//     </AbsoluteFill>
//   );
// }

// export default RemotionVideo;

import React, { useEffect } from "react";
import {
  AbsoluteFill,
  Img,
  Sequence,
  useVideoConfig,
  Audio,
  useCurrentFrame,
  interpolate,
} from "remotion";

function RemotionVideo({ script, imageList = [], audioFileUrl, captions = [], setDurationInFrame }) {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();

  // Ensure captions and imageList are defined
  const hasCaptions = captions && captions.length > 0;
  const hasImages = imageList && imageList.length > 0;

  // Total duration based on captions, fallback to default if empty
  const totalDurationInFrames = hasCaptions
  ? Math.round((captions[captions.length - 1]?.end / 1000) * fps)
  : 100;

  // If imageList is empty, prevent division by zero
  const imageDuration = hasImages ? Math.floor(totalDurationInFrames / imageList.length) : totalDurationInFrames;

  // Update duration when captions change
  useEffect(() => {
    if (setDurationInFrame && totalDurationInFrames) {
      setDurationInFrame(totalDurationInFrames);
    }
  }, [captions, totalDurationInFrames, setDurationInFrame]);

  const getCurrentCaptions = () => {
    const currentTime = (frame / fps) * 1000;
    const currentCaption = hasCaptions
      ? captions.find((word) => currentTime >= word.start && currentTime <= word.end)
      : null;
    return currentCaption ? currentCaption.text : "";
  };

  return (
    <AbsoluteFill className="bg-black">
      {hasImages &&
        imageList.map((item, index) => {
          const startFrame = index * imageDuration;
          const endFrame = startFrame + imageDuration;

          const scale = interpolate(
            frame,
            [startFrame, startFrame + imageDuration / 2, endFrame],
            [1, 1.2, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );

          return (
            <Sequence key={index} from={startFrame} durationInFrames={imageDuration}>
              <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
                <Img
                  src={item}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transform: `scale(${scale})`,
                    opacity: interpolate(
                      frame,
                      [startFrame, startFrame + 15, endFrame - 15, endFrame],
                      [0, 1, 1, 0],
                      { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                    ),
                  }}
                />
                <AbsoluteFill
                  style={{
                    color: "white",
                    justifyContent: "center",
                    bottom: 50,
                    height: 150,
                    textAlign: "center",
                    width: "100%",
                    opacity: interpolate(
                      frame,
                      [startFrame, startFrame + 10, endFrame - 10, endFrame],
                      [0, 1, 1, 0],
                      { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                    ),
                  }}
                >
                  <h2 className="text-2xl">{getCurrentCaptions()}</h2>
                </AbsoluteFill>
              </AbsoluteFill>
            </Sequence>
          );
        })}
      {audioFileUrl && <Audio src={audioFileUrl} />}
    </AbsoluteFill>
  );
}

export default RemotionVideo;
