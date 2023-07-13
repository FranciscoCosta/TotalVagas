import React from "react";

import { View, Text, TouchableOpacity, Image, FlatList } from "react-native";

import { useRouter } from "expo-router";
import styles from "./popularjobs.style";
import { Popularjobcard } from "../index";
import { COLORS , SIZES } from "../../constants/index";
import { ActivityIndicator } from "react-native-web";

import useFetch from '../../hook/useFetch';

const PopularJobs =()=> {

    const { data, isLoading, error } = useFetch("search", {
        query: "React developer",
        num_pages: "1",
      });

    const router = useRouter();
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Trabalhos em alta:</Text>
                <TouchableOpacity>
                    <Text style={styles.headerBtn}>Ver todos</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.cardsContainer}>
            {isLoading ? (
                <ActivityIndicator size="large" color={COLORS.primary} />
            ) : (
                error ? (
                    <Text>{error}</Text>
                ) : (
                    <FlatList
                    data={data}
                    renderItem={({item})=>(
                        <Popularjobcard item={item}
                        />
                    )}
                    keyExtractor={item=>item?.job_id}
                    contentContainerStyle={{ columnGap: SIZES.padding}}
                    horizontal
                    />   
            ))}
            
                </View>
        </View>)
}


export default PopularJobs;