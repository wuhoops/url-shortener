"use client";
import { Input, Button, message, Spin } from "antd";
import { useState } from "react";
import supabase from "@/utils/supabaseInstance";

export default function Home() {
  const [fullLink, setFullLink] = useState("");
  const [shortLink, setShortLink] = useState("");
  const [shortenLink, setShortenLink] = useState("");
  const [messageApi, contextHolder] = message.useMessage();
  const [isShortLinkInputError, setIsShortLinkInputError] = useState(false);
  const [isSubmitWaiting, setIsSubmitWaiting] = useState(false);

  const handleFullLinkChange = (fullLink: string) => {
    setFullLink(fullLink);
  };
  const handleShortLinkChange = (shortLink: string) => {
    setIsShortLinkInputError(false);
    setShortLink(shortLink);
  };
  const handleCopyLink = () => {
    navigator.clipboard.writeText(`s.wuhoops.com/${shortenLink}`);
    messageApi.open({
      type: "success",
      content: "Copy link successfully!!",
    });
  };
  const handleShortenSubmit = async () => {
    setIsSubmitWaiting(true);
    await supabase
      .from("link_map")
      .insert({ full_link: fullLink, shorten_link: shortLink })
      .select()
      .then((res: any) => {
        setIsSubmitWaiting(false);
        if (res.error) {
          if (res.error.code == "23505") {
            setIsShortLinkInputError(true);
            messageApi.open({
              type: "error",
              content: "This key is already in use.",
            });
          }
        } else {
          messageApi.open({
            type: "success",
            content: "Shorten link successfully!!",
          });
          setShortenLink(res.data[0].shorten_link);
          setFullLink("");
          setShortLink("");
        }
      });
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4">
      {contextHolder}
      <p className="text-2xl font-semibold">URL shortener</p>
      <Input
        value={fullLink}
        onChange={(e) => {
          handleFullLinkChange(e.target.value);
        }}
        size="large"
        autoFocus
        placeholder="Enter the link here"
        className="max-w-xl"
      />
      <Input
        value={shortLink}
        onChange={(e) => {
          handleShortLinkChange(e.target.value);
        }}
        size="large"
        autoFocus
        placeholder="Enter your short link here"
        className="max-w-xl"
        style={{
          borderColor: isShortLinkInputError ? "red" : "",
          borderWidth: isShortLinkInputError ? "2px" : "",
          transition: "none",
        }}
      />
      {isShortLinkInputError ? (
        <p className="text-red-500 self">This key is already in use.</p>
      ) : (
        <></>
      )}
      <Button
        type="primary"
        size="large"
        className="bg-blue-500"
        onClick={() => {
          handleShortenSubmit();
        }}
      >
        {isSubmitWaiting ? <Spin /> : "Shorten URL"}
      </Button>
      {shortenLink ? (
        <div className="mt-20 flex flex-col items-center gap-4">
          <p className="text-4xl">{`s.wuhoops.com/${shortenLink}`}</p>
          <Button
            type="primary"
            size="large"
            className="bg-blue-500"
            onClick={() => {
              handleCopyLink();
            }}
          >
            Copy
          </Button>
        </div>
      ) : (
        <></>
      )}
    </main>
  );
}
