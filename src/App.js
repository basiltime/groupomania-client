import { Link, Route, Switch, useHistory } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUser, faUserCircle, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { faThumbsUp, faComment } from '@fortawesome/free-regular-svg-icons'
import logo from './logo.svg';
import LandingPage from './components/landing-page.js'
import CreateAccount from './components/create-account.js'
import AccountWrapper from './components/account-wrapper.js'
import CreatePost from './components/create-post.js'
import Newsfeed from './components/newsfeed.js'
import DeleteAccount from './components/delete-account.js'
import React from "react";
library.add(faUser, faUserCircle, faThumbsUp, faComment, faTrash, faEdit)




function App() {

const history = useHistory();

function homeClick() {
  if (localStorage.getItem("token")) {history.push('/news-feed')}
  else if (!localStorage.getItem("token")) {history.push('/')}
}

function accountClick() {
  if (localStorage.getItem("token")) {history.push('/my-account')}
  else if (!localStorage.getItem("token")) {history.push('')}
}


  return ( 
    <div id="app"> 
    <nav className="nav">
    <Link onClick={homeClick}><img className="nav__logo" src={logo} aria-label="Home" alt="logo" /></Link>
    <Link onClick={accountClick} className="nav__icon" aria-label="My Account"><FontAwesomeIcon icon="user" color="white" aria-hidden="true" /></Link>
    </nav>
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
          <Route path="/delete-account" >
            <DeleteAccount />
          </Route>
        </Switch>
        </div>
  )

}
export default App;