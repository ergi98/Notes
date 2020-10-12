import React, { useState } from 'react'
import './NotesList.css'

// Redux
import { useSelector } from 'react-redux'

// Components
import SearchBar from './SearchBar'
import ListView from './ListView'
import GalleryView from './GalleryView'
import EditNote from '../edit_note/EditNote'

// Icons
import ViewModuleSharpIcon from '@material-ui/icons/ViewModuleSharp'
import ReorderSharpIcon from '@material-ui/icons/ReorderSharp'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'

// Material UI
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'

function NotesList() {
    
    const allNotes = useSelector((state) => state.user.notes)

    const [view, setView] = useState("list")
    const [notes, setNotes] = useState(allNotes)
    const [openendNote, setOpenedNote] = useState(undefined)

    function logout() {
        // TODO - Make API call
        window.location = '/'
    }
    
    return (
        <div className="main">
            {
                openendNote !== undefined?
                    <EditNote note={openendNote} setOpenedNote={setOpenedNote} />
                    :
                    <React.Fragment>
                        <div className="header-div">
                            <IconButton aria-label="logout button" onClick={logout}>
                                <ExitToAppIcon className="logout-icon" fontSize="large"/>
                            </IconButton>
                            <h1 className="header">My Notes</h1>
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
                        <SearchBar setNotes={setNotes} setOpenedNote={setOpenedNote}/>
                        {
                            view === "list"? 
                                <ListView notes={notes} setOpenedNote={setOpenedNote}/> 
                                : 
                                <GalleryView notes={notes} setOpenedNote={setOpenedNote}/>
                        } 
                    </React.Fragment>
            }
     
        </div>
    )
}

export default NotesList
