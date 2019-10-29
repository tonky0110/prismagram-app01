import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import styles from '../styles';

const NavIcon = ({ focused = true, name, size = 22, color = styles.blackColor }) => (
	<Ionicons name={name} color={focused ? color : styles.darkGreyColor} size={size} />
);

NavIcon.propTypes = {
	name: PropTypes.string.isRequired,
	size: PropTypes.number,
	color: PropTypes.string,
	focused: PropTypes.bool
};

export default NavIcon;
