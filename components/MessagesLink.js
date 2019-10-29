import React from 'react';
import styled from 'styled-components';
// import { View, Text, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';
import NavIcon from './NavIcon';
import { Platform } from '@unimodules/core';

const Container = styled.TouchableOpacity`padding-right: 20px;`;

export default withNavigation(({ navigation }) => (
	<Container onPress={() => navigation.navigate('MessageNavigation')}>
		<NavIcon name={Platform.OS === 'ios' ? 'ios-paper-plane' : 'md-paper-plane'} />
	</Container>
));
