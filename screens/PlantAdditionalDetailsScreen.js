import React from 'react';
import {Button, Text, TextInput, View} from 'react-native';
import {connect} from 'react-redux';
import {editUserPlant} from '../state/actions';

class PlantAdditionalDetailsScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userDefinedPlantName: props.plant.name,
        };
    }

    handlePressSubmit = () => {
        const {plant, editUserPlant} = this.props;
        const {userDefinedPlantName} = this.state;

        // TODO add plant name validation

        editUserPlant(plant.id, {
            name: userDefinedPlantName.trim(),
        });

        // this.props.navigation.navigate('Home');
    };

    handleChangePlantNameInput = (text) => this.setState({userDefinedPlantName: text});

    render() {
        return (
            <View>
                <Text>Дополнительная инфа</Text>
                <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    onChangeText={this.handleChangePlantNameInput}
                    value={this.state.userDefinedPlantName}
                />
                <Button title="Применить" onPress={this.handlePressSubmit} />
            </View>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const plantId = ownProps.navigation.getParam('id');

    return {
        plant: state.usersPlants.find(({id}) => id === plantId),
    };
};

const mapDispatchToProps = {editUserPlant};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(PlantAdditionalDetailsScreen);
