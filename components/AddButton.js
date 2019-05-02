import React from 'react';
import {Icon} from 'expo';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Colors from '../constants/Colors';

const AddButton = ({onPress}) => (
    <TouchableOpacity onPress={onPress}>
        <View style={styles.wrapper}>
            <Icon.Ionicons name={'md-add'} style={styles.icon} size={36} fontWeight="bold" />
        </View>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    wrapper: {
        width: 54,
        height: 54,
        borderRadius: 27,
        backgroundColor: Colors.tintColor,
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        color: Colors.mainColor,
        fontWeight: 'bold',
    }
});

export default AddButton;
