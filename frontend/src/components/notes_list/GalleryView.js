import React from 'react'
import './GalleryView.css'

// Material UI
import Grow from '@material-ui/core/Grow'

function GalleryView(props) {
    return (
        <div className="gallery-div">
            {
                props.notes.map((note, index) => 
                    <Grow key={note.id} in={true} style={{ transformOrigin: '0 0 0' }} timeout = {250 + index*150}>
                        <div className="gallery-note">
                            <div className="gallery-preview" onClick={() => props.setOpenedNote(note)}>
                                <p className="preview-paragraph" dangerouslySetInnerHTML={{__html: note.text}}>
                                </p>
                                <div className={`grid-note-info ${note.id === props.openendNote?.id? "opened-note" : ""}`}>
                                    <h4 className={`grid-title ${note.id === props.openendNote?.id? "white" : ""}`}>{note.title}</h4>
                                    <label className={`grid-time ${note.id === props.openendNote?.id? "white" : ""}`}>{note.time}</label>
                                </div>
                            </div>
                        </div>
                    </Grow>
                )
            }
        </div>
    )
}

export default GalleryView
