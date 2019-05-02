import React from 'react';
import {StyleSheet, Text} from 'react-native';
import Colors from '../constants/Colors';

export class ScreenTitleText extends React.Component {
    render() {
        return <Text {...this.props} style={[styles.titleText, this.props.style]} />;
    }
}

export class SubheaderCaptionText extends React.Component {
    render() {
        return <Text {...this.props} style={[styles.subheaderText, this.props.style]} />;
    }
}

export const styles = StyleSheet.create({
    titleText: {
        fontFamily: 'firaSans-Bold',
        fontSize: 26,
        lineHeight: 34,
        color: Colors.textColor,
    },
    subheaderText: {
        fontFamily: 'firaSans-Bold',
        fontSize: 14,
        lineHeight: 18,
        color: Colors.captionTextColor,
    },
});