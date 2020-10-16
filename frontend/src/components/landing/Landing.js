import React, { useEffect, useState } from 'react'
import './Landing.css'

// Components
import Login from './Login'
import Signup from './Signup'

// Redux
import { useSelector } from 'react-redux'

// Material UI
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'
import Slide from '@material-ui/core/Slide'

function TransitionUp(props) {
    return <Slide {...props} direction="up" />
}

function Landing() {

    const isAuthenticated = useSelector((state) => state.user.isAuthenticated)

    const [error, setError] = useState(false)
    const [message, setMessage] = useState(undefined)
    const [active, setActive] = useState('login')

    useEffect(() => {
        let _isMounted = true

        if(_isMounted && isAuthenticated)
            window.location.href = '/notes'

        return () => {
            _isMounted = false
        }
    })

    return (
        <div className="background">
            <Snackbar
                open={error}
                autoHideDuration={2500}
                onClose={() => setError(false)}
                TransitionComponent={TransitionUp}
            >
                <Alert elevation={6} variant="filled" severity="warning">{message}</Alert>
            </Snackbar>
            <div className="welcome">
                <svg width="124.415" height="96.703" viewBox="0 0 124.415 96.703">
                    <defs>
                        <linearGradient id="linear-gradient" x1="0.357" y1="0.129" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
                            <stop offset="0" stopColor="#fff"/>
                            <stop offset="1" stopColor="#c6c6c6"/>
                        </linearGradient>
                    </defs>
                    <g transform="translate(-718.244 -870.081)" className="rotate">
                        <path id="pen-icon" d="M24.137,25.124a11.433,11.433,0,0,0-7.653,7.485L0,83.27,2.6,85.93,29.12,58.756a8.778,8.778,0,0,1-.848-3.725,8.484,8.484,0,1,1,8.482,8.689,8.234,8.234,0,0,1-3.636-.869L6.593,90.024l2.6,2.659L58.639,75.8a11.469,11.469,0,0,0,7.306-7.84l7.561-27.407L50.889,17.378Zm63.848-11.7L77.364,2.545a8.343,8.343,0,0,0-12,0L55.372,12.782,77.993,35.957,87.985,25.72a8.845,8.845,0,0,0,0-12.293Z" transform="translate(751.689 870.581)" stroke="#fff" strokeWidth="1" fill="url(#linear-gradient)"/>
                        <path id="pen-path-icon" d="M36.7,64.541C15.959,62.684,0,51.648,0,38.249,0,25.355,14.877,14.626,34.569,12.227,13.918,20.449,12.208,29.539,12.208,38.249,12.208,47.446,36.679,56.823,36.7,64.541Z" transform="translate(718.744 901.696)" stroke="#fff" strokeWidth="1" fill="url(#linear-gradient)"/>
                    </g>
                </svg>
                <h1 className="welcome-header">Notes</h1>
            </div>

            <div className="login">
                <div className="state">
                    <button  
                        className={`state-buttons ${active==="signup" ? "inactive" : ""}`}
                        onClick={() => setActive("login")}
                    >
                        LOGIN
                    </button>
                    <button 
                        className={`state-buttons ${active==="login" ? "inactive" : ""}`}
                        onClick={() => setActive("signup")}
                    >
                        SIGN UP
                    </button>
                </div>
                <div className="row-format">
                    <Login active={active} setError={() => setError(true)} setMessage={setMessage}/> 
                    <Signup active={active} setError={() => setError(true)} setMessage={setMessage}/> 
                </div>
            </div>
        </div>
    )
}

export default Landing
