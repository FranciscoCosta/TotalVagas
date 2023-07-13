import React from "react";

import { View, Text, TouchableOpacity, Image, FlatList } from "react-native";

import { useRouter } from "expo-router";

import styles from "./popularjobcard";

const Popularjobcard = ({item})=> {
    const router = useRouter();
    return (
        <TouchableOpacity style={styles.container}>
            {/* <Image style={styles.image} source={require("../../assets/images/1.png")}/> */}
            <View style={styles.cardContent}>
                <Text style={styles.title}>Desenvolvedor Fullstack</Text>
                <Text style={styles.company}>Google</Text>
                <Text style={styles.location}>São Paulo, SP</Text>
                <Text style={styles.salary}>R$ 5.000,00</Text>
            </View>
        </TouchableOpacity>)
}

export default Popularjobcard;