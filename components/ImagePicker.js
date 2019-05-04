import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import ActionSheet from 'react-native-actionsheet';
import Colors from '../constants/Colors';
import {ImageManager} from '../helpers';
import CameraIcon from './icons/CameraIcon';

export class ImagePicker extends React.Component {
    handleImagePress = () => {
        this.ActionSheet.show();
    };

    handleActionSheetPick = async (index) => {
        let imageURI;

        switch (index) {
            case 0: {
                imageURI = await this._pickImage();
                break;
            }
            case 1: {
                imageURI = await this._takeNewPhoto();
                break;
            }
        }

        if (imageURI) {
            this.props.onValueChange(imageURI);
        }
    };

    _pickImage = async () => {
        let result;

        try {
            result = await ImageManager.pickImageFromCameraRoll();
        } catch (e) {
            return;
        }

        return result.uri;
    };

    _takeNewPhoto = async () => {
        let result;

        try {
            result = await ImageManager.takePhotoWithCamera();
        } catch (e) {
            return;
        }

        return result.uri;
    };

    render() {
        let {imageURI} = this.props;

        return (
            <View style={styles.container}>
                <Image source={{uri: imageURI}} style={styles.image} />
                <View style={styles.imageOverlay} />
                <View style={styles.imageIconOverlay}>
                    <CameraIcon fill={Colors.mainColor} />
                </View>
                <TouchableOpacity style={styles.imageTouchableOverlay} onPress={this.handleImagePress} />
                <ActionSheet
                    ref={(o) => (this.ActionSheet = o)}
                    options={['Выбрать из галереи', 'Сделать фото', 'Отмена']}
                    cancelButtonIndex={2}
                    onPress={this.handleActionSheetPick}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: 284,
        borderRadius: 12,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
        backgroundColor: Colors.greyColor,
    },
    imageOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: Colors.blackColor,
        opacity: 0.3,
    },
    imageIconOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageTouchableOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
    },
});
