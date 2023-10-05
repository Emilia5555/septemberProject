import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import apiConn from "../connect";

const Pfp = () => {
  const navigate = useNavigate();

  const { users, posts, currentAccount, getPosts } = useContext(UserContext);
  console.log(currentAccount);
  const [newPost, setNewPost] = useState({
    id: null,
    imageUrl: "",
    caption: "",
  });

  const deletePost = (postId) => {
    console.log(postId);
    apiConn
      .delete(`/posts/delete/${postId}`)
      .then((response) => {
        console.log(response);
        getPosts();
      })
      .catch((error) => {
        console.error("Error deleting the post:", error);
      });
  };

  function editPost(id, info) {
    apiConn
      .put(`/posts/${id}`, info)

      .then((response) => {
        getPosts();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleSubmit(postId, e) {
    e.preventDefault();

    editPost(postId, newPost);
    console.log(newPost);

    setNewPost({
      user_id: "",
      imageUrl: "",
      caption: "",
    });
  }

  if (currentAccount != null) {
    return (
      <>
        {users.map((user) => {
          if (user.user_id == currentAccount) {
            return (
              <>
                <h2>{user.name}</h2>
                <h3>{user.username}</h3>
              </>
            );
          }
        })}

        <button>
          <Link to="/createP">create post</Link>
        </button>
        {posts.map((post) => {
          if (post.user_id == currentAccount) {
            return (
              <>
                <div className="post">
                  <h4>
                    <img src={post.imageUrl} alt="Post" />
                  </h4>
                  <h4>{post.caption}</h4>

                  <form action="">
                    <input
                      type="text"
                      value={newPost.imageUrl}
                      placeholder="new URL"
                      onChange={(e) => {
                        setNewPost((previousPost) => {
                          return {
                            ...previousPost,
                            imageUrl: e.target.value,
                            user_id: currentAccount,
                          };
                        });
                      }}
                    />
                    <input
                      type="text"
                      value={newPost.caption}
                      placeholder="new caption"
                      onChange={(e) => {
                        setNewPost((previousPost) => {
                          return {
                            ...previousPost,
                            caption: e.target.value,
                          };
                        });
                      }}
                    />
                    <button onClick={(e) => handleSubmit(post.id, e)}>
                      Edit post
                    </button>
                  </form>

                  <button
                    onClick={() => {
                      deletePost(post.id);
                      navigate("/");
                    }}
                  >
                    Delete
                  </button>
                </div>
              </>
            );
          }
        })}
      </>
    );
  } else {
    return <h1>No user is signed in</h1>;
  }
};

export default Pfp;
