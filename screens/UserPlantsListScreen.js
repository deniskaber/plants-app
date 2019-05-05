import React from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {connect} from 'react-redux';
import AddButton from '../components/AddButton';
import PlantListCard from '../components/PlantListCard';
import {ScreenViewContainer} from '../components/ScreenView';

class UserPlantsListScreen extends React.Component {
    static navigationOptions = {
        headerStyle: {
            borderBottomWidth: 0,
        },
    };

    _onPress = ({id}) => {
        this.props.navigation.push('PlantDetails', {id});
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
        const plantFromDictionary = this.props.plants.find((plant) => plant.id === item.id)

        return (
            <TouchableOpacity key={item.id} onPress={() => this._onPress(item)}>
                <PlantListCard item={item} plantFromDictionary={plantFromDictionary} />
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
            <ScreenViewContainer>
                <FlatList
                    data={this.props.usersPlants}
                    keyExtractor={(item, index) => item.id}
                    ListHeaderComponent={this.renderListHeader}
                    ListEmptyComponent={this.renderListEmpty}
                    renderItem={({item}) => this.renderItem(item)}
                />
            </ScreenViewContainer>
        );
    }
}

const styles = StyleSheet.create({
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
    plants: state.plants,
}))(UserPlantsListScreen);
