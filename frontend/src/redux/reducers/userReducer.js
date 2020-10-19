// Actions
import { 
    LOG_IN, 
    LOG_OUT,
    ADD_NOTE,
    UPDATE_NOTE,
    DELETE_NOTE
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
        case  ADD_NOTE: {
            let addTemp = [...state.notes]
            addTemp.unshift(action.payload)
            return {
                ...state,
                notes: addTemp
            }
        }
        case UPDATE_NOTE: {
            let updateTemp = [...state.notes]
            // Updating the note changed by the user
            let index = updateTemp.findIndex(note => note.id === action.payload.id)
            updateTemp.splice(index, 1, action.payload)
            return {
                ...state,
                notes: updateTemp
            }
        }
        case DELETE_NOTE: {
            let deleteTemp = [...state.notes]
            // Filter the deleted note
            deleteTemp = deleteTemp.filter(tmp => { return tmp.id !== action.payload.id  })
            return {
                ...state,
                notes: deleteTemp
            }
        }
        default: 
            return state
    }
}