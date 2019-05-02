import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import Colors from '../constants/Colors';

export default class PlantListCard extends React.Component {
    render() {
        const {
            item: {name, botanicalName, imageURI},
        } = this.props;

        return (
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image source={{uri: imageURI}} style={styles.image} />
                </View>
                <View>
                    <Text numberOfLines={1} style={styles.titleText}>
                        {name}
                    </Text>
                    <Text numberOfLines={1} style={styles.secondaryText}>
                        {botanicalName}
                    </Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: Colors.mainColor,
        borderRadius: 12,
        height: 88,
        padding: 14,
        marginVertical: 8,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 3},
        shadowOpacity: 0.08,
        shadowRadius: 8,
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
        borderRadius: 30,
        overflow: 'hidden',
    },
    titleText: {
        fontFamily: 'firaSans-Bold',
        fontSize: 18,
        lineHeight: 24,
        fontWeight: 'bold',
    },
    secondaryText: {
        fontFamily: 'firaSans-Light',
        fontSize: 14,
        lineHeight: 20,
        color: Colors.greyColor,
    },
});
