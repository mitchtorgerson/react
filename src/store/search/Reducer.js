import { Actions } from './Actions';
import { INITIAL_STATE } from './InitialState';

const ACTION_HANDLERS = {
    [Actions.PERFORM_SEARCH]: (state, action) => {
        const tempState = Object.assign({}, state);
        tempState.imageUrl = action.imageUrl;
        return Object.assign({}, state, tempState);
    }
};

export default function reduce(state, action) {
    state = state || INITIAL_STATE;
    const handler = ACTION_HANDLERS[action.type];
    return handler ? handler(state, action) : state;
}
