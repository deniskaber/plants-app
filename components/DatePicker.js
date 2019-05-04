import {DatePickerIOS, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View} from 'react-native';
import React from 'react';
import Colors from '../constants/Colors';

const monthNameMap = {
    0: 'Январь',
    1: 'Февраль',
    2: 'Март',
    3: 'Апрель',
    4: 'Май',
    5: 'Июнь',
    6: 'Июль',
    7: 'Август',
    8: 'Сентябрь',
    9: 'Октябрь',
    10: 'Ноябрь',
    11: 'Декабрь',
};

export class DatePicker extends React.Component {
    state = {
        showPicker: false,
    };

    hidePicker = () => {
        this.setState({
            showPicker: false,
        });
    }

    onPress = () => {
        this.setState((state) => ({
            showPicker: !state.showPicker,
        }));
    };

    setDate = (newDate) => {
        this.props.onValueChange(newDate);
    };

    formatValue(value) {
        return `${value.getDate()} ${monthNameMap[value.getMonth()]}`;
    }

    render() {
        const {label, value} = this.props;
        const {showPicker} = this.state;

        return (
            <TouchableWithoutFeedback onPress={this.hidePicker}>
                <View>
                    <TouchableOpacity style={styles.inputContainer} onPress={this.onPress}>
                        <Text style={styles.labelText}>{label}</Text>
                        <Text style={[styles.labelText, styles.accentedLabelText]}>{this.formatValue(value)}</Text>
                    </TouchableOpacity>
                    {showPicker && <DatePickerIOS date={value} mode="date" onDateChange={this.setDate} />}
                </View>
            </TouchableWithoutFeedback>
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
    accentedLabelText: {
        color: Colors.tintColor,
    },
});
