const Newsfeed = () => {

    const numbers = [1,2,3,4,5,6,7,8];
    const listItems = numbers.map((number) =>
      <li>{number}</li>
    );
    return (
      <ul>{listItems}</ul>
    );
  }
// function Post() {
  
//   return ( <div className="post">
//     <div className="post__heading">
//       <FontAwesomeIcon icon="user-circle" className="profile-pic" color="black" size="2x" />
//       <div>
//         <h3 className="post__author">username goes here</h3>
//         <p className="post__timestamp">timestamp goes here</p>
//       </div>
//     </div>

//     <div className="post__body">
//       <img className="post__image"src="/sample-img.jpg" alt="sample" ></img>
//       <p className="post__text-content">Introducing smoked habanero hot sauce! You can find it for sale on the HotTakes website. Please try it and leave me a good review!!!</p>
//     </div>

//     <div className="comments-and-likes">
//       <p className="comments-and-likes__qty">1 like&nbsp;&nbsp;&nbsp; 1 comment</p>
//       <hr className="hr" />
//       <div className="icons__wrapper">
//         <FontAwesomeIcon icon={faThumbsUp} className={"post-icons"} />
//         <FontAwesomeIcon icon={faComment} className={"post-icons"} />
//       </div>
//       <hr className="hr" />
//       <div className="comment">
//       <FontAwesomeIcon icon="user-circle" className="comment__author-profile-pic" />
//       <div>Looks delicious! 😻
//       </div>
//       </div>
//     </div>
//   </div>)
// }
  export default Newsfeed