import { Button, StyleSheet, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import React, { useState } from "react";
export default function UploadHome() {
   console.log("Upload Tab rendered");
  const [image, setImage] = useState<string | null>(null);

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
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upload Receipts!</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <View style={styles.getStartedContainer}>
        <Button title="Select Photo" onPress={pickImage} color="#841584" />
        {image && <Image source={{ uri: image }} style={styles.image} />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  getStartedContainer: {
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
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
