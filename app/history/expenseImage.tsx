import GreenOutlineBtn from "@/components/GreenOutlineBtn";
import { getImageByKey } from "@/services/imageService";
import React, { useState } from "react";
import { Image } from "react-native";

export const ExpenseImage = (props: { imageKey: string }) => {
  const [imageUri, setImageUri] = useState<string>("");
  const [showImg, setShowImg] = useState(false);

  //This should really be handled better in terms of need to add "errors" state and red text
  const getAndDisplayImage = async () => {
    if (imageUri === "") {
        console.log(props.imageKey);
        getImageByKey(props.imageKey).then((uri: string) => {
          console.log(uri);
          setImageUri(uri);
          setShowImg(true);
        }).catch((e) => setShowImg(false));
    } else {
        setShowImg(!showImg);
    }
  };

  return (
    <>
      <GreenOutlineBtn
        handleClick={getAndDisplayImage}
        buttonText={!showImg ? "Show Image" : "Hide Image"}
      />
      {showImg && (
        <Image source={{ uri: imageUri }} style={{ width: 200, height: 200, display: "flex", alignSelf: "center", }} />
      )}
    </>
  );
};
