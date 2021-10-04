import { Link, Route, Switch, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faUser,
  faUserCircle,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp, faComment } from "@fortawesome/free-regular-svg-icons";
import logo from "./logo.svg";
import LandingPage from "./components/landing-page.js";
import CreateAccount from "./components/create-account.js";
import AccountWrapper from "./components/account-wrapper.js";
import CreatePost from "./components/create-post.js";
import Newsfeed from "./components/newsfeed.js";
import DeleteAccount from "./components/delete-account.js";
import { useState, useEffect } from "react";
import React from "react";
library.add(faUser, faUserCircle, faThumbsUp, faComment, faTrash, faEdit);

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // Check if user is logged in and update state
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsLoggedIn(true);
    } else if (!localStorage.getItem("token")) {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <div id="app">
      <nav className="nav">
        {isLoggedIn ? (
          <>
            <Link to="/news-feed">
              <img
                className="nav__logo"
                src={logo}
                aria-label="Home"
                alt="Home"
              />
            </Link>
            <Link
              to="/my-account"
              className="nav__icon"
              aria-label="My Account"
            >
              <FontAwesomeIcon icon="user" color="white" aria-hidden="true" />
            </Link>
          </>
        ) : (
          <>
            <Link to="/">
              <img
                className="nav__logo"
                src={logo}
                aria-label="Home"
                alt="Home"
              />
            </Link>
            <Link to="/" className="nav__icon" aria-label="My Account">
              <FontAwesomeIcon icon="user" color="white" aria-hidden="true" />
            </Link>
          </>
        )}
      </nav>
      <Switch>
        <Route exact path="/">
          <LandingPage setIsLoggedIn={setIsLoggedIn} />
        </Route>
        <Route path="/news-feed">
          <Newsfeed />
        </Route>
        <Route path="/create-account">
          <CreateAccount setIsLoggedIn={setIsLoggedIn} />
        </Route>
        <Route path="/my-account">
          <AccountWrapper setIsLoggedIn={setIsLoggedIn} />
        </Route>
        <Route path="/create-post">
          <CreatePost />
        </Route>
        <Route path="/delete-account">
          <DeleteAccount setIsLoggedIn={setIsLoggedIn} />
        </Route>
      </Switch>
    </div>
  );
}
export default App;
