import moment from 'moment';
import {Picker, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {RRule} from 'rrule';
import {times} from 'lodash';
import Colors from '../constants/Colors';

const frequencyMap = {
    0: 'year',
    1: 'month',
    2: 'week',
    3: 'day',
};

export class RecurrencePicker extends React.Component {
    state = {
        showPicker: false,
    };

    onPress = () => {
        this.setState((state) => ({
            showPicker: !state.showPicker,
        }));
    };

    formatValue(value) {
        return moment
            .duration(value.interval, frequencyMap[value.freq])
            .locale('ru')
            .humanize();
    }

    handleChangeFrequency = (freq) => {
        this.props.onValueChange({
            interval: this.props.value.interval,
            freq,
        });
    };

    handleChangeInterval = (interval) => {
        this.props.onValueChange({
            interval,
            freq: this.props.value.freq,
        });
    };

    renderPickerOption = (index) => {
        let dayNumber = index + 1;

        return <Picker.Item key={dayNumber} label={String(dayNumber)} value={dayNumber} />;
    };

    renderPicker = () => {
        if (!this.state.showPicker) {
            return null;
        }

        const {value} = this.props;
        const {freq, interval} = value;

        return (
            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={interval}
                    style={styles.intervalPicker}
                    onValueChange={this.handleChangeInterval}
                >
                    {times(30, (item) => this.renderPickerOption(item))}
                </Picker>
                <Picker selectedValue={freq} style={styles.frequencyPicker} onValueChange={this.handleChangeFrequency}>
                    <Picker.Item label="день" value={RRule.DAILY} />
                    <Picker.Item label="неделю" value={RRule.WEEKLY} />
                    <Picker.Item label="месяц" value={RRule.MONTHLY} />
                    <Picker.Item label="год" value={RRule.YEARLY} />
                </Picker>
            </View>
        );
    };

    render() {
        const {label, value, recommendedValue} = this.props;

        return (
            <View>
                <TouchableOpacity style={styles.inputContainer} onPress={this.onPress}>
                    <Text style={styles.labelText}>{label}</Text>
                    <Text style={[styles.labelText, styles.accentedLabelText]}>{this.formatValue(value)}</Text>
                </TouchableOpacity>
                <Text style={styles.captionText}>
                    Рекомендованное значение - раз в {this.formatValue(recommendedValue)}
                </Text>
                {this.renderPicker()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 8,
        paddingVertical: 16,
        borderBottomWidth: 2,
        borderColor: Colors.lightGreyColor,
    },
    labelText: {
        fontFamily: 'firaSans',
        fontSize: 18,
        lineHeight: 24,
        color: Colors.textColor,
    },
    captionText: {
        textAlign: 'right',
        fontFamily: 'firaSans',
        fontSize: 14,
        lineHeight: 20,
        color: Colors.greyColor,
    },
    accentedLabelText: {
        color: Colors.tintColor,
    },
    pickerContainer: {
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
