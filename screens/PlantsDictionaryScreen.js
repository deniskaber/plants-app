import React from 'react';
import {FlatList, TextInput, Text, View, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';

class PlantsDictionaryScreen extends React.Component {
    state = {
        plantNameFilter: '',
    };

    _onPress = ({id}) => {
        this.props.navigation.navigate('AddPlantDetails', {id});
    };

    renderListHeader = () => {
        return (
            <View
                style={{
                    marginBottom: 40,
                }}
            >
                <Text
                    style={{
                        fontSize: 24,
                    }}
                >
                    Поиск
                </Text>
                <TextInput
                    style={{height: 40, backgroundColor: '#f1f1f2'}}
                    placeholder="Введите название растения"
                    onChangeText={(text) => this.setState({plantNameFilter: text})}
                    value={this.state.plantNameFilter}
                />
            </View>
        );
    };

    renderItem = ({item}) => {
        const {id, name, botanicalName} = item;

        return (
            <TouchableOpacity key={id} onPress={() => this._onPress(item)}>
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'row',
                    }}
                >
                    <View
                        style={{
                            width: 50,
                            height: 50,
                            backgroundColor: 'grey',
                            borderRadius: 50,
                        }}
                    />
                    <View>
                        <Text style={{fontWeight: 'bold'}}>{name}</Text>
                        <Text>{botanicalName}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    render() {
        return (
            <View
                style={{
                    paddingHorizontal: 20,
                    flex: 1,
                }}
            >
                <FlatList
                    data={this.props.plants}
                    ListHeaderComponent={this.renderListHeader}
                    renderItem={this.renderItem}
                />
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    plants: state.plants,
});

export default connect(mapStateToProps)(PlantsDictionaryScreen);
