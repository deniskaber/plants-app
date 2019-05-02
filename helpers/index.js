import {ImagePicker, Permissions} from 'expo';

export class ImageManagerFactory {
    _askCameraPermissions = async () => {
        let {status} = await Permissions.askAsync(Permissions.CAMERA);

        if (!status) {
            throw new Error('Camera permission not granted');
        }

        status = await Permissions.askAsync(Permissions.CAMERA_ROLL);

        if (!status) {
            throw new Error('Photo library permission not granted');
        }
    };

    pickImageFromCameraRoll = async () => {
        await this._askCameraPermissions();

        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
        });

        console.log(result);

        if (result.cancelled) {
            throw new Error('Image selection canceled');
        }

        return result;
    };

    takePhotoWithCamera = async () => {
        await this._askCameraPermissions();

        let result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            quality: 0.7,
            aspect: [4, 3],
        });

        console.log(result);

        if (result.cancelled) {
            throw new Error('Image selection canceled');
        }

        return result;
    };
}

export const ImageManager = new ImageManagerFactory();
