import { Platform, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import Home from '../screens/Tabs/Home';
import Notifications from '../screens/Tabs/Notifications';
import Profile from '../screens/Tabs/Profile';
import Search from '../screens/Tabs/Search';
import MessagesLink from '../components/MessagesLink';
import React from 'react';
import NavIcon from '../components/NavIcon';

const stackFactory = (initialRoute, customConfig) =>
	createStackNavigator({
		InitialRoute: {
			screen: initialRoute,
			navigationOptions: { ...customConfig }
		}
	});

export default createBottomTabNavigator(
	{
		Home: {
			screen: stackFactory(Home, {
				headerTitle: <NavIcon name="logo-instagram" />,
				headerRight: <MessagesLink />
			}),
			navigationOptions: {
				tabBarIcon: <NavIcon name={Platform.OS === 'ios' ? 'ios-home' : 'md-home'} />
			}
		},
		Search: {
			screen: stackFactory(Search, {
				title: 'Search'
			}),
			navigationOptions: {
				tabBarIcon: <NavIcon name={Platform.OS === 'ios' ? 'ios-search' : 'md-search'} />
			}
		},
		Add: {
			screen: View,
			navigationOptions: {
				tabBarIcon: <NavIcon name={Platform.OS === 'ios' ? 'ios-add' : 'md-add'} />,
				tabBarOnPress: ({ navigation }) => navigation.navigate('PhotoNavigation')
			}
		},
		Notifications: {
			screen: stackFactory(Notifications, {
				title: 'Notifications'
			}),
			navigationOptions: {
				tabBarIcon: <NavIcon name={Platform.OS === 'ios' ? 'ios-heart' : 'md-heart'} />
			}
		},
		Profile: {
			screen: stackFactory(Profile, {
				title: 'Profile'
			}),
			navigationOptions: {
				tabBarIcon: <NavIcon name={Platform.OS === 'ios' ? 'ios-person' : 'md-person'} />
			}
		}
	},
	{
		tabBarOptions: {
			showLabel: false
		}
	}
);
