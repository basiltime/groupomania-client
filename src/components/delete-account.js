import { Link, useHistory } from "react-router-dom"
import axios from 'axios'



function DeleteAccount() {
    const history =  useHistory();
    

    const handleRemoveAccount = () => {
    
    const userId = localStorage.getItem("userId")
    const token = localStorage.getItem("token")
    const deleteAcct = async () => {
    
    try {
    await axios.delete(`https://groupomania2.herokuapp.com/users/${userId}`, {
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
      
      <h3 class="text-center" aria-level="1">
      Are you sure you want to delete your Grouponania account?
      </h3>
      <br />
      <br />
      <strong>This is permanent and cannot be undone.</strong>
      <br />
      <br />
      <br />
      <button type="submit" className="button" onClick={handleRemoveAccount}>YES, DELETE MY ACCOUNT</button>
      <Link to="/news-feed" className="button">Cancel </Link>
      </div>
    )
  }

  export default DeleteAccount