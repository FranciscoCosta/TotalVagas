import React from "react";

import { View, Text, TouchableOpacity, Image, FlatList } from "react-native";

import { useRouter } from "expo-router";

import styles from "./nearbyjobcard.style";

const Nearbyjobcard = ({job, handleNavigate})=> {
    const router = useRouter();
    return (
        <TouchableOpacity 
        style={styles.container}
        onPress={handleNavigate}
        >
            <TouchableOpacity style={styles.logoContainer}>
                <Image
                source={{ uri: job?.employer_logo ? job.employer_logo : 'https://cdn-icons-png.flaticon.com/512/1465/1465405.png' }}
                resizeMode="contain"
                style={styles.logoImage}/>
            </TouchableOpacity>
            <View style={styles.textContainer}>
                <Text style={styles.jobName} numberOfLines={1}>
                    {job?.job_title}
                </Text>
                <Text style ={styles.jobType}>
                    {job.employer_name}
                </Text>
            </View>
        </TouchableOpacity>
        )
}

export default Nearbyjobcard;