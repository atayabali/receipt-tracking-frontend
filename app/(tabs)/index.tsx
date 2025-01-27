import { Text, View } from "@/components/Themed";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

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
      console.log(result.assets);
      router.push({
        pathname: '/upload/approveImage',
        params: {
          imageUri: result.assets[0].uri,
          fileName: result.assets[0].fileName,
          mimeType: result.assets[0].mimeType
        }
      })
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose Receipt from Photo Gallery</Text>
      <View style={styles.separator}
      lightColor='rgb(0, 62, 41)'
      darkColor='rgb(0, 62, 41)'/>
      <TouchableOpacity style={styles.buttonStyle} onPress={pickImage}>
        <Text style={{ color: "rgb(0, 62, 41)"}}>Select Photo</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgb(188, 189, 203)"
  },
  buttonStyle:{ 
    borderColor: "rgb(0, 62, 41)", 
    borderStyle: "solid", 
    borderWidth: 1,
    padding: 5,
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
    color: 'rgb(0, 62, 41)'
  },
  separator: {
    color: 'rgb(0, 62, 41)',
    borderColor:  'rgb(0, 62, 41)',
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
