import globalConfig from './globalConfig';

export const PLANTS_DICTIONARY_ACTIONS = {
    LOAD_PLANTS_DICTIONARY: 'LOAD_PLANTS_DICTIONARY',
    LOAD_PLANTS_DICTIONARY_SUCCESS: 'LOAD_PLANTS_DICTIONARY_SUCCESS',
    LOAD_PLANTS_DICTIONARY_FAILURE: 'LOAD_PLANTS_DICTIONARY_FAILURE',
};

export const USER_PLANTS_ACTIONS = {
    ADD_PLANT: 'ADD_PLANT',
    EDIT_PLANT: 'EDIT_PLANT',
    DELETE_PLANT: 'DELETE_PLANT',
};

const loadPlantsDictionary = () => ({
    type: PLANTS_DICTIONARY_ACTIONS.LOAD_PLANTS_DICTIONARY,
});

const loadPlantsDictionarySuccess = (recipes) => ({
    type: PLANTS_DICTIONARY_ACTIONS.LOAD_PLANTS_DICTIONARY_SUCCESS,
    payload: recipes,
});

const loadPlantsDictionaryFailure = (error) => ({
    type: PLANTS_DICTIONARY_ACTIONS.LOAD_PLANTS_DICTIONARY_FAILURE,
    payload: error,
});

export const fetchPlantsDictionary = () => {
    return (dispatch, getState) => {
        if (getState().plants.length > 0) {
            return;
        }

        dispatch(loadPlantsDictionary());

        return fetch(globalConfig.API_URL + '/plants', {
            headers: {
                Accept: 'application/json',
            },
            mode: 'cors',
        })
            .then((response) => response.json())
            .catch((error) => {
                console.error(error.message);
                dispatch(loadPlantsDictionaryFailure(error));
            })
            .then((recipes) => dispatch(loadPlantsDictionarySuccess(recipes)));
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
