import React from 'react';
import {StyleSheet, View} from 'react-native';
import Colors from '../constants/Colors';

export class ScreenViewContainer extends React.Component {
    render() {
        return <View {...this.props} style={[styles.screenViewContainer, this.props.style]} />;
    }
}

const styles = StyleSheet.create({
    screenViewContainer: {
        flex: 1,
        backgroundColor: Colors.mainColor,
    },
});
