import { Ionicons } from '@expo/vector-icons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View } from 'react-native';
import Home from '../../app/(tabs)';
import AddPatient from '../../app/(tabs)/addPatient';
import Check_dates from '../../app/(tabs)/check-dates';
import { SCREENS } from '../constants/screens';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
    return (
        <Tab.Navigator 

            screenOptions={{ 
                headerShown: false, 
                sceneStyle:{
                    backgroundColor:'white',
                    paddingHorizontal: 16
                },
                tabBarStyle: {
                    paddingHorizontal:20,
                    marginBottom:0,
                    borderTopWidth:0,
                    backgroundColor:'white'
                },
            }} 
            initialRouteName={SCREENS.Home} >
            <Tab.Screen
                name={SCREENS.Home}
                component={Home}
                options={{
                    title: 'Home',
                    tabBarIcon: ({ size, focused }) => (
                        <Ionicons name="home" size={size} style={{ color: focused? 'black' : 'gray', }} />
                    ),
                    tabBarActiveTintColor:'black',
                    tabBarInactiveTintColor:'gray'
                }}
            />
            <Tab.Screen
                name={SCREENS.AddPatient}
                component={AddPatient}
                options={{
                    title: '',
                    tabBarIcon: ({ size, focused }) => (
                        <View style={{
                            height:70,
                            width:70,
                            alignItems:'center',
                            justifyContent:'center',
                            borderRadius:9999,
                            marginBottom:30
                        }}
                        >
                            <MaterialIcons 
                                name="add-circle" 
                                size={60} 
                                style={{ color: focused? 'black' : 'gray'}} 
                            />
                        </View>
                    ),
                    tabBarActiveTintColor:'black',
                    tabBarInactiveTintColor:'gray'
                }}
            />
            <Tab.Screen
                name={SCREENS.Check_Dates}
                component={Check_dates}
                options={{
                    title: 'Check Dates',
                    tabBarIcon: ({ size, focused }) => (
                        <Ionicons name="calendar" size={size}  style={{ color: focused? 'black' : 'gray' }}/>
                    ),
                    tabBarActiveTintColor:'black',
                    tabBarInactiveTintColor:'gray'
                }}
            />

        </Tab.Navigator>
    )
}
