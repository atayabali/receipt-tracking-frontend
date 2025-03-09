import { Platform } from "react-native";

var checkAWS = false;

var localhost = Platform.OS === "web" ? "localhost" :  "192.168.0.86"//"10.0.0.101"; // "192.168.0.86";
export var urlPrefix = checkAWS 
? "http://expenseapi.us-east-1.elasticbeanstalk.com" 
: `http://${localhost}:5000`;

