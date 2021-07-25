import './App.scss'
import React from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUser, faUserCircle, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { faThumbsUp, faComment } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

library.add(faUser, faUserCircle, faThumbsUp, faComment, faTrash, faEdit)
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
function App() {
  return ( <Router>
    <div id="app"> 
          {Nav()}
          <Switch>
          <Route exact path="/">
            <LandingPage />
          </Route>
          <Route path="/news-feed">
            <Newsfeed />
          </Route>
          <Route path="/create-account">
            <CreateAccount />
          </Route>
          <Route path="/my-account">
            <AccountWrapper />
          </Route>
          <Route path="/create-post">
            <CreatePost />
          </Route>
        </Switch>
        </div>
          </Router>
  )
}
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
function Nav() {
  return ( <nav class="nav">
    <img class="nav__logo" src={logo} alt="logo" />
    <Link className="nav__icon" to="/my-account"><FontAwesomeIcon icon="user" color="white" /></Link>
  </nav>)
}
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
function LandingPage() {
  return ( <main class="main">
    <img class="main__logo" src="/black-logo.svg" alt="logo" />
    <h2 class="main__header">Log in to your account</h2>
    {LoginForm()}
    <p>Or</p>
    {CreateNewAccountButton()}
  </main>)
} 
function LoginForm() {
  return ( <form class="form">
      <input class="form__input" type="email" name="email" placeholder="Enter email address" aria-label="Enter email address"/>
      <input class="form__input" type="text" name="password" placeholder="Enter your password" aria-label="Enter password"/>
      <Link to="/news-feed" className="button">Log In</Link>
  </form>
  );
}
function CreateNewAccountButton() {
  return ( <Link to="/create-account" className="button--small">Create New Account</ Link>
)
};
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
function CreateAccount() { 
  return ( <main class="main">
    <h2 class="main__header">Enter your details to create a new account</h2>
    <form class="form">
      <input class="form__input" type="text" name="username" placeholder="Username" aria-label="username" />
      <input class="form__input" type="email" name="email" placeholder="Email address" aria-label="email address" />
      <input class="form__input" type="text" name="password" placeholder="Password" aria-label="password" />
      <input class="form__input" type="text" name="retype-password" placeholder="Re-enter password" aria-label="enter password again" />
      <FontAwesomeIcon icon={faUserCircle} className="profile-pic" size="10x" />
      <label className="button--small" for="file-upload">Upload Profile Picture</label>
      <input class="form__input" type="file" id="file-upload" aria-label="Upload profile picture"/>
      <Link to="/news-feed" className="button">Create Account</Link>
  </form>
  </main> 
  );
}
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
function AccountWrapper() {
  return ( <main class="main">
    <h2 class="main__header">Your Account</h2>
    <hr class="hr"/> 
    <AccountDetails username="basiltime" email="bob@evans.com" />
    <hr class="hr" />
    {DeleteAccount()}
    <hr class="hr" />
    {LogOut()}
  </main> )
}
function AccountDetails(props) {
  return ( <div class="account-details">
    
      <p class="account-details__username">{props.username}</p>
      <p class="account-details__password">{props.email}</p>
    
    <FontAwesomeIcon icon={faUserCircle} className="profile-pic" size="10x"/>
  </div>)
}
function DeleteAccount() {
  return ( <p>Delete Account&nbsp;&nbsp;<FontAwesomeIcon icon={faTrash} className={"trash-icon"} /></p> )
}
function LogOut() {
  return ( <button className="button">Log Out</button> )
}
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
function CreatePost() {
  return ( <main class="main create-post">
    <form class="form">
    <h2 class="main__header">Create Post</h2>
    <hr class="hr" />
    <textarea class="form__textarea" type="text" name="create-post" placeholder="Start typing..." aria-label="Create Post" />
    <button className="button--small">Upload Photo or Video</button>
    </form> 
    <hr class="hr" />
    <button className="button">Create Post</button>
  </main>)
}
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
function Newsfeed() {
  return ( <main class="main news-feed">
    <Link to="/create-post" class="button--small">Create Post</Link>
    {Post()}
    {Post()}
    {Post()}
    {Post()}
    {Post()}
  </main>)
}
function Post() {
  return ( <div class="post">
    <div class="post__heading">
      <FontAwesomeIcon icon="user-circle" className="profile-pic" color="black" size="2x" />
      <div>
        <h3 class="post__author">username goes here</h3>
        <p class="post__timestamp">timestamp goes here</p>
      </div>
    </div>

    <div class="post__body">
      <img class="post__image"src="/sample-img.jpg" alt="sample" ></img>
      <p class="post__text-content">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco la
      </p>
    </div>

    <div class="comments-and-likes">
      <p class="comments-and-likes__qty">1 like&nbsp;&nbsp;&nbsp; 1 comment</p>
      <hr class="hr" />
      <div class="icons__wrapper">
        <FontAwesomeIcon icon={faThumbsUp} className={"post-icons"} />
        <FontAwesomeIcon icon={faComment} className={"post-icons"} />
      </div>
      <hr class="hr" />
      <div class="comment">
      <FontAwesomeIcon icon="user-circle" className="comment__author-profile-pic" />
      <div>Looks delicious! 😻
      </div>
      </div>
    </div>
  </div>)

}
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
export default App;
































///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
// function PracticeComponent(props) {
//   return ( <div>
//     <p>"Great Job {props.name}, you passed some props! </p>
//     <button>Change My Color</button>
//     </div>)
// }

// function Example() {
//   // Declare a new state variable, which we'll call "count"
//   const [count, setCount] = useState(0);

//   return (
//     <div>
//       <p>You clicked {count} times</p>
//       <button onClick={() => setCount(count + 1)}>
//         Click me
//       </button>
//     </div>
//   );
// }