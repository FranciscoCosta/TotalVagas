import React from "react";
import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";

import { useRouter } from "expo-router";
import styles from "./hero.style";
import { icons, SIZES } from "../../constants";

const jobsTypes = ["Front-end", "Back-end", "Full-stack"];

const Hero = ({searchTearm,setsearchTearm,handleClick}) => {
  const router = useRouter();
  const [activeJobType, setActiveJobType] = useState("Tempo intregal");

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.username}>Olá Francisco Costa.</Text>
        <Text style={styles.message}>Encontra o trabalho para ti !</Text>
        <View style={styles.searchContainer}>
          <View style={styles.searchWrapper}>
            <TextInput
              style={styles.searchInput}
              value={searchTearm}
              onChangeText={(text) => setsearchTearm(text)}
              placeholder="Pesquisar"
            />
          </View>
          <TouchableOpacity style={styles.searchBtn} onPress={handleClick}>
            <Image
              resizeMode="contain"
              style={styles.searchBtnImage}
              source={icons.search}
            ></Image>
          </TouchableOpacity>
        </View>
        <View style={styles.tabsContainer}>
          <FlatList
            data={jobsTypes}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.tab(activeJobType, item)}
                onPress={() => {
                  setActiveJobType(item);
                  router.push(`/search/${item}`);
                }}
              >
                <Text style={styles.tabText(activeJobType, item)}>{item}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item}
            contentContainerStyle={{ columnGap: SIZES.small }}
            horizontal
          />
        </View>
      </View>
    </View>
  );
};

export default Hero;
