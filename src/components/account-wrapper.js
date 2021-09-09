import { Link } from 'react-router-dom'
import React, { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { useHistory } from 'react-router-dom'



function AccountWrapper() {
  const [firstName, setFirstName] = useState(null)
  const [lastName, setLastName] = useState(null)
  const [email, setEmail] = useState(null)
  const [error, setError] = useState(null)
  const [profilePic, setProfilePic] = useState(false)
  const token = localStorage.getItem("token")
  const userId = localStorage.getItem('userId')


 
  const userData = async () => {
    try {
      const resp = await axios.get(`http://localhost:3000/users/${userId}`, {
        headers: {
          Authorization: token,
        },
      })
      setFirstName(resp.data.firstName)
      setLastName(resp.data.lastName)
      setEmail(resp.data.email)
      setProfilePic(resp.data.profilePicUrl)
     
      
    } catch(error) {
      if (error) {setError('Problem retrieving account information')}
    }
  }

  useEffect(() => {
    userData()
  }, [])
  
  
  return (
    
    <main className="main">
     
      <h2 className="main__header">Your Account</h2>
      <hr className="hr" />
      <div className="account-details">
      <img
          src={profilePic}
          alt=""
          className="profile-pic"
          aria-label="User profile picture"
        />
        {error && <div className="error"> {error} </div>}
        <p className="account-details__name">
          {firstName} {lastName}{' '}
        </p>
        <p className="account-details__email">{email}</p>
        <p className="account-details__password"></p>
      </div>
      <hr className="hr" />
      {DeleteAccountButton()}
      <hr className="hr" />
      
      {LogOut()}
   
    </main> 
  )
}

function DeleteAccountButton() {
  return (
    <Link to="/delete-account" className="button--warning">
      <p>
        Delete Account&nbsp;&nbsp;
        <FontAwesomeIcon icon={faTrash} className={'trash-icon'} />
      </p>{' '}
    </Link>
  )
}

function LogOut() {
  const history = useHistory()
  const handleClick = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    history.push('./')
  }
  return (
    <button onClick={handleClick} className="button">
      Log Out
    </button>
  )
}

export default AccountWrapper