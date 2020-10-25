import React, { useState } from 'react'
import './NotesList.css'

// Redux
import { logOut, addNote } from '../../redux/actions/userActions'
import { useDispatch, useSelector } from 'react-redux'

// Components
import ListView from './ListView'
import GalleryView from './GalleryView'
import EditNote from '../edit_note/EditNote'

// Icons
import ViewModuleSharpIcon from '@material-ui/icons/ViewModuleSharp'
import ReorderSharpIcon from '@material-ui/icons/ReorderSharp'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import SearchSharpIcon from '@material-ui/icons/SearchSharp'
import AddCircleSharpIcon from '@material-ui/icons/AddCircleSharp'

// Material UI
import Paper from '@material-ui/core/Paper'
import InputBase from '@material-ui/core/InputBase'
import IconButton from '@material-ui/core/IconButton'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Button from '@material-ui/core/Button'
import Alert from '@material-ui/lab/Alert'
import Snackbar from '@material-ui/core/Snackbar'
import Slide from '@material-ui/core/Slide'

function TransitionUp(props) {
    return <Slide {...props} direction="up" />
}

function NotesList() {

    let interval
    const dispatch = useDispatch()

    const [error, setError] = useState(false)
    const [message, setMessage] = useState(undefined)

    const username = useSelector((state) => state.user.username)
    const allNotes = useSelector((state) => state.user.notes)
    const jwt = useSelector((state) => state.user.jwt)

    const [view, setView] = useState("list")
    const [filter, setFilter] = useState('')
    const [openendNote, setOpenedNote] = useState(undefined)

    async function logout() {
        await dispatch(logOut())
        window.location.href = '/'
    }

    function filterNotes(event) {
        let text = event.target.value
        clearTimeout(interval)
        interval = setTimeout(() => { setFilter(text) }, 1000, text)
    }

    async function add() {
        let res = await dispatch(addNote({username, jwt}))
        
        // If the note was created
        if(res.success)
            // Open it on the editor
            setOpenedNote(res.note)
        // If there was an error
        else {
            // Display error message
            setMessage(res?.err?.response?.data?.error || "An error occured while saving changes!")
            setError(true)           
        }
    }

    return (
        <div className="main">
            <Snackbar
                open={error}
                autoHideDuration={2500}
                onClose={() => setError(false)}
                TransitionComponent={TransitionUp}
            >
                <Alert elevation={6} variant="filled" severity="warning">{message}</Alert>
            </Snackbar>
            <div className="notes">
                <div className="header-div">
                    <div className="title-holder">
                        <IconButton aria-label="logout button" onClick={logout}>
                            <ExitToAppIcon className="logout-icon" fontSize="large"/>
                        </IconButton>
                        <h1 className="header">My Notes</h1>
                    </div>
                    <ButtonGroup className="view-buttons" disableElevation variant="contained">
                        <Button
                            variant="contained"
                            color={ view ==="gallery"? "default" : "secondary" }
                            onClick={() => setView("list")}
                            startIcon={<ReorderSharpIcon />}
                        >List</Button>
                        <Button
                            variant="contained"
                            color={ view ==="list"? "default" : "secondary" }
                            onClick={() => setView("gallery")}
                            startIcon={<ViewModuleSharpIcon />}
                        >Gallery</Button>
                    </ButtonGroup>
                </div>
                <div style={{padding: "10px", display: "flex"}}>
                    <Paper component="form" style={{display:"flex", flexGrow: "1"}}>
                        <IconButton aria-label="menu">
                            <SearchSharpIcon />
                        </IconButton>
                        <InputBase
                            style={{flexGrow: "1"}}
                            placeholder="Search Notes"
                            inputProps={{ 'aria-label': 'search notes' }}
                            onChange={filterNotes}
                        />
                    </Paper>
                    <IconButton aria-label="menu" onClick={add}>
                        <AddCircleSharpIcon style={{color:"White"}} fontSize="large"/>
                    </IconButton>
                </div>
                {
                    allNotes?.length >= 1? 
                        view === "list"?
                            <ListView 
                                notes={ filter === ''? allNotes : allNotes.filter(note => note.title.toLowerCase().includes(filter.toLowerCase())) } 
                                openendNote={openendNote} 
                                setOpenedNote={setOpenedNote}
                            /> 
                            :
                            <GalleryView 
                                notes={ filter === ''? allNotes : allNotes.filter(note => note.title.toLowerCase().includes(filter.toLowerCase())) } 
                                openendNote={openendNote} 
                                setOpenedNote={setOpenedNote}
                            />
                        :
                        <div className="no-notes">
                            <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                                width="50%" fill="none" viewBox="0 0 467.276 467.276">
                                <g>
                                    <path className="face" d="M196.853,432.703c-56.157-7.993-110.636-42.543-139.091-91.805
                                        c-25.438-44.047-25.225-99.203-13.82-147.312c17.527-73.96,70.566-140.71,139.886-156.686c0.104,0.005,0.193,0.035,0.297,0.035
                                        c24.943,0.739,51.291,0.782,77.045,3.567c2.438,0.764,4.875,1.523,7.333,2.42c4.058,1.48,7.611,1.29,10.582,0.071
                                        c27.787,4.677,54.319,13.579,76.957,31.392c50.079,39.405,76.479,110.461,75.032,172.696
                                        C428.353,364.389,307.974,448.516,196.853,432.703z"/>
                                    <path className="left-eye" d="M169.279,211.913c23.28,0,23.28-36.104,0-36.104C145.999,175.808,145.999,211.913,169.279,211.913z"/>
                                    <path className="right-eye" d="M293.832,213.715c23.287,0,23.287-36.102,0-36.102C270.555,177.613,270.555,213.715,293.832,213.715z"/>
                                    <path className="mouth" d="M 142 336 C 207 294 251 306 306 356"/>
                                </g>
                            </svg>
                            <h2 className="no-notes-txt">You have no notes yet!</h2>
                            <h4 className="no-notes-txt">Click on the button above to insert a new note</h4>
                        </div>
                } 
            </div>
            <div className="edit-note-holder">
                <EditNote note={openendNote} setOpenedNote={setOpenedNote} />
                <div className={`no-note ${openendNote !== undefined? "hide-placeholder" : ""}`}>
                    <h1 className="no-note-txt">Open a note or create a new one</h1>
                </div>
            </div>
        </div>
    )
}

export default NotesList
