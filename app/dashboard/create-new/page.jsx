"use client";
import React, { useState } from "react";
import SelectTopic from "./_components/SelectTopic";
import SelectStyle from "./_components/SelectStyle";
import SelectDuration from "./_components/SelectDuration";
import { Button } from "@/components/ui/button";
import axios from "axios";
import CustomLoading from "./_components/CustomLoading";
import { v4 as uuidv4 } from 'uuid';

const scriptdata = "In a small village nestled among rolling hills, lived a little star named Twinkle. Twinkle wasn't like other stars. It loved watching the villagers below. But tonight, the village seemed to fade, the lights dimming with worry. Twinkle, filled with determination, decided to fly down to help. It landed in a bakery, illuminating the room with its glow. The baker's face lit up with a smile. The baker, guided by Twinkle's light, re-lit the village one home at a time. The village glowed with happiness once more, thanks to a little star's kindness."
const CreateNew = () => {
  const [formdata, setFormData] = useState({});
  const [loadingState, setLoadingState] = useState(false);
  const [videoScript, setVideoScript] = useState([]);

  const onHandleInputChange = (fieldName, fieldValue) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: fieldValue,
    }));
  };

  const onCreateClickHandler = () => {
    // getVideoScript();
    generateAudioFile(scriptdata);
  };

  const getVideoScript = async () => {
    setLoadingState(true);
    try {
      const prompt =
        "Write a script to generate " +
        formdata.duration +
        " video on topic: " +
        formdata.topic +
        " along with AI image prompt in " +
        formdata.imageStyle +
        " format for each scene and give me result in JSON format with imagePrompt and contentText as fields.";
      const result = await axios.post("/api/get-video-script", { prompt });
      console.log(result.data);

      // Pass the result data for further processing
      setVideoScript(result.data.result);
      generateAudioFile(result.data);
    } catch (error) {
      console.error("Error fetching video script:", error);
    }
    setLoadingState(false);
  };

  const generateAudioFile = async (videoScriptData) => {
   setLoadingState(true);
    let script = "";
    const id = uuidv4();
    // videoScriptData.result.forEach((item) => {
    //   script += item.contentText + " ";
    // });

    await axios.post('/api/generate-audio',{
      text:videoScriptData,
      id:id
    }).then(resp=>{
      console.log(resp.data);
    })

    setLoadingState(false);

    // Placeholder for future implementation of audio file generation
  };
  return (
    <div className="md:px-20">
      <h2 className="font-bold text-4xl text-primary text-center">
        Create New
      </h2>

      <div className="mt-10 shadow-md p-10">
        {/* Select topic */}
        <SelectTopic onUserSelect={onHandleInputChange} />

        {/* Select style */}
        <SelectStyle onUserSelect={onHandleInputChange} />

        {/* Select duration */}
        <SelectDuration onUserSelect={onHandleInputChange} />

        {/* Create button */}
        <Button className="mt-10 w-full" onClick={onCreateClickHandler}>
          Create Short Video
        </Button>
      </div>

      {/* Loading Indicator */}
      <CustomLoading loading={loadingState} />
    </div>
  );
};

export default CreateNew;
