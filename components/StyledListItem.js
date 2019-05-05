import React from 'react';
import {StyleSheet} from 'react-native';
import {ListItem} from 'react-native-elements';
import {Icon} from 'expo';
import Colors from '../constants/Colors';

const StyledListItem = ({title, onPress}) => (
    <ListItem
        title={title}
        style={styles.listItem}
        titleStyle={styles.titleStyle}
        containerStyle={styles.listItemContainerStyle}
        topDivider
        bottomDivider
        rightIcon={<Icon.Ionicons name="ios-arrow-forward" size={20} color={Colors.mediumGreyColor} />}
        onPress={onPress}
    />
);

const styles = StyleSheet.create({
    listItemContainerStyle: {
        paddingLeft: 24,
    },
    listItem: {
        marginTop: -1,
        borderColor: Colors.borderColor,
    },
    titleStyle: {
        fontFamily: 'firaSans',
        fontSize: 18,
        lineHeight: 24,
    },
});

export default StyledListItem;
