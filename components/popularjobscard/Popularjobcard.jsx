import React from "react";

import { View, Text, TouchableOpacity, Image, FlatList } from "react-native";

import { useRouter } from "expo-router";

import styles from "./popularjobcard";

const Popularjobcard = ({item, selectedJob , handleCardPress})=> {
    const router = useRouter();
    return (
        <TouchableOpacity 
        style={styles.container(selectedJob, item)}
        onPress={()=>handleCardPress(item)}
        >
            <TouchableOpacity style={styles.logoContainer(selectedJob, item)}
            >
                <Image
                source={{ uri: item?.employer_logo ? item.employer_logo : 'https://cdn-icons-png.flaticon.com/512/1465/1465405.png' }}
                resizeMode="contain"
                style={styles.logoImage}/>
            </TouchableOpacity>
            <Text style={styles.companyName} numberOfLines={1}>
                {item?.employer_name}
            </Text>
            <View style={styles.infoContainer}>
                <Text style={styles.jobName(selectedJob, item)} numberOfLines={1}>
                    {item?.job_title}
                </Text>
                <Text style ={styles.location}>
                    {item?.job_title}
                </Text>
            </View>
        </TouchableOpacity>
        )
}

export default Popularjobcard;