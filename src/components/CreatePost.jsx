import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../App";
import styles from "./Signup.module.css";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const navigate = useNavigate();

  const { addPost, setCurrentAccount, currentAccount } =
    useContext(UserContext);

  const [post, setPost] = useState({
    user_id: "",
    imageUrl: "",
    caption: "",
  });
  useEffect(() => {
    console.log(currentAccount);
  }, [currentAccount]);

  function handleOnSubmit(e) {
    e.preventDefault();
    // setPost({ user_id: currentAccount });
    addPost(post);
    console.log(currentAccount);
    console.log(post);
    setPost({
      user_id: "",
      imageUrl: "",
      caption: "",
    });
    navigate("/");
  }
  return (
    <>
      <form className={styles.form} onSubmit={handleOnSubmit}>
        <input
          className={styles.input}
          type="text"
          placeholder="Image URL"
          value={post.imageUrl}
          onChange={(e) => {
            setPost((previousPost) => {
              return {
                ...previousPost,
                imageUrl: e.target.value,
                user_id: currentAccount,
              };
            });
          }}
        />

        <input
          className={styles.input}
          type="text"
          placeholder="caption"
          value={post.caption}
          onChange={(e) => {
            setPost((previousPost) => {
              return { ...previousPost, caption: e.target.value };
            });
          }}
        />
        <button className={styles.button}>Post</button>
      </form>
    </>
  );
};

export default CreatePost;
