"use client";
import React, { useState } from "react";
import SelectTopic from "./_components/SelectTopic";
import SelectStyle from "./_components/SelectStyle";
import SelectDuration from "./_components/SelectDuration";
import { Button } from "@/components/ui/button";
import axios from "axios";
import CustomLoading from "./_components/CustomLoading";

const CreateNew = () => {
  const [formdata, setFormData] = useState([]);
  const [loadingState, setLoadingState] = useState(false);
  const [videoScript, setVideoScript] = useState();
  
  const onHandleInputChange = (fieldName, fieldValue) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: fieldValue,
    }));
  };

  const onCreateClickHandler = () => {
    getVideoScript();
  };
  //get video script

  const getVideoScript = async () => {
    setLoadingState(true);
    try {
      const prompt =
        "Write a script to generate " +
        formdata.duration +
        " video on topic: " +
        formdata.topic +
        " along with Al image prompt in " +
        formdata.imageStyle +
        " format for each scene and give me result in JSON format with imagePrompt and ContentText as field";
      const result = await axios.post("/api/get-video-script", { prompt });
      console.log(result.data);
      setVideoScript(result.data);

    } catch (error) {
      console.error("Error fetching video script:", error);
    }
    setLoadingState(false);
  };

  return (
    <div className="md:px-20">
      <h2 className="font-bold text-4xl text-primary text-center">
        Create New
      </h2>

      <div className="mt-10 shadow-md p-10">
        {/* select topic */}
        <SelectTopic onUserSelect={onHandleInputChange} />

        {/* select style */}
        <SelectStyle onUserSelect={onHandleInputChange} />

        {/* select duration  */}
        <SelectDuration onUserSelect={onHandleInputChange} />

        {/* create button */}
        <Button className="mt-10 w-full" onClick={onCreateClickHandler}>
          Create Short Video
        </Button>
      </div>
      <CustomLoading loading={loadingState}/>
    </div>
  );
};

export default CreateNew;
