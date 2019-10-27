import React, { useState } from 'react';
import styled from 'styled-components';
import { useMutation } from 'react-apollo-hooks';
import { Alert, Keyboard, TouchableWithoutFeedback } from 'react-native';
import * as Facebook from 'expo-facebook';
import * as Google from 'expo-google-app-auth';
import AuthButton from '../../components/AuthButton';
import AuthInput from '../../components/AuthInput';
import useInput from '../../hooks/useInput';
import { CREATE_ACCOUNT } from './AuthQueries';

const View = styled.View`
	justify-content: center;
	align-items: center;
	flex: 1;
`;

const FBContainer = styled.View`
	margin-top: 25px;
	padding-top: 25px;
	border-top-width: 1px;
	border-color: ${(props) => props.theme.lightGreyColor};
	border-style: solid;
`;

export default ({ navigation }) => {
	const fNameInput = useInput('');
	const lNameInput = useInput('');
	const emailInput = useInput('');
	const usernameInput = useInput('');
	const [ loading, setLoading ] = useState(false);
	const [ createAccountMutation ] = useMutation(CREATE_ACCOUNT, {
		variables: {
			firstName: fNameInput.value,
			lastName: lNameInput.value,
			email: emailInput.value,
			username: usernameInput.value
		}
	});
	const handleSignup = async () => {
		const { value: fName } = fNameInput;
		const { value: lName } = lNameInput;
		const { value: email } = emailInput;
		const { value: username } = usernameInput;
		const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

		if (!emailRegex.test(email)) {
			return Alert.alert('That email is invalid.');
		}
		if (fName === '') {
			return Alert.alert('I need your name.');
		}
		if (username === '') {
			return Alert.alert('Invalid username');
		}
		try {
			setLoading(true);
			const { data: { createAccount } } = await createAccountMutation();
			if (createAccount) {
				Alert.alert('Account created.', 'Log in now!');
				navigation.navigate('Login', { email });
			}
		} catch (error) {
			console.log('error: ', error);
			Alert.alert('Username taken', 'Log in instead!');
			navigation.navigate('Login', { email });
		} finally {
			setLoading(false);
		}
	};
	const fbLogin = async () => {
		try {
			setLoading(true);
			const { type, token } = await Facebook.logInWithReadPermissionsAsync('2464096673706698', {
				permissions: [ 'public_profile', 'email' ]
			});
			if (type === 'success') {
				// Get the user's name using Facebook's Graph API
				const response = await fetch(
					`https://graph.facebook.com/me?access_token=${token}&fields=id,first_name,last_name,email`
				);
				const { email, first_name: firstName, last_name: lastName } = await response.json();
				updateFormData(email, firstName, lastName);
			} else {
				// type === 'cancel'
			}
		} catch ({ message }) {
			alert(`Facebook Login Error: ${message}`);
		} finally {
			setLoading(false);
		}
	};

	const googleLogin = async () => {
		const GOOGLE_ID = '678482204429-i4gji4q26ie986519vts6v4avfsonqrl.apps.googleusercontent.com';
		console.log('GOOGLE_ID: ', GOOGLE_ID);
		try {
			setLoading(true);
			const result = await Google.logInAsync({
				iosClientId: GOOGLE_ID,
				scopes: [ 'profile', 'email' ]
			});
			if (result.type === 'success') {
				const user = await fetch('https://www.googleapis.com/userinfo/v2/me', {
					headers: { Authorization: `Bearer ${result.accessToken}` }
				});
				const { email, family_name, given_name } = await user.json();
				updateFormData(email, given_name, family_name);
				return result.acceccToken;
			} else {
				return { cancelled: true };
			}
		} catch (error) {
			console.log('error: ', error);
		} finally {
			setLoading(false);
		}
	};
	const updateFormData = (email, firstName, lastName) => {
		const [ username ] = email.split('@');
		emailInput.setValue(email);
		fNameInput.setValue(firstName);
		lNameInput.setValue(lastName);
		usernameInput.setValue(username);
	};
	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<View>
				<AuthInput {...fNameInput} placeholder={'First name'} autoCapitalize={'words'} />
				<AuthInput {...lNameInput} placeholder={'Last name'} autoCapitalize={'words'} />
				<AuthInput {...emailInput} placeholder={'Email'} keyboardType={'email-address'} autoCorrect={false} />
				<AuthInput {...usernameInput} placeholder={'Username'} autoCorrect={false} returnKeyType={'send'} />
				<AuthButton text={'Sign Up'} onPress={handleSignup} loading={loading} />
				<FBContainer>
					<AuthButton text={'Connect Facebook'} onPress={fbLogin} bgColor={'#2D4DA7'} loading={loading} />
					<AuthButton text={'Connect Google'} onPress={googleLogin} bgColor={'#EE1922'} loading={loading} />
				</FBContainer>
			</View>
		</TouchableWithoutFeedback>
	);
};
