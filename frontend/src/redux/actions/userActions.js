// Actions
import { 
    LOG_IN, 
    LOG_OUT,
    VALIDATE_AUTH,
    ADD_NOTE,
    UPDATE_NOTE,
    DELETE_NOTE
} from '../actions/types'

// Axios
import axios from 'axios'

export const validateAuth = (event) => async (dispatch) => {
    try {
        let res = await axios.post(`/users/session`, { username: event.username })
        
        dispatch({
            type: VALIDATE_AUTH,
            payload: res.data.session.jwt === event.jwt
        })

        return { success: true, res }
    }
    catch(err) { 
        return { success: false, err }    
    }
}

export const signUp = (event) => async (dispatch) => {
    try {
        let res = await axios.post(`/users/register`, { user: event })

        // If the user was successfuly registerd 
        if(res.data.result.success)  {
            // Try to login the user
            let result = await axios.post(`/users/login`, {
                username: event.username,
                password: event.password
            })

            dispatch({
                type: LOG_IN,
                payload: result.data
            })

            return { success: true, result }
        }

        return { success: false, res }
    }
    catch(err) {    
        return { success: false, err }    
    }
}

export const logIn = (event) => async (dispatch) => {
    try {
        let res = await axios.post(`/users/login`, {
            username: event.username,
            password: event.password
        })
    
        dispatch({
            type: LOG_IN,
            payload: res.data
        })

        return { success: true, res }
    }    
    catch(err) {    
        return { success: false, err }    
    }
}

export const logOut = (event) => async (dispatch) => {
    try {
        let res = await axios.post('/users/logout', { username: event.username })
        dispatch({
            type: LOG_OUT,
            payload: res
        })
        return { success: true, res }
    }   
    catch(err) {
        return { success: false, err } 
    }
}

export const addNote = (event) => async (dispatch) => {
    try {
        const uniqid = require('uniqid')

        let note = {
            id: uniqid(),
            text: '<h1>Untitled Note</h1>',
            title: 'Untitled Note',
            created_at: new Date(),
            updated_at: new Date()
        }
        let res = await axios.post('/users/add-note', { username: event.username, note})
        dispatch({
            type: ADD_NOTE,
            payload: note
        })
        return { success: true, note, res }
    }
    catch(err) {
        return { success: false, err } 
    }
}

export const updateNote = (event) => async (dispatch) => {
    try {
        let res = await axios.post('/users/update-note', event)
        dispatch({
            type: UPDATE_NOTE,
            payload: event.note
        })
        return { success: true, res }
    }
    catch(err) {
        return { success: false, err } 
    }
}

export const deleteNote = (event) => async (dispatch) => {
    try {
        let res = await axios.post('/users/delete-note', event)
        dispatch({
            type: DELETE_NOTE,
            payload: event
        })
        return { success: true, res }
    }
    catch(err) {
        return { success: false, err } 
    }
}