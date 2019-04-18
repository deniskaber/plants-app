import React from 'react';
import {ActionSheetIOS, Alert, Button, ImageBackground, StyleSheet, ScrollView, Text, View} from 'react-native';
import {connect} from 'react-redux';
import Colors from '../constants/Colors';
import {deleteUserPlant} from '../state/actions';

class PlantDetailsScreen extends React.Component {
    static navigationOptions = ({navigation}) => ({
        tabBarVisible: false,
        headerTintColor: Colors.textColor,
        headerStyle: {
            borderBottomWidth: 0,
        },
        headerRight: <Button onPress={navigation.getParam('handleActionEdit')} title="Edit" color={Colors.textColor} />,
    });

    componentDidMount() {
        this.props.navigation.setParams({handleActionEdit: this._handleActionEdit});
    }

    _handleActionEdit = () => {
        ActionSheetIOS.showActionSheetWithOptions(
            {
                options: ['Edit', 'Cancel', 'Remove'],
                destructiveButtonIndex: 2,
                cancelButtonIndex: 1,
            },
            (buttonIndex) => {
                if (buttonIndex === 0) {
                    this.props.navigation.navigate('PlantAdditionalDetails', {id: this.props.plant.id});
                } else if (buttonIndex === 2) {
                    Alert.alert('Удалить это растение', 'Вы уверены?', [
                        {
                            text: 'Да',
                            onPress: this.handleRemovePlant,
                            style: 'cancel',
                        },
                        {text: 'Нет'},
                    ]);
                }
            },
        );
    };

    handleRemovePlant = () => {
        this.props.deleteUserPlant(this.props.plant.id);
    };

    render() {
        const {plant} = this.props;

        if (!plant) {
            this.props.navigation.navigate('Home');

            return null;
        }

        return (
            <ImageBackground
                source={{uri: 'http://localhost:3000/images/test_image_2.jpg'}}
                style={{width: '100%', height: '100%'}}
            >
                <ScrollView style={styles.container}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.titleText}>{plant.name}</Text>
                        <Text>{plant.botanicalName}</Text>
                    </View>

                    <View style={styles.scheduleCardContainer}>
                        <View>
                            <Text style={styles.scheduleCardHeader}>3 дня</Text>
                            <Text>Полив</Text>
                        </View>
                        <View>
                            <Text style={styles.scheduleCardHeader}>3 недели</Text>
                            <Text>Удобрение</Text>
                        </View>
                        <View>
                            <Text style={styles.scheduleCardHeader}>Месяц</Text>
                            <Text>Пересадка</Text>
                        </View>
                    </View>

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
                </ScrollView>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 8,
        fontFamily: 'firaSans-Light',
        fontSize: 14,
        lineHeight: 20,
    },
    titleContainer: {
        color: Colors.mainColor,
        paddingHorizontal: 8,
    },
    titleText: {
        fontFamily: 'firaSans-Bold',
        fontSize: 26,
        lineHeight: 34,
        color: Colors.mainColor,
    },
    subtitleText: {
        fontFamily: 'firaSans-Regular',
        fontSize: 14,
        lineHeight: 20,
        color: Colors.mainColor,
    },
    scheduleCardContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 8,
        backgroundColor: Colors.cardBackground,
        padding: 24,
        borderRadius: 12,
        height: 88,
    },
    scheduleCardHeader: {
        fontFamily: 'firaSans-Bold',
        fontSize: 14,
        lineHeight: 20,
        fontWeight: 'bold',
    },
    cardContainer: {
        marginVertical: 8,
        backgroundColor: Colors.cardBackground,
        padding: 24,
        borderRadius: 12,
    },
    cardHeader: {
        fontFamily: 'firaSans-Bold',
        fontSize: 18,
        lineHeight: 24,
        fontWeight: 'bold',
    },
});

const mapStateToProps = (state, ownProps) => {
    const plantId = ownProps.navigation.getParam('id');

    return {
        plant: state.usersPlants.find(({id}) => id === plantId),
    };
};

const mapDispatchToProps = {deleteUserPlant};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(PlantDetailsScreen);
