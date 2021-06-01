import React, { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import "../App.css";
import { useHistory } from 'react-router-dom'
import { AuthContext } from "../helpers/AuthContex"
function Post() {
    const history = useHistory();
    const [postObject, setPostObject] = useState({});
    const [comments, setComments] = useState([])
    const [newComment, setNewComment] = useState({})
    let { id } = useParams();
    const { authState } = useContext(AuthContext)
    console.log("authState == ", authState)
    useEffect(() => {
        axios.get(`http://localhost:3001/posts/byId/${id}`).then((response) => {
            setPostObject(response.data)
        })

        axios.get(`http://localhost:3001/comments/${id}`).then((response) => {
            setComments(response.data)
        })
    }, [])

    const addComment = () => {
        axios.post(`http://localhost:3001/comments`, { commentBody: newComment, PostId: id },
            {
                headers: {
                    accessToken: localStorage.getItem("accessToken")
                },
            }
        ).then((response) => {
            if (response.data.error) {
                console.log(response.data)
                alert(response.data.error.message)
            } else {
                const commentToAdd = { commentBody: newComment, userName: response.data.userName }
                setComments([...comments, commentToAdd])
                setNewComment("")
            }
        })
    }

    const deleteComment = (id) => {
        axios.delete(`http://localhost:3001/comments/${id}`, {
            headers: {
                accessToken: localStorage.getItem('accessToken')
            }
        }).then(() => {
            setComments(comments.filter((val) => {
                return val.id != id;
            }))
        })
    }

    const deletePost = (id) => {
        axios.delete(`http://localhost:3001/posts/${id}`, {
            headers: {
                accessToken: localStorage.getItem('accessToken')
            }
        }).then(() => {
            history.push("/")
        })
    }

    const editPost = (option) => {
        if (option === "title") {
            let newTitle = prompt("Enter new title");
            axios.put(`http://localhost:3001/posts/title`, {
                newTitle: newTitle,
                id: id
            }, {
                headers: {
                    accessToken: localStorage.getItem('accessToken')
                }
            }).then(() => {
                setPostObject({ ...postObject, title: newTitle })
            })
        } else {
            let newPostText = prompt("Enter new text");
            axios.put(`http://localhost:3001/posts/postText`, {
                newText: newPostText,
                id: id
            }, {
                headers: {
                    accessToken: localStorage.getItem('accessToken')
                }
            }).then(() => {
                setPostObject({ ...postObject, postText: newPostText })
            })
        }
    }
    return (
        <div className="postPage">
            <div className="leftSide">
                <div className="post" id="individual">
                    <div className="title"
                        onClick={() => {
                            if (authState.username === postObject.userName) {
                                editPost("title");
                            }
                        }
                        }>
                        {postObject.title}
                    </div>
                    <div className="body" onClick={() => {
                        if (authState.username === postObject.userName) {
                            editPost("body");
                        }
                    }
                    }>{postObject.postText}</div>
                    <div className="footer">
                        {postObject.userName}
                        {authState.username === postObject.userName && (
                            <button onClick={() => { deletePost(postObject.id) }}>Delete Post</button>
                        )}
                    </div>
                </div>
            </div>
            <div className="rightSide">
                <div className="addCommentContainer">
                    <input type="text" placeholder="Enter Comment" autoComplete="off" onChange={(e) => { setNewComment(e.target.value) }} />
                    <button onClick={addComment}>Add Comment</button>
                    <div className="listOfComments">
                        {comments.map((comment, key) => {
                            return (
                                <>
                                    <div key={key} className="title"> {comment.commentBody}
                                        <label>UserName: {comment.userName}</label>
                                        {authState.username === comment.userName &&
                                            <button onClick={() => deleteComment(comment.id)}> X</button>
                                        }
                                    </div>

                                </>
                            )
                        })}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Post
