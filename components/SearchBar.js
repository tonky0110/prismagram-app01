import React from 'react';
import { TextInput } from 'react-native';
import PropTypes from 'prop-types';

const SearchBar = ({ value, onChange, onSubmit }) => <TextInput value={value} placeholder={'Search'} />;

SearchBar.propTypes = {
	value: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired
};

export default SearchBar;
