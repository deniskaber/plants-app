import {times} from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import {Picker, StyleSheet, Text, View} from 'react-native';
import {RRule} from 'rrule';

export default class RecurrencePickerOld extends React.Component {
    static propTypes = {
        value: PropTypes.shape({
            freq: PropTypes.string,
            interval: PropTypes.number,
        }),
        onChange: PropTypes.func,
    };

    state;

    constructor(props) {
        super(props);

        this.state = {
            ...(props.value
                ? props.value
                : {
                      freq: RRule.DAILY,
                      interval: 1,
                  }),
        };
    }

    handleChangeFrequency = (freq) => {
        this.setState(
            {
                freq,
            },
            () => {
                this.props.onChange(this.state);
            },
        );
    };

    handleChangeInterval = (interval) => {
        this.setState(
            {
                interval,
            },
            () => {
                this.props.onChange(this.state);
            },
        );
    };

    renderPickerOption = (index) => {
        let dayNumber = index + 1;

        return <Picker.Item key={dayNumber} label={String(dayNumber)} value={dayNumber} />;
    };

    render() {
        const {freq, interval} = this.state;

        const rule = new RRule(this.state);

        return (
            <View>
                <View style={styles.container}>
                    <Text>Поливать каждые</Text>
                    <Picker
                        selectedValue={interval}
                        style={styles.intervalPicker}
                        onValueChange={this.handleChangeInterval}
                    >
                        {times(30, (item) => this.renderPickerOption(item))}
                    </Picker>
                    <Picker
                        selectedValue={freq}
                        style={styles.frequencyPicker}
                        onValueChange={this.handleChangeFrequency}
                    >
                        <Picker.Item label="день" value={RRule.DAILY} />
                        <Picker.Item label="неделю" value={RRule.WEEKLY} />
                        <Picker.Item label="месяц" value={RRule.MONTHLY} />
                        <Picker.Item label="год" value={RRule.YEARLY} />
                    </Picker>
                </View>
                <View>
                    <Text>{rule.toString()}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    intervalPicker: {
        width: 80,
    },
    frequencyPicker: {
        width: 120,
    },
});
