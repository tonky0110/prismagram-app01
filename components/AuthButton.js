import React from 'react';
import styled from 'styled-components';
import constants from '../constants';
import PropsTypes from 'prop-types';
import { ActivityIndicator } from 'react-native';

const Touchable = styled.TouchableOpacity``;

const Container = styled.View`
	background-color: ${(props) => props.theme.blueColor};
	padding: 10px;
	margin: 0px 50px;
	border-radius: 4px;
	width: ${constants.width / 2};
`;

const Text = styled.Text`
	color: white;
	text-align: center;
	font-weight: 600;
`;

const AuthButton = ({ text = '', onPress = null, loading = false }) => (
	<Touchable disabled={loading} onPress={onPress}>
		<Container>{loading ? <ActivityIndicator color={'white'} /> : <Text>{text}</Text>}</Container>
	</Touchable>
);

AuthButton.propsTypes = {
	text: PropsTypes.string.isRequired,
	onPress: PropsTypes.func.isRequired,
	loading: PropsTypes.bool
};
export default AuthButton;
