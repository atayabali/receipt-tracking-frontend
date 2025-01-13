import { Text, View } from "@/components/Themed";
import axios from "axios";
import { useSearchParams } from "expo-router/build/hooks";
import { Image, StyleSheet, TouchableOpacity } from "react-native";

export default function ApproveUpload() {
  const searchParams = useSearchParams();
  var imageUri = searchParams.get("imageUri");
  var localhost = "192.168.0.86"; //"localhost" was not working;
  var urlPrefix = `http://${localhost}:5000`;

  const uploadImage = async () => {
    axios
      .post(`${urlPrefix}/uploadImage`, {
        image: imageUri,
        fileName: searchParams.get("fileName"),
      })
      .then((res) => console.log(res))
      .catch((error) => {
        console.error("Error occurred:", error.message);
        console.error(error);
      })
      .finally(() => console.log("finally"));
  };

  return (
    //TODO: Add text box where user can choose file name - depends on how things work in S3
    <View style={styles.container}>
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
        <Text style={{ color: "rgb(0, 62, 41)" }}>Select Photo</Text>
      </TouchableOpacity>
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
