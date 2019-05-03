import React from 'react';
import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';

export default class PlantListCard extends React.Component {
    render() {
        const {
            item: {name, botanicalName, imageURI},
        } = this.props;

        return (
            <View style={styles.cardContainer}>
                <ImageBackground source={{uri: imageURI}} style={styles.image}>
                    <View/>
                    <View style={styles.contentContainer}>
                        <View>
                            <Text numberOfLines={1} style={styles.titleText}>
                                {name}
                            </Text>
                            <Text numberOfLines={1} style={styles.secondaryText}>
                                {botanicalName}
                            </Text>
                        </View>
                    </View>
                </ImageBackground>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: Colors.greyColor,
        borderRadius: 12,
        height: 108,
        marginVertical: 8,
        overflow: 'hidden',
    },
    contentContainer: {
        paddingVertical: 32,
        paddingHorizontal: 22,
    },
    imageContainer: {
        width: 60,
        height: 60,
        backgroundColor: Colors.imagePlaceholder,
        marginRight: 16,
        borderRadius: 30,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    titleText: {
        fontFamily: 'firaSans-Bold',
        fontSize: 18,
        lineHeight: 24,
        fontWeight: 'bold',
        color: Colors.mainColor,
    },
    secondaryText: {
        fontFamily: 'firaSans-Light',
        fontSize: 14,
        lineHeight: 20,
        color: Colors.mainColor,
    },
});
