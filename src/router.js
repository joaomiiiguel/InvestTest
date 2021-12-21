import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { SafeAreaView } from 'react-native'

import Homepage from './screens/Home'

const Stack = createNativeStackNavigator()

export default function Router() {

    return (
        <SafeAreaView>
            <NavigationContainer>
                <Stack.Navigator initalRouteName="Home" screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="Home" component={Homepage} />
                </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaView>
    )
}