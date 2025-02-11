import React from 'react'
import { AbsoluteFill, Sequence, useVideoConfig } from 'remotion'

const {fps}=useVideoConfig();

const getDurationFrames=()=>{
  return captions[captions?.length-1]?.end/1000*fps
}
function RemotionVideo({script,imageList,audioFileUrl,captions}) {
  return (
    <AbsoluteFill className='bg-black'>
      {imageList?.map((item,index)=>(
        <>
        <Sequence key={index} from={((index*getDurationFrames())/imageList?.length)} durationInFrames={getDurationFrames()}>

        </Sequence>
        </>
      ))}
    </AbsoluteFill>
  )
}

export default RemotionVideo