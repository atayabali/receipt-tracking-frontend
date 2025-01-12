import { Button, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Text, View } from "@/components/Themed";
import React, { useState } from "react";
import { useRouter } from "expo-router";
export default function UploadHome() {
  const [image, setImage] = useState<string | null>(null);
  const router = useRouter();
  
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      router.push({
        pathname: '/upload/approveupload',
        params: {receiptImg: image}
      })
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Receipt from Photo Gallery</Text>
      <View
        style={styles.separator}
        // lightColor="#eee"
        // darkColor="rgba(255,255,255,0.1)"
      />
      <View style={styles.getStartedContainer}>
        <Button title="Select Photo" onPress={pickImage} color="rgb(228 239 231)" /> 
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "rgb(196 218 210)"
  },
  getStartedContainer: {
    // borderColor: "rgb(6 68 32)",
    // borderWidth: 1,
    // color: "rgb(228 239 231)",
    alignItems: "center",
    marginHorizontal: 50,
  },
  image: {
    width: 200,
    height: 200,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: 'rgb(6, 68, 32)'
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
