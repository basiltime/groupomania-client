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
            <LoginWrapper />
          </Route>
          <Route path="/post-feed">
            <PostFeedWrapper />
          </Route>
          <Route path="/create-account">
            <CreateNewAccountWrapper />
          </Route>
          <Route path="/my-account">
            <AccountWrapper />
          </Route>
          <Route path="/create-post">
            <CreatePostWrapper />
          </Route>
        </Switch>
        </div>
          </Router>
  )
  }
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
function Nav() {
  return ( <nav>
    <img src={logo} alt="logo" />
    <Link to="/my-account"><FontAwesomeIcon icon="user" className="account-icon" color="white" /></Link>
  </nav>)
}
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
function LoginWrapper() {
  return ( <main>
    <img src="/black-logo.svg" alt="logo" id="black-logo" />
    <h2>Log in to your account</h2>
    {LoginForm()}
    {NewAccountButton()}
  </main>)
} 

function LoginForm() {
  return ( <form>
      <input type="email" name="email" placeholder="Enter email address" aria-label="Enter email address"/>
      <input type="text" name="password" placeholder="Enter your password" aria-label="Enter password"/>
      <Link to="/post-feed" className="button">Log In</Link>
  </form>
  );
}

function NewAccountButton() {
  return ( <div className="new-account-button">      
  <p>Or</p>
  <Link to="/create-account" className="button-small">Create New Account</ Link>
</div>)
};
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
function CreateNewAccountWrapper() { 
  return ( <main>
    <h2>Enter your details to create a new account</h2>
    <form>
      <input type="text" name="username" placeholder="Username" aria-label="username" />
      <input type="email" name="email" placeholder="Email address" aria-label="email address" />
      <input type="text" name="password" placeholder="Password" aria-label="password" />
      <input type="text" name="retype-password" placeholder="Re-enter password" aria-label="enter password again" />
      <FontAwesomeIcon icon={faUserCircle} className="profile-pic" size="10x" />
      <label for="file-upload" className="button-small">Upload Profile Picture</label>
      <input type="file" id="file-upload" aria-label="Upload profile picture"/>
      <Link to="/post-feed" className="button">Create Account</Link>
  </form>
  </main> 
  );
}
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
function AccountWrapper() {
  return ( <main>
    <h2>Your Account</h2>
    <hr /> 
    <AccountDetails username="basiltime" email="bob@evans.com" />
    <hr />
    {EditAccountDetails()}
    {DeleteAccount()}
    <hr />
    {LogOut()}
  </main> )
}

function AccountDetails(props) {
  return ( <div class="all-account-details">
    <div class="account-details-minus-image">
      <p class="username">{props.username}</p>
      <p class="password">{props.email}</p>
    </div>
    <FontAwesomeIcon icon={faUserCircle} className="profile-pic" size="10x"/>
  </div>)
}

function EditAccountDetails() {
  return ( <p>Edit Account Details&nbsp;&nbsp;<FontAwesomeIcon icon={faEdit} className={"trash-icon"} /></p> )
}

function DeleteAccount() {
  return ( <p>Delete Account&nbsp;&nbsp;<FontAwesomeIcon icon={faTrash} className={"edit-icon"} /></p> )
}

function LogOut() {
  return ( <button className="button">Log Out</button> )
}
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
function CreatePostWrapper() {
  return ( <main className="create-post">
    <form>
    <h2>Create Post</h2>
    <hr />
    <textarea type="text" name="create-post" placeholder="Start typing..." aria-label="Create Post" />
    <button className="button-small">Upload Photo or Video</button>
    </form> 
    <hr />
    <button className="button">Create Post</button>
  </main>)
}
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
function PostFeedWrapper() {
  return ( <main class="news-feed">
    <input type="text" id="create-post-input-fake" placeholder="Create Post" aria-label="Create Post" />
    {Post()}
    {CreatePostLink()}
  </main>)
}

function CreatePostLink() {
  return ( <div>
      <Link to="/create-post">Create Post</Link>
  </div>)
}

function Post() {
  return ( <div class="post">
    <div class="post-heading">
      <FontAwesomeIcon icon="user-circle" className="author-profile-pic" color="black" size="2x" />
      <div class="author-and-timestamp">
        <h3>username goes here</h3>
        <p>timestamp goes here</p>
      </div>
    </div>

    <div class="post-body">
      <img src="/sample-img.jpg" alt="sample" class="post-body-image"></img>
      <p class="post-body-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco la
      </p>
    </div>

    <div class="post-comments">
      <p class="post-likes-and-comments-qty">1 like&nbsp;&nbsp;&nbsp; 1 comment</p>
      <hr />
      <div class="post-icons-wrapper">
        <FontAwesomeIcon icon={faThumbsUp} className={"post-icons"} />
        <FontAwesomeIcon icon={faComment} className={"post-icons"} />
      </div>
      <hr />
      <div class="comment">
      <FontAwesomeIcon icon="user-circle" className="commenter-profile-pic" />
      <div>The hot sauce looks delicious! How hot is it though? 🥵 </div>
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