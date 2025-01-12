import { StyleSheet, Image, Button } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useSearchParams } from 'expo-router/build/hooks';
import axios from "axios";


export default function ApproveUpload() {
   const searchParams = useSearchParams();
   var imageUri = searchParams.get('imageUri')
   var localhost = "192.168.0.86"; //"localhost" was not working;
   var urlPrefix = `http://${localhost}:5000`;

  const uploadImage = async () => {
    axios.post(`${urlPrefix}/uploadImage`, { 
      image: imageUri,
      fileName: searchParams.get('fileName')
    })
    .then((res) => console.log(res))
    .catch(error => {
      console.error("Error occurred:", error.message);
      console.error(error);
    })
    .finally(() => console.log('finally'));
  };

  return (
    //TODO: Add text box where user can choose file name - depends on how things work in S3
    <View style={styles.container}>
      <Text style={styles.title}>Confirm Receipt Upload!</Text>
      <Text style={styles.subtitle}>Are you sure you want to process this receipt</Text>
      <View style={styles.separator} 
      lightColor="#eee" 
      darkColor="rgba(255,255,255,0.1)" 
      />
      {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
      <Button title="Continue" disabled={imageUri == null} onPress={uploadImage} color="rgb(228 239 231)" /> 
    </View>
  );
}

//TODO: Create a global styles page
const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 300,
    height: 300,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 10
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
