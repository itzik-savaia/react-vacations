import { FETCH_VACATIONS, FOLLOW_PLUS, FOLLOW_MINUS } from '../actions/types';

const initialState = {
    Vacations: [],

};

export const AllVacations = (state = initialState.Vacations, action) => {
    switch (action.type) {
        case FETCH_VACATIONS:
            return {
                ...state,
                Vacations: action.payload
            };
        default:
            return state;
    }
}

const vacationReducer = { AllVacations }

export default vacationReducer