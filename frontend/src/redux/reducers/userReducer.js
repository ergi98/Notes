// Actions
import { 
    LOG_IN, 
    LOG_OUT,
    VALIDATE_AUTH,
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
                username: action.payload.info.username,
                jwt: action.payload.auth_token,
                notes: action.payload.info.notes
            }
        case LOG_OUT:
            return {
                state: undefined,
                isAuthenticated: false
            }
        case VALIDATE_AUTH:
            if(action.payload) {
                return {
                    ...state,
                    isAuthenticated: true
                }
            }
            else {
                return {
                    state: undefined,
                    isAuthenticated: false
                }
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