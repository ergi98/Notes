import React, { useState, useRef, useEffect, useCallback } from 'react'
import './EditNote.css'

// Helpers
import debounce, { removeHTML, DisplayDate } from '../../helpers'

// Redux
import { updateNote, deleteNote } from '../../redux/actions/userActions'
import { useDispatch, useSelector } from 'react-redux'

// Material UI
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import Alert from '@material-ui/lab/Alert'
import Snackbar from '@material-ui/core/Snackbar'
import Slide from '@material-ui/core/Slide'

// Icons
import ArrowBackSharpIcon from '@material-ui/icons/ArrowBackSharp'

// React Quill
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

function TransitionUp(props) {
    return <Slide {...props} direction="up" />
}

function EditNote(props) {
    
    const [error, setError] = useState(false)
    const [message, setMessage] = useState(undefined)
    const [success, setSuccess] = useState(false)
    const [updateDate, setUpdateDate] = useState(undefined)

    const [hasChanged, setHasChanged] = useState(false)

    const dispatch = useDispatch()
    const username = useSelector((state) => state.user.username)

    const [text, setText] = useState(undefined)
    const [show, setShow] = useState(false)
    const [hide, setHide] = useState(true)
    const timeoutRef = useRef(null)

    useEffect(() => {
        if (props.note !== undefined) {  
            setHasChanged(false)
            setText(props.note.text)
            setUpdateDate(props.note.updated_at)
            setShow(true)
            setHide(false)
            clearTimeout(timeoutRef.current)
        }
        else {
            setShow(false)
            timeoutRef.current = setTimeout(() => setHide(true), 1000);
        }
    }, [props.note])
  
    /* unmount cleanup */
    useEffect(() => () => clearTimeout(timeoutRef.current), [])

    // Function used to update the note
    const update = useCallback(
        debounce(async (username, note, value) => {
            // Save note changes only if note is not empty
            setUpdateDate(new Date())
            let new_note = {...note}
            new_note.text = removeHTML(value) === ''? "<h1>Untitled Note</h1>" : value
            new_note.title = removeHTML(new_note.text).substring(0,20)
            new_note.updated_at = new Date()

            let res = await dispatch(updateNote({username, note: new_note}))

            if(res.success) {
                setMessage("Changes saved!")
                setSuccess(res.success)
                setHasChanged(false)
            }
            // If unsuccessful
            else{
                // Display error message
                setMessage(res?.err?.response?.data?.error || "An error occured while saving changes!")
                setError(true)
            }
        }, 2000), 
        []
    )

    // Close the note when the user clicks the back button
    function closeNote() {
        // If the previous text does not equal the current text
        if(removeHTML(text) !== ''){
            if(hasChanged)
                // Save the note in the database
                update(username, props.note, text)
        }
        // If the note is empty when use exits delete it
        else {
            removeNote(username, props.note.id)
        }
        // Close the note
        props.setOpenedNote(undefined)
    }

    async function removeNote(username, id) {
        let res = await dispatch(deleteNote({username, id}))
        if(res.success) {
            setMessage("Note deleted!")
            setSuccess(res.success)
            props.setOpenedNote(undefined)
        }
        // If unsuccessful
        else{
            // Display error message
            setMessage(res?.err?.response?.data?.error || "An error occured while deleting note!")
            setError(true)
        }
    }

    // Save changes
    async function handleChange(value, delta, caller) {
        setText(value)
        // Only save the note contents when the user types
        if(caller === "user") {
            setHasChanged(true)
            update(username, props.note, value)
        }
    }

    return (
        <React.Fragment>
           <Snackbar
                open={success}
                autoHideDuration={2500}
                onClose={() => setSuccess(false)}
                TransitionComponent={TransitionUp}
            >
                <Alert elevation={6} variant="filled" severity="success">{message}</Alert>
            </Snackbar>
            <Snackbar
                open={error}
                autoHideDuration={2500}
                onClose={() => setError(false)}
                TransitionComponent={TransitionUp}
            >
                <Alert elevation={6} variant="filled" severity="warning">{message}</Alert>
            </Snackbar>
            {
                !hide?
                <div className={`note-holder ${show? "" : "close"}`}>
                    <div className="action-div">
                        <IconButton aria-label="go-back" onClick={closeNote}>
                            <ArrowBackSharpIcon className="back-icon"/>
                        </IconButton>
                        <label className="noted-date"><DisplayDate date={updateDate}/></label>
                        <IconButton aria-label="delete-note" onClick={() => removeNote(username, props.note.id)}>
                            <DeleteIcon className="delete-note-icon"/>
                        </IconButton>
                    </div>
                    <ReactQuill 
                        className="workspace" 
                        theme={"snow"}
                        placeholder="Write something ..."
                        value={text === undefined? '' : text}
                        onChange={handleChange}
                    >
                    </ReactQuill>
                </div> : null
            }
        </React.Fragment>
    )
}

export default EditNote

// const removeNote = useCallback(
//     async (username, id) => {
//         let res = await dispatch(deleteNote({username, id}))
//         if(res.success) {
//             setMessage("Note deleted!")
//             setSuccess(res.success)
//             props.setOpenedNote(undefined)
//         }
//         // If unsuccessful
//         else{
//             // Display error message
//             setMessage(res?.err?.response?.data?.error || "An error occured while deleting note!")
//             setError(true)
//         }
//     },
//     [dispatch, props],
// )