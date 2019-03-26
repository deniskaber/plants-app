import React from 'react';
import {Button, Text, View} from 'react-native';

export class TourScreen extends React.Component {
    onPressTakeTour = () => {
        this.props.navigation.navigate('AddPlant');
    }

    onPressSkipTour = () => {
        this.props.navigation.navigate('Main');
    }

    render() {
        return (
            <View>
                <Text>Расти</Text>
                <Text>это приложение...</Text>
                <Button
                    onPress={this.onPressTakeTour}
                    title="Поехали"
                    color="#841584"
                    accessibilityLabel="Learn more about this purple button"
                />

                <Button
                    onPress={this.onPressSkipTour}
                    title="Пропустить"
                    color="#841584"
                    accessibilityLabel="Learn more about this purple button"
                />
            </View>
        );
    }
}