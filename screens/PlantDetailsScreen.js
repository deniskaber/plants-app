import React from 'react';
import {Text, View} from 'react-native';

export class PlantDetailsScreen extends React.Component {
    render() {
        const {navigation} = this.props;

        const id = navigation.getParam('id');

        return (
            <View>
                <Text>{id}</Text>
            </View>
        );
    }
}
