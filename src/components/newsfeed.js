import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "../App.scss";
import CommentsAndLikes from "./comments-and-likes.js";

const Newsfeed = () => {
  const [posts, setPosts] = useState([]);
  const firstDisplay = posts.slice(0, 5);
  const [displayedPosts, setDisplayedPosts] = useState(firstDisplay);
  const [observedEl, setObservedEl] = useState(null);
  const history = useHistory();

  // GET request for loading an array of all posts
  const fetchPosts = async () => {
    let token = localStorage.getItem("token");
    const posts = await axios("https://groupomania2.herokuapp.com/posts", {
      headers: {
        Authorization: token,
      },
    });
    // Set the array of posts in state
    setPosts(posts.data.data.reverse());
  };

  // Load 5 more posts
  const loadMore = () => {
    setTimeout(() => {
      setDisplayedPosts([
        ...displayedPosts,
        ...posts.slice(
          displayedPosts.length,
          posts.length > displayedPosts.length + 5
            ? displayedPosts.length + 5
            : posts.length
        ),
      ]);
    }, 500);
  };

  // Load 5 more posts if intersecting
  const observer = new IntersectionObserver(
    (items) => {
      if (items[0].isIntersecting) {
        loadMore();
      }
    },
    { threshold: 1 }
  );

  useEffect(() => {
    fetchPosts();
    if (observedEl) {
      observer.observe(observedEl);
    }
    return () => {
      if (observedEl) {
        observer.unobserve(observedEl);
      }
    };
  }, [observedEl, observer]);

  // Navigate to create-post page on button click
  function handleClick() {
    history.push("/create-post");
  }

  return (
    <div className="newsfeed" role="main">
      <button className="button" onClick={handleClick}>
        Create Post
      </button>
      <>
        {displayedPosts.map((post) => (
          <div key={post.postId} className="post">
            <div className="post__heading">
              <img
                src={post.profilePicUrl}
                className="profile-pic"
                alt="Profile Picure"
              />
              <div className="l-post-author+timestamp">
                <h3 aria-level="2" className="post__author">
                  {post.firstName} {post.lastName}
                </h3>
                <p className="post__timestamp">{post.timestamp}</p>
              </div>
            </div>
            <div className="post__body">
              <p className="post__text-content">{post.textContent}</p>
              <img
                className="post__image"
                src={post.multimediaUrl}
                alt=""
                aria-label="Post image"
              ></img>
            </div>
            <CommentsAndLikes postId={post.postId} />
          </div>
        ))}
        {posts.length > displayedPosts.length && (
          <p ref={setObservedEl}>LoadMore ...</p>
        )}
      </>
    </div>
  );
};

export default Newsfeed;
