"use client";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import Lottie from "lottie-react";
import redirecting from "../../../public/redirecting.json";
import supabase from "@/utils/supabaseInstance";

const Page = () => {
  const params = useParams();
  useEffect(() => {
    new Promise(async () => {
      const { data, error } = await supabase
        .from("link_map")
        .select()
        .eq("shorten_link", params.key);
      if (error) {
        console.log(error);
      }
      if (data) {
        const fullUrl = data[0].full_link.replace("https://", "");
        window.location.href = `https://${fullUrl}`;
      }
    });
  }, []);

  return (
    <>
      <div className="flex min-h-screen min-w-full justify-center items-center">
        <div className="flex flex-col items-center">
          <div className="max-w-md mr-4">
            <Lottie animationData={redirecting} />
          </div>
          <p className="text-4xl font-semibold">Redirecting</p>
        </div>
      </div>
    </>
  );
};

export default Page;
