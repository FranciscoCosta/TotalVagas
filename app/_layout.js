import { useFonts } from 'expo-font';
import { Stack } from 'expo-router/stack';
import { useCallback } from 'react';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();


const Layout =() => {
    const [fontsLoaded] = useFonts({
        DMbold: require('../assets/fonts/DMSans-Bold.ttf'),
        DMmedium: require('../assets/fonts/DMSans-Medium.ttf'),
        DMregular: require('../assets/fonts/DMSans-Regular.ttf'),
    })

const onLayoutRootView = useCallback(async () => {
    if(fontsLoaded) {
        await SplashScreen.hideAsync();
    }
}, [fontsLoaded])

    if(!fontsLoaded) return null;

    return <Stack onLayout={onLayoutRootView}/>;
}



export default Layout;