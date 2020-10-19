import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom"

// Redux 
import { useSelector } from 'react-redux'

// Components
import NotesList from '../notes_list/NotesList'
import Landing from '../landing/Landing'

function Routes() {

    const isAuthenticated = useSelector((state) => state.user.isAuthenticated)
    
    return (
        <BrowserRouter>
        <main>
                <Switch>
                    <Route path="/" exact component={Landing} />
                    {
                        isAuthenticated ?
                            <>
                                <Route path="/notes" exact component={NotesList} />
                            </> :
                            <Redirect to="/" />
                    }
                </Switch>
        </main>
    </BrowserRouter>
    )
}

export default Routes
