"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";
import redirecting from "../../../public/redirecting.json";
import supabase from "@/utils/supabaseInstance";

const Page = () => {
  const params = useParams();
  const [isFound, setIsFound] = useState(true);
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
        setIsFound(false);
        const fullUrl = data[0].full_link.replace("https://", "");
        window.location.href = `https://${fullUrl}`;
      }
    });
  }, [params.key]);

  return (
    <>
      <div className="flex min-h-screen min-w-full justify-center items-center">
        {isFound ? (
          <div className="flex flex-col items-center">
            <div className="max-w-md mr-4">
              <Lottie animationData={redirecting} />
            </div>
            <p className="text-4xl font-semibold">Redirecting</p>
          </div>
        ) : (
          <p className="text-4xl font-semibold">404 NOT FOUND</p>
        )}
      </div>
    </>
  );
};

export default Page;
