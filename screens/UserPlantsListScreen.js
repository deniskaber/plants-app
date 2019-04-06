import React from 'react';
import {Button, Image, Platform, FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Icon, WebBrowser} from 'expo';
import {connect} from 'react-redux';

import {MonoText} from '../components/StyledText';
import Colors from '../constants/Colors';

class UserPlantsListScreen extends React.Component {
    _onPress = (item) => {
        this.props.navigation.navigate('PlantDetails', {id: item.key});
    };

    renderListHeader = () => {
        return (
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text
                    style={{
                        fontSize: 24,
                    }}
                >
                    Ваши растения
                </Text>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('AddPlant')}>
                    <Icon.Ionicons
                        name={Platform.OS === 'ios' ? 'ios-add-circle-outline' : 'md-add-circle-outline'}
                        size={26}
                        style={{marginBottom: -3}}
                    />
                </TouchableOpacity>
            </View>
        );
    };

    renderItem = (item) => {
        const {key, name, botanicalName} = item;

        return (
            <TouchableOpacity key={key} onPress={() => this._onPress(item)}>
                <View
                    style={{
                        backgroundColor: '#d9d9d9',
                        borderRadius: 10,
                        height: 100,
                        padding: 20,
                        marginVertical: 20,
                    }}
                >
                    <Text style={{fontWeight: 'bold'}}>{name}</Text>
                    <Text>{botanicalName}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    renderListEmpty = () => {
        return (
            <View>
                <Text>Пока ничего нет</Text>
            </View>
        );
    };

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.props.usersPlants}
                    ListHeaderComponent={this.renderListHeader}
                    ListEmptyComponent={this.renderListEmpty}
                    renderItem={({item}) => this.renderItem(item)}
                />
            </View>
        );
    }
}

export default connect((state) => ({
    usersPlants: state.usersPlants,
}))(UserPlantsListScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
    },
    developmentModeText: {
        marginBottom: 20,
        color: 'rgba(0,0,0,0.4)',
        fontSize: 14,
        lineHeight: 19,
        textAlign: 'center',
    },
    contentContainer: {
        paddingTop: 30,
    },
    welcomeContainer: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
    welcomeImage: {
        width: 100,
        height: 80,
        resizeMode: 'contain',
        marginTop: 3,
        marginLeft: -10,
    },
    getStartedContainer: {
        alignItems: 'center',
        marginHorizontal: 50,
    },
    homeScreenFilename: {
        marginVertical: 7,
    },
    codeHighlightText: {
        color: 'rgba(96,100,109, 0.8)',
    },
    codeHighlightContainer: {
        backgroundColor: 'rgba(0,0,0,0.05)',
        borderRadius: 3,
        paddingHorizontal: 4,
    },
    getStartedText: {
        fontSize: 17,
        color: 'rgba(96,100,109, 1)',
        lineHeight: 24,
        textAlign: 'center',
    },
    tabBarInfoContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        ...Platform.select({
            ios: {
                shadowColor: 'black',
                shadowOffset: {height: -3},
                shadowOpacity: 0.1,
                shadowRadius: 3,
            },
            android: {
                elevation: 20,
            },
        }),
        alignItems: 'center',
        backgroundColor: '#fbfbfb',
        paddingVertical: 20,
    },
    tabBarInfoText: {
        fontSize: 17,
        color: 'rgba(96,100,109, 1)',
        textAlign: 'center',
    },
    navigationFilename: {
        marginTop: 5,
    },
    helpContainer: {
        marginTop: 15,
        alignItems: 'center',
    },
    helpLink: {
        paddingVertical: 15,
    },
    helpLinkText: {
        fontSize: 14,
        color: '#2e78b7',
    },
});
