import React, { useState } from 'react';
import { ActivityIndicator, Alert, Image } from 'react-native';
import styled from 'styled-components';
import styles from '../../styles';
import constants from '../../constants';
import useInput from '../../hooks/useInput';

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
	const [ loading, setLoading ] = useState(true);
	const [ fileUrl, setFileUrl ] = useState('');
	const captionInput = useInput('');
	const locationInput = useInput('');
	const handleSubmit = async () => {
		if (captionInput.value === '' || locationInput.value === '') {
			Alert.alert('All fields are required.');
		}
	};
	return (
		<View>
			<Container>
				<Image
					source={{ uri: navigation.getParam('photo').uri }}
					style={{ width: 80, height: 80, marginRight: 30 }}
				/>
				<Form>
					<STextInput
						onChangeText={null}
						value={''}
						placeholder="Caption"
						multiline={true}
						placeHolderTextColor={styles.darkGreyColor}
					/>
					<STextInput
						onChangeText={null}
						value={''}
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
