import {SET_IS_PLUS} from "../actions/valuesActions";

const initialState = {
    isPlus: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_IS_PLUS:
            return {...state, isPlus: action.isPlus};
        default:
            return state;
    }
};

export default reducer;
