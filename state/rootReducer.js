import {PLANTS_DICTIONARY_ACTIONS, USER_PLANTS_ACTIONS} from './actions';

const initialState = {
    plants: [],
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
                plants: action.payload,
                isLoading: false,
            };
        }

        case PLANTS_DICTIONARY_ACTIONS.LOAD_PLANTS_DICTIONARY_FAILURE: {
            return {
                ...state,
                isLoading: false,
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
            const updatedPlant = state.usersPlants.find(({id}) => id === plantId);
            const usersPlants = state.usersPlants.filter(({id}) => id !== plantId);

            return {
                ...state,
                usersPlants: [...usersPlants, {...updatedPlant, ...updatedDetails}],
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
