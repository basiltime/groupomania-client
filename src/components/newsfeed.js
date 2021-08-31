import { faThumbsUp, faComment } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import '../App.scss'

const Newsfeed = () => {
  const [posts, setPosts] = useState([])
  const firstDisplay = posts.slice(0, 5)
  const [displayedPosts, setDisplayedPosts] = useState(firstDisplay)
  const [observedEl, setObservedEl] = useState(null)

  const fetchPosts = async () => {
    let token = localStorage.getItem('token')
    const posts = await axios('http://localhost:3000/posts', {
      headers: {
        Authorization: token,
      },
    })
    setPosts(posts.data.data)
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  const loadMore = () => {
    setTimeout(() => {
      setDisplayedPosts([
        ...displayedPosts,
        ...posts.slice(
          displayedPosts.length,
          posts.length > displayedPosts.length + 5
            ? displayedPosts.length + 5
            : posts.length,
        ),
      ])
    }, 500)
  }

  const observer = new IntersectionObserver(
    (items) => {
      if (items[0].isIntersecting) {
        loadMore()
      }
    },
    { threshold: 1 },
  )

  useEffect(() => {
    if (observedEl) {
      observer.observe(observedEl)
    }

    return () => {
      if (observedEl) {
        observer.unobserve(observedEl)
      }
    }
  }, [observedEl, observer])

  const history = useHistory()

  function handleClick() {
    history.push('/create-post')
  }

  return (
    <div class="news-feed">
      <button className="button" onClick={handleClick}>
        Create Post
      </button>
      <>
        {displayedPosts.map((post) => (
          <div key={post.postId} className="post">
            <div className="post__heading">
              <img
                src="images/no-photo.png"
                className="profile-pic"
                alt="Profile Picure"
              />
              <div className="l-post-author+timestamp">
                <h3 className="post__author">
                  {post.firstName} {post.lastName}
                </h3>
                <p className="post__timestamp">{post.timestamp}</p>
              </div>
            </div>
            <div className="post__body">
              <img
                className="post__image"
                src={post.imageUrl}
                alt="sample"
              ></img>
              <p className="post__text-content">{post.textContent}</p>
            </div>
            <div className="comments-and-likes">
              <p className="comments-and-likes__qty">
                1 like&nbsp;&nbsp;&nbsp; 1 comment
              </p>
              <hr className="hr" />
              <div className="icons__wrapper">
                <FontAwesomeIcon icon={faThumbsUp} className={'post-icons'} />
                <FontAwesomeIcon icon={faComment} className={'post-icons'} />
              </div>
              <hr className="hr" />
              <Comment postId={post.postId} textContent={'butts'} />
            </div>
          </div>
        ))}

        {posts.length > displayedPosts.length && (
          <p ref={setObservedEl}>LoadMore ...</p>
        )}
      </>
    </div>
  )
}

function Comment(props) {
  const [commentsList, setCommentsList] = useState([])
  const fetchComments = async () => {
    let token = localStorage.getItem('token')
    const comments = await axios('http://localhost:3000/comments', {
      headers: {
        Authorization: token,
      },
    })
    setCommentsList(comments.data.data)
  }

  useEffect(() => {
    fetchComments()
    console.log(commentsList)
  }, [])

  return (
    <div className="comment">
      <img
        src="images/no-photo.png"
        className="comment__author-profile-pic"
        alt="Profile Picure"
      />
      {commentsList.map((comment) => (
        <div>{comment.commentText}</div>
      ))}
    </div>
  )
}

export default Newsfeed
