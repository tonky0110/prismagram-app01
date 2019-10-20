import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import Home from '../screens/Tabs/Home';
import Notifications from '../screens/Tabs/Notifications';
import Profile from '../screens/Tabs/Profile';
import Search from '../screens/Tabs/Search';

const stackFactory = (initialRoute, customConfig) =>
	createStackNavigator({
		InitialRoute: {
			screen: initialRoute,
			navigationOptions: { ...customConfig }
		}
	});

export default createBottomTabNavigator({
	Home: {
		screen: stackFactory(Home, {
			title: 'Home',
			headerRight: (
				<TouchableOpacity>
					<Text>Hello</Text>
				</TouchableOpacity>
			)
		})
	},
	Search: {
		screen: stackFactory(Search, {
			title: 'Search'
		})
	},
	Add: {
		screen: View,
		navigationOptions: {
			tabBarOnPress: ({ navigation }) => navigation.navigate('PhotoNavigation')
		}
	},
	Notifications: {
		screen: stackFactory(Notifications, {
			title: 'Notifications'
		})
	},
	Profile: {
		screen: stackFactory(Profile, {
			title: 'Profile'
		})
	}
});