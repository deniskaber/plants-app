import React from 'react';
import {Button} from 'react-native-elements';
import {StyleSheet, View} from 'react-native';
import Colors from '../constants/Colors';

const StyledButton = ({style, title, isAccented, noBorder, type, onPress}) => {
    const buttonStyle = [styles.button, style];
    const titleStyle = [styles.title];

    if (isAccented) {
        buttonStyle.push(styles.accentedStyles);
        titleStyle.push(styles.accentedTitle);
    }

    if (!noBorder) {
        buttonStyle.push(styles.borderedStyles);
    }

    if (type === StyledButton.DANGER) {
        titleStyle.push(styles.dangerTitle);
    }

    buttonStyle.push(style);

    return (
        <View style={styles.container}>
            <Button title={title} type="clear" style={buttonStyle} titleStyle={titleStyle} onPress={onPress} />
        </View>
    );
};

StyledButton.DANGER = 'danger';
StyledButton.DEFAULT = 'default';

StyledButton.defaultProps = {
    isAccented: false,
    noBorder: false,
    type: StyledButton.DEFAULT,
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    button: {
        width: 240,
        borderWidth: 0,
    },
    borderedStyles: {
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
    dangerTitle: {
        color: Colors.dangerColor,
    },
});

export default StyledButton;
