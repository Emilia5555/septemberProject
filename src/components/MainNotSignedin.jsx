import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../App";

const MainNotSignedin = ({}) => {
  const { users, posts, currentAcount, getUsers, getPosts } =
    useContext(UserContext);
  if (currentAcount == null) {
    console.log(currentAcount);
  }
  useEffect(() => {
    getUsers();
    getPosts();
  }, [getUsers, getPosts]);

  return (
    <>
      <div className="posts">
        <div className="signupButtons">
          <button>
            <Link to="/signup">Signup</Link>
          </button>
          <button>
            <Link to="/login">login</Link>
          </button>
          <button>
            <Link to="/pfp">
              <img
                className="pfp"
                src="https://static.thenounproject.com/png/638636-200.png"
                alt=""
              />
            </Link>
          </button>
        </div>

        {posts.map((post) => {
          return (
            <div className="post" key={post.id}>
              {users.map((user) => {
                if (user.user_id == post.user_id) {
                  return <h6 key={user.user_id}>{user.name}</h6>;
                }
                return null;
              })}

              <h4>
                <div className="pic">
                  <img src={post.imageUrl} alt="Post" />
                </div>
              </h4>
              <h4>{post.caption}</h4>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default MainNotSignedin;
