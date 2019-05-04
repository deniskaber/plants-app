import React from 'react';
import {TextInput, StyleSheet, View} from 'react-native';
import {SearchBar} from 'react-native-elements';
import Colors from '../constants/Colors';

export default class StyledInput extends React.Component {
    handleClear = () => {
        this.props.onValueChange('');
    };

    render() {
        const {value, onValueChange} = this.props;

        return (
            <SearchBar
                value={value}
                searchIcon={null}
                containerStyle={styles.container}
                leftIconContainerStyle={styles.leftIconContainerStyle}
                inputStyle={styles.input}
                inputContainerStyle={styles.inputContainer}
                onChangeText={onValueChange}
                onClear={this.handleClear}
            />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: 36,
        borderRadius: 8,
        paddingHorizontal: 8,
        paddingVertical: 4,
        backgroundColor: Colors.fieldBackgroundColor,
        margin: 0,
        padding: 0,
        borderWidth: 0,
        borderTopWidth: 0,
        borderBottomWidth: 0,
    },
    leftIconContainerStyle: {
        width: 0,
    },
    input: {
        color: Colors.textColor,
        backgroundColor: Colors.fieldBackgroundColor,
    },
    inputContainer: {
        backgroundColor: Colors.fieldBackgroundColor,
        height: 28,
    },
});
