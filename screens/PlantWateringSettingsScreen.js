import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {connect} from 'react-redux';
import RRule from 'rrule';
import {DatePicker} from '../components/DatePicker';
import {RecurrencePicker} from '../components/RecurrencePicker';
import {ScreenViewContainer} from '../components/ScreenView';
import StyledButton from '../components/StyledButton';
import {ScreenSubtitleText, ScreenTitleText} from '../components/StyledText';
import {editUserPlant} from '../state/actions';

class PlantWateringSettingsScreen extends React.Component {
    static navigationOptions = {
        headerStyle: {
            borderBottomWidth: 0,
        },
    };

    state;

    constructor(props) {
        super(props);

        const {lastWateringDate, recurrence} = props.plant;

        this.state = {
            lastWateringDate: lastWateringDate || new Date(),
            wateringRecurrence: recurrence || {
                freq: props.plant.recommendedWateringInterval,
                interval: RRule.DAILY,
            },
        };
    }

    handleSubmit = () => {
        const {plant, editUserPlant} = this.props;
        const {lastWateringDate, wateringRecurrence} = this.state;

        editUserPlant(plant.id, {
            lastWateringDate,
            recurrence: wateringRecurrence,
        });

        this.props.navigation.goBack();
    };

    handleChangeLastWateringDate = (lastWateringDate) => {
        this.setState({
            lastWateringDate,
        });
    };

    handleChangeWateringRecurrence = (wateringRecurrence) => {
        this.setState({
            wateringRecurrence,
        });
    };

    render() {
        const {plant} = this.props;
        const {lastWateringDate, wateringRecurrence} = this.state;

        const recommendedValue = {
            freq: RRule.DAILY,
            interval: plant.recommendedWateringInterval,
        };

        return (
            <ScreenViewContainer style={styles.container}>
                <View>
                    <ScreenTitleText style={styles.titleText}>График полива</ScreenTitleText>
                    <ScreenSubtitleText style={styles.titleText}>
                        Вы можете настроить свой собственный график или использовать рекомендованный ниже
                    </ScreenSubtitleText>
                    <View>
                        <DatePicker
                            label="Последний полив"
                            value={lastWateringDate}
                            onValueChange={this.handleChangeLastWateringDate}
                        />
                        <RecurrencePicker
                            label="Поливать раз в"
                            value={wateringRecurrence}
                            recommendedValue={recommendedValue}
                            onValueChange={this.handleChangeWateringRecurrence}
                        />
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    <StyledButton title="Применить" isAccented onPress={this.handleSubmit} />
                </View>
            </ScreenViewContainer>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 26,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'stretch',
    },
    titleText: {
        marginBottom: 24,
    },
    buttonContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
});

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
