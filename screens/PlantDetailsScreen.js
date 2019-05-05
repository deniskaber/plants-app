import React from 'react';
import {Button, Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {LinearGradient} from 'expo';
import {connect} from 'react-redux';
import PlatformIcon from '../components/PlatformIcon';
import {ScreenViewContainer} from '../components/ScreenView';
import {ScreenSubtitleText, ScreenTitleText} from '../components/StyledText';
import Colors from '../constants/Colors';

class PlantDetailsScreen extends React.Component {
    static navigationOptions = ({navigation}) => ({
        tabBarVisible: false,
        headerStyle: {
            borderBottomWidth: 0,
        },
        headerRight: (
            <TouchableOpacity onPress={navigation.getParam('handleActionEdit')}>
                <PlatformIcon name="settings" style={styles.headerRightIcon} />
            </TouchableOpacity>
        ),
    });

    componentDidMount() {
        this.props.navigation.setParams({handleActionEdit: this._handleActionEdit});
    }

    _handleActionEdit = () => {
        this.props.navigation.push('PlantSettings', {id: this.props.plant.id});
    };

    render() {
        const {plant, light, temperature, humidity, watering, soil} = this.props;

        if (!plant) {
            this.props.navigation.goBack('Home');

            return null;
        }

        return (
            <ScreenViewContainer style={styles.container}>
                <ScrollView style={styles.scrollContainer}>
                    <View>
                        <ScreenTitleText>{plant.name}</ScreenTitleText>
                        <ScreenSubtitleText>{plant.botanicalName}</ScreenSubtitleText>
                    </View>
                    <View style={styles.imageCard}>
                        <Image source={{uri: plant.imageURI}} style={styles.image} />
                    </View>

                    {/*<View style={styles.scheduleCardContainer}>*/}
                    {/*<View style={styles.scheduleBlock}>*/}
                    {/*<View>*/}
                    {/*<Text style={styles.scheduleCardHeader}>3 дня</Text>*/}
                    {/*<Text>Полив</Text>*/}
                    {/*</View>*/}
                    {/*<View>*/}
                    {/*<Text style={styles.scheduleCardHeader}>3 недели</Text>*/}
                    {/*<Text>Удобрение</Text>*/}
                    {/*</View>*/}
                    {/*<View>*/}
                    {/*<Text style={styles.scheduleCardHeader}>Месяц</Text>*/}
                    {/*<Text>Пересадка</Text>*/}
                    {/*</View>*/}
                    {/*</View>*/}
                    {/*<View>*/}
                    {/*<Button title="Настроить график полива" onPress={this.handlePressSetNotificationsButton} />*/}
                    {/*</View>*/}
                    {/*</View>*/}

                    <View style={styles.cardContainer}>
                        <Text style={styles.cardHeader}>Полив</Text>
                        <Text>{watering.description}</Text>
                    </View>

                    <View style={styles.cardContainer}>
                        <Text style={styles.cardHeader}>Освещение</Text>
                        <Text>{light.description}</Text>
                    </View>

                    <View style={styles.cardContainer}>
                        <Text style={styles.cardHeader}>Температура</Text>
                        <Text>{temperature.description}</Text>
                    </View>

                    <View style={styles.cardContainer}>
                        <Text style={styles.cardHeader}>Влажность</Text>
                        <Text>{humidity.description}</Text>
                    </View>

                    <View style={[styles.cardContainer, styles.lastCard]}>
                        <Text style={styles.cardHeader}>Почва</Text>
                        <Text>{soil.description}</Text>
                    </View>
                </ScrollView>
            </ScreenViewContainer>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 0,
    },
    scrollContainer: {
        paddingHorizontal: 16,
    },
    headerRightIcon: {
        marginRight: 10,
        color: Colors.tintColor,
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
        marginVertical: 4,
        backgroundColor: Colors.cardBackground,
        padding: 24,
        borderRadius: 8,
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
    },
    lastCard: {
        marginBottom: 24,
    },
});

const mapStateToProps = (state, ownProps) => {
    const plantId = ownProps.navigation.getParam('id');

    const userPlant = state.usersPlants.find(({id}) => id === plantId);

    if (!userPlant) {
        return {};
    }

    const plantFromDictionary = state.plants.find(({id}) => id === userPlant.plantId);

    return {
        plant: userPlant,
        light: state.light[plantFromDictionary.light],
        temperature: state.temperature[plantFromDictionary.temperature],
        humidity: state.humidity[plantFromDictionary.humidity],
        watering: state.watering[plantFromDictionary.watering],
        soil: state.soil[plantFromDictionary.soil],
    };
};

export default connect(mapStateToProps)(PlantDetailsScreen);
