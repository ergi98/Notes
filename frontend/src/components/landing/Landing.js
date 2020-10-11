import React, { useState } from 'react'
import './Landing.css'

// Components
import Login from './Login'
import Signup from './Signup'

function Landing() {

    const [active, setActive] = useState('login')

    return (
        <div className="background">
            <div className="welcome">
                <img src={require("../../assets/logo.svg")} alt="note logo" className="logo"></img>
                <h1 className="welcome-header">Notes</h1>
                <h3 className="welcome-subheader">A simple note taking application.</h3>
                <p>
                </p>
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
                {
                    active==="login"? <Login/> : <Signup/>
                }
                
            </div>
        </div>
    )
}

export default Landing
