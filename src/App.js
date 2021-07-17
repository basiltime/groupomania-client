import React, {useState} from 'react';
import logo from './logo.svg';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import './App.css';


// {CreateNewAccountWrapper()}
// {AccountWrapper()}
// {CreatePostWrapper()}
// {PostFeedWrapper()}
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
function App() {
  return ( <Router>
    
    <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
            
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
        </Switch>
        </div>
          </Router>
           
  )
  }

///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
function Nav() {
  return ( <nav  style={{border: "1px solid blue", display: "flex", flexDirection: "row", width: "30%"}}>
    <img src={logo} alt="logo" style={{width: "55px"}}/>
    <header><h1>Groupomania</h1></header>
  </nav>)
}
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
function LoginWrapper() {
  return ( <div style={{border: "1px solid blue", width: "30%"}}>
    {LoginForm()}
    {NewAccountButton()}
  </div>)
}

function LoginForm() {
  return ( <form style={{display: "flex", flexDirection: "column", alignItems: "flex-start"}}>
    <label>
      Email:
      <input type="email" name="email" />
    </label>
    <label>
      Password:
      <input type="text" name="password" />
    </label>
    <Link to="/post-feed">Log In</Link>
 
  </form>
  );
}

function NewAccountButton() {
  return ( <div>       
  <p>Or</p>
  <Link to="/create-account">Create New Account</ Link>
</div>)
};
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
function CreateNewAccountWrapper() {
  return ( <form style={{display: "flex", flexDirection: "column", alignItems: "flex-start", border: "1px solid blue", width: "30%"}}>
    <h2>Enter your details to create a new account</h2>
    <label>
      Username:
      <input type="text" name="username" />
    </label>
    <label>
      Email:
      <input type="email" name="email" />
    </label>
    <label>
      Password:
      <input type="text" name="password" />
    </label>
    <label>
      Retype password:
      <input type="text" name="retype-password" />
    </label>
    <label>
      Choose Profile Pic:
      <input type="file" name="upload-image" />
    </label>
    <input type="submit" value="Create Account" />
  </form>
  );
}
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
function AccountWrapper() {
  return ( <div style={{border: "1px solid blue", width: "30%"}}>
    <AccountDetails username="basiltime" email="bob@evans.com" />
    <hr />
    {EditAccountDetails()}
    {DeleteAccount()}
    <hr />
    {LogOut()}
  </div> )
}

function AccountDetails(props) {
  return ( <div>
    <h2>Your Account</h2>
    <img src={logo} alt="logo" style={{width: "200px"}} />
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
  return ( <button>Log Out</button> )
}
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
function CreatePostWrapper() {
  return ( <div style={{border: "1px solid blue", width: "30%"}}>
    <h2>Create Post</h2>
    <label>
      Start typing...
      <input type="text" name="retype-password" />
    </label>
    <label>
      Upload photo or video
      <input type="file" name="upload-media" />
    </label>
  </div>)
}
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
function PostFeedWrapper() {
  return ( <div style={{border: "1px solid blue", width: "30%"}}>
    <h2>This is where users can view posts</h2>
  </div>)
}
function PracticeComponent(props) {
  return ( <div>
    <p>"Great Job {props.name}, you passed some props! </p>
    <button>Change My Color</button>
    </div>)
}

function Example() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}




export default App;


// // Original app before routing
// function App() {
//   return <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
//             <PracticeComponent name="Krystal" />
//             {Example()}
//             {Nav()}
//             {LoginWrapper()}
//             {CreateNewAccountWrapper()}
//             {AccountWrapper()}
//             {CreatePostWrapper()}
//           </div>
// }