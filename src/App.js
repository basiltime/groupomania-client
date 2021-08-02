import './App.scss'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUser, faUserCircle, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { faThumbsUp, faComment } from '@fortawesome/free-regular-svg-icons'
import Nav from './components/nav.js'
import LandingPage from './components/landing-page.js'
import CreateAccount from './components/create-account.js'
import AccountWrapper from './components/account-wrapper.js'
import CreatePost from './components/create-post.js'
import Newsfeed from './components/newsfeed.js'
import DeleteAccount from './components/delete-account.js'
library.add(faUser, faUserCircle, faThumbsUp, faComment, faTrash, faEdit)



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




export default App;