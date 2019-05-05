import {keyBy} from 'lodash';
import {PLANTS_DICTIONARY_ACTIONS, USER_PLANTS_ACTIONS} from './actions';

const initialState = {
    plants: [],
    popularPlants: [],
    usersPlants: [],
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case PLANTS_DICTIONARY_ACTIONS.LOAD_PLANTS_DICTIONARY: {
            return {
                ...state,
                isLoading: true,
            };
        }

        case PLANTS_DICTIONARY_ACTIONS.LOAD_PLANTS_DICTIONARY_SUCCESS: {
            return {
                ...state,
                plants: action.payload.map((plant) => ({
                    ...plant,
                    imageURI: 'http://localhost:8080/static/images/test_image.jpg',
                })),
                isLoading: false,
            };
        }

        case PLANTS_DICTIONARY_ACTIONS.LOAD_PLANTS_DICTIONARY_FAILURE: {
            return {
                ...state,
                isLoading: false,
            };
        }

        case PLANTS_DICTIONARY_ACTIONS.LOAD_POPULAR_PLANTS_DICTIONARY: {
            return {
                ...state,
                popularPlants: action.payload.map((plant) => ({
                    ...plant,
                    imageURI: 'http://localhost:8080/static/images/test_image.jpg',
                })),
            };
        }

        case PLANTS_DICTIONARY_ACTIONS.LOAD_ATTRIBUTES_DICTIONARIES: {
            return {
                ...state,
                light: keyBy(action.payload.light, 'id'),
                temperature: keyBy(action.payload.temperature, 'id'),
                humidity: keyBy(action.payload.humidity, 'id'),
                watering: keyBy(action.payload.watering, 'id'),
                soil: keyBy(action.payload.soil, 'id'),
            };
        }

        case USER_PLANTS_ACTIONS.ADD_PLANT: {
            return {
                ...state,
                usersPlants: [...state.usersPlants, action.payload],
            };
        }

        case USER_PLANTS_ACTIONS.EDIT_PLANT: {
            const {id: plantId, updatedDetails} = action.payload;
            const {usersPlants} = state;
            const updatedPlantIndex = usersPlants.findIndex(({id}) => id === plantId);
            const updatedPlant = usersPlants[updatedPlantIndex];

            if (updatedPlantIndex < 0) {
                console.error('Tried to update non existed plant');
                return state;
            }

            return {
                ...state,
                usersPlants: [
                    ...usersPlants.slice(0, updatedPlantIndex),
                    {...updatedPlant, ...updatedDetails},
                    ...usersPlants.slice(updatedPlantIndex + 1),
                ],
            };
        }

        case USER_PLANTS_ACTIONS.DELETE_PLANT: {
            const plantId = action.payload;

            return {
                ...state,
                usersPlants: state.usersPlants.filter(({id}) => id !== plantId),
            };
        }

        default:
            return state;
    }
};

export {rootReducer};
