import React, {useState} from "react";
import { Text, View, SafeAreaView, ActivityIndicator } from "react-native";
import { Stack, useSearchParams } from "expo-router";
import { COLORS, icons, SIZES } from "../../constants";
import useFetch from "../../hook/useFetch";
import { ScreenHeaderBtn } from "../../components";
import { useRouter } from "expo-router";
import { RefreshControl, ScrollView } from "react-native";

const JobDetails = () => {
  const params = useSearchParams();
  const router = useRouter();

  const [refreshing, setrefreshing] = useState(false);

  const onRefresh=()=>{
    setrefreshing(true);
    refetch();
    setrefreshing(false);
  }

  const { data, isLoading, error, refetch } = useFetch("job-details", {
    job_id: params.id,
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          hederShadowVisible: false,
          headerBackVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.left}
              dimension="60%"
              handlePress={() => router.back()}
            />
            
          ),
          headerRight: () => (
            <ScreenHeaderBtn
              iconUrl={icons.share}
              dimension="60%"
              handlePress={() => router.back()}
            />),
            headerTitle: '',
        }}
      />
      <>
      <ScrollView showVerticalScrollIndicator={false} refreshControl ={ <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} >
        {
          isLoading ? (
            <ActivityIndicator size="large" color={COLORS.params} />
          ) : error ? (
            <Text>{error}</Text>
          ) : (
            data.length === 0 ? (
              <Text>Sem informação</Text>
            ) : (
              <View style={{padding: SIZES.medium, paddingBottom: 100}}>
                <Text>xico</Text>
              </View>
            ))}

      </ScrollView>
      </>
    </SafeAreaView>
  );
};

export default JobDetails;
