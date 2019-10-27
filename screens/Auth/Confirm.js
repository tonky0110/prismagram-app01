import React, { useState } from 'react';
import styled from 'styled-components';
import AuthButton from '../../components/AuthButton';
import AuthInput from '../../components/AuthInput';
import useInput from '../../hooks/useInput';
import { Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useMutation } from 'react-apollo-hooks';
import { CONFIRM_SECRET } from './AuthQueries';
import { useLogIn } from '../../AuthContext';

const View = styled.View`
	justify-content: center;
	align-items: center;
	flex: 1;
`;

const Text = styled.Text``;

export default ({ navigation }) => {
	const confirmInput = useInput('');
	const login = useLogIn();
	const [ loading, setLoading ] = useState(false);
	const [ confirmSecretMutation ] = useMutation(CONFIRM_SECRET, {
		variables: {
			secret: confirmInput.value,
			email: navigation.getParam('email')
		}
	});
	const handleConfirm = async () => {
		const { value } = confirmInput;
		if (value === '' || !value.includes(' ')) {
			Alert.alert('Invalid secret.');
		}
		try {
			setLoading(true);
			const { data: { confirmSecret } } = await confirmSecretMutation();
			if (confirmSecret !== '' || confirmSecret !== false) {
				login(confirmSecret);
			} else {
				Alert.alert('Wrong secret');
			}
		} catch (error) {
			console.log('error: ', error);
			Alert.alert("Can't log in now");
		} finally {
			setLoading(false);
		}
	};
	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<View>
				<AuthInput
					{...confirmInput}
					placeholder={'Confirm'}
					returnKeyType={'send'}
					onSubmitEditing={handleConfirm}
					autoCorrect={false}
				/>
				<AuthButton text={'Confirm'} onPress={handleConfirm} loading={loading} />
			</View>
		</TouchableWithoutFeedback>
	);
};
