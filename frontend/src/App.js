import "./App.css";
import React, { useState } from "react";
import axios from "axios";

function App() {
  const [subreddit, setSubReddit] = useState("");
  const [posts, setPosts] = useState([]);

  const fetchRecentPosts = async (e) => {
    console.log("Calling fetchPosts");
    e.preventDefault();
    try {
      const response = await axios.get(
        `http://localhost:500/api/reddit/recent/${subreddit}`
      );
      setPosts(response.data.data.children);
      console.log("Data::::", response?.data?.data?.children);
    } catch (error) {
      console.error("Error fetching data::", error);
    }
  };

  const fetchTopPosts = async (e) => {
    console.log("Calling fetchTopPosts");
    e.preventDefault();
    try {
      const response = await axios.get(
        `http://localhost:500/api/reddit/${subreddit}/topalltime`
      );
      setPosts(response.data?.data?.children);
    } catch (error) {
      console.log("Error:::", error);
    }
  };

  return (
    <div>
      <h1>Reddit Data Extractor</h1>
      <form onSubmit={fetchRecentPosts}>
        <input
          type="text"
          value={subreddit}
          onChange={(e) => setSubReddit(e.target.value)}
          placeholder="Enter subreddit"
        />
        <button type="submit">Fetch Recent Posts</button>
        <button type="submit" onClick={fetchTopPosts}>
          Fetch Top Posts
        </button>
      </form>
      <ul>
        {posts.map((post) => (
          <div>
            <h3>{post.data.title}</h3>
            {post.data.is_video ? (
              <video controls style={{ width: "100%", maxWidth: "300px" }}>
                <source
                  src={post.data.media.reddit_video.fallback_url}
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
            ) : post.data.thumbnail &&
              post.data.thumbnail.startsWith("http") ? (
              <img
                src={post.data.thumbnail}
                alt={post.data.title}
                style={{ width: "100%", maxWidth: "300px" }}
              />
            ) : null}
          </div>
        ))}
      </ul>
    </div>
  );
}

export default App;
