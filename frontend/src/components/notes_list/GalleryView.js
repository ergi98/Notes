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
                    <div  className="gallery-note">
                        <div className="gallery-preview" onClick={() => {console.log("hey")}}>
                            <p className="preview-paragraph" dangerouslySetInnerHTML={{__html: note.text}}>
                            </p>
                        </div>
                        <div className="note-info">
                            <h4 className="title">{note.title}</h4>
                            <label className="time">{note.time}</label>
                        </div>
                    </div>
                </Grow>
              
            )
        }
    </div>
    )
}

export default GalleryView
