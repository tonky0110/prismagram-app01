import React, { useState } from 'react';
import { Image, Platform } from 'react-native';
import styled from 'styled-components';
import { IonIcons, Ionicons } from '@expo/vector-icons';
import Swiper from 'react-native-swiper';
import PropTypes from 'prop-types';
import { gql } from 'apollo-boost';
import constants from '../constants';
import styles from '../styles';
import { useMutation } from 'react-apollo-hooks';

export const TOGGLE_LIKE = gql`
	mutation toggelLike($postId: String!) {
		toggleLike(postId: $postId)
	}
`;

const Container = styled.View``;
const Header = styled.View`
	padding: 10px;
	flex-direction: row;
	align-items: center;
`;
const Touchable = styled.TouchableOpacity``;
const HeaderUserContainer = styled.View`margin-left: 10px;`;
const Bold = styled.Text`font-weight: 500;`;
const Location = styled.Text`font-size: 12px;`;
const IconsContainer = styled.View`
	flex-direction: row;
	align-items: center;
	margin-bottom: 5px;
`;
const InfoContainer = styled.View`padding: 10px;`;
const IconContainer = styled.View`margin-right: 10px;`;
const Caption = styled.Text`margin: 3px 0px;`;
const CommentCount = styled.Text`
	opacity: 0.5;
	font-size: 13px;
`;

const Post = ({
	id: postId,
	user,
	files,
	likeCount: likeCountProps,
	isLiked: isLikedProps,
	comments = [],
	caption,
	location,
	createdAt
}) => {
	const [ isLiked, setIsLiked ] = useState(isLikedProps);
	const [ likeCount, setLikeCount ] = useState(likeCountProps);
	const [ toggleLikeMutation ] = useMutation(TOGGLE_LIKE, {
		variables: {
			postId
		}
	});
	handleLike = async () => {
		try {
			setIsLiked((p) => !p);
			if (isLiked) {
				setLikeCount((l) => l - 1);
			} else {
				setLikeCount((l) => l + 1);
			}
			await toggleLikeMutation();
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<Container>
			<Header>
				<Touchable>
					<Image style={{ height: 40, width: 40, borderRadius: 20 }} source={{ uri: user.avatar }} />
				</Touchable>
				<Touchable>
					<HeaderUserContainer>
						<Bold>{user.username}</Bold>
						<Location>{location}</Location>
					</HeaderUserContainer>
				</Touchable>
			</Header>
			<Swiper style={{ height: constants.height / 2.5 }} showsPagination={false}>
				{files &&
					files.map((file) => (
						<Image
							key={file.id}
							style={{ width: constants.width, height: constants.height / 2.5 }}
							source={{ uri: file.url }}
						/>
					))}
			</Swiper>
			<InfoContainer>
				<IconsContainer>
					<Touchable onPress={handleLike}>
						<IconContainer>
							<Ionicons
								size={24}
								color={isLiked ? styles.redColor : styles.blackColor}
								name={
									Platform.OS === 'ios' ? isLiked ? (
										'ios-heart'
									) : (
										'ios-heart-empty'
									) : isLiked ? (
										'md-heart'
									) : (
										'md-heart-empty'
									)
								}
							/>
						</IconContainer>
					</Touchable>
					<Touchable>
						<IconContainer>
							<Ionicons
								size={24}
								color={styled.blackColor}
								name={Platform.OS === 'ios' ? 'ios-text' : 'md-text'}
							/>
						</IconContainer>
					</Touchable>
					<Touchable>
						<Bold>{likeCount === 1 ? '1 like' : `${likeCount} likes`}</Bold>
					</Touchable>
				</IconsContainer>
				<Caption>
					<Bold>{user.username}</Bold> {caption}
				</Caption>
				<Touchable>
					<CommentCount>See all {comments.length} comments</CommentCount>
				</Touchable>
			</InfoContainer>
		</Container>
	);
};

Post.prototype = {
	id: PropTypes.string.isRequired,
	user: PropTypes.shape({
		id: PropTypes.string.isRequired,
		avatar: PropTypes.string,
		username: PropTypes.string.isRequired
	}).isRequired,
	files: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string.isRequired,
			url: PropTypes.string.isRequired
		})
	).isRequired,
	likeCount: PropTypes.number.isRequired,
	isLiked: PropTypes.bool.isRequired,
	comments: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string.isRequired,
			text: PropTypes.string.isRequired,
			user: PropTypes.shape({
				id: PropTypes.string.isRequired,
				username: PropTypes.string.isRequired
			}).isRequired
		})
	).isRequired,
	caption: PropTypes.string.isRequired,
	location: PropTypes.string,
	createdAt: PropTypes.string.isRequired
};

export default Post;