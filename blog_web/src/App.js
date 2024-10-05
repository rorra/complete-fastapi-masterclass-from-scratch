import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from "react";
import Post from "./Post";

const BASE_URL = "http://localhost:8000";

function App() {

  const [posts, setPost] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/posts/all`)
      .then((response) => {
        const json = response.json();
        console.log(json);
        if (response.ok) {
          return json;
        }
        throw response;
      })
      .then((data) => {
        return data.reverse();
      })
      .then((data) => {
        setPost(data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        alert(error);
      });
  }, []);

  return (
    <div className="App">
      <div className="blog_title">Blog</div>
      <div className="app_posts">
        {
          posts.map((post) => {
            return <Post key={post.id} post={post} />;
          })
        }
      </div>

    </div>
  );
}

export default App;
