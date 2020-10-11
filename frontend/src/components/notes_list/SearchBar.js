import React from 'react'

// Redux
import { useSelector } from 'react-redux'

// Icons
import SearchSharpIcon from '@material-ui/icons/SearchSharp'

// Material UI
import Paper from '@material-ui/core/Paper'
import InputBase from '@material-ui/core/InputBase'
import IconButton from '@material-ui/core/IconButton'
import AddCircleSharpIcon from '@material-ui/icons/AddCircleSharp'

function SearchBar(props) {

    const allNotes = useSelector((state) => state.user.notes)
    let interval

    function filterNotes(event) {
        let text = event.target.value
        clearTimeout(interval)
        interval = setTimeout(() => {
            let filtered = allNotes.filter(note => note.title.toLowerCase().includes(text.toLowerCase()))
            props.setNotes(filtered)
        }, 250, text)
    }

    return (
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
            <IconButton aria-label="menu">
                <AddCircleSharpIcon style={{color:"White"}} fontSize="large"/>
            </IconButton>
        </div>
    )
}

export default SearchBar
