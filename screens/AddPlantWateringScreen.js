import React from 'react';
import {Button, Text, View} from 'react-native';
import {connect} from 'react-redux';

class AddPlantWateringScreen extends React.Component {
    handlePressAddPlant = () => {
        this.props.navigation.navigate('AddPlantAdditionalDetails', {id: this.props.plant.id});
    };

    render() {
        const {plant} = this.props;

        return (
            <View>
                <Text>График полива</Text>
                <Button title="Далее" onPress={this.handlePressAddPlant} />
            </View>
        );
    }
}

export default connect((state, ownProps) => {
    const plantId = ownProps.navigation.getParam('id');

    return {
        plant: state.plants.find(({id}) => id === plantId),
    };
})(AddPlantWateringScreen);
