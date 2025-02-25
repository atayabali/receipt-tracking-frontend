import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import { useColorScheme } from "@/components/useColorScheme";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import React from "react";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      // detachInactiveScreens={true}
      screenOptions={{
        // Documentation: https://reactnavigation.org/docs/bottom-tab-navigator/#options
        // freezeOnBlur: true,
        
        tabBarActiveTintColor: "rgb(255, 255, 255)",
        tabBarInactiveTintColor: "rgb(188, 189, 203)",
        // headerShown: false,
        
      }}
      
    >
      <Tabs.Screen
        name="index"
        
        options={{
          
          title: "Upload Receipts",
          headerTitleStyle: { display: "none" },
          tabBarIcon: () => (
            <TabBarIcon name="upload" color={"rgb(255, 255, 255)"} />
          ),
          //TODO: May permanently remove this header Right later, or change
          // headerRight: () => (
          //   <Link href="/modal" asChild>
          //     <Pressable>
          //       {({ pressed }) => (
          //         <FontAwesome
          //           name="info-circle"
          //           size={25}
          //           color={'rgb(255, 255, 255)'}
          //           style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
          //         />
          //       )}
          //     </Pressable>
          //   </Link>
          // ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: "History",
          headerTitleStyle: { display: "none" },
          tabBarIcon: () => (
            <TabBarIcon name="history" color={"rgb(255, 255, 255)"} />
          ),
        }}
      />
      <Tabs.Screen
        name="addEntry"
        options={{
          title: "Manual Entry",
          headerTitleStyle: { display: "none" },
          tabBarIcon: () => (
            <TabBarIcon name="plus" color={"rgb(255, 255, 255)"} />
          ),
        }}
      />
    </Tabs>
  );
}
