import React, { useState } from 'react'
import './EditNote.css'

// Material UI
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'

// Icons
import ArrowBackSharpIcon from '@material-ui/icons/ArrowBackSharp'

// React Quill
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

function EditNote(props) {

    const [text, setText] = useState(props.note.text)

    function closeNote() {
        if(props.note.text !== text){
            saveNote(undefined, undefined, text)
        }
        props.setOpenedNote(undefined)
    }

    function saveNote(previousRange, source, editor) {
        let text = previousRange === undefined? editor : editor.getHTML()
        // TODO - Make API call with the string
    }

    function deleteNote() {
        // TODO - Make API call
        console.log("Hey")
    }

    return (
        <div className="note-holder">
            <div className="action-div">
                <IconButton aria-label="go-back" onClick={closeNote}>
                    <ArrowBackSharpIcon className="back-icon"/>
                </IconButton>
                <label className="noted-date">{props.note.date}</label>
                <IconButton aria-label="delete-note" onClick={deleteNote}>
                    <DeleteIcon className="delete-note-icon"/>
                </IconButton>
            </div>
            <ReactQuill 
                className="workspace" 
                theme={"snow"}
                placeholder="Write something ..."
                defaultValue={props.note.text}
                onChange={(content) => setText(content)}
                onBlur={saveNote}
            />
        </div>
    )
}

export default EditNote
