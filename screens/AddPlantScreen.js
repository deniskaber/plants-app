import React from 'react';
import {FlatList, TextInput, Text, View} from 'react-native';

export class AddPlantScreen extends React.Component {
    state = {
        plantNameFilter: '',
    };

    render() {
        return (
            <View>
                <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    onChangeText={(text) => this.setState({plantNameFilter: text})}
                    value={this.state.plantNameFilter}
                />
                <FlatList
                    data={[{key: 'a'}, {key: 'b'}]}
                    renderItem={({item}) => <Text>{item.key}</Text>}
                />
            </View>
        )
    }
}