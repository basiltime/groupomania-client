import './App.scss'
import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Switch, Route, Link, useHistory } from "react-router-dom";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUser, faUserCircle, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { faThumbsUp, faComment } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from 'axios'
import { useForm } from "react-hook-form";

library.add(faUser, faUserCircle, faThumbsUp, faComment, faTrash, faEdit)
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
          <Route path="/delete-account">
            <DeleteAccount />
          </Route>
        </Switch>
        </div>
          </Router>
  )
}
///////////////////////////////////////////////////////////////////////////
function Nav() {
  return ( <nav className="nav">
    <Link to="/"><img className="nav__logo" src={logo} alt="logo" /></Link>
    <Link className="nav__icon" to="/my-account" aria-label="My Account"><FontAwesomeIcon icon="user" color="white" aria-hidden="true" /></Link>
  </nav>)
}
///////////////////////////////////////////////////////////////////////////
function LandingPage() {
  return ( <main className="main">
    <img className="main__logo" src="/black-logo.svg" alt="logo" />
    <h2 className="main__header">Log in to your account</h2>
    {LoginForm()}
    <p>Or</p>
    {CreateNewAccountButton()}
  </main>)
} 
function LoginForm() {

  const { register, handleSubmit } = useForm();
  function onSubmit(data){

    const userLogin = {
      email: data.email,
      password: data.password
    }

    console.log(userLogin)

    axios.post('http://localhost:3000/users', {
      userLogin
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  return (
    
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <input {...register("email", { required: true })} type="email" className="form__input" placeholder="Email" aria-label="Email" />
        <input {...register("password", { required: true, minLength: 6 })} type="text" className="form__input" placeholder="Password" aria-label="Password" />
        <button type="submit" className="button">Submit</button>
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
  const { register, handleSubmit } = useForm();
  const history =  useHistory();

  function onSubmit(data){
    history.push("/news-feed")

    const newUser = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
    }

    console.log(newUser)

    axios.post('http://localhost:3000/users', {
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      password: newUser.password,
    })
    .then(function (response) {
      console.log(response);

    })
    .catch(function (error) {
      console.log(error);
    });
    
  }
  return ( <main className="main">
    <h2 className="main__header">Enter your details to create a new account</h2>
    <form onSubmit={handleSubmit(onSubmit)} className="form">
        <input {...register("firstName", { required: true })} type="text" className="form__input" placeholder="First Name" aria-label="First Name" />
        <input {...register("lastName", { required: true })} type="text" className="form__input" placeholder="Last Name" aria-label="Last Name" />
        <input {...register("email", { required: true })} type="email" className="form__input" placeholder="Email" aria-label="Email" />
        <input {...register("password", { required: true})} type="text" className="form__input" placeholder="Password" aria-label="Password" />
      {/* <FontAwesomeIcon icon={faUserCircle} className="profile-pic" size="10x"/>
      <label className="button--small" htmlFor="file-upload">Upload Profile Picture</label>
      <input className="form__input" type="file" id="file-upload" aria-label="Upload profile picture"/> */}
      <button type="submit" className="button">Create Account</button>
  </form>
  </main> 
  );
}

function AccountWrapper() {
  return ( <main className="main">
    <h2 className="main__header">Your Account</h2>
    <hr className="hr"/> 
    <AccountDetails />
    <hr className="hr" />
    {DeleteAccountButton()}
    <hr className="hr" />
    {LogOut()}
  </main> )
}
function AccountDetails() {
  const [firstName, setFirstName] = useState(null)
  const [lastName, setLastName] = useState(null)
  const [email, setEmail] = useState(null)
 
  useEffect(() => {
   axios.get('http://localhost:3000/users/1')
   .then(res => {
     setFirstName(res.data.FirstName)
     setLastName(res.data.LastName)
     setEmail(res.data.Email)
     console.log(res)
   })
    
  })
   return ( <div className="account-details">
     
       <p className="account-details__name">{firstName} {lastName} </p>
       <p className="account-details__email">{email}</p>
       <p className="account-details__password"></p>
     
     <FontAwesomeIcon icon={faUserCircle} className="profile-pic" size="10x"/>
   </div>)
   
 }
function DeleteAccountButton() {
  return ( <Link to="/delete-account"><p>Delete Account&nbsp;&nbsp;<FontAwesomeIcon icon={faTrash} className={"trash-icon"} /></p> </ Link>)
}
function LogOut() {
  return ( <button className="button">Log Out</button> )
}
///////////////////////////////////////////////////////////////////////////
function CreatePost() {
  const { register, handleSubmit } = useForm();
  const history =  useHistory();

  function onSubmit(data){
    history.push("/news-feed")

    const post = {
      text: data.textContent
    }

    axios.post('http://localhost:3000/posts', {
      content: post.text
    })
    .then(function (response) {
      console.log(response);

    })
    .catch(function (error) {
      console.log(error);
    });
    
  }
  return ( <main className="main create-post">
    <form onSubmit={handleSubmit(onSubmit)} className="form">
    <h2 className="main__header">Create Post</h2>
    <hr className="hr" />
    <input {...register("textContent", { required: true, minLength: 1})} className="form__textarea" type="text" name="textContent" placeholder="Start typing..." 
    ariaLabel="Create Post" />
    <button className="button--small">Upload Photo or Video</button>
    
    <hr className="hr" />
    <button className="button" type="submit">Create Post</button>
    </form> 
    {PostCreated()}
  </main>)
}
function PostCreated() {
  return (<div className="alert__post-created">
    <h2>Post Created!</h2></div>)
}
///////////////////////////////////////////////////////////////////////////
function Newsfeed() {
  return ( <main className="main news-feed">
    <Link to="/create-post" className="button--small">Create Post</Link>
    {Post()}
    {Post()}
    {Post()}
    {Post()}
    {Post()}
  </main>)
}

function Post() {
  
  return ( <div className="post">
    <div className="post__heading">
      <FontAwesomeIcon icon="user-circle" className="profile-pic" color="black" size="2x" />
      <div>
        <h3 className="post__author">username goes here</h3>
        <p className="post__timestamp">timestamp goes here</p>
      </div>
    </div>

    <div className="post__body">
      <img className="post__image"src="/sample-img.jpg" alt="sample" ></img>
      <p className="post__text-content">Introducing smoked habanero hot sauce! You can find it for sale on the HotTakes website. Please try it and leave me a good review!!!</p>
    </div>

    <div className="comments-and-likes">
      <p className="comments-and-likes__qty">1 like&nbsp;&nbsp;&nbsp; 1 comment</p>
      <hr className="hr" />
      <div className="icons__wrapper">
        <FontAwesomeIcon icon={faThumbsUp} className={"post-icons"} />
        <FontAwesomeIcon icon={faComment} className={"post-icons"} />
      </div>
      <hr className="hr" />
      <div className="comment">
      <FontAwesomeIcon icon="user-circle" className="comment__author-profile-pic" />
      <div>Looks delicious! 😻
      </div>
      </div>
    </div>
  </div>)
}
///////////////////////////////////////////////////////////////////////////
function DeleteAccount() {

  const history =  useHistory();
const handleRemoveAccount = (e) => {
  
  history.push("/")
  axios.delete('http://localhost:3000/users/16', {
    })
    
}

  return ( <div className="main">
    Are you sure you want to delete your Grouponania account?
    <br />
    <br />
    <strong>This is permanent and cannot be undone.</strong>
    <br />
    <br />
    <br />
    <button type="submit" className="button--small" onClick={handleRemoveAccount}>YES, DELETE MY ACCOUNT</button>
    <button className="button--small">Cancel</button>

  </div>)
}
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