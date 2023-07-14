import { useState, useCallback, useEffect } from "react";
import { Text, View, SafeAreaView, ActivityIndicator } from "react-native";
import { Stack,  useLocalSearchParams, useRouter } from "expo-router";
import { COLORS, icons, SIZES } from "../../constants";
import useFetch from "../../hook/useFetch";
import { ScreenHeaderBtn } from "../../components";
import { RefreshControl, ScrollView } from "react-native";

import { JobsTabs, Company, Specifics, About, Footer } from "../../components";

const tabs = ["Sobre", "Requisitos", "Dia-a-dia", "Benificios"];

const JobDetails = () => {
  const router = useRouter();
// 
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [refreshing, setRefreshing] = useState(false);
  
  // console.log(router.setParams.Scopes[Global].location.pathname,"path");


  const params =  useLocalSearchParams();
  
  const { data, isLoading, error, refetch } = useFetch("job-details", { job_id: params.id });
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch()
    setRefreshing(false)
  }, []);

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

              {activeTab === "Sobre" ? (
                <About info={data[0].job_description ?? "Sem informação"} />
              ) : activeTab === "Requisitos" ? (
                <Specifics
                  title={"Requisitos"}
                  points={
                    data[0].job_highlights?.Qualifications ?? ["Sem informação"]
                  }
                />
              ) : activeTab === "Dia-a-dia" ? (
                <Specifics
                  title="Dia-a-dia"
                  points={
                    data[0].job_highlights?.Responsibilities ?? [
                      "Sem informação",
                    ]
                  }
                />
              ) : (
                <Specifics
                  title={"Benifícios"}
                  points={
                    data[0].job_highlights?.Benefits ?? ["Sem informação"]
                  }
                />
              )}
            </View>
          )}
        </ScrollView>
        <Footer
          url={
            data[0]?.job_google_link ??
            "https://careers.google.com/jobs/results/"
          }
        />
      </>
    </SafeAreaView>
  );
};

export default JobDetails;
