import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useHistory, Link } from 'react-router-dom'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import { AuthContext } from "../helpers/AuthContex"
function Home() {
    const [listOfPosts, setListOfPosts] = useState([]);
    const [likedPosts, setLikedPosts] = useState([])
    let history = useHistory()
    const { authState } = useContext(AuthContext)
    useEffect(() => {
        if (!localStorage.getItem("accessToken")) {
            history.push("/login")
        } else {
            axios.get("http://localhost:3001/posts",
                {
                    headers: { accessToken: localStorage.getItem('accessToken') }
                }).then((response) => {
                    setListOfPosts(response.data.listOfPost)
                    console.log("response.data.listOfPost == ", response.data.listOfPost)
                    setLikedPosts(response.data.likedPost.map((like) => {
                        return like.PostId;
                    }))
                })
        }
    }, [])


    const likeAPost = (postId) => {
        axios.post("http://localhost:3001/like",
            { PostId: postId },
            { headers: { accessToken: localStorage.getItem('accessToken') } },

        ).then((response) => {
            //console.log(response)            
            setListOfPosts(listOfPosts.map((post) => {
                if (post.id === postId) {
                    if (response.data.liked) {
                        return { ...post, Likes: [...post.Likes, 0] }
                    } else {
                        const likeArray = post.Likes;
                        likeArray.pop()
                        return { ...post, Likes: likeArray }
                    }
                } else {
                    return post;
                }
            }))
            if (likedPosts.includes(postId)) {
                setLikedPosts(likedPosts.filter((id) => {
                    return id != postId
                }))
            } else {
                setLikedPosts([...likedPosts, postId])
            }

        })
    }
    return (
        <div>
            {listOfPosts.map((value, key) => {
                return (
                    <div className="post" >
                        <div className="title"> {value.title} </div>
                        <div className="body" onClick={() => { history.push(`/post/${value.id}`) }}> {value.postText} </div>
                        <div className="footer">
                            <div className="username"><Link to={`/profile/${value.UserId}`}>{value.userName}</Link></div>
                            <div className="buttons">
                                <ThumbUpAltIcon className="likeBttn" onClick={() => { likeAPost(value.id) }}
                                    className={likedPosts.includes(value.id) ? "unlikeBttn" : "likeBttn"}
                                />

                                <label>{value.Likes.length}</label>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Home
