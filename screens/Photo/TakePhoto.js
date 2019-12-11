import React, { useState, useEffect } from 'react';
import { Camera } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import * as Permissions from 'expo-permissions';
import styled from 'styled-components';
import constants from '../../constants';
import Loader from '../../components/Loader';
import { TouchableOpacity } from 'react-native';
import { Platform } from '@unimodules/core';
import styles from '../../styles';

const View = styled.View`flex: 1;`;
const Icon = styled.View``;
export default ({ navigation }) => {
	const [ loading, setLoading ] = useState(true);
	const [ hasPermission, setHasPermission ] = useState(false);
	const [ cameraType, setCameraType ] = useState(Camera.Constants.Type.front);
	const askPermission = async () => {
		try {
			const { status } = await Permissions.askAync(Permissions.CAMERA);
			if (status === 'granted') {
				setHasPermission(true);
			}
		} catch (e) {
			console.log(e);
			setHasPermission(false);
		} finally {
			setLoading(false);
		}
	};
	const toggleCamera = () => {
		if (cameraType === Camera.Constants.Type.front) {
			setCameraType(Camera.Constants.Type.back);
		} else {
			setCameraType(Camera.Constants.Type.front);
		}
	};
	useEffect(() => {
		askPermission();
	}, []);
	return (
		<View>
			{loading ? (
				<Loader />
			) : hasPermission ? (
				<Camera
					style={{
						justifyContent: 'flex-end',
						padding: 15,
						width: constants.width,
						height: constans.height / 2
					}}
				>
					<TouchableOpacity onPress={toggleCamera}>
						<Icon>
							<Ionicons
								name={Platform.OS === 'ios' ? 'ios-reverse-camera' : 'md-reverse-camera'}
								size={28}
								color={'white'}
							/>
						</Icon>
					</TouchableOpacity>
				</Camera>
			) : null}
		</View>
	);
};
