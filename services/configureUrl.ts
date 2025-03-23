import { Platform } from "react-native";

var checkAWS = false;

var localhost = Platform.OS === "web" ? "localhost" : "10.0.0.101"; // "192.168.0.86";
export var urlPrefix = checkAWS 
? "http://expenses-env-1.eba-hsbc9and.us-east-1.elasticbeanstalk.com" 
: `http://${localhost}:5000`;

