import { Link } from "react-router-dom"
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import token from '../helpers/auth'
import { useHistory } from 'react-router-dom'



function AccountWrapper() {
    const [firstName, setFirstName] = useState(null)
    const [lastName, setLastName] = useState(null)
    const [email, setEmail] = useState(null)
    useEffect(() => {
      const userId = localStorage.getItem("userId")
      axios.get(`http://localhost:3000/users/${userId}`, {
       headers: {
         Authorization: token
       }
     })
      .then(res => {
        setFirstName(res.data.firstName)
        setLastName(res.data.lastName)
        setEmail(res.data.email)
      })
       
     })
    return ( <main className="main">
      <h2 className="main__header">Your Account</h2>
      <hr className="hr"/> 
      <div className="account-details">
         <img src="/images/no-photo.png" alt="Profile Picure" className="profile-pic" />
         <p className="account-details__name">{firstName} {lastName} </p>
         <p className="account-details__email">{email}</p>
         <p className="account-details__password"></p>
     </div>
      <hr className="hr" />
      {DeleteAccountButton()}
      <hr className="hr" />
      {LogOut()}
    </main> )
  }

  function DeleteAccountButton() {
    return ( <Link to="/delete-account" className="button--warning"><p>Delete Account&nbsp;&nbsp;<FontAwesomeIcon icon={faTrash} className={"trash-icon"} /></p> </ Link>)
  }
  
  function LogOut() {
    const history = useHistory()
    const handleClick = () => {
      
      console.log('You Clicked!')
      localStorage.removeItem("token")
      localStorage.removeItem("userId")
      history.push('./')
    }
    return ( <button onClick={handleClick} className="button">Log Out</button> )
  }



export default AccountWrapper
