import React, { useState, useEffect } from 'react'

// Redux
import { useDispatch } from 'react-redux'
import { signUp } from '../../redux/actions/userActions'

// Form Validation
import * as yup from "yup"
import { Formik } from 'formik'

// Material UI
import CircularProgress from '@material-ui/core/CircularProgress'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

function Signup(props) {
    
    const dispatch = useDispatch()

    const login_schema = yup.object({
        new_username: yup.string().required("Username is required!").matches(/^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,15}$/igm, { message: "Username format is not correct!" }),
        new_password: yup.string().required("Password is required").min(4, "Password must be more than 4 characters!").max(15, "Password can't be more than 15 characters!"),
        confirm: yup.string().required("Please confirm your passsword!").oneOf([yup.ref('new_password')], "Passwords must match!")
    })

    async function validateUser(event) {
        // Shaping the user
        let user = {
            username: event.new_username,
            password: event.new_password,
            notes: []
        }

        let res = await dispatch(signUp(user))
        
        // If the authentication was successful navigate to user notes
        if(res.success) {
            window.location.href = '/notes'
        }
        else {
            // Set error message and display alert
            props.setMessage(res?.err?.response?.data?.error || "An error occured while signing up!")
            props.setError()
        }
    } 
    
    return (
        <Formik
            validationSchema={login_schema}
            onSubmit={validateUser}
            initialValues={{
                new_username: '',
                new_password: '',
                confirm: ''
            }}
        >
            {
                ({
                    handleSubmit,
                    handleChange,
                    values,
                    touched,
                    errors,
                    isSubmitting
                }) => (
                        <form 
                            className={`signup-form ${props.active==="login" ? "hide" : ""}`}
                            noValidate 
                            autoComplete="off" 
                            onSubmit={handleSubmit}
                        >
                            <TextField
                                error={touched.new_username && !!errors.new_username}
                                helperText={touched.new_username && errors.new_username}
                                value={values.new_username}
                                onChange={handleChange}
                                id="new_username"
                                color="secondary"
                                label="Username"
                                variant="outlined"
                                className="user-field"
                            />
                            <TextField
                                error={touched.new_password && !!errors.new_password}
                                helperText={touched.new_password && errors.new_password}
                                value={values.new_password}
                                onChange={handleChange}
                                id="new_password"
                                color="secondary"
                                label="Password"
                                variant="outlined"
                                className="pwd-field"
                                type="password"
                            />
                            <TextField
                                error={touched.confirm && !!errors.confirm}
                                helperText={touched.confirm && errors.confirm}
                                value={values.confirm}
                                onChange={handleChange}
                                id="confirm"
                                color="secondary"
                                label="Confirm Password"
                                variant="outlined"
                                className="pwd-field"
                                type="password"
                            />
                            <Button className="my-button" type="submit" variant="contained" color="secondary">
                                {
                                    isSubmitting?
                                        <CircularProgress style={{color:"white"}} size="2rem" thickness={5}/>
                                        :
                                        "SIGN UP"
                                }
                            </Button>
                        </form>
                    )
            }
        </Formik>
    )
}

export default Signup
