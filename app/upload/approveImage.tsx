import { styles } from "@/assets/globalStyles";
import GreenOutlineBtn from "@/components/GreenOutlineBtn";
import { Text, View } from "@/components/Themed";
import Title from "@/components/Title";
import { analyzeExpense, getS3Url, uploadImageWithPresignedUrl } from "@/services/imageService";
import { useRouter, useSearchParams } from "expo-router/build/hooks";
import React, { useState } from "react";
import { Image } from "react-native";
import { Guid } from "typescript-guid";
import { ScrollView } from "react-native";
export default function ApproveImage() {
  const [uploadStatus, onStatusUpdate] = useState("none"); //pending, complete, none
  const router = useRouter();
  const searchParams = useSearchParams();
  var imageUri = searchParams.get("imageUri") ?? "";
  var mimeType = searchParams.get("mimeType") ?? "";

  const uploadImage = async (randomlyGeneratedFileName: string) => {
    onStatusUpdate("pending");
    
    try {
      var url = await getS3Url(randomlyGeneratedFileName, mimeType);
      const response = await uploadImageWithPresignedUrl(url, mimeType, imageUri);
      if (response.status == 200){
        onStatusUpdate("success");
      }
    } catch (error) {
      onStatusUpdate("failure");
      console.error(error);
    } 
  };

  const uploadImageAndAnalyse = async () => {
    var randomlyGeneratedFileName = Guid.create().toString();
    await uploadImage(randomlyGeneratedFileName);
    var imageData = await analyzeExpense(randomlyGeneratedFileName);
    router.push({
      pathname: "/upload/saveData",
      params: {
        expenseData: JSON.stringify(imageData),
      },
    });
  }

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
      {uploadStatus == "pending" && <Text>Upload to Cloud In Progress</Text>}
      {uploadStatus == "success" && <Text>Upload succeeded. Extracting text from image</Text>}
      {uploadStatus == "failure" && <Text>Upload unsuccesful!!!</Text>}
    </ScrollView>
  );
}
