import { faThumbsUp, faComment } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import '../App.scss'

const Newsfeed = () => {
  const [data, setData] = useState([])
  const firstDisplay = data.slice()
  const [displayedPosts, setDisplayedPosts] = useState(firstDisplay)
  const [observedEl, setObservedEl] = useState(null)

  const fetchData = async () => {
    const result = await axios('http://localhost:3000/posts')
    setData(result.data.reverse())
  }

  useEffect(() => {
    fetchData()
  }, [])

  const loadMore = () => {
    setTimeout(() => {
      setDisplayedPosts([
        ...displayedPosts,
        ...data.slice(
          displayedPosts.length,
          data.length > displayedPosts.length + 5
            ? displayedPosts.length + 5
            : data.length,
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

  const history =  useHistory();

  function handleClick(){
    history.push("/create-post")
  }

  return (
    <div class="news-feed">
      <button className="button" onClick={handleClick}>Create Post</button>
    <>
      {displayedPosts.map((post, i) => (
        
        <div key={i} className="post">
          <div className="post__heading">
            <img src="images/no-photo.png"
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
            <img className="post__image" src={post.imageUrl} alt="sample"></img>
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
            <div className="comment">
            <img src="images/no-photo.png"
              className="comment__author-profile-pic"
              alt="Profile Picure"
            />
              <div>Wow! 😻</div>
            </div>
          </div>
        </div>
      ))}

      {data.length > displayedPosts.length && (
        <p ref={setObservedEl}>LoadMore ...</p>
      )}
    </>
    </div>
  )
}

export default Newsfeed
