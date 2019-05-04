import React from 'react';
import {Button, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { LinearGradient } from 'expo';
import {connect} from 'react-redux';
import PlatformIcon from '../components/PlatformIcon';
import {ScreenSubtitleText, ScreenTitleText} from '../components/StyledText';
import Colors from '../constants/Colors';

class PlantDetailsScreen extends React.Component {
    static navigationOptions = ({navigation}) => ({
        tabBarVisible: false,
        headerTintColor: Colors.textColor,
        headerStyle: {
            borderBottomWidth: 0
        },
        headerTransparent: true,
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
        this.props.navigation.push('PlantAdditionalDetails', {id: this.props.plant.id});
    };

    handlePressSetNotificationsButton = () => {
        this.props.navigation.push('PlantWateringSettings', {id: this.props.plant.id});
    }

    render() {
        const {plant} = this.props;

        if (!plant) {
            this.props.navigation.goBack('Home');

            return null;
        }

        return (
            <ImageBackground source={{uri: plant.imageURI}} style={styles.container}>
                <ScrollView>
                    {/*<LinearGradient*/}
                        {/*colors={['transparent', 'rgba(0,0,0,0.5)']}*/}
                        {/*style={{*/}
                            {/*position: 'absolute',*/}
                            {/*marginLeft: -16,*/}
                            {/*marginRight: -16,*/}
                            {/*left: -16,*/}
                            {/*right: -16,*/}
                            {/*top: 0,*/}
                            {/*height: '100%',*/}
                        {/*}}*/}
                    {/*/>*/}
                    <View style={styles.titleContainer}>
                        <ScreenTitleText>{plant.name}</ScreenTitleText>
                        <ScreenSubtitleText>{plant.botanicalName}</ScreenSubtitleText>
                    </View>

                    <View style={styles.scheduleCardContainer}>
                        <View style={styles.scheduleBlock}>
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
                        <View>
                            <Button title="Настроить график полива" onPress={this.handlePressSetNotificationsButton} />
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
    headerRightIcon: {
        marginRight: 10,
    },
    titleContainer: {
        marginTop: 425,
        color: Colors.mainColor,
        paddingHorizontal: 8,
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

export default connect(mapStateToProps)(PlantDetailsScreen);
