import { Button, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Text, View } from "@/components/Themed";
import React from "react";
import { useRouter } from "expo-router";

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
      if(result == null || result.assets[0].uri == null){ //TODO: Add error message to retry, figure out why it's failing the first try
        console.log("Result was null");
        return;
      }
      router.push({
        pathname: '/upload/approveupload',
        params: {
          imageUri: result.assets[0].uri,
          fileName: result.assets[0].fileName
        }
      })
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Receipt from Photo Gallery</Text>
      <View style={styles.separator}/>
      <View style={styles.getStartedContainer}>
        <Button title="Select Photo" onPress={pickImage} color="rgb(6, 68, 32)" /> 
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
    color: 'rgb(6, 68, 32)'
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
