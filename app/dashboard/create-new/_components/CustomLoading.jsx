import React from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
} from "@radix-ui/react-alert-dialog";
import Image from "next/image";

function CustomLoading({ loading }) {
  return (
    <AlertDialog open={loading}>
      <AlertDialogContent className="bg-white ">
        <div className="bg-white flex flex-col items-center my-10 justify-center">
          <Image src={'/loading.gif'} width={100} height={100} alt="Loading animation" />
          <h2>Generating Video, Do not Refresh ...</h2>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default CustomLoading;