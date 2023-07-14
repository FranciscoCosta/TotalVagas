import { useState } from "react";

import { View, ScrollView, SafeAreaView, Text } from "react-native";
import { Stack, useRouter } from "expo-router";

import { COLORS, SIZES, SHADOWS, FONT, icons, images } from "../constants";

import {
  ScreenHeaderBtn,
  Hero,
  PopularJobs,
  NearbyJobs,
} from "../components/index";

const Home = () => {
  const router = useRouter();
  const [searchTearm, setsearchTearm] = useState("");

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          title: "TotalVagas",
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn iconUrl={icons.menu} dimension="60%" />
          ),
          headerRight: () => (
            <ScreenHeaderBtn iconUrl={images.profile} dimension="100%" />
          ),
          headerTitleStyle: {
            fontWeight: "bold",
            color: COLORS.primary,
          },
          headerTitleAlign: "center",
        }}
      ></Stack.Screen>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            flex: 1,
            padding: SIZES.medium,
          }}
        ></View>
        <Hero
          searchTearm={searchTearm}
          setsearchTearm={setsearchTearm}
          handleClick={() => {
            if (searchTearm.length > 0) {
              router.push(`search/${searchTearm}`);
            }
          }}
        />
        <PopularJobs />
        <NearbyJobs />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
