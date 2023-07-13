import { useState, useCallback, useEffect } from "react";
import { Text, View, SafeAreaView, ActivityIndicator } from "react-native";
import { Stack, useSearchParams, useRouter } from "expo-router";
import { COLORS, icons, SIZES } from "../../constants";
import useFetch from "../../hook/useFetch";
import { ScreenHeaderBtn } from "../../components";
import { RefreshControl, ScrollView } from "react-native";

import { JobsTabs, Company , Specifics} from "../../components";

const tabs = ["Sobre", "Requisitos", "Dia-a-dia"];

const JobDetails = () => {
  const router = useRouter();
  const params = useSearchParams();
  let id = params.id;

  const { data, isLoading, error, refetch } = useFetch("job-details", {
    job_id: id,
  });
  console.log(data)

  const [refreshing, setrefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const onRefresh = () => {
    setrefreshing(true);
    refetch();
    setrefreshing(false);
  };


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
            />
          ),
          headerTitle: "",
        }}
      />

      <>
        <ScrollView
          showVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {isLoading ? (
            <ActivityIndicator size="large" color={COLORS.params} />
          ) : error ? (
            <Text>Algo deu errado</Text>
          ) : data.length === 0 ? (
            <Text>Sem informação</Text>
          ) : (
            <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
              <Company
                companyLogo={data[0].employer_logo}
                jobTitle={data[0].job_title}
                companyName={data[0].employer_name}
                location={data[0].job_country}
              />
              <JobsTabs
                tabs={tabs}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />

            {
              activeTab === "Sobre" ? (
                <Text>x</Text>): activeTab === "Requisitos" ? (
                  <Specifics
                  title={"Requisitos"}
                  points={data[0].job_highlights?.Qualifications ?? ['N/A']}
                  
                  /> ) : <Text>xs</Text>
            }
            </View>
          )}
        </ScrollView>
      </>
    </SafeAreaView>
  );
};

export default JobDetails;
