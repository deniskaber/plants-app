import React from 'react';
import {Alert, Button, Image, TextInput, View} from 'react-native';
import {connect} from 'react-redux';
import {ScreenViewContainer} from '../components/ScreenView';
import {ScreenTitleText} from '../components/StyledText';
import Colors from '../constants/Colors';
import {ImageManager} from '../helpers';
import {deleteUserPlant, editUserPlant} from '../state/actions';

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

    _pickImage = async () => {
        let result;

        try {
            result = await ImageManager.pickImageFromCameraRoll();
        } catch (e) {
            return;
        }

        const {plant, editUserPlant} = this.props;
        editUserPlant(plant.id, {
            imageURI: result.uri,
        });
    };

    _takeNewPhoto = async () => {
        let result;

        try {
            result = await ImageManager.takePhotoWithCamera();
        } catch (e) {
            return;
        }

        const {plant, editUserPlant} = this.props;
        editUserPlant(plant.id, {
            imageURI: result.uri,
        });
    };

    handleDeletePlant = async () => {
        await new Promise((resolve, reject) => {
            Alert.alert('Удалить это растение', 'Вы уверены?', [
                {
                    text: 'Да',
                    onPress: resolve,
                    style: 'destructive',
                },
                {text: 'Нет', onPress: reject},
            ]);
        });

        this.props.deleteUserPlant(this.props.plant.id);
    };

    renderPlantImageControl() {
        let {plant} = this.props;

        return (
            <View>
                {plant.imageURI && <Image source={{uri: plant.imageURI}} style={{width: 200, height: 200}} />}
                <Button title="Сделать фото" onPress={this._takeNewPhoto} />
                <Button title="Выбрать из галлереи" onPress={this._pickImage} />
            </View>
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
                <Button title="Удалить растение" color={Colors.dangerColor} onPress={this.handleDeletePlant} />
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

const mapDispatchToProps = {editUserPlant, deleteUserPlant};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(PlantAdditionalDetailsScreen);
