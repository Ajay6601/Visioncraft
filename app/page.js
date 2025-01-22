import Image from "next/image";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";


export default function Home() {
  return (
          <div>
            <h2>
              Hello Welcome to VisionCraft
            </h2>
            <Button >Subscription</Button>
          <UserButton/>
          </div>
    
  );
}
