import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const View = styled.View``;
const Text = styled.Text``;

export default ({ navigation }) => (
	<View>
		<Text>i should get id: {navigation.getParam('id')}</Text>
	</View>
);
