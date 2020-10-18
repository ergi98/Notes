import React from 'react'
import './ListView.css'

// Helpers
import { removeHTML, DisplayDate } from '../../helpers'

// Material UI
import Grow from '@material-ui/core/Grow'

function ListView(props) {
    return (
        <div className="container-div">
            {
                props.notes.map((note, index) => 
                    <Grow key={note.id} in={true} style={{ transformOrigin: '0 0 0' }} timeout = {300 + index*200}>
                        <div 
                            className={`list-note ${note.id === props.openendNote?.id? "opened-note" : ""}`}
                            onClick={() => { props.setOpenedNote(note)}}
                        >
                            <h3 className="title">{note.title}</h3>
                            <div className="note-info">
                                <label className="time"><DisplayDate date={note.updated_at}/></label>
                                <label className="preview">{removeHTML(note.text.substring(0, 25))}</label>
                            </div>
                        </div>
                    </Grow>
                )
            }
        </div>
    )
}

export default ListView
