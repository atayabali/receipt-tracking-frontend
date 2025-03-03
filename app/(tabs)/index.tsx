import { styles } from "@/assets/globalStyles";
import GreenOutlineBtn from "@/components/GreenOutlineBtn";
import { View } from "@/components/Themed";
import Title from "@/components/Title";
import { analyzeExpense } from "@/services/imageService";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import React from "react";

export default function UploadHome() {
  const router = useRouter();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      // allowsEditing: true,
      // aspect: [6, 2],
      quality: 1,
    });

    if (!result.canceled) {
      router.push({
        pathname: "/upload/approveImage",
        params: {
          imageUri: result.assets[0].uri,
          mimeType: result.assets[0].mimeType,
        },
      });
    }
  };

  const tempAnalyze = async () => {
    var traderJoeReceipt = "77d95aa9-d081-111f-7ca0-ec40d4bf1812"
    var aldiReceipt = '546efef8-469b-c471-ae09-66e9965b32ff';
    var walmartReceipt = 'f074548a-b332-53a5-24af-09d6e1a3efd3';
    var expenseData = await analyzeExpense(
      walmartReceipt
    );
    router.push({
      pathname: "/upload/saveData",
      params: {
        expenseData: JSON.stringify(expenseData),
      },
    });
  };

  return (
    <View style={styles.container}>
      <Title title="Choose Receipt from Photo Gallery"></Title>
      <GreenOutlineBtn handleClick={pickImage} buttonText="Select Photo" />
      <GreenOutlineBtn handleClick={tempAnalyze} buttonText="Analyze expense example" />
    </View>
  );
}
