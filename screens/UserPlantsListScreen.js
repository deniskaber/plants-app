import React from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {connect} from 'react-redux';
import AddButton from '../components/AddButton';
import PlantListCard from '../components/PlantListCard';

class UserPlantsListScreen extends React.Component {
    static navigationOptions = {
        headerBackTitle: null,
        headerStyle: {
            borderBottomWidth: 0,
        },
    };

    _onPress = ({id}) => {
        this.props.navigation.navigate('PlantDetails', {id});
    };

    renderListHeader = () => {
        const {usersPlants, navigation} = this.props;

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
                <AddButton isAccented={!usersPlants.length} onPress={() => navigation.navigate('AddPlant')} />
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
                <Text>Добавьте ваше первое растение!</Text>
            </View>
        );
    };

    render() {
        return (
            <View style={styles.cardContainer}>
                <FlatList
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
    cardContainer: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 16,
    },
    headerContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
});

export default connect((state) => ({
    usersPlants: state.usersPlants,
}))(UserPlantsListScreen);
