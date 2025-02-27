import axios from "axios";
import { urlPrefix } from "./configureUrl";

// Convert imageUri to Blob
const convertUriToBlob = async (uri: string) => {
  const response = await fetch(uri);
  const blob = await response.blob();
  return blob;
};

export const getS3SignUrl = async (filename: string, mimetype: string) => {
  var response = await axios.post(`${urlPrefix}/images/getSignedUrl`, {
    fileName: filename,
    mimeType: mimetype,
  });

  return response.data.url;
};

export const uploadImageWithPresignedUrl = async (
  preSignUrl: string,
  mimeType: string,
  imageUri: string
) => {
  var blob = await convertUriToBlob(imageUri);
  var response = await axios.put(preSignUrl, blob, {
    headers: {
      "Content-Type": mimeType, // Image Type must match one used in presignedUrl generation
    },
  });
  return response;
};

export const analyzeExpense = async (objectName: string) => {
    var response = await axios.get(`${urlPrefix}/images/analyzeExpense/${objectName}`);
}