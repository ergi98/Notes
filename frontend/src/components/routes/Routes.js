import React, { useEffect } from 'react'
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom"

// Redux 
import { validateAuth } from '../../redux/actions/userActions'
import { useDispatch, useSelector } from 'react-redux'

// Components
import NotesList from '../notes_list/NotesList'
import Landing from '../landing/Landing'

function Routes() {

    const dispatch = useDispatch()
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated)
    const username = useSelector((state) => state.user.username)
    const jwt = useSelector((state) => state.user.jwt)

    useEffect(() => {
        let _isMounted = true

        async function validate() {
            if(username && jwt)
                dispatch(validateAuth({username, jwt}))
        }

        _isMounted && validate()

        return () => { _isMounted = false }
    })
    
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
