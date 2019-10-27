import React, { useState } from 'react';
import styled from 'styled-components';
import AuthButton from '../../components/AuthButton';
import AuthInput from '../../components/AuthInput';
import useInput from '../../hooks/useInput';
import { Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useMutation } from 'react-apollo-hooks';
import { CREATE_ACCOUNT } from './AuthQueries';

const View = styled.View`
	justify-content: center;
	align-items: center;
	flex: 1;
`;

const Text = styled.Text``;

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
	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<View>
				<AuthInput {...fNameInput} placeholder={'First name'} autoCapitalize={'words'} />
				<AuthInput {...lNameInput} placeholder={'Last name'} autoCapitalize={'words'} />
				<AuthInput {...emailInput} placeholder={'Email'} keyboardType={'email-address'} autoCorrect={false} />
				<AuthInput {...usernameInput} placeholder={'Username'} autoCorrect={false} returnKeyType={'send'} />
				<AuthButton text={'Sign Up'} onPress={handleSignup} loading={loading} />
			</View>
		</TouchableWithoutFeedback>
	);
};
