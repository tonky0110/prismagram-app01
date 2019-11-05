import React, { useState } from 'react';
import styled from 'styled-components';
import { ScrollView, RefreshControl, AsyncStorage } from 'react-native';
import { gql } from 'apollo-boost';
import { useQuery } from 'react-apollo-hooks';
import Loader from '../../components/Loader';
import Post from '../../components/Post';

const FEED_QUERY = gql`
	{
		seeFeed {
			id
			location
			caption
			user {
				id
				avatar
				username
			}
			files {
				id
				url
			}
			likeCount
			isLiked
			comments {
				id
				text
				user {
					id
					username
				}
			}
			createdAt
		}
	}
`;

const View = styled.View`
	justify-content: center;
	align-items: center;
	flex: 1;
`;

export default () => {
	const [ refreshing, setRefreshing ] = useState(false);
	const { loading, data, refetch } = useQuery(FEED_QUERY);
	const refresh = async () => {
		try {
			setRefreshing(true);
			const token = await AsyncStorage.getItem('jwt');
			await refetch();
		} catch (error) {
			console.log(error);
		} finally {
			setRefreshing(false);
		}
	};
	console.log(loading, data);
	return (
		<ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refresh} />}>
			{loading ? (
				<Loader />
			) : (
				data && data.seeFeed && data.seeFeed.map((post) => <Post key={post.id} {...post} />)
			)}
		</ScrollView>
	);
};
