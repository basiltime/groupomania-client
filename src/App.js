import './App.scss'
import React from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import { library } from '@fortawesome/fontawesome-svg-core'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

library.add(faUser)





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
    <Link to="/my-account"><FontAwesomeIcon icon="user" id="account-icon" color="white" /></Link>
  </nav>)
}


///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
function LoginWrapper() {
  return ( <main>
    {LoginForm()}
    {NewAccountButton()}
  </main>)
} 

function LoginForm() {
  return ( <form>
    <img src="/black-logo.svg" alt="logo" id="black-logo" />
    <h2>Log in to your account</h2>
      <input type="email" name="email" placeholder="Enter email address" aria-label="Enter email address"/>
      <input type="text" name="password" placeholder="Enter your password" aria-label="Enter password"/>
      <Link to="/post-feed" className="button-link">Log In</Link>
  </form>
  );
}

function NewAccountButton() {
  return ( <div className="new-account-button">       
  <p>Or</p>
  <Link to="/create-account" className="button-link">Create New Account</ Link>
</div>)
};
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
function CreateNewAccountWrapper() { 
  return ( <main>
    <form>
    <h2>Enter your details to create a new account</h2>
      <input type="text" name="username" placeholder="Username" aria-label="username" />
      <input type="email" name="email" placeholder="Email address" aria-label="email address" />
      <input type="text" name="password" placeholder="Password" aria-label="password" />
      <input type="text" name="retype-password" placeholder="Re-enter password" aria-label="enter password again" />
      <label for="file-upload" className="button-link">Upload Profile Picture</label>
      <input type="file" id="file-upload" aria-label="Upload profile picture"/>
      <Link to="/post-feed" className="button-link">Create Account</Link>
  </form>
  </main> 
  );
}
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
function AccountWrapper() {
  return ( <main>
    <AccountDetails username="basiltime" email="bob@evans.com" />
    <hr />
    {EditAccountDetails()}
    {DeleteAccount()}
    <hr />
    {LogOut()}
  </main> )
}

function AccountDetails(props) {
  return ( <div>
    <h2>Your Account</h2>
    <p>Username: {props.username}</p>
    <p>Email: {props.email}</p>
    <p>Password: xxxxxx</p>
  </div>)
}

function EditAccountDetails() {
  return ( <p>Edit Account Details</p> )
}

function DeleteAccount() {
  return ( <p>Delete Account</p> )
}

function LogOut() {
  return ( <button className="button-link">Log Out</button> )
}
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
function CreatePostWrapper() {
  return ( <main>
    <h2>Create Post</h2>
    <label>
      Start typing...
      <input type="text" name="retype-password" />
    </label>
    <label>
      Upload photo or video
      <input type="file" name="upload-media" />
    </label>
  </main>)
}
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
function PostFeedWrapper() {
  return ( <main>
    {CreatePostLink()}
    <h2>This is where users can view posts</h2>
    <hr />
    <h3>Simple Post Placeholder</h3>
  </main>)
}

function CreatePostLink() {
  return ( <div>
      <Link to="/create-post">Create Post</Link>
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