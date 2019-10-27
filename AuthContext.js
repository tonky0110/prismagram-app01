import React, { createContext, useContext, useState } from 'react';
import { AsyncStorage } from 'react-native';

export const AuthContext = createContext();

export const AuthProvider = ({ isLoggedIn: isLoggedInProps, children }) => {
	const [ isLoggedIn, setIsLoggedIn ] = useState(isLoggedInProps);

	const logUserIn = async (token) => {
		console.log(token);
		try {
			await AsyncStorage.setItem('isLoggedIn', 'true');
			await AsyncStorage.setItem('token', token);
			setIsLoggedIn(true);
		} catch (error) {
			console.log('1)', error);
		}
	};

	const logUserOut = async () => {
		try {
			await AsyncStorage.setItem('isLoggedIn', 'false');
			setIsLoggedIn(false);
		} catch (error) {
			console.log(error);
		}
	};

	return <AuthContext.Provider value={{ isLoggedIn, logUserIn, logUserOut }}>{children}</AuthContext.Provider>;
};

export const useIsLoggedIn = () => {
	const { isLoggedIn } = useContext(AuthContext);
	return isLoggedIn;
};

export const useLogIn = () => {
	const { logUserIn } = useContext(AuthContext);
	return logUserIn;
};

export const useLogOut = () => {
	const { logUserOut } = useContext(AuthContext);
	return logUserOut;
};
