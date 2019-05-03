import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Colors from '../constants/Colors';
import AddIcon from './icons/AddIcon';

const AddButton = ({isAccented, onPress}) => (
    <TouchableOpacity onPress={onPress}>
        <View style={[styles.wrapper, isAccented && styles.wrapperAccent]}>
            <AddIcon
                fill={isAccented ? Colors.mainColor : Colors.tintColor}
            />
        </View>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    wrapper: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    wrapperAccent: {
        width: 54,
        height: 54,
        borderRadius: 27,
        backgroundColor: Colors.tintColor,
    },
});

export default AddButton;
