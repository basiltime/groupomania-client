import { useHistory } from "react-router-dom"
import axios from 'axios'
import token from '../helpers/auth'


function DeleteAccount() {

    const history =  useHistory();
    const handleRemoveAccount = () => {
    const userId = localStorage.getItem("userId")
    axios.delete(`http://localhost:3000/users/${userId}`, {
      headers: {
        Authorization: token
      }
      })
    localStorage.clear()
    history.push("/")
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

  export default DeleteAccount