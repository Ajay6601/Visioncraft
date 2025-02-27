import React, { useState } from 'react';
import { Thumbnail } from '@remotion/player';
import RemotionVideo from './RemotionVideo';
import PlayerDialog from './PlayerDialog';

function VideoList({ videoList }) {
  const [openPlayDialog, setOpenPlayerDialog] = useState(false);
  const [videoId, setVideoId] = useState(null);

  return (
    <div className='mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-10 justify-items-center'>
      {videoList?.map((video) => (
        <div key={video.id}>
          <div
            className='cursor-pointer hover:scale-105 transition-all'
            onClick={() => {
              setVideoId(video?.id);
              setOpenPlayerDialog(true);
            }}
          >
            <Thumbnail
              component={RemotionVideo}
              compositionWidth={240}
              compositionHeight={300}
              frameToDisplay={30}
              durationInFrames={120}
              fps={30}
              style={{ borderRadius: 15 }}
              inputProps={{ ...video, setDurationInFrame: (v) => console.log(v) }}
            />
          </div>
        </div>
      ))}
      <PlayerDialog playVideo={openPlayDialog} videoId={videoId} onClose={() => setOpenPlayerDialog(false)} />
    </div>
  );
}

export default VideoList;