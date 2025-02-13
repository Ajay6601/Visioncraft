"use client"
import React, { useEffect, useState } from "react";
import {Button} from '@/components/ui/button'
import EmptyState from "./_components/EmptyState";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { VideoData } from "@/configs/schema";
import { eq } from "drizzle-orm";
import { db } from "@/configs/db";

function Dashboard() {
  const [videoList,setVideoList]=useState([]);
  const {user}=useUser();

  useEffect(()=>{
    user&&GetVideoList();
  },[user])

  const GetVideoList=async()=>{
    const result=await db.select().from(VideoData)
    .where(eq(VideoData?.createdBy,user?.primaryEmailAddress?.emailAddress))
    console.log(result)
    setVideoList(result);
  }
  

  return (
  <div>
    <div className="flex justify-between items-center">
      <h2 className="font-bold text-2xl text-primary">Dashboard</h2>

      <Link href={'/dashboard/create-new'}>
      <Button>
        + Create New
      </Button>
      </Link>
    </div>
    {/* Empty State */}
    {videoList?.length==0&& <div>
      <EmptyState/>
      </div>}
  </div>
)
}

export default Dashboard;
