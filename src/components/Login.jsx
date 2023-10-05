import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../App";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const contextValue = useContext(UserContext);
  const { users, getUsers, setCurrentAccount, currentAccount } = contextValue;
  // console.log(getUsers);
  const [user, setUser] = useState({
    loginUsername: "",
    password: "",
  });
  useEffect(() => {
    console.log(currentAccount);
  }, [currentAccount]);

  function handleOnSubmit(e) {
    e.preventDefault();
    console.log("function");
    users.map((u) => {
      if (user.loginUsername == u.username && user.password == u.password) {
        setCurrentAccount(u.user_id);
        console.log("signed in as", u.name);
      } else {
        console.log("failure to log in");
      }
    });
    navigate("/");
  }

  return (
    <>
      <form className={styles.form} onSubmit={handleOnSubmit}>
        <input
          className={styles.input}
          type="text"
          placeholder="username"
          value={user.loginUsername}
          onChange={(e) => {
            setUser((previousUser) => {
              return { ...previousUser, loginUsername: e.target.value };
            });
          }}
        />
        <input
          className={styles.input}
          type="text"
          placeholder="password"
          value={user.password}
          onChange={(e) => {
            setUser((previousUser) => {
              return { ...previousUser, password: e.target.value };
            });
          }}
        />
        <button className={styles.button}>Login</button>
      </form>
    </>
  );
};

export default Login;
