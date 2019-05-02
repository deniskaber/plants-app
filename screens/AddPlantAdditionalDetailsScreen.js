import nanoid from 'nanoid/non-secure';
import React from 'react';
import {Alert, Button, Text, TextInput, View} from 'react-native';
import {connect} from 'react-redux';
import {addUserPlant} from '../state/actions';

class AddPlantAdditionalDetailsScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userDefinedPlantName: props.plant.name,
        };
    }

    handlePressAddPlant = () => {
        const {plant, addUserPlant} = this.props;
        const {userDefinedPlantName} = this.state;

        // TODO add plant name validation

        addUserPlant({
            name: userDefinedPlantName.trim(),
            plantId: plant.id,
            id: nanoid(),
        });

        this.props.navigation.navigate('Home');
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
