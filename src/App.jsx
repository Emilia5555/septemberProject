import React, { useState, useEffect, createContext, useCallback } from "react";
import apiConn from "./connect";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Pfp from "./components/Pfp";
import { Routes, Route, Link } from "react-router-dom";
import "./css.css";

import MainNotSignedin from "./components/MainNotSignedin";
import CreatePost from "./components/CreatePost";

export const UserContext = createContext();

const App = () => {
  const [currentAccount, setCurrentAccount] = useState(null);
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);

  const getUsers = useCallback(() => {
    apiConn
      .get("/users")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    return users;
  }, [apiConn]);

  const getPosts = useCallback(() => {
    apiConn
      .get("/posts")
      .then((response) => {
        // console.log(response.data);
        setPosts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [apiConn, setPosts]);

  useEffect(() => {
    getUsers();
    getPosts();
  }, [getUsers, getPosts]);

  useEffect(() => {
    getPosts();
    console.log(currentAccount);
  }, [currentAccount]);

  function addUser(info) {
    console.log(info);
    apiConn
      .post("/users/signup", info)
      .then((response) => {
        console.log(response);
        setCurrentAccount(response.data.user_id);
        console.log("We have successfully added a person to the database.");

        getUsers();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function addPost(info) {
    console.log(info);
    apiConn
      .post("/posts/post", info)
      .then((response) => {
        console.log(response);
        setCurrentAccount(response.data.user_id);
        console.log("Posted");

        getUsers();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const context = {
    currentAccount,
    setCurrentAccount,
    users,
    setUsers,
    posts,
    setPosts,
    getUsers,
    getPosts,
    addUser: addUser,
    addPost: addPost,
  };

  return (
    <>
      <UserContext.Provider value={context}>
        <button>
          <Link to="/">
            <img
              className="home"
              src="https://static.thenounproject.com/png/423483-200.png"
              alt=""
            />
          </Link>
        </button>

        <Routes>
          <Route path="/createP" element={<CreatePost />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/pfp" element={<Pfp />} />
          <Route path="/" element={<MainNotSignedin />} />
        </Routes>
      </UserContext.Provider>
    </>
  );
};

export default App;
