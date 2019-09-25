
const initialState = {
    Vacations: [],
};

export function Vacations(state = initialState, action) {
    // console.log('Vacations-action', action.payload);
    switch (action.type) {
        case 'FETCH_VACATIONS':
            return {
                ...state,
                Vacations: action.payload
            };
        case 'DELETE':
            return {
                deleteCard: action.payload
            }
        default:
            return state;
    }
}
