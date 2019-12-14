import React, { useState } from 'react';
import { ActivityIndicator, Alert, Image } from 'react-native';
import styled from 'styled-components';
import styles from '../../styles';
import constants from '../../constants';
import useInput from '../../hooks/useInput';
import Axios from 'axios';

const View = styled.View`flex: 1;`;

const Container = styled.View`
	padding: 20px;
	flex-direction: row;
`;

const Form = styled.View`justify-content: flex-start;`;
const STextInput = styled.TextInput`
	margin-bottom: 10px;
	border: 0px solid ${styles.lightGreyColor};
	border-bottom-width: 1px;
	padding-bottom: 10px;
	width: ${constants.width - 180};
`;
const Button = styled.TouchableOpacity`
	background-color: ${(props) => props.theme.blueColor};
	padding: 10px;
	border-radius: 4px;
	align-items: center;
	justify-content: center;
`;
const Text = styled.Text``;

export default ({ navigation }) => {
	const [ loading, setLoading ] = useState(false);
	const [ fileUrl, setFileUrl ] = useState('');
	const photo = navigation.getParam('photo');
	const captionInput = useInput('');
	const locationInput = useInput('');
	const handleSubmit = async () => {
		if (captionInput.value === '' || locationInput.value === '') {
			Alert.alert('All fields are required.');
		}
		const formData = new FormData();
		const name = photo.filename;
		const [ , type ] = name.split('.');
		formData.append('file', {
			name,
			type: type.toLowerCase(),
			uri: photo.uri
		});
		try {
			const { data: { location } } = await Axios.post('http://localhost:4000/api/upload', formData, {
				headers: {
					'content-type': 'multipart/form-data'
				}
			});
			setFileUrl(location);
			console.log('location: ', location);
		} catch (e) {
			console.log(e);
		} finally {
		}
	};
	return (
		<View>
			<Container>
				<Image source={{ uri: photo.uri }} style={{ width: 80, height: 80, marginRight: 30 }} />
				<Form>
					<STextInput
						onChangeText={captionInput.onChange}
						value={captionInput.value}
						placeholder="Caption"
						multiline={true}
						placeHolderTextColor={styles.darkGreyColor}
					/>
					<STextInput
						onChangeText={locationInput.onChange}
						value={locationInput.value}
						placeholder="Location"
						multiline={true}
						placeHolderTextColor={styles.darkGreyColor}
					/>
					<Button onPress={handleSubmit}>
						{loading ? <ActivityIndicator color="white" /> : <Text>Upload</Text>}
					</Button>
				</Form>
			</Container>
		</View>
	);
};
