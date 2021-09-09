import { Link, useHistory } from "react-router-dom"
import axios from 'axios'



function DeleteAccount() {
    const history =  useHistory();
    

    const handleRemoveAccount = () => {
    
    const userId = localStorage.getItem("userId")
    const token = localStorage.getItem("token")
    const deleteAcct = async () => {
    
    try {
    await axios.delete(`http://localhost:3000/users/${userId}`, {
      headers: {
        Authorization: token,
      }
      })
      localStorage.clear();
  } catch (error) {
    console.log(error)
  }
    }

    deleteAcct()
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
      <Link to="/news-feed" className="button--small">Cancel </Link>
  
    </div>)
  }

  export default DeleteAccount