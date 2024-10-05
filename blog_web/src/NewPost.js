import React, { useEffect, useState } from "react";
import "./NewPost.css";

const BASE_URL = "http://127.0.0.1:8000";

function NewPost() {
  const [image, setImage] = useState(null);
  const [creator, setCreator] = useState("");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const handleImageUpload = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleCreate = (e) => {
    e?.preventDefault();

    const formData = new FormData();
    formData.append('image', image);

    const requestOptions = {
      method: 'POST',
      body: formData,
      contentType: "multipart/form-data",
    };

    fetch(`${BASE_URL}/posts/image`, requestOptions)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        const file_name = data.file_name;
        createPost(file_name);
      })
      .catch((error) => {
        console.error("Error creating post: ", error);
        alert(error);
      })
      .finally(() => {
        setImage(null);
        document.getElementById('fileInput').value = null;
      });
  }

  const createPost = (imageUrl) => {
    const json_string = JSON.stringify({
      image_url: imageUrl,
      title: title,
      content: text,
      creator: creator,
    });

    const requestOptions = {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: json_string,
    };

    fetch(`${BASE_URL}/posts`, requestOptions)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        window.location.reload();
        window.scrollTo(0, 0);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="newpost_content">
      <div className="newpost_image">
        <input type="file" id="fileInput" onChange={handleImageUpload}/>
      </div>
      <div className="newpost_creator">
        <input className="newpost_creator" type="text" id="creator_input" placeholder="Creator"
               onChange={(e) => setCreator(e.target.value)} value={creator}/>
      </div>
      <div className="newpost_title">
        <input className="newpost_title" type="text" id="title_input" placeholder="Title"
               onChange={(e) => setTitle(e.target.value)} value={title}/>
      </div>
      <div className="newpost_text">
        <textarea className="newpost_text" id="text_input" rows="10" placeholder="Content"
                  onChange={(e) => setText(e.target.value)} value={text}/>
      </div>
      <div>
        <button className="create_button" onClick={handleCreate}>Create post</button>
      </div>

    </div>
  );
}

export default NewPost;