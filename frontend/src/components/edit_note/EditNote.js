import React, { useState, useRef, useEffect } from 'react'
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

    const [text, setText] = useState('')
    const [show, setShow] = useState(false);
    const [hide, setHide] = useState(true);
    const timeoutRef = useRef(null);

    useEffect(() => {
      if (props.note !== undefined) {
        setText(props.note.text);
        setShow(true);
        setHide(false);
        clearTimeout(timeoutRef.current);
      }
      else {
        setShow(false);
        timeoutRef.current = setTimeout(() => setHide(true), 1000);
      }
    }, [props.note, text]);
  
    /* unmount cleanup */
    useEffect(() => () => clearTimeout(timeoutRef.current), []);

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
        <React.Fragment>
            {
                !hide?
                <div className={`note-holder ${show? "" : "close"}`}>
                    <div className="action-div">
                        <IconButton aria-label="go-back" onClick={closeNote}>
                            <ArrowBackSharpIcon className="back-icon"/>
                        </IconButton>
                        <label className="noted-date">{props.note?.date}</label>
                        <IconButton aria-label="delete-note" onClick={deleteNote}>
                            <DeleteIcon className="delete-note-icon"/>
                        </IconButton>
                    </div>
                    <ReactQuill 
                        className="workspace" 
                        theme={"snow"}
                        placeholder="Write something ..."
                        value={text}
                        onBlur={saveNote}
                    />
                </div> : null
            }
        </React.Fragment>
    )
}

export default EditNote
