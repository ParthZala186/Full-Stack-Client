import React, { useEffect, useState } from 'react';
import "./App.css"
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import axios from 'axios'
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import Post from './pages/Post';
import Login from './pages/Login';
import Registration from './pages/Registration';
import { AuthContext } from './helpers/AuthContex'
import Axios from 'axios';
import PageNotFound from './pages/PageNotFound';
import Profile from "./pages/Profile";
import ChangePassoword from "./pages/ChangePassword";
const App = () => {
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false
  });
  useEffect(() => {
    Axios.get("http://localhost:3001/auth/auth", {
      headers: { accessToken: localStorage.getItem("accessToken") }
    }).then((response) => {
      if (response.data.error) {
        setAuthState({ ...authState, status: false })
      }
      else {
        setAuthState({
          username: response.data.username,
          id: response.data.id,
          status: true
        })
      }
    })
  }, [])
  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({ username: "", id: 0, status: false })
  }
  return (
    <>
      <div className="App">
        <AuthContext.Provider value={{ authState, setAuthState }}>
          <Router>
            <div className="navbar">
              <div className="links">
                {!authState.status ? (
                  <>
                    <Link to="/login">Login</Link>
                    <Link to="/registration">Registration</Link>
                  </>
                ) : (
                  <>
                    <Link to="/">Home Page</Link>
                    <Link to="/createPost">Create A Post</Link>
                  </>
                )}

              </div>
              <div className="loggedInContainer">
                <h1>{authState.username}</h1>
                {authState.status && <button onClick={logout}>LogOut</button>}
              </div>
            </div>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/createPost" exact component={CreatePost} />
              <Route path="/post/:id" exact component={Post} />
              <Route path="/registration" exact component={Registration} />
              <Route path="/login" exact component={Login} />
              <Route path="/profile/:id" exact component={Profile} />
              <Route path="/changepassword" exact component={ChangePassoword} />
              <Route path="*" exact component={PageNotFound} />
            </Switch>
          </Router>
        </AuthContext.Provider>
      </div>
    </>
  )
}

export default App;