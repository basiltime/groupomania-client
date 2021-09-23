import { faThumbsUp, faComment } from '@fortawesome/free-regular-svg-icons'
import { faThumbsUp as solidFaThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useEffect, useState } from 'react'

function Comments(props) {
  const [commentsList, setCommentsList] = useState([])
  const [likesList, setLikesList] = useState([])
  const [commentFieldOpen, setCommentFieldOpen] = useState(false)
  const { register, handleSubmit, setValue } = useForm()
  let likesQty = 0
  let likesNumberText = 'Likes'
  let userLikes = false

  // GET all comments
  const fetchComments = async () => {
    let token = localStorage.getItem('token')
    const comments = await axios('https://groupomania2.herokuapp.com/comments', {
      headers: {
        Authorization: token,
      },
    })
    setCommentsList(comments.data.data)
  }

  const fetchLikes = async () => {
    let token = localStorage.getItem('token')
    const likes = await axios('https://groupomania2.herokuapp.com/likes', {
      headers: {
        Authorization: token,
      },
    })
    setLikesList(likes.data.data)
 // Update likes qty every time a post is liked/unliked
  }

  // Send GET request for all likes/comments upon component rendering
  useEffect(() => {
    fetchComments()
    fetchLikes()
  }, [])

  // Send POST request on click of like button
  const like = async () => {
    let token = localStorage.getItem('token')
    let userId = localStorage.getItem('userId')
    const likes = await axios.post(
      'https://groupomania2.herokuapp.com/likes',
      {
        userId: userId,
        postId: props.postId,
      },
      {
        headers: {
          Authorization: token,
        },
      },
    )
    setLikesList(likes.data.data)
  }
  
  // Set quantity of likes for the post 
  likesList.forEach(function (like) {
      if (like.postId === props.postId) {
          likesQty += 1
          if (like.userId === localStorage.getItem('userId')) {
            userLikes = true
          } else { userLikes = false }
          if (likesQty === 1) {
            likesNumberText = 'Like'
          } else likesNumberText = 'Likes'
      }
  })

// Display number of comments for the post
let commentNumber = 0
let commentNumberText = 'Comments'
commentsList.forEach(function (comment) {
  if (comment.postId === props.postId) {
    commentNumber += 1
    if (commentNumber === 1) {
      commentNumberText = 'Comment'
    } else commentNumberText = 'Comments'
  }
})

  // POST request for creating a comment
  function onSubmit(data) {
    let token = localStorage.getItem('token')
    let userId = localStorage.getItem('userId')
    axios.post(
        'https://groupomania2.herokuapp.com/comments',
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

      .then(response =>  {
        console.log(response)
        setCommentFieldOpen(false)
        fetchComments()
      })
      .catch(error => {
      console.log(error.response)
      setValue('textContent', '')
      fetchComments()
      })
  }

    // Display input field to enter comments
    function showInput() {
      if (commentFieldOpen === false) {
      setCommentFieldOpen(true) 
      } else {setCommentFieldOpen(false)}
    }

  return (
    <div>
      <div className="l-likes-and-comments-qty">
        <p className="likes-qty">{likesQty} {likesNumberText}</p>
        <p className="comments-qty">
            {commentNumber} {commentNumberText}</p>
      </div>
      <hr className="hr" />
      <div className="l-icons-wrapper">

        {userLikes ? (<button
          type="button"
          onClick={like}
          className='comments-and-likes__icons liked'
          aria-label='Remove Like'
        >
          <FontAwesomeIcon icon={solidFaThumbsUp} />
        </button>) : (
        <button
          type="button"
          onClick={like}
          className='comments-and-likes__icons not-liked'
          aria-label='Like'
        >
          <FontAwesomeIcon icon={faThumbsUp} />
        </button> 
        )}
        <button
          type="button"
          onClick={showInput}
          className='comments-and-likes__icons commentIcon'
          aria-label='Write Comment'
        >
          <FontAwesomeIcon icon={faComment} />
        </button>
      </div>

      <div className="comments">
        {commentFieldOpen && (
          <form onSubmit={handleSubmit(onSubmit)} className="comment-form">
            <input
              className="comment-input"
              placeholder="Type comment here"
              autoComplete="off"
              {...register('textContent', { required: true, minLength: 1 })}
            ></input>
          </form>
        )}

        {commentsList.map(
          (comment) =>
            comment.postId === props.postId && (
              <div key={comment.commentId} className="comment">
                
                <img
                  src={comment.profilePicUrl}
                  className="comment-profile-pic"
                  alt="Profile Picure"
                />
                
                <div className="comment-text">
                  <div><strong>{comment.firstName} {comment.lastName}</strong>
                  </div>
                  <div className="comment-content">{comment.commentText}</div>
                  </div>
                </div>
            ),
        )}
      </div>
    </div>
  )
}

export default Comments
