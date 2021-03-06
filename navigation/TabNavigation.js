import { Platform, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import Home from '../screens/Tabs/Home';
import Notifications from '../screens/Tabs/Notifications';
import Detail from '../screens/Detail';
import UserDetail from '../screens/UserDetail';
import Profile from '../screens/Tabs/Profile';
import Search from '../screens/Tabs/Search';

import MessagesLink from '../components/MessagesLink';
import React from 'react';
import NavIcon from '../components/NavIcon';
import { stackStyles } from './config';
import styles from '../styles';

const stackFactory = (initialRoute, customConfig) =>
	createStackNavigator(
		{
			InitialRoute: {
				screen: initialRoute,
				navigationOptions: { ...customConfig }
			},
			Detail: {
				screen: Detail,
				navigationOptions: {
					title: 'Photo'
				}
			},
			UserDetail: {
				screen: UserDetail,
				navigationOptions: ({ navigation }) => ({
					title: navigation.getParam('username')
				})
			}
		},
		{
			defaultNavigationOptions: {
				headerBackTitle: null,
				headerTintColor: styles.blackColor,
				headerStyle: { ...stackStyles }
			}
		}
	);

export default createBottomTabNavigator(
	{
		Home: {
			screen: stackFactory(Home, {
				headerTitle: <NavIcon name="logo-instagram" />,
				headerRight: <MessagesLink />
			}),
			navigationOptions: {
				tabBarIcon: ({ focused }) => (
					<NavIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-home' : 'md-home'} />
				)
			}
		},
		Search: {
			screen: stackFactory(Search, {
				headerBackTitle: null
			}),
			navigationOptions: {
				tabBarIcon: ({ focused }) => (
					<NavIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-search' : 'md-search'} />
				)
			}
		},
		Add: {
			screen: View,
			navigationOptions: {
				tabBarIcon: ({ focused }) => (
					<NavIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-add' : 'md-add'} size={28} />
				),
				tabBarOnPress: ({ navigation }) => navigation.navigate('PhotoNavigation')
			}
		},
		Notifications: {
			screen: stackFactory(Notifications, {
				title: 'Notifications'
			}),
			navigationOptions: {
				tabBarIcon: ({ focused }) => (
					<NavIcon
						focused={focused}
						name={
							Platform.OS === 'ios' ? focused ? (
								'ios-heart'
							) : (
								'ios-heart-empty'
							) : focused ? (
								'md-heart'
							) : (
								'md-heart-empty'
							)
						}
					/>
				)
			}
		},
		Profile: {
			screen: stackFactory(Profile, {
				title: 'Profile'
			}),
			navigationOptions: {
				tabBarIcon: ({ focused }) => (
					<NavIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-person' : 'md-person'} />
				)
			}
		}
	},
	{
		// initialRouteName: 'Profile',
		tabBarOptions: {
			showLabel: false,
			style: {
				backgroundColor: '#FAFAFA'
			}
		}
	}
);
