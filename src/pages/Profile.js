import React, { useEffect, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import { AuthContext } from "../helpers/AuthContex"
export default function Profile() {
    let { id } = useParams();
    let history = useHistory()
    const [userName, setuserName] = useState("")
    const [listOfPosts, setListOfPost] = useState([]);
    const { authState } = useContext(AuthContext)
    useEffect(() => {
        axios.get(`http://localhost:3001/auth/basicInfo/${id}`).then((response) => {
            console.log("setUser ==", response)
            setuserName(response.data.userName)
        })

        axios.get(`http://localhost:3001/posts/byuserId/${id}`).then((response) => {
            setListOfPost(response.data)
            console.log("setListOfPost == ", response.data)

        })
    }, [])
    return (
        <div className="profilePageContainer">
            <div className="basicInfo">
                <h1>Username: {userName}</h1>
                {
                    authState.username === userName && (
                        <button onClick={() => { history.push('/changepassword') }}>Change my Password</button>)}
            </div>
            <div>
                {listOfPosts.map((value, key) => {
                    return (
                        <div key={key} className="post" >
                            <div className="title"> {value.title} </div>
                            <div className="body" > {value.postText} </div>
                            <div className="footer">
                                <div className="username">{value.userName}</div>
                                <div className="buttons">
                                    <label>{value.Likes.length}</label>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
