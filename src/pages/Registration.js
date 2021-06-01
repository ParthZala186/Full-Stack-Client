import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios'
import * as Yup from 'yup'
function Registration() {
    const initialValues = {
        username: "",
        password: ""
    }

    const validationSchema = Yup.object().shape({
        username: Yup.string().min(3).max(15).required(),
        password: Yup.string().min(4).max(15).required(),
    })

    const onSubmit = (data) => {
        axios.post("http://localhost:3001/auth", data).then((response) => {
            console.log(data)
        })
    }
    return (
        <div>
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                <Form className="formContainer">

                    <label>User Name</label>
                    <ErrorMessage name="username" component="span" />
                    <Field autocomplete="off" id="inputCreatePost" name="username" placeholder="User Name" />
                    <label>Password</label>
                    <ErrorMessage name="password" component="span" />
                    <Field autocomplete="off" id="inputCreatePost" name="password" type="password" placeholder="Password" />
                    <button type="submit">Register</button>
                </Form>
            </Formik>

        </div>
    )
}

export default Registration
