import React from 'react';
import {createStackNavigator, createAppContainer, createSwitchNavigator} from 'react-navigation';
import AddPlantScreen from '../screens/PlantsDictionaryScreen';
import {AuthLoadingScreen} from '../screens/AuthLoadingScreen';
import {SignInScreen} from '../screens/SignInScreen';
import {TourScreen} from '../screens/TourScreen';

import MainTabNavigator from './MainTabNavigator';

const AuthStack = createStackNavigator({ SignIn: SignInScreen });
const TourStack = createStackNavigator({ Tour: TourScreen, AddPlant: AddPlantScreen });

export default createAppContainer(
    createSwitchNavigator(
        {
            // You could add another route here for authentication.
            // Read more at https://reactnavigation.org/docs/en/auth-flow.html
            AuthLoading: AuthLoadingScreen,
            Tour: TourStack,
            Main: MainTabNavigator,
            Auth: AuthStack,
        },
        {
            initialRouteName: 'Main',
        },
    ),
);
