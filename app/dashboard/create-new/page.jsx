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

function CreateNew() {
  const [formData,setFormData]=useState([]);
  const [loading,setLoading]=useState(false);
  const [videoScript,setVideoScript]=useState();
  
  
  const onHandleInputChange=(fieldName,fieldValue)=>{
    setFormData(prev=>({
    ...prev,
    [fieldName]:fieldValue
  }))
  }

  const GetVideoScript=async()=>{
    setLoading(true)
    const prompt='Write a script to generate '+formData.duration+' video on topic : '+formData.topic+' along with AI image prompt in '+formData.imageStyle+' format for each scene and give me result in JSON format with imagePrompt and ContentText as field, No Plain text'
    console.log(prompt)
    const result= await axios.post('/api/get-video-script',{prompt:prompt}).
    then(resp=>{
      console.log(resp.data.result.videoScenes);
      setVideoScript(resp.data.result.videoScenes);
      GenerateAudioFile(resp.data.result.videoScenes)
    });
    setLoading(false)
  }


  const onCreateClickHandler=()=>{
    // GetVideoScript();
    GenerateAudioFile(scriptData);
  }

  const GenerateAudioFile=async(videoScriptData)=>{
    setLoading(true)
    let script='';
    const id=uuidv4();
    // videoScriptData.forEach(item=>{
      // script=script+item.contentText+' ';
    // })
    await axios.post('/api/generate-audio',{
      text:videoScriptData,
      id:id }).then(resp=>{
        console.log(resp.data)
      })
      setLoading(false)
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