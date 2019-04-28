import React from 'react';
import {TextInput, Image} from 'react-native';
import {connect} from 'react-redux';
import {ScreenViewContainer} from '../components/ScreenView';
import {ScreenTitleText} from '../components/StyledText';
import {editUserPlant} from '../state/actions';

class PlantAdditionalDetailsScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userDefinedPlantName: props.plant.name,
        };
    }

    handleNameSubmit = (nativeEvent) => {
        const {plant, editUserPlant} = this.props;
        const {userDefinedPlantName} = this.state;

        // TODO add plant name validation

        editUserPlant(plant.id, {
            name: userDefinedPlantName.trim(),
        });
    };

    handleChangePlantNameInput = (text) => this.setState({userDefinedPlantName: text});

    renderPlantImageControl() {
        return (
            <Image
                style={{width: 50, height: 50}}
                source={{uri: 'http://localhost:3000/static/images/test_image_2.jpg'}}
            />
        );
    }

    render() {
        return (
            <ScreenViewContainer>
                <ScreenTitleText>Дополнительная инфа</ScreenTitleText>
                {this.renderPlantImageControl()}
                <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    value={this.state.userDefinedPlantName}
                    onChangeText={this.handleChangePlantNameInput}
                    onSubmitEditing={this.handleNameSubmit}
                />
            </ScreenViewContainer>
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
