import React from 'react'

// Redux
import { logIn } from '../../redux/actions/userActions'
import { useDispatch } from 'react-redux'

// Form Validation
import * as yup from "yup"
import { Formik } from 'formik'

// Material UI
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

function Login() {

    const dispatch = useDispatch()

    const login_schema = yup.object({
        username: yup.string().required("Username is required!").matches(/^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,15}$/igm, { message: "Username format is not correct!" }),
        password: yup.string().required("Password is required").min(4, "Password must be more than 4 characters!").max(15, "Password can't be more than 15 characters!"),
    })

    function validateUser(event) {
        dispatch(logIn(
            {
                isAuthenticated: true,
                username: 'ergi',
                jwt: '234436832905i32kjvkltj',
                notes:   [
                    {
                        id: "25GEhe4",
                        author: "ergi",
                        title: "My note 1",
                        text: "Hello this is a note and this note has some html tags",
                        date: "Monday, 13 February 2019",
                        time: "12:35"
                    },
                    {
                        id: "25GEhe4dd",
                        author: "ergi",
                        title: "My note 2",
                        text: "Hello this is a note",
                        date: "Monday, 13 February 2019",
                        time: "12:35"
                    },
                    {
                        id: "25GEhe23114",
                        author: "ergi",
                        title: "My note 3",
                        text: "Hello this is a note",
                        date: "Monday, 13 February 2019",
                        time: "12:35"
                    },
                    {
                        id: "25GEhe214",
                        author: "ergi",
                        title: "My note 4",
                        text: "Hello this is a note",
                        date: "Monday, 13 February 2019",
                        time: "12:35"
                    },
                    {
                        id: "25GEhe00",
                        author: "ergi",
                        title: "My note 5",
                        text: "Hello this is a note",
                        date: "Monday, 13 February 2019",
                        time: "12:35"
                    },
                    {
                        id: "25GEhe41",
                        author: "ergi",
                        title: "My note 6",
                        text: "Hello this is a note",
                        date: "Monday, 13 February 2019",
                        time: "12:35"
                    },
                    {
                        id: "32",
                        author: "ergi",
                        title: "My note 7",
                        text: "Hello this is a note",
                        date: "Monday, 13 February 2019",
                        time: "12:35"
                    },
                    {
                        id: "25GEhe44",
                        author: "ergi",
                        title: "My note 8",
                        text: "Hello this is a note",
                        date: "Monday, 13 February 2019",
                        time: "12:35"
                    },
                    {
                        id: "25GEheff4",
                        author: "ergi",
                        title: "My note 1",
                        text: "Hello this is a note and this note has some html tags",
                        date: "Monday, 13 February 2019",
                        time: "12:35"
                    },
                    {
                        id: "25GEheff4dd",
                        author: "ergi",
                        title: "My note 2",
                        text: "Hello this is a note",
                        date: "Monday, 13 February 2019",
                        time: "12:35"
                    },
                    {
                        id: "25GEheffff4",
                        author: "ergi",
                        title: "My note 1",
                        text: "Hello this is a note and this note has some html tags",
                        date: "Monday, 13 February 2019",
                        time: "12:35"
                    },
                    {
                        id: "25GEhffe4dd",
                        author: "ergi",
                        title: "My note 2",
                        text: "Hello this is a note",
                        date: "Monday, 13 February 2019",
                        time: "12:35"
                    },
                    
                ]
            }
        ))
        window.location = "/notes"
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
                    errors
                }) => (
                        <form className="login-form" noValidate autoComplete="off" onSubmit={handleSubmit}>
                            <TextField
                                error={touched.username && !!errors.username}
                                helperText={errors.username}
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
                                helperText={errors.password}
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
                                LOGIN
                            </Button>
                            <a className="forgot-link" href="forgot-password">Forgot Password?</a>
                        </form>
                    )
            }
        </Formik>
    )
}

export default Login
