import React from 'react';
import {Button, Text, View} from 'react-native';
import {connect} from 'react-redux';

class AddPlantDetailsScreen extends React.Component {
    handlePressAddPlant = () => {
        this.props.navigation.navigate('AddPlantWatering', {id: this.props.plant.id});
    };

    render() {
        const {plant} = this.props;

        return (
            <View>
                <Text>{plant.name}</Text>
                <Text>{plant.botanicalName}</Text>
                <Button title="Добавить" onPress={this.handlePressAddPlant} />
            </View>
        );
    }
}

export default connect((state, ownProps) => {
    const plantId = ownProps.navigation.getParam('id');

    return {
        plant: state.plants.find(({id}) => id === plantId),
    };
})(AddPlantDetailsScreen);
