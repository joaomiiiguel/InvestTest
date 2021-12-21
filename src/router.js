import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Homepage from './screens/Home'
import Details from './screens/Details'
import { StatusBar } from 'react-native'

const Stack = createNativeStackNavigator()

export default function Router() {

    return (
        <NavigationContainer>
            <StatusBar headerTintColor="#FFF" backgroundColor= '#005aa5'/>
            <Stack.Navigator initalRouteName="Home" screenOptions={{headerTitleAlign: 'center'}} >
                <Stack.Screen name="Home" component={Homepage}
                    options={{
                        title: 'Resgate',
                        headerStyle: {
                            backgroundColor: '#005aa5',
                        },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },
                    }} />
                <Stack.Screen name="Details" component={Details}
                    options={{
                        title: 'Detalhes de Resgate',
                        headerStyle: {
                            backgroundColor: '#005aa5',
                        },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },
                    }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}