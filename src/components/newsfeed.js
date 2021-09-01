import { faThumbsUp, faComment } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import '../App.scss'
import { counter } from '@fortawesome/fontawesome-svg-core'

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
    setPosts(posts.data.data.reverse())
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

            <Comment postId={post.postId} />
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
  const history = useHistory()
  const [commentsList, setCommentsList] = useState([])
  const [commentFieldOpen, setCommentFieldOpen] = useState(false)
  const { register, handleSubmit } = useForm()

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
  }, [])

  function showInput() {
    setCommentFieldOpen(true)
  }

  let commentNumber = 0;
  let commentNumberText = "Comments";
  commentsList.forEach(function (comment) {
    if (comment.postId === props.postId) {
      commentNumber += 1
      if (commentNumber === 1) {commentNumberText = "Comment"} else (commentNumberText = "Comments")
    }
    
  })

  function onSubmit(data) {
    let token = localStorage.getItem('token')
    let userId = localStorage.getItem('userId')
    axios
      .post(
        'http://localhost:3000/comments',
        {
          commentText: data.textContent,
          postId: props.postId,
          commenterId: userId,
        },
        {
          headers: {
            Authorization: token,
          },
        },
      )

      .then(function (response) {
        console.log(response)
        history.push('/news-feed')
      })
      .catch(history.push('/error-page'))
  }



  

  return (
    <div>
      <p>{commentNumber} {commentNumberText}</p>
      <hr className="hr" />
      <div className="l-icons-wrapper">
        <button className={'comments-and-likes__icons'}>
          <FontAwesomeIcon icon={faThumbsUp} />
        </button>
        <button
          type="button"
          onClick={showInput}
          className={'comments-and-likes__icons'}
        >
          <FontAwesomeIcon icon={faComment} />
        </button>
      </div>
      <hr className="hr" />

      {/* Comment Form */}
      <div className="comments">
        {commentFieldOpen && (
          <form onSubmit={handleSubmit(onSubmit)} class="comment-form">
            <input
              class="comment-input"
              placeholder="Type comment here"
              autoComplete={false}
              {...register('textContent', { required: true, minLength: 1 })}
            ></input>
          </form>
        )}

        {commentsList.map(
          (comment) =>
            comment.postId === props.postId && (
              <div key={comment.commentId} class="comment-and-profile-pic">
                <img
                  src="images/no-photo.png"
                  className="comment__author-profile-pic"
                  alt="Profile Picure"
                />
                <div class="comment">{comment.commentText}</div>
              </div>
            ),
        )}
      </div>
    </div>
  )
}

export default Newsfeed
