import axios from "axios";
import { urlPrefix } from "./configureUrl";
import * as FileSystem from "expo-file-system";
import { Platform } from "react-native";

// Convert imageUri to Blob
const convertUriToBlob = async (uri: string, mimeType: string) => {
  const response = await fetch(uri);
  const blob = await response.blob();
  return blob;
};

export const getS3Url = async (filename: string, mimetype: string) => {
  var response = await axios.post(`${urlPrefix}/images/s3Url`, {
    fileName: filename,
    mimeType: mimetype,
  });

  return response.data.url;
};

export const uploadImageWithPresignedUrl = async (
  preSignedUrl: string,
  mimeType: string,
  imageUri: string
) => {
  if (Platform.OS === "web") {
    var blob = await convertUriToBlob(imageUri, mimeType);
    var response = await axios.put(preSignedUrl, blob, {
      headers: {
        "Content-Type": mimeType, // Image Type must match one used in presignedUrl generation
      },
    });
    return response;
  } else {
    const fileInfo = await FileSystem.getInfoAsync(imageUri);

    if (!fileInfo.exists) {
      console.error("File does not exist:", imageUri);
      return;
    }

    // Upload the file directly using its URI
    const fileUploadResponse = await FileSystem.uploadAsync(
      preSignedUrl,
      imageUri,
      {
        httpMethod: "PUT",
        headers: {
          "Content-Type": "image/jpeg", // Adjust based on file type
        },
      }
    );
    console.log(fileUploadResponse);
    return fileUploadResponse
  }
};

export const analyzeExpense = async (objectName: string) => {
  var response = await axios.get(
    `${urlPrefix}/images/analyzeExpense/${objectName}`
  );
  return response.data;
};


export const getImageByKey = async (objectName: string) => {
  var response = await axios.get(
    `${urlPrefix}/images/s3Object/${objectName}`
  );
  return response.data.imageUri;
};


