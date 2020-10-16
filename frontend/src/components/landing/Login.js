import React from 'react'

// Redux
import { logIn } from '../../redux/actions/userActions'
import { useDispatch } from 'react-redux'

// Form Validation
import * as yup from "yup"
import { Formik } from 'formik'

// Material UI
import CircularProgress from '@material-ui/core/CircularProgress'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

function Login(props) {

    const dispatch = useDispatch()

    const login_schema = yup.object({
        username: yup.string().required("Username is required!").matches(/^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,15}$/igm, { message: "Username format is not correct!" }),
        password: yup.string().required("Password is required").min(4, "Password must be more than 4 characters!").max(15, "Password can't be more than 15 characters!"),
    })

    async function validateUser(event) {
        let res = await dispatch(logIn(event))

        // If the authentication was successful navigate to user notes
        if(res.success) {
            window.location.href = '/notes'
        }
        else {
            // Set error message and display alert
            props.setMessage(res.err.response.data.error)
            props.setError()
        }
    } 
    
    return (
        <Formik
            validationSchema={login_schema}
            onSubmit={validateUser}
            initialValues={{
                username: '',
                password: ''
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
                            className={`login-form ${props.active==="signup" ? "hide" : ""}`}
                            noValidate 
                            autoComplete="off" 
                            onSubmit={handleSubmit}
                        >
                            <TextField
                                error={touched.username && !!errors.username}
                                helperText={touched.username && errors.username}
                                value={values.username}
                                onChange={handleChange}
                                id="username"
                                color="secondary"
                                label="Username"
                                variant="outlined"
                                className="user-field"
                            />
                            <TextField
                                error={touched.password && !!errors.password}
                                helperText={touched.password && errors.password}
                                value={values.password}
                                onChange={handleChange}
                                id="password"
                                color="secondary"
                                label="Password"
                                variant="outlined"
                                className="pwd-field"
                                type="password"
                            />
                            <Button className="my-button" type="submit" variant="contained" color="secondary">
                                {
                                    isSubmitting?
                                        <CircularProgress style={{color:"white"}} size="2rem" thickness={5}/>
                                        :
                                        "LOGIN"
                                }
                            </Button>
                            <a className="forgot-link" href="forgot-password">Forgot Password?</a>
                        </form>
                    )
            }
        </Formik>
    )
}

export default Login
