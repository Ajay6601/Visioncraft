"use client"
import React, { useContext, useEffect, useState } from 'react'
import SelectTopic from './_components/SelectTopic'
import SelectStyle from './_components/SelectStyle';
import SelectDuration from './_components/SelectDuration';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import CustomLoading from './_components/CustomLoading';
import {v4 as uuidv4} from 'uuid';
import { VideoDataContext } from '@/app/_context/VideoDataContext';
import { useUser } from '@clerk/nextjs';
import { db } from '@/configs/db';
import { VideoData } from '@/configs/schema';

function CreateNew() {
  const [formData,setFormData]=useState([]);
  const [loading,setLoading]=useState(false);
  const [videoScript,setVideoScript]=useState();
  const [audioFileUrl,setAudioFileUrl]=useState();
  const [imageList,setImageList]=useState();
  const [captions,setCaptions]=useState();
  const {videoData,setVideoData}=useContext(VideoDataContext);
  const {user}=useUser();
  
  const onHandleInputChange=(fieldName,fieldValue)=>{
    console.log(fieldName,fieldValue)
    setFormData(prev=>({
    ...prev,
    [fieldName]:fieldValue
  }))
  }

  const onCreateClickHandler=()=>{
    GetVideoScript();
  
  }
  const GetVideoScript=async()=>{
    setLoading(true)
    const prompt='Write a script to generate '+formData.duration+' video on topic : '+formData.topic+' along with AI image prompt in '+formData.imageStyle+' format for each scene and give me result in JSON format with imagePrompt and ContentText as field, No Plain text'
    console.log(prompt)
    const resp= await axios.post('/api/get-video-script',{prompt:prompt});
    // console.log(resp.data.result)
    if(resp.data.result){
      setVideoData(
        prev=>({
          ...prev,
          'videoScript':resp.data.result.videoScenes
        })
      )
      setVideoScript(resp.data.result.videoScenes);
      await GenerateAudioFile(resp.data.result.videoScenes)
    }
  }


  const GenerateAudioFile=async(videoScriptData)=>{
    setLoading(true)
    let script='';
    const id=uuidv4();
    console.log(videoScriptData);
    videoScriptData.forEach(item=>{
      script=script+item.contentText+' ';
    })
    const resp=await axios.post('/api/generate-audio',{
      text:script,
      id:id 
    });    
    setVideoData(
      prev=>({
        ...prev,
        'audioFileUrl':resp.data.Result
      })
    )
      setAudioFileUrl(resp.data.Result);
      resp.data.Result && await GenerateAudioCaption(resp.data.Result,videoScriptData)
  }

  const GenerateAudioCaption=async(fileUrl,videoScriptData)=>{
    setLoading(true);
    const resp=await axios.post('/api/generate-caption',{
      audioFileUrl:fileUrl
    })
    setCaptions(resp?.data?.Result)
    setVideoData(
      prev=>({
        ...prev,
        'captions':resp.data.result
      })
    )
      resp.data.result&& await GenerateImage(videoScriptData);
    }
  
    const GenerateImage=async(videoScriptData)=>{
      let images=[]
      for(const element of videoScriptData)
      {
        try{
          const resp=await axios.post('/api/generate-image',{prompt:element.imagePrompt});
          console.log(resp.data.result);
          images.push(resp.data.result);
        }catch(e)
        {
          console.log('Error:'+e);
        }
      }
      setVideoData(
        prev=>({
          ...prev,
          'imageList':images
        })
      )
      setImageList(images)
      setLoading(false);
    }

    useEffect(()=>{
      console.log(videoData);
      if (Object.keys(videoData).length === 4) {
        SaveVideoData(videoData);
      }    
    },[videoData])

    const SaveVideoData=async(videoData)=>{
      console.log("Received videoData:", videoData);

      setLoading(true)
      const result=await db.insert(VideoData).values({
        script:videoData?.videoScript,
        audioFileUrl:videoData?.audioFileUrl,
        captions:videoData?.captions,
        imageList:videoData?.imageList,
        createdBy:user?.primaryEmailAddress?.emailAddress
      }).returning({id:VideoData?.id})
      console.log(result);
      setLoading(false);
    }


  return (
    <div className='md:px-20'>
      <h2 className='font-bold text-4xl text-primary text-center'></h2>
    <div className='mt-10 shadow-md p-10'>

    {/* Select Topic */}
    <SelectTopic onUserSelect={onHandleInputChange}/>

    {/* Select Style */}
    <SelectStyle onUserSelect={onHandleInputChange}/>
    {/* Duration */}
    <SelectDuration onUserSelect={onHandleInputChange}/>
    {/* Create Button */}
    <Button className="mt-10 w-full" onClick={onCreateClickHandler}>Create Short Video</Button>
    </div>
    <CustomLoading loading={loading}/>
    </div>

  )
}

export default CreateNew