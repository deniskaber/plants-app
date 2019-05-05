import React from 'react';
import {Alert, Button, StyleSheet, Text, View} from 'react-native';
import {connect} from 'react-redux';
import {ListItem} from 'react-native-elements';
import {ScreenViewContainer} from '../components/ScreenView';
import StyledButton from '../components/StyledButton';
import StyledListItem from '../components/StyledListItem';
import {ScreenSubtitleText, ScreenTitleText} from '../components/StyledText';
import Colors from '../constants/Colors';
import {deleteUserPlant} from '../state/actions';

class PlantSettingsScreen extends React.Component {
    static navigationOptions = {
        tabBarVisible: false,
        headerStyle: {
            borderBottomWidth: 0,
        },
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

        this.props.navigation.navigate('Home');

        this.props.deleteUserPlant(this.props.plant.id);
    };

    handlePressWateringButton = () => {
        this.props.navigation.push('PlantWateringSettings', {id: this.props.plant.id});
    };

    handlePressAdditionalDetailsButton = () => {
        this.props.navigation.push('PlantAdditionalDetails', {id: this.props.plant.id});
    };

    render() {
        const {plant} = this.props;

        if (!plant) {
            this.props.navigation.goBack('Home');

            return null;
        }

        return (
            <ScreenViewContainer style={styles.container}>
                <View>
                    <ScreenTitleText style={styles.addBottomMargin}>Настройки</ScreenTitleText>
                    <ScreenSubtitleText numberOfLines={1} style={styles.addBottomMargin}>
                        Настройки растения <Text style={styles.boldText}>{plant.name}</Text>
                    </ScreenSubtitleText>
                    <View style={styles.listItemsWrapper}>
                        <StyledListItem title="График полива" onPress={this.handlePressWateringButton} />
                        <StyledListItem title="Доп. информация" onPress={this.handlePressAdditionalDetailsButton} />
                    </View>
                </View>

                <View style={styles.buttonContainer}>
                    <StyledButton
                        title="Удалить растение"
                        type={StyledButton.DANGER}
                        noBorder
                        onPress={this.handleDeletePlant}
                    />
                </View>
            </ScreenViewContainer>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'stretch',
    },
    addBottomMargin: {
        marginBottom: 24,
    },
    boldText: {
        fontFamily: 'firaSans-Bold',
    },
    listItemsWrapper: {
        marginHorizontal: -16,
    },
    buttonContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 24,
    },
});

const mapStateToProps = (state, ownProps) => {
    const plantId = ownProps.navigation.getParam('id');

    return {
        plant: state.usersPlants.find(({id}) => id === plantId),
    };
};

const mapDispatchToProps = {deleteUserPlant};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(PlantSettingsScreen);
