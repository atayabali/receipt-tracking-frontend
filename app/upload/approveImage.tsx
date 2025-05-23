import { styles } from "@/assets/globalStyles";
import GreenOutlineBtn from "@/components/GreenOutlineBtn";
import { Text, View } from "@/components/Themed";
import Title from "@/components/Title";
import {
  analyzeExpense,
  getS3Url,
  uploadImageWithPresignedUrl,
} from "@/services/imageService";
import { useRouter, useSearchParams } from "expo-router/build/hooks";
import React, { useState } from "react";
import { Image } from "react-native";
import { Guid } from "typescript-guid";
import { ScrollView } from "react-native";
import ProgressCircle from "./progressCircle";
import UploadFailure from "./uploadFailure";
import { useAuth } from "@/services/authContext";
import { setAccessToken } from "@/services/api";
export default function ApproveImage() {
  const [uploadStatus, onStatusUpdate] = useState("none"); //pending, complete, none
  const router = useRouter();
  const searchParams = useSearchParams();
  var imageUri = searchParams.get("imageUri") ?? "";
  var mimeType = searchParams.get("mimeType") ?? "";

  const { accessToken } = useAuth(); // Get token from context

  // Set the token provider dynamically
  setAccessToken(accessToken);
  const uploadImage = async (randomlyGeneratedFileName: string) => {
    try {
      var url = await getS3Url(randomlyGeneratedFileName, mimeType);
      const response = await uploadImageWithPresignedUrl(
        url,
        mimeType,
        imageUri
      );
      if (response.status == 200) {
        onStatusUpdate("success");
      }
    } catch (error) {
      onStatusUpdate("failure");
      console.error(error);
    }
  };

  const uploadImageAndAnalyse = async () => {
    onStatusUpdate("pending");
    var randomlyGeneratedFileName = Guid.create().toString();
    try {
      await uploadImage(randomlyGeneratedFileName);
      var imageData = await analyzeExpense(randomlyGeneratedFileName);
      console.log(imageData);
    } catch (e) {
      onStatusUpdate("failure");
    } finally {
      onStatusUpdate("none");
    }
    router.push({
      pathname: "/upload/saveData",
      params: {
        expenseData: JSON.stringify(imageData),
        imageKey: randomlyGeneratedFileName,
        imageUri: imageUri
      },
    });
  };

  return (
    <ScrollView style={styles.container}>
      {uploadStatus == "none" && (
        <View style={styles.imgContainer}>
          <Title title="Confirm Receipt Upload"></Title>
          {imageUri && (
            <Image source={{ uri: imageUri }} style={styles.image} />
          )}
          <Text style={styles.subtitle}>
            Are you sure you want to process this receipt?
          </Text>
          <GreenOutlineBtn
            handleClick={uploadImageAndAnalyse}
            buttonText="Confirm Upload"
          />
        </View>
      )}

      {(uploadStatus === "pending" || uploadStatus === "success") && (
        <ProgressCircle message="Extracting text from image" />
      )}

      {uploadStatus === "failure" && (
        <UploadFailure message="Failed to process image" />
      )}
    </ScrollView>
  );
}
