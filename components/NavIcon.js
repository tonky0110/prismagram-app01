import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import styles from '../styles';

const NavIcon = ({ name, size = 26, color = styles.blackColor }) => <Ionicons name={name} color={color} size={size} />;

NavIcon.propTypes = {
	name: PropTypes.string.isRequired,
	size: PropTypes.number,
	color: PropTypes.string
};

export default NavIcon;
