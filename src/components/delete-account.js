import { BrowserRouter as useHistory } from "react-router-dom"
import axios from 'axios'


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

  export default DeleteAccount