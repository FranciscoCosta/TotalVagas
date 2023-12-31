import React from "react";

import { View, Text, TouchableOpacity, Image, FlatList } from "react-native";

import { useRouter } from "expo-router";
import styles from "./nearbyjobs.style";
import { Nearbyjobcard } from "../index";
import { COLORS, SIZES } from "../../constants/index";
import { ActivityIndicator } from "react-native";

import useFetch from '../../hook/useFetch';

const NearbyJobs = () => {

    const { data, isLoading, error } = useFetch("search", {
        query: "Desenvolvedor Belo Horizonte Brasil",
        num_pages: "1",
    });

    const router = useRouter();
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Trabalhos perto de você:</Text>
                <TouchableOpacity>
                    <Text style={styles.headerBtn}>Ver todos</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.cardsContainer}>
                {isLoading ? (
                    <ActivityIndicator size="large" color={COLORS.primary} />
                ) : (
                    error ? (
                        <Text>Algo deu errado</Text>
                    ) : (
                        data.map((job) => (
                            <Nearbyjobcard
                                job={job}
                                key={`nearbyjob-${job?.job_id}`}
                                handleNavigate={() => router.push(`/job-details/${job.job_id}`)}
                            />
                        ))
                    ))}

            </View>
        </View>)
}


export default NearbyJobs;