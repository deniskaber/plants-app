import {Icon} from 'expo';
import React from 'react';
import {FlatList, Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {connect} from 'react-redux';
import PlantListCard from '../components/PlantListCard';

class UserPlantsListScreen extends React.Component {
    static navigationOptions = {
        // headerBackTitle: null,
        headerStyle: {
            borderBottomWidth: 0,
        },
    };

    _onPress = ({id}) => {
        this.props.navigation.navigate('PlantDetails', {id});
    };

    renderListHeader = () => {
        return (
            <View style={styles.headerContainer}>
                <Text
                    style={{
                        fontFamily: 'firaSans-Bold',
                        fontSize: 36,
                    }}
                >
                    Ваши растения
                </Text>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('AddPlant')}>
                    <Icon.Ionicons
                        name={'md-add'}
                        size={36}
                        // style={{marginBottom: -3}}
                    />
                </TouchableOpacity>
            </View>
        );
    };

    renderItem = (item) => {
        return (
            <TouchableOpacity key={item.id} onPress={() => this._onPress(item)}>
                <PlantListCard item={item} />
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
                    style={styles.list}
                    data={this.props.usersPlants}
                    keyExtractor={(item, index) => item.id}
                    ListHeaderComponent={this.renderListHeader}
                    ListEmptyComponent={this.renderListEmpty}
                    renderItem={({item}) => this.renderItem(item)}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    headerContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 8,
    },
    list: {
        paddingHorizontal: 8,
    },
});

export default connect((state) => ({
    usersPlants: state.usersPlants,
}))(UserPlantsListScreen);
