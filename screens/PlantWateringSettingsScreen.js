import React from 'react';
import {Button, Text, View} from 'react-native';
import {connect} from 'react-redux';
import RecurrencePicker from '../components/RecurrencePicker';
import {ScreenViewContainer} from '../components/ScreenView';
import {ScreenTitleText} from '../components/StyledText';
import {editUserPlant} from '../state/actions';

class PlantWateringSettingsScreen extends React.Component {
    state;

    constructor(props) {
        super(props);

        this.state = {
            recurrence: props.plant.watering || {},
        };
    }

    handlePressSaveButton = () => {
        const {plant, editUserPlant} = this.props;

        editUserPlant(plant.id, {
            watering: {
                ...this.state.recurrence,
            },
        });

        this.props.navigation.goBack();
    };

    handleChangeRecurrence = (recurrence) => {
        this.setState({
            recurrence,
        });
    };

    render() {
        const {plant} = this.props;

        return (
            <ScreenViewContainer>
                <ScreenTitleText>График полива</ScreenTitleText>
                <View>
                    <RecurrencePicker value={this.state.recurrence} onChange={this.handleChangeRecurrence} />
                </View>
                <Button title="Сохранить" onPress={this.handlePressSaveButton} />
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
)(PlantWateringSettingsScreen);
