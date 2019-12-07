import React from 'react';
import styled from 'styled-components';
import { gql } from 'apollo-boost';
import { useQuery } from 'react-apollo-hooks';
import { USER_FRAGMENT } from '../../fragments';
import { ScrollView } from 'react-native-gesture-handler';
import UserProfile from '../../components/UserProfile';

export const ME = gql`
	{
		me {
			...UserParts
		}
	}
	${USER_FRAGMENT}
`;
const View = styled.View`
	justify-content: center;
	align-items: center;
	flex: 1;
`;

const Text = styled.Text``;

export default () => {
	const { loading, data } = useQuery(ME);
	return <ScrollView>{loading ? <Loader /> : data && data.me && <UserProfile {...data.me} />}</ScrollView>;
};
