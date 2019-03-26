import {createStore} from 'redux'
import {rootReducer} from './rootReducer';

export default () => {
    let store = createStore(rootReducer);
    return {store};
}