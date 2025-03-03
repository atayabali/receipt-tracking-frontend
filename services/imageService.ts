import axios from "axios";
import { urlPrefix } from "./configureUrl";
import * as FileSystem from "expo-file-system";
import { Platform } from "react-native";

// Helper function to convert Base64 to Blob
function base64ToBlob(base64: string, contentType: string): Blob {
  const byteCharacters = atob(base64);
  const byteArrays = [];
  for (let offset = 0; offset < byteCharacters.length; offset += 512) {
    const slice = byteCharacters.slice(offset, offset + 512);
    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }
    byteArrays.push(new Uint8Array(byteNumbers));
  }
  return new Blob(byteArrays, { type: contentType });
}

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
