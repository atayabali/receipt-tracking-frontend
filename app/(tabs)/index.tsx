import { styles } from "@/assets/globalStyles";
import GreenOutlineBtn from "@/components/GreenOutlineBtn";
import { View } from "@/components/Themed";
import Title from "@/components/Title";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import React from "react";

export default function UploadHome() {
  const router = useRouter();
  
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    
    if (!result.canceled) {
      // console.log(result.assets);
      router.push({
        pathname: '/upload/approveImage',
        params: {
          imageUri: result.assets[0].uri,
          mimeType: result.assets[0].mimeType
        }
      })
    }
  };

  return (
    <View style={styles.container}>
      <Title title="Choose Receipt from Photo Gallery"></Title>
      <GreenOutlineBtn handleClick={pickImage} buttonText="Select Photo" />
    </View>
  );
}