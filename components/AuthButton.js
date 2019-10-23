import React from 'react';
import styled from 'styled-components';
import constants from '../constants';
import PropsTypes from 'prop-types';

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

const AuthButton = ({ text = '', onPress = null }) => (
	<Touchable onPress={onPress}>
		<Container>
			<Text>{text}</Text>
		</Container>
	</Touchable>
);

AuthButton.propsTypes = {
	text: PropsTypes.string.isRequired,
	onPress: PropsTypes.func.isRequired
};
export default AuthButton;
