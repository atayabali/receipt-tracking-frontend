import { styles } from "@/assets/globalStyles";
import GreenOutlineBtn from "@/components/GreenOutlineBtn";
import { Text, View } from "@/components/Themed";
import Title from "@/components/Title";
import axios from "axios";
import { useSearchParams } from "expo-router/build/hooks";
import React, { useState } from "react";
import { Image, Platform } from "react-native";

export default function ApproveImage() {
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
      {uploadStatus == 'none' && <View style={styles.container}>
      <Title title="Confirm Receipt Upload"></Title>
      {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
      <Text style={styles.subtitle}>
        Are you sure you want to process this receipt?
      </Text>
      <GreenOutlineBtn handleClick={uploadImage} buttonText="Confirm Upload"/>
      </View>
      }
      {uploadStatus == 'pending' && <Text>Upload to Cloud In Progress</Text>}
      {uploadStatus == 'complete' && <Text>Success!!!</Text>}
      {uploadStatus == 'failure' && <Text>Upload unsuccesful!!!</Text>}
    </View>
  );
}