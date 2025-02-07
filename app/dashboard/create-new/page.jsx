"use client"
import React, { useState } from 'react'
import SelectTopic from './_components/SelectTopic'
import SelectStyle from './_components/SelectStyle';
import SelectDuration from './_components/SelectDuration';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import CustomLoading from './_components/CustomLoading';
import {v4 as uuidv4} from 'uuid';


const scriptData="In the dead of night, the hospital's corridors stretched into a realm of forgotten dread. A lone wheelchair stood abandoned, its silent wheels whispering forgotten tales. From the shadows, a pair of feet shuffled forward, their presence disturbing the silence A spectral figure materialized at the end of the hall, its form wavering and chilling. The corridor was silent once more, but the echoes of terror still lingered in the darkness."
const FILE_URL="https://firebasestorage.googleapis.com/v0/b/visioncraft-b335b.firebasestorage.app/o/visioncraft%2F718ab756-210f-4f8d-ae80-6eb5359b7078.mp3?alt=media&token=686439ca-5788-42a2-ab0e-b3fec3ab2b3c"
const VideoSCRIPT=[
  {
    "imagePrompt": "A bustling marketplace in ancient Rome, with people selling goods, merchants haggling, and citizens going about their daily lives. Realistic, detailed, and vibrant colors.",
    "contentText": "Welcome to ancient Rome, a city buzzing with life and commerce. Imagine a bustling marketplace, filled with the cries of vendors and the chatter of citizens."
  },
  {
    "imagePrompt": "A portrait of a Roman senator, stern and powerful, wearing a toga and sitting on marble throne. Realistic, with sharp details and a sense of authority.",
    "contentText": "Among them, a powerful senator named Cato the Younger, known for his strong principles and unwavering patriotism."
  }
]



function CreateNew() {
  const [formData,setFormData]=useState([]);
  const [loading,setLoading]=useState(false);
  const [videoScript,setVideoScript]=useState();
  const [audioFileUrl,setAudioFileUrl]=useState();
  const [imageList,setImageList]=useState();
  const [captions,setCaptions]=useState();
  const onHandleInputChange=(fieldName,fieldValue)=>{
    console.log(fieldName,fieldValue)
    setFormData(prev=>({
    ...prev,
    [fieldName]:fieldValue
  }))
  }

  const GetVideoScript=async()=>{
    setLoading(true)
    const prompt='Write a script to generate '+formData.duration+' video on topic : '+formData.topic+' along with AI image prompt in '+formData.imageStyle+' format for each scene and give me result in JSON format with imagePrompt and ContentText as field, No Plain text'
    console.log(prompt)
    const resp= await axios.post('/api/get-video-script',{prompt:prompt});
    if(resp.data.result.videoScenes){
      console.log(resp.data.result.videoScenes);
      setVideoScript(resp.data.result.videoScenes);
      await GenerateAudioFile(resp.data.result.videoScenes)
    }
  }


  const onCreateClickHandler=()=>{
    GetVideoScript();
    // GenerateAudioFile(scriptData);
    // GenerateAudioCaption(FILE_URL);
    // GenerateImage();
  }

  const GenerateAudioFile=async(videoScriptData)=>{
    setLoading(true)
    let script='';
    const id=uuidv4();
    videoScriptData.forEach(item=>{
      script=script+item.contentText+' ';
    })
    const resp=await axios.post('/api/generate-audio',{
      text:script,
      id:id 
    });
      setAudioFileUrl(resp.data.result);
      resp.data.result&&await GenerateAudioCaption(resp.data.result,videoScriptData)
      
  }

  const GenerateAudioCaption=async(fileUrl,videoScriptData)=>{
    setLoading(true);
    const resp=await axios.post('/api/generate-caption',{
      audioFileUrl:fileUrl
    });
    setCaptions(resp?.data?.result)
      console.log(resp.data.result)
      resp.data.result&& await GenerateImage(videoScriptData);
 
    }
  
    const GenerateImage=async(videoScriptData)=>{
      let images=[]
      for(const element of videoScriptData)
      {
        try{
          const resp=await axios.post('/api/generate-image',{
            prompt:element.imagePrompt
          });
          console.log(resp.data.result);
          images.push(resp.data.result);

        }catch(e)
        {
          console.log('Error:'+e);
        }
      }
      setImageList(images)
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