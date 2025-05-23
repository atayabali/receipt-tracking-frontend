import { ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import "react-native-reanimated";
import { useColorScheme } from "@/components/useColorScheme";
import { GreenTheme } from "@/assets/GreenTheme";
import AuthScreen from "./authScreen";
import { AuthProvider, useAuth } from "@/services/authContext";
import LoadingScreen from "./loadScreen";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return <AuthProvider>
    <AuthGate/>
  </AuthProvider>;
}

function AuthGate() {
  const { accessToken, isLoading } = useAuth();
  if(isLoading) return <LoadingScreen />
  // console.log(accessToken);
  // if (user) return <LoadingScreen />; // Optional loading state

  return accessToken ? <RootLayoutNav /> : <AuthScreen />;
}

function RootLayoutNav() {
  return (
    <ThemeProvider value={GreenTheme}>
      <Stack>
        {/* screenOptions={{headerShown: false}} */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: "modal" }} />
      </Stack>
    </ThemeProvider>
  );
}
