import {makeServerRequest} from '../helpers';
import globalConfig from './globalConfig';

export const PLANTS_DICTIONARY_ACTIONS = {
    LOAD_PLANTS_DICTIONARY: 'LOAD_PLANTS_DICTIONARY',
    LOAD_PLANTS_DICTIONARY_SUCCESS: 'LOAD_PLANTS_DICTIONARY_SUCCESS',
    LOAD_PLANTS_DICTIONARY_FAILURE: 'LOAD_PLANTS_DICTIONARY_FAILURE',
    LOAD_POPULAR_PLANTS_DICTIONARY: 'LOAD_POPULAR_PLANTS_DICTIONARY',
    LOAD_ATTRIBUTES_DICTIONARIES: 'LOAD_ATTRIBUTES_DICTIONARIES',
};

export const USER_PLANTS_ACTIONS = {
    ADD_PLANT: 'ADD_PLANT',
    EDIT_PLANT: 'EDIT_PLANT',
    DELETE_PLANT: 'DELETE_PLANT',
};

const loadPlantsDictionary = () => ({
    type: PLANTS_DICTIONARY_ACTIONS.LOAD_PLANTS_DICTIONARY,
});

const loadPlantsDictionarySuccess = (plants) => ({
    type: PLANTS_DICTIONARY_ACTIONS.LOAD_PLANTS_DICTIONARY_SUCCESS,
    payload: plants,
});

const loadPlantsDictionaryFailure = (error) => ({
    type: PLANTS_DICTIONARY_ACTIONS.LOAD_PLANTS_DICTIONARY_FAILURE,
    payload: error,
});

const loadPopularPlantsDictionary = (plants) => ({
    type: PLANTS_DICTIONARY_ACTIONS.LOAD_POPULAR_PLANTS_DICTIONARY,
    payload: plants,
});

const loadAttributesDictionaries = (dictionaries) => ({
    type: PLANTS_DICTIONARY_ACTIONS.LOAD_ATTRIBUTES_DICTIONARIES,
    payload: dictionaries,
});

export const fetchPlantsDictionary = () => {
    return (dispatch, getState) => {
        // if (getState().plants.length > 0) {
        //     return;
        // }

        dispatch(loadPlantsDictionary());
        const url = globalConfig.API_URL + '/plants';

        return makeServerRequest(url)
            .catch((error) => {
                alert(error.message);
                dispatch(loadPlantsDictionaryFailure(error));
            })
            .then((plants) => dispatch(loadPlantsDictionarySuccess(plants)));
    };
};

export const fetchPopularPlants = () => {
    return (dispatch, getState) => {
        const url = globalConfig.API_URL + '/plants/popular';

        return makeServerRequest(url).then((plants) => dispatch(loadPopularPlantsDictionary(plants)));
    };
};

export const fetchAttributesDictionaries = () => {
    return (dispatch, getState) => {
        const url = globalConfig.API_URL + '/dictionaries';

        return makeServerRequest(url).then((plants) => dispatch(loadAttributesDictionaries(plants)));
    };
};

export const addUserPlant = (plantDetails) => ({
    type: USER_PLANTS_ACTIONS.ADD_PLANT,
    payload: plantDetails,
});

export const editUserPlant = (plantId, plantDetails) => ({
    type: USER_PLANTS_ACTIONS.EDIT_PLANT,
    payload: {
        id: plantId,
        updatedDetails: plantDetails,
    },
});

export const deleteUserPlant = (plantId) => ({
    type: USER_PLANTS_ACTIONS.DELETE_PLANT,
    payload: plantId,
});
