import { StyleSheet, Image, Button } from 'react-native';
import * as ImagePicker from "expo-image-picker";
import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { useSearchParams } from 'expo-router/build/hooks';
import axios from "axios";


export default function ApproveUpload() {
   const searchParams = useSearchParams();
   var receiptImg = searchParams.get('receiptImg');
   console.log("approved image: " + receiptImg);
   var localhost = "192.168.0.86";
  const uploadImage = async () => {
    console.log('upload start');
    axios
    .post(`http://${localhost}:5000/uploadImage`, {image: receiptImg})
    .then((res) => console.log(res))
    .catch(error => {
      console.error("Error occurred:", error.messagej);
      console.error(error);
    })
    .finally(() => console.log('finally'));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Confirm Receipt Upload!</Text>
      <Text style={styles.subtitle}>Are you sure you want to process this receipt</Text>
      <View style={styles.separator} 
      // lightColor="#eee" 
      // darkColor="rgba(255,255,255,0.1)" 
      />
      {receiptImg && <Image source={{ uri: receiptImg }} style={styles.image} />}
      <Button title="Continue" disabled={receiptImg == null} onPress={uploadImage} color="rgb(228 239 231)" /> 
    </View>
  );
}

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
