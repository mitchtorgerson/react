import { combineReducers } from 'redux';

import search from './search/Reducer';

const rootReducer = combineReducers({
    search,
});

export default rootReducer;
