import { Platform } from "react-native";

var checkAWS = false;

var localhost = Platform.OS === "web" ? "localhost" : "10.0.0.101"; // "192.168.0.86";
localhost = checkAWS ? "54.89.224.122" : localhost;

export var urlPrefix = `http://${localhost}:5000`; //I really need to set this globally

