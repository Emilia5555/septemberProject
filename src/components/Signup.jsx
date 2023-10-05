import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../App";
import styles from "./Signup.module.css";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const { addUser, setCurrentAccount, currentAccount } =
    useContext(UserContext);

  const [user, setUser] = useState({
    email: "",
    name: "",
    username: "",
    password: "",
  });
  useEffect(() => {
    console.log(currentAccount);
  }, [currentAccount]);
  function handleOnSubmit(e) {
    e.preventDefault();
    addUser(user);
    setCurrentAccount(user.user_id);
    console.log(currentAccount);
    setUser({
      email: "",
      name: "",
      username: "",
      password: "",
    });
    navigate("/");
  }
  return (
    <>
      <hr />
      
      <form className={styles.form} onSubmit={handleOnSubmit}>
        <input
          className={styles.input}
          type="text"
          placeholder="name"
          value={user.name}
          onChange={(e) => {
            setUser((previousUser) => {
              return { ...previousUser, name: e.target.value };
            });
          }}
        />
        <input
          className={styles.input}
          type="text"
          placeholder="email"
          value={user.email}
          onChange={(e) => {
            setUser((previousUser) => {
              return { ...previousUser, email: e.target.value };
            });
          }}
        />
        <input
          className={styles.input}
          type="text"
          placeholder="username"
          value={user.username}
          onChange={(e) => {
            setUser((previousUser) => {
              return { ...previousUser, username: e.target.value };
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
        <button className={styles.button}>Add user</button>
      </form>
      <hr />
    </>
  );
};

export default Signup;
