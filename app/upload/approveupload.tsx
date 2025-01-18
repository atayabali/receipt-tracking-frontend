import { Text, View } from "@/components/Themed";
import axios from "axios";
import { useSearchParams } from "expo-router/build/hooks";
import React, { useState } from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { Platform } from 'react-native';

export default function ApproveUpload() {
  const [uploadStatus, onStatusUpdate] = useState('none'); //pending, complete, none

  const searchParams = useSearchParams();
  var imageUri = searchParams.get("imageUri");
  var localhost = Platform.OS === 'web' ? "localhost" : '10.0.0.101'// "192.168.0.86"; 
  var urlPrefix = `http://${localhost}:5000`;
  
const getS3SignUrl = async (filename: string, mimetype: string) => {
    var response = await axios
    .post(`${urlPrefix}/presignedUrl`, {
      fileName: filename,
      mimeType: mimetype
    });
    console.log(response.data.url);
    return response.data.url;
}

// Convert imageUri to Blob 
const convertUriToBlob = async (uri: string) => {
  const response = await fetch(uri);
  const blob = await response.blob();
  return blob;
};

const uploadImageWithPresignedUrl = async (url: string, mimeType: string) => {
  var blob = await convertUriToBlob(imageUri ?? "");
  var response = await axios.put(url, blob, {
    headers: {
      // 'x-amz-acl': 'bucket-owner-full-control', //ACLs disabled in S3 bucket so causes 403
      'Content-Type': mimeType, // Image Type must match one used in presignedUrl generation
    },
  }); 
  console.log(response);
  return response; 
};

  const uploadImage = async () => {
    onStatusUpdate('pending');
    var mimeType = searchParams.get("mimeType") ?? "";
    try{
      var url = await getS3SignUrl(searchParams.get("fileName") ?? "", mimeType)
      const response = await uploadImageWithPresignedUrl(url, mimeType);
      if(response.status == 200) onStatusUpdate('success');
    } catch(error){
      onStatusUpdate('failure');
      console.error(error);
    }

  };

  return (
    <View style={styles.container}>
      {uploadStatus == 'none' &&       <View style={styles.container}>
      <Text style={styles.title}>Confirm Receipt Upload</Text>
      <Text style={styles.subtitle}>
        Are you sure you want to process this receipt
      </Text>



      <View
        style={styles.separator}
        lightColor="rgb(0, 62, 41)"
        darkColor="rgb(0, 62, 41)"
      />
      {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
      <TouchableOpacity
        style={styles.buttonStyle}
        disabled={imageUri == null}
        onPress={uploadImage}
      >
        <Text style={{ color: "rgb(0, 62, 41)" }}>Upload to Cloud</Text>
      </TouchableOpacity>
      </View>
      }
      {uploadStatus == 'pending' && <Text>Upload to Cloud In Progress</Text>}
      {uploadStatus == 'complete' && <Text>Success!!!</Text>}
      {uploadStatus == 'failure' && <Text>Upload unsuccesful!!!</Text>}
    </View>
  );
}

//TODO: Create a global styles page
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgb(188, 189, 203)",
  },
  buttonStyle: {
    borderColor: "rgb(0, 62, 41)",
    borderStyle: "solid",
    borderWidth: 1,
    padding: 5,
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "rgb(6, 68, 32)",
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 10,
    color: "rgb(6, 68, 32)",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
