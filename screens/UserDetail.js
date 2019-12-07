import React from 'react';
import { useQuery } from 'react-apollo-hooks';
import { gql } from 'apollo-boost';
import { USER_FRAGMENT } from '../fragments';
import Loader from '../components/Loader';
import { ScrollView } from 'react-native';
import UserProfile from '../components/UserProfile';

const USER_USER = gql`
	query seeUser($username: String!) {
		seeUser(username: $username) {
			...UserParts
		}
	}
	${USER_FRAGMENT}
`;

export default ({ navigation }) => {
	const { loading, data } = useQuery(USER_USER, {
		variables: { username: navigation.getParam('username') }
	});
	return (
		<ScrollView styled={{ flex: 1 }}>
			{loading ? <Loader /> : data && data.seeFullPost && <UserProfile {...data.seeUser} />}
		</ScrollView>
	);
};
