import React from 'react'

// Form Validation
import * as yup from "yup"
import { Formik } from 'formik'

// Material UI
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

function Signup() {

    const login_schema = yup.object({
        username: yup.string().required("Username is required!").matches(/^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,15}$/igm, { message: "Username format is not correct!" }),
        password: yup.string().required("Password is required").min(4, "Password must be more than 4 characters!").max(15, "Password can't be more than 15 characters!"),
        confirm: yup.string().required("Please confirm your passsword!").oneOf([yup.ref('password')], "Passwords must match!")
    })

    function validateUser(event) {
        console.log(event)
    } 
    
    return (
        <Formik
            validationSchema={login_schema}
            onSubmit={validateUser}
            initialValues={{
                username: '',
                password: '',
                confirm: ''
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
                        <form className="signup-form" noValidate autoComplete="off" onSubmit={handleSubmit}>
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
                            <TextField
                                error={touched.confirm && !!errors.confirm}
                                helperText={errors.confirm}
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
                                SIGN UP
                </Button>
                        </form>
                    )
            }
        </Formik>
    )
}

export default Signup
