import {AppLoading, Asset, Font, Icon, Localization} from 'expo';
import * as moment from 'moment';
require('moment/locale/ru.js');
import React from 'react';
import {Platform, StatusBar, StyleSheet, View} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import AppNavigator from './navigation/AppNavigator';
import {fetchAttributesDictionaries, fetchPlantsDictionary, fetchPopularPlants} from './state/actions';
import configureStore from './state/configureStore';

const {store, persistor} = configureStore();

export default class App extends React.Component {
    state = {
        isLoadingComplete: false,
    };

    constructor(props) {
        super(props);

        moment.locale('ru');
    }

    render() {
        if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
            return (
                <AppLoading
                    startAsync={this._loadResourcesAsync}
                    onError={this._handleLoadingError}
                    onFinish={this._handleFinishLoading}
                />
            );
        } else {
            return (
                <Provider store={store}>
                    <PersistGate loading={null} persistor={persistor}>
                        <View style={styles.container}>
                            {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
                            <AppNavigator />
                        </View>
                    </PersistGate>
                </Provider>
            );
        }
    }

    _loadResourcesAsync = async () => {
        const loadDataPromise = Promise.all([
            store.dispatch(fetchPlantsDictionary()),
            store.dispatch(fetchPopularPlants()),
            store.dispatch(fetchAttributesDictionaries()),
        ]);

        return Promise.all([
            Asset.loadAsync([require('./assets/images/robot-dev.png'), require('./assets/images/robot-prod.png')]),
            Font.loadAsync({
                // This is the font that we are using for our tab bar
                ...Icon.Ionicons.font,
                // We include SpaceMono because we use it in HomeScreen.js. Feel free
                // to remove this if you are not using it in your app
                'firaSans-Bold': require('./assets/fonts/FiraSans-Bold.ttf'),
                'firaSans-Light': require('./assets/fonts/FiraSans-Light.ttf'),
                firaSans: require('./assets/fonts/FiraSans-Regular.ttf'),
            }),
            loadDataPromise,
        ]);
    };

    _handleLoadingError = (error) => {
        // In this case, you might want to report the error to your error
        // reporting service, for example Sentry
        console.warn(error);
    };

    _handleFinishLoading = () => {
        this.setState({isLoadingComplete: true});
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
