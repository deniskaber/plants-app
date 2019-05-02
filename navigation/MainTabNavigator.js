import React from 'react';
import {createStackNavigator, createBottomTabNavigator} from 'react-navigation';
import CalendarIcon from '../components/icons/CalendarIcon';
import PlantsIcon from '../components/icons/PlantsIcon';
import SettingsIcon from '../components/icons/SettingsIcon';

import Colors from '../constants/Colors';
import PlantAdditionalDetailsScreen from '../screens/PlantAdditionalDetailsScreen';
import PlantsDictionaryScreen from '../screens/PlantsDictionaryScreen';
import AddPlantDetailsScreen from '../screens/AddPlantDetailsScreen';
import AddPlantWateringScreen from '../screens/AddPlantWateringScreen';
import AddPlantAdditionalDetailsScreen from '../screens/AddPlantAdditionalDetailsScreen';
import PlantWateringSettingsScreen from '../screens/PlantWateringSettingsScreen';
import UserPlantsListScreen from '../screens/UserPlantsListScreen';
import LinksScreen from '../screens/LinksScreen';
import PlantDetailsScreen from '../screens/PlantDetailsScreen';
import SettingsScreen from '../screens/SettingsScreen';

const HomeStack = createStackNavigator({
    Home: UserPlantsListScreen,
    PlantDetails: PlantDetailsScreen,
    PlantAdditionalDetails: PlantAdditionalDetailsScreen,
    PlantWateringSettings: PlantWateringSettingsScreen,
    AddPlant: PlantsDictionaryScreen,
    AddPlantDetails: AddPlantDetailsScreen,
    AddPlantWatering: AddPlantWateringScreen,
    AddPlantAdditionalDetails: AddPlantAdditionalDetailsScreen,
});

const getPlantsTabBarIcon = ({focused}) => (
    <PlantsIcon fill={focused ? Colors.tabIconSelected : Colors.tabIconDefault} />
);

HomeStack.navigationOptions = ({navigation}) => {
    let tabBarVisible = true;

    let routeName = navigation.state.routes[navigation.state.index].routeName;

    if (routeName !== 'Home') {
        tabBarVisible = false;
    }

    return {
        tabBarVisible,
        tabBarIcon: getPlantsTabBarIcon,
    };
};

const LinksStack = createStackNavigator({
    Links: LinksScreen,
});

LinksStack.navigationOptions = {
    tabBarIcon: ({focused}) => <CalendarIcon fill={focused ? Colors.tabIconSelected : Colors.tabIconDefault} />,
};

const SettingsStack = createStackNavigator({
    Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
    tabBarIcon: ({focused}) => <SettingsIcon fill={focused ? Colors.tabIconSelected : Colors.tabIconDefault} />,
};

export default createBottomTabNavigator(
    {
        HomeStack,
        LinksStack,
        SettingsStack,
    },
    {
        tabBarOptions: {
            showLabel: false,
            style: {
                borderTopWidth: 0,
                height: 64,
                backgroundColor: '#fff',
                shadowColor: '#000',
                shadowOpacity: 0.08,
                shadowRadius: 8,
            },
        },
    },
);
