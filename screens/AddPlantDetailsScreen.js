import React from 'react';
import {Button, Image, StyleSheet, ScrollView, Text, View, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import AddButton from '../components/AddButton';
import {ScreenViewContainer} from '../components/ScreenView';
import {ScreenSubtitleText, ScreenTitleText, SubheaderCaptionText} from '../components/StyledText';
import Colors from '../constants/Colors';

class AddPlantDetailsScreen extends React.Component {
    static navigationOptions = {
        headerStyle: {
            borderBottomWidth: 0,
        },
    };

    handlePressAddPlant = () => {
        this.props.navigation.push('AddPlantWatering', {id: this.props.plant.id});
    };

    render() {
        const {plant} = this.props;

        return (
            <ScrollView style={styles.container}>
                <View style={styles.titleContainer}>
                    <ScreenTitleText>{plant.name}</ScreenTitleText>
                    <ScreenSubtitleText>{plant.botanicalName}</ScreenSubtitleText>
                </View>

                <View style={styles.imageCard}>
                    <Image source={{uri: plant.imageURI}} style={styles.image} />
                </View>
                <View>
                    <AddButton isAccented viewStyle={styles.addButton} onPress={this.handlePressAddPlant} />

                    <View style={styles.cardContainer}>
                        <Text style={styles.cardHeader}>Полив</Text>
                        <Text>Перед повторным поливом почва должна быть слегка высушенной</Text>
                    </View>

                    <View style={styles.cardContainer}>
                        <Text style={styles.cardHeader}>Освещение</Text>
                        <Text>Супер солнце. Жечь должно как в аду</Text>
                    </View>

                    <View style={styles.cardContainer}>
                        <Text style={styles.cardHeader}>Температура</Text>
                        <Text>Любит высокую температуру, не переносит сквозняки. Минимальная температура -13С</Text>
                    </View>

                    <View style={styles.cardContainer}>
                        <Text style={styles.cardHeader}>Влажность</Text>
                        <Text>Подходит комнатная влажность (не ниже 25%)</Text>
                    </View>

                    <View style={styles.cardContainer}>
                        <Text style={styles.cardHeader}>Почва</Text>
                        <Text>Грунт для комнатных растений универсальный</Text>
                    </View>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        paddingBottom: 28,
        fontFamily: 'firaSans-Light',
        fontSize: 14,
        lineHeight: 20,
    },
    imageCard: {
        height: 284,
        marginVertical: 4,
        borderRadius: 12,
        overflow: 'hidden',
        position: 'relative',
    },
    image: {
        width: '100%',
        height: '100%',
        backgroundColor: Colors.greyColor,
    },
    addButton: {
        position: 'absolute',
        top: -27,
        right: 7,
        zIndex: 99,
    },
    headerRightIcon: {
        marginRight: 10,
    },
    titleContainer: {
        paddingHorizontal: 8,
        marginBottom: 24,
    },
    scheduleCardContainer: {
        marginVertical: 8,
        backgroundColor: Colors.cardBackground,
        padding: 24,
        borderRadius: 12,
    },
    scheduleBlock: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    scheduleCardHeader: {
        fontFamily: 'firaSans-Bold',
        fontSize: 14,
        lineHeight: 20,
        fontWeight: 'bold',
    },
    cardContainer: {
        fontFamily: 'firaSans',
        marginVertical: 4,
        backgroundColor: Colors.cardBackground,
        padding: 24,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 3},
        shadowOpacity: 0.08,
        shadowRadius: 8,
    },
    cardHeader: {
        fontFamily: 'firaSans-Bold',
        fontSize: 18,
        lineHeight: 24,
        fontWeight: 'bold',
        marginBottom: 4,
    },
});

export default connect((state, ownProps) => {
    const plantId = ownProps.navigation.getParam('id');

    return {
        plant: state.plants.find(({id}) => id === plantId),
    };
})(AddPlantDetailsScreen);
