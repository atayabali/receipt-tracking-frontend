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
import * as Progress from "react-native-progress";
import { ScrollView } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
export default function ApproveImage() {
  const [uploadStatus, onStatusUpdate] = useState("none"); //pending, complete, none
  const router = useRouter();
  const searchParams = useSearchParams();
  var imageUri = searchParams.get("imageUri") ?? "";
  var mimeType = searchParams.get("mimeType") ?? "";

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
    } catch (e) {
      onStatusUpdate("failure");
    } finally {
      onStatusUpdate("none");
    }
    router.push({
      pathname: "/upload/saveData",
      params: {
        expenseData: JSON.stringify(imageData),
        imageKey: randomlyGeneratedFileName
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
      {(uploadStatus === "pending" || uploadStatus === "success")
       &&
          <View style={{alignItems: 'center', backgroundColor:  "rgb(188, 189, 203)"}}>
            <Text> Processing in progress</Text>
            <Progress.Circle size={30} indeterminate={true} />
          </View>
      }

      {
      uploadStatus === "failure" && 
        <View style={{alignItems: 'center', backgroundColor:  "rgb(188, 189, 203)"}}>
          <Text>
            Processing of image failed
          </Text>
          <FontAwesome6
            name="xmark"
            size={60}
            color="red"
            style={{ alignSelf: "center" }}
          />
        </View>
      }
    </ScrollView>
  );
}
