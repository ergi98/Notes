import React from 'react'
import './ListView.css'

// Material UI
import Grow from '@material-ui/core/Grow'

function ListView(props) {
    return (
        <div className="container-div">
            {
                props.notes.map((note, index) => 
                    <Grow key={note.id} in={true} style={{ transformOrigin: '0 0 0' }} timeout = {300 + index*200}>
                        <div className="list-note" onClick={() => props.setOpenedNote(note)}>
                            <h3 className="title">{note.title}</h3>
                            <div className="note-info">
                                <label className="time">{note.time}</label>
                                <label className="preview">{note.text.substring(0, 20)}</label>
                            </div>
                        </div>
                    </Grow>
                )
            }
        </div>
    )
}

export default ListView
