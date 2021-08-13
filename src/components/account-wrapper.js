import { Link } from "react-router-dom"
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import token from '../helpers/auth'

function AccountWrapper() {
    return ( <main className="main">
      <h2 className="main__header">Your Account</h2>
      <hr className="hr"/> 
      <AccountDetails />
      <hr className="hr" />
      {DeleteAccountButton()}
      <hr className="hr" />
      {LogOut()}
    </main> )
  }
  function AccountDetails() {
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
     return ( <div className="account-details">
         <img src="/images/no-photo.png" alt="Profile Picure" className="profile-pic" />
         <p className="account-details__name">{firstName} {lastName} </p>
         <p className="account-details__email">{email}</p>
         <p className="account-details__password"></p>
     </div>)
     
   }
  function DeleteAccountButton() {
    return ( <Link to="/delete-account" className="button--warning"><p>Delete Account&nbsp;&nbsp;<FontAwesomeIcon icon={faTrash} className={"trash-icon"} /></p> </ Link>)
  }
  function LogOut() {
    return ( <Link to="/"><button className="button">Log Out</button></Link> )
  }



export default AccountWrapper
