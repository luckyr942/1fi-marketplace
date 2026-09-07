import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CustomFloatingTabBar from '../components/navigations/CustomFloatingTabBar';

import HomeScreen from "../screens/HomeScreen";
import ShopScreen from "../screens/ShopScreen";
import EMIDuesScreen from "../screens/EMIDues";
import LimitScreen from "../screens/LimitScreen";
import ProfileScreen from "../screens/ProfileScreen";


const Tab = createBottomTabNavigator();

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName="Home"
                tabBar={(props) => (
                    <CustomFloatingTabBar {...props} />
                )}
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Tab.Screen name="Home" component={HomeScreen} />
                <Tab.Screen name="Shop" component={ShopScreen} />
                <Tab.Screen name="EMI Dues" component={EMIDuesScreen} />
                <Tab.Screen name="Limit" component={LimitScreen} />
                <Tab.Screen name="Profile" component={ProfileScreen} />
            </Tab.Navigator>

        </NavigationContainer>
    )
}