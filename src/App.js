import { Link, Route, Switch } from "react-router-dom"
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
library.add(faUser, faUserCircle, faThumbsUp, faComment, faTrash, faEdit)



function App() {
  
  return ( 
    <div id="app"> 
    <nav className="nav">
      <Link to="../"><img className="nav__logo" src={logo} alt="logo" /></Link>
      <Link className="nav__icon" to= "../my-account" aria-label="My Account"><FontAwesomeIcon icon="user" color="white" aria-hidden="true" /></Link>
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