import React from 'react';
import {Button} from 'react-native-elements';
import {StyleSheet, View} from 'react-native';
import Colors from '../constants/Colors';

const StyledButton = ({style, title, isAccented, onPress}) => (
    <View style={styles.container}>
        <Button
            title={title}
            type="clear"
            style={[styles.button, isAccented && styles.accentedStyles, style]}
            titleStyle={[styles.title, isAccented && styles.accentedTitle]}
            onPress={onPress}
        />
    </View>
);

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    button: {
        width: 240,
        borderRadius: 8,
        borderWidth: 3,
        borderColor: Colors.tintColor,
    },
    accentedStyles: {
        backgroundColor: Colors.tintColor,
    },
    title: {
        fontFamily: 'firaSans-Bold',
        color: Colors.tintColor,
    },
    accentedTitle: {
        color: Colors.mainColor,
    },
});

export default StyledButton;
