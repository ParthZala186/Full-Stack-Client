import React, { useContext, useEffect } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios'
import * as Yup from 'yup'
import { useHistory } from 'react-router-dom'
import "../App.css";
import { AuthContext } from "../helpers/AuthContex"
function CreatePost() {
    const { authState } = useContext(AuthContext)
    const initialValues = {
        title: "",
        postText: "",
        //userName: ""
    }

    useEffect(() => {
        if (!localStorage.getItem("accessToken")) {
            history.push("/login")
        }
    }, [])

    const validationSchema = Yup.object().shape({
        title: Yup.string().required("Title must be required"),
        postText: Yup.string().required(),
        //userName: Yup.string().min(3).max(15).required()
    })

    const onSubmit = (data) => {
        axios.post("http://localhost:3001/posts", data, {
            headers: {
                accessToken: localStorage.getItem("accessToken")
            },
        }).then((response) => {
            history.push("/")
        })
    }

    const history = useHistory();
    return (
        <div className="createPostPage">
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>

                <Form className="formContainer">
                    <label>Title</label>
                    <ErrorMessage name="title" component="span" />
                    <Field autocomplete="off" id="inputCreatePost" name="title" placeholder="Title" />
                    <label>Post</label>
                    <ErrorMessage name="postText" component="span" />
                    <Field autocomplete="off" id="inputCreatePost" name="postText" placeholder="Post" />
                    {/* <label>User Name</label>
                    <ErrorMessage name="userName" component="span" />
                    <Field autocomplete="off" id="inputCreatePost" name="userName" placeholder="User Name" /> */}
                    <button type="submit">Create Post</button>
                </Form>
            </Formik>
        </div>
    )
}

export default CreatePost
