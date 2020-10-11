// Actions
import { 
    LOG_IN, 
    LOG_OUT, 
    UPDATE_NOTES,
} from '../actions/types'

// Axios
import axios from 'axios'

export const logIn = (event) => async (dispatch) => {
    // try {
    //     let res = await axios.post(`/users/login`, {
    //         username: event.username,
    //         password: event.password
    //     })
    
    //     dispatch({
    //         type: LOG_IN,
    //         payload: res
    //     })
    //     return { success: true }
    // }    
    // catch(err) {
    //     console.log(err)    
    //     return { success: false }    
    // }
    dispatch({
        type: LOG_IN,
        payload: event
    })
}

export const logOut = (event) => async (dispatch) => {
    try {    
        let res = await axios.post('/users/logout', { username: event.username })
        dispatch({
            type: LOG_OUT,
            payload: res
        })
    }   
    catch(err) {
        console.log(err)        
    }
}

export const updateNotes = (event) => (dispatch) => {
    dispatch({
        type: UPDATE_NOTES,
        payload: event.notes
    })
}