// import React, { useEffect, useState } from 'react'
// import { db } from '@/configs/db';
// import { eq } from 'drizzle-orm';
// import { useRouter } from 'next/navigation';
// import {
//     Dialog,
//     DialogContent,
//     DialogDescription,
//     DialogHeader,
//     DialogTitle,
//     DialogTrigger,
//   } from "@/components/ui/dialog"
  
//   import { Player } from "@remotion/player";
// import RemotionVideo from './RemotionVideo';
// import { Button } from '@/components/ui/button';
// import { VideoData } from '@/configs/schema';

// function PlayerDialog({playVideo,videoId}) {
//     const [openDialog,setOpenDialog]=useState(false);
//     const [videoData,setVideoData]=useState()
//     const [durationInFrame,setDurationInFrame]=useState(100);
//     const router=useRouter();
    
//     useEffect(()=>{
//         setOpenDialog(!openDialog)
//         videoId&&GetVideoData();
//     },[playVideo])

//     const GetVideoData=async()=>{
//         const result=await db.select().from(VideoData).
//         where(eq(VideoData.id,videoId));
//         console.log(result)
//         setVideoData(result[0])
//     }
//   return (
//     <Dialog open={openDialog}>
//       <DialogContent className="bg-white flex-col items-center">
//         <DialogHeader>
//           <DialogTitle className="text-3xl font-bold my-5">Your video is ready</DialogTitle>
//           <DialogDescription>
//             <Player
//               component={RemotionVideo}
//               durationInFrames={Number(durationInFrame.toFixed(0))}
//               compositionWidth={300}
//               compositionHeight={450}
//               fps={30}
//               controls={true}
//               inputProps={{
//                   ...videoData,
//                   setDurationInFrame:(frameValue)=>setDurationInFrame(frameValue)
//               }
//               }   
//             />
//             <div className='flex gap-10 mt-10'>
//               <Button variant="ghost" onClick={()=>router.replace('/dashboard')}>Cancel</Button>
//               <Button>  Export</Button>
//             </div>
//           </DialogDescription>
//         </DialogHeader>
//       </DialogContent>
//     </Dialog>
//   )
// }

// export default PlayerDialog

import React, { useEffect, useState } from "react";
import { db } from "@/configs/db";
import { eq } from "drizzle-orm";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Player } from "@remotion/player";
import RemotionVideo from "./RemotionVideo";
import { Button } from "@/components/ui/button";
import { VideoData } from "@/configs/schema";

function PlayerDialog({ playVideo, videoId }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [videoData, setVideoData] = useState(null);
  const [durationInFrame, setDurationInFrame] = useState(100);
  const router = useRouter();

  useEffect(() => {
    if (playVideo) {
      setOpenDialog(true);
      if (videoId) GetVideoData();
    } else {
      setOpenDialog(false);
    }
  }, [playVideo, videoId]);

  const GetVideoData = async () => {
    try {
      if (!videoId) return;

      const result = await db
        .select()
        .from(VideoData)
        .where(eq(VideoData.id, videoId));

      if (result.length > 0) {
        setVideoData(result[0]);
      }
    } catch (error) {
      console.error("Error fetching video data:", error);
    }
  };

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogContent className="bg-white flex-col items-center">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold my-5">Your video is ready</DialogTitle>
          <DialogDescription>
            {videoData ? (
              <Player
                component={RemotionVideo}
                durationInFrames={Number(durationInFrame.toFixed(0))}
                compositionWidth={300}
                compositionHeight={450}
                fps={30}
                controls={true}
                inputProps={{
                  ...videoData,
                  setDurationInFrame: (frameValue) => setDurationInFrame(frameValue),
                }}
              />
            ) : (
              <p className="text-center text-gray-500">Loading video data...</p>
            )}
            <div className="flex gap-10 mt-10">
              <Button variant="ghost" onClick={() => router.replace("/dashboard")}>
                Cancel
              </Button>
              <Button>Export</Button>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default PlayerDialog;

