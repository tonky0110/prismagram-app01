import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import constants from '../../constants';
// import { TouchableOpacity } from 'react-native-gesture-handler';

const View = styled.View`
	justify-content: center;
	align-items: center;
	flex: 1;
`;

const Image = styled.Image`
	width: ${constants.width / 2.5};
	margin-bottom: 0px;
`;

const Touchable = styled.TouchableOpacity``;
const SignupBtn = styled.View`
	background-color: ${(props) => props.theme.blueColor};
	padding: 10px;
	margin: 0px 50px;
	border-radius: 4px;
	width: ${constants.width / 2};
	margin-bottom: 25px;
`;
const SignupBtnText = styled.Text`
	color: white;
	text-align: center;
	font-weight: 600;
`;

const LoginLink = styled.View``;
const LoginLinkText = styled.Text`color: ${(props) => props.theme.blueColor};`;

export default ({ navigation }) => (
	<View>
		<Image resizeMode={'contain'} source={require('../../assets/logo.png')} />
		<Touchable onPress={() => navigation.navigate('Signup')}>
			<SignupBtn>
				<SignupBtnText>Create New Account</SignupBtnText>
			</SignupBtn>
		</Touchable>
		<Touchable onPress={() => navigation.navigate('Login')}>
			<LoginLink>
				<LoginLinkText>Log in</LoginLinkText>
			</LoginLink>
		</Touchable>
	</View>
);
