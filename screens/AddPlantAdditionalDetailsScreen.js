import nanoid from 'nanoid/non-secure';
import React from 'react';
import {KeyboardAvoidingView, ScrollView, StyleSheet, View} from 'react-native';
import {connect} from 'react-redux';
import {ImagePicker} from '../components/ImagePicker';
import {ScreenViewContainer} from '../components/ScreenView';
import StyledButton from '../components/StyledButton';
import StyledInput from '../components/StyledInput';
import {ScreenTitleText, SubheaderCaptionText} from '../components/StyledText';
import {addUserPlant} from '../state/actions';

class AddPlantAdditionalDetailsScreen extends React.Component {
    static navigationOptions = {
        headerStyle: {
            borderBottomWidth: 0,
        },
    };

    constructor(props) {
        super(props);

        const {plant} = props;

        this.state = {
            userDefinedPlantName: plant.name,
            imageURI: plant.imageURI,
        };
    }

    handlePressAddPlant = () => {
        const {plant, plantProps, addUserPlant} = this.props;
        const {userDefinedPlantName, imageURI} = this.state;

        // TODO add plant name validation

        addUserPlant({
            ...plantProps,
            name: userDefinedPlantName.trim(),
            botanicalName: plant.botanicalName,
            imageURI,
            plantId: plant.id,
            id: nanoid(),
        });

        this.props.navigation.navigate('Home');
    };

    handleChangePlantImageURI = (imageURI) => {
        this.setState({
            imageURI,
        });
    };

    handleChangePlantNameInput = (text) => this.setState({userDefinedPlantName: text});

    render() {
        const {imageURI, userDefinedPlantName} = this.state;

        return (
            <ScreenViewContainer style={styles.container}>
                <KeyboardAvoidingView
                    style={styles.scrollContainer}
                    contentContainerStyle={styles.scrollContentContainer}
                    behavior="position"
                    enabled
                >
                    <View style={styles.contentContainerStyle}>
                        <View>
                            <ScreenTitleText style={styles.addBottomMargin}>Доп. информация</ScreenTitleText>

                            <View style={styles.addBottomMargin}>
                                <SubheaderCaptionText>Фото растения</SubheaderCaptionText>
                                <ImagePicker imageURI={imageURI} onValueChange={this.handleChangePlantImageURI} />
                            </View>

                            <View>
                                <SubheaderCaptionText>Название растения</SubheaderCaptionText>
                                <StyledInput
                                    value={userDefinedPlantName}
                                    onValueChange={this.handleChangePlantNameInput}
                                />
                            </View>
                        </View>
                        <View style={styles.buttonContainer}>
                            <StyledButton title="Применить" isAccented onPress={this.handlePressAddPlant} />
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </ScreenViewContainer>
        );
    }
}

const styles = StyleSheet.create({
    scrollContainer: {
        flex: 1,
    },
    scrollContentContainer: {
        flex: 1,
    },
    container: {
        flex: 1,
        marginBottom: 26,
    },
    contentContainerStyle: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'stretch',
    },
    addBottomMargin: {
        marginBottom: 16,
    },
    buttonContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
});

const mapStateToProps = (state, ownProps) => {
    const plantId = ownProps.navigation.getParam('id');
    const plantProps = ownProps.navigation.getParam('plantProps');

    return {
        plant: state.plants.find(({id}) => id === plantId),
        plantProps,
    };
};

const mapDispatchToProps = {addUserPlant};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(AddPlantAdditionalDetailsScreen);
