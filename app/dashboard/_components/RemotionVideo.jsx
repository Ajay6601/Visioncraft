import React, { useEffect } from 'react';
import { AbsoluteFill, Img, Sequence, useVideoConfig, Audio, useCurrentFrame, interpolate } from 'remotion';

function RemotionVideo({ script, imageList, audioFileUrl, captions, setDurationInFrame }) {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();

  // Ensure a valid duration in frames
  const durationInFrames = captions?.length > 0 ? Math.round((captions[captions.length - 1]?.end / 1000) * fps) : 100;

  // Update duration only when captions change
  useEffect(() => {
    if (setDurationInFrame && durationInFrames) {
      setDurationInFrame(durationInFrames);
    }
  }, [captions, durationInFrames, setDurationInFrame]);

  const getCurrentCaptions = () => {
    const currentTime = (frame / fps) * 1000;
    const currentCaption = captions?.find((word) => currentTime >= word.start && currentTime <= word.end);
    return currentCaption ? currentCaption.text : '';
  };

  return (
    <AbsoluteFill className="bg-black">
      {imageList?.map((item, index) => {
        const startTime = (index * durationInFrames) / imageList?.length;
        const duration = durationInFrames;

        const scale = interpolate(
          frame,
          [startTime, startTime + duration / 2, startTime + duration],
          [1, 1.8, 1],
          { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
        );

        return (
          <Sequence key={index} from={startTime} durationInFrames={duration}>
            <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Img
                src={item}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transform: `scale(${scale})`
                }}
              />
              <AbsoluteFill
                style={{
                  color: 'white',
                  justifyContent: 'center',
                  bottom: 50,
                  height: 150,
                  textAlign: 'center',
                  width: '100%',
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
