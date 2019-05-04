import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import Highlighter from 'react-native-highlight-words';
import Colors from '../constants/Colors';

export default class PlantDictionaryListCard extends React.Component {
    render() {
        const {
            item: {name, botanicalName, imageURI},
            search,
        } = this.props;

        return (
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image source={{uri: imageURI}} style={styles.image} />
                </View>
                <View>
                    <Highlighter
                        numberOfLines={1}
                        style={styles.titleText}
                        highlightStyle={styles.highlightedText}
                        textToHighlight={name}
                        searchWords={[search]}
                    />
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
        alignItems: 'center',
        backgroundColor: Colors.mainColor,
        borderRadius: 12,
        marginVertical: 8,
    },
    imageContainer: {
        width: 60,
        height: 60,
        backgroundColor: Colors.imagePlaceholder,
        marginRight: 16,
        borderRadius: 30,
        position: 'relative',
        overflow: 'hidden',
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
    },
    secondaryText: {
        fontFamily: 'firaSans-Light',
        fontSize: 14,
        lineHeight: 20,
    },
    highlightedText: {
        backgroundColor: Colors.highlightedTextColor,
    },
});
