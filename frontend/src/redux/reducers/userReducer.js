// Actions
import { 
    LOG_IN, 
    LOG_OUT, 
    UPDATE_NOTES 
} from '../actions/types'

const initialState = {
    isAuthenticated: false,
    username: '',
    jwt: '',
    notes: []
}

export default function(state = initialState, action) {
    switch(action.type) {
        case LOG_IN:
            return {
                ...state,
                isAuthenticated: true,
                jwt: action.payload.jwt,
                notes: action.payload.notes
            }
        case LOG_OUT:
            return {
                state: undefined,
                isAuthenticated: false
            }
        case UPDATE_NOTES:
            return {
                ...state,
                notes: action.payload
            }
        default: 
            return state
    }
}