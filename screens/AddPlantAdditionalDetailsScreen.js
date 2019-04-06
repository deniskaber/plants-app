import React from 'react';
import {Button, Text, View} from 'react-native';
import {connect} from 'react-redux';
import {addUserPlant} from '../config/actions';

class AddPlantAdditionalDetailsScreen extends React.Component {
    handlePressAddPlant = () => {
        this.props.addUserPlant({
            plantId: this.props.plant.id,
        });

        this.props.navigation.navigate('Home');
    };

    render() {
        return (
            <View>
                <Text>Дополнительная инфа</Text>
                <Button title="Применить" onPress={this.handlePressAddPlant} />
            </View>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const plantId = ownProps.navigation.getParam('id');

    return {
        plant: state.plants.find(({id}) => id === plantId),
    };
};

const mapDispatchToProps = {addUserPlant};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(AddPlantAdditionalDetailsScreen);
