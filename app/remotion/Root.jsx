import React from 'react'
import RemotionVideo from '../dashboard/_components/RemotionVideo'
import { Composition } from 'remotion'
function RemotionRoot() {
  return (
    <Composition
    id="Empty"
    component={RemotionVideo}
    durationInFrames={60}
    fps={30}
    width={1280}
    height={720}
  />
  )
}

export default RemotionRoot