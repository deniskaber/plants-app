import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {connect} from 'react-redux';
import {Input} from 'react-native-elements';
import RRule from 'rrule';
import {DatePicker} from '../components/DatePicker';
import StyledButton from '../components/StyledButton';
import {RecurrencePicker} from '../components/RecurrencePicker';
import {ScreenViewContainer} from '../components/ScreenView';
import {ScreenSubtitleText, ScreenTitleText, SubheaderCaptionText} from '../components/StyledText';

class AddPlantWateringScreen extends React.Component {
    static navigationOptions = {
        headerStyle: {
            borderBottomWidth: 0,
        },
    };

    state;

    constructor(props) {
        super(props);

        this.state = {
            lastWateringDate: new Date(),
            recurrence: {
                freq: RRule.DAILY,
                interval: props.plant.recommendedWateringInterval,
            },
        };
    }

    handlePressAddPlant = () => {
        const {navigation, plant} = this.props;
        const {lastWateringDate, recurrence} = this.state;

        navigation.navigate('AddPlantAdditionalDetails', {
            id: plant.id,
            plantProps: {
                recommendedWateringInterval: plant.recommendedWateringInterval,
                lastWateringDate,
                recurrence,
            },
        });
    };

    handleChangeLastWateringDate = (lastWateringDate) => {
        this.setState({
            lastWateringDate,
        });
    };

    handleChangeWateringRecurrence = (recurrence) => {
        this.setState({
            recurrence,
        });
    };

    render() {
        const {plant} = this.props;
        const {lastWateringDate, recurrence} = this.state;

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
                            value={recurrence}
                            recommendedValue={recommendedValue}
                            onValueChange={this.handleChangeWateringRecurrence}
                        />
                    </View>
                </View>
                <View>
                    <StyledButton title="Далее" onPress={this.handlePressAddPlant} />
                </View>
            </ScreenViewContainer>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 26,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'stretch',
    },
    titleText: {
        marginBottom: 24,
    },
    buttonContainer: {
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
});

export default connect((state, ownProps) => {
    const plantId = ownProps.navigation.getParam('id');

    return {
        plant: state.plants.find(({id}) => id === plantId),
    };
})(AddPlantWateringScreen);
