import React from 'react';
import {FlatList, Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {SearchBar} from 'react-native-elements';
import {connect} from 'react-redux';
import PlantDictionaryListCard from '../components/PlantDictionaryListCard';
import {ScreenViewContainer} from '../components/ScreenView';
import {ScreenTitleText, SubheaderCaptionText} from '../components/StyledText';
import Colors from '../constants/Colors';

const ITEM_HEIGHT = 76;

class PlantsDictionaryScreen extends React.PureComponent {
    static navigationOptions = {
        headerStyle: {
            borderBottomWidth: 0,
        },
    };

    state = {
        plantNameFilter: '',
    };

    _onPress = ({id}) => {
        this.props.navigation.navigate('AddPlantDetails', {id});
    };

    getFilteredPlants = (plants, filter) => {
        return plants.filter(({name, botanicalName}) => name.includes(filter) || botanicalName.includes(filter));
    };

    handleChangeSearch = (text) => {
        console.log(text);

        this.setState({
            plantNameFilter: text,
            data: this.getFilteredPlants(this.props.plants, text),
        });
    };

    handleClearSearch = () => {
        this.setState({
            plantNameFilter: '',
            data: null,
        });
    };

    listKeyExtractor = (item, index) => String(item.id);

    listLayoutGetter = (data, index) => ({length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index});

    renderListHeader = () => {
        const {plantNameFilter} = this.state;

        return (
            <View>
                <ScreenTitleText>Поиск</ScreenTitleText>
                <SearchBar
                    value={this.state.plantNameFilter}
                    placeholder="Введите название растения"
                    platform={Platform.OS}
                    containerStyle={styles.searchFieldContainer}
                    onChangeText={this.handleChangeSearch}
                    onClear={this.handleClearSearch}
                />
                {!plantNameFilter && <SubheaderCaptionText>Популярные</SubheaderCaptionText>}
            </View>
        );
    };

    renderEmptyMessage = () => {
        return (
            <View>
                <Text>Ничего не найдено</Text>
            </View>
        );
    };

    renderItem = ({item}) => {
        return (
            <TouchableOpacity key={item.id} onPress={() => this._onPress(item)}>
                <PlantDictionaryListCard item={item} search={this.state.plantNameFilter} />
            </TouchableOpacity>
        );
    };

    render() {
        return (
            <ScreenViewContainer>
                <FlatList
                    data={this.state.data || this.props.popularPlants}
                    keyExtractor={this.listKeyExtractor}
                    ListHeaderComponent={this.renderListHeader}
                    ListEmptyComponent={this.renderEmptyMessage}
                    getItemLayout={this.listLayoutGetter}
                    renderItem={this.renderItem}
                />
            </ScreenViewContainer>
        );
    }
}

const styles = StyleSheet.create({
    searchFieldContainer: {
        backgroundColor: Colors.mainColor,
        borderWidth: 0,
        borderTopWidth: 0,
        borderBottomWidth: 0,
        padding: 0,
        marginLeft: -8,
        marginRight: -8,
    },
    searchField: {
        height: 36,
        borderRadius: 8,
        backgroundColor: Colors.fieldBackgroundColor,
        color: Colors.fieldTextColor,
        marginVertical: 24,
    },
});

const mapStateToProps = (state) => ({
    plants: state.plants,
    popularPlants: state.popularPlants,
});

export default connect(mapStateToProps)(PlantsDictionaryScreen);
