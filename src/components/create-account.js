import { BrowserRouter as useHistory } from "react-router-dom"
import { useForm } from "react-hook-form"
import axios from 'axios'

function CreateAccount() { 
    const { register, handleSubmit } = useForm();
    const history =  useHistory();
  
    function onSubmit(data){
      history.push("/news-feed")
  
      const newUser = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
      }
  
      console.log(newUser)
  
      axios.post('http://localhost:3000/users', {
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        password: newUser.password,
      })
      .then(function (response) {
        console.log(response);
  
      })
      .catch(function (error) {
        console.log(error);
      });
      
    }
    return ( <main className="main">
      <h2 className="main__header">Enter your details to create a new account</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="form">
          <input {...register("firstName", { required: true })} type="text" className="form__input" placeholder="First Name" aria-label="First Name" />
          <input {...register("lastName", { required: true })} type="text" className="form__input" placeholder="Last Name" aria-label="Last Name" />
          <input {...register("email", { required: true })} type="email" className="form__input" placeholder="Email" aria-label="Email" />
          <input {...register("password", { required: true})} type="text" className="form__input" placeholder="Password" aria-label="Password" />
        {/* <FontAwesomeIcon icon={faUserCircle} className="profile-pic" size="10x"/>
        <label className="button--small" htmlFor="file-upload">Upload Profile Picture</label>
        <input className="form__input" type="file" id="file-upload" aria-label="Upload profile picture"/> */}
        <button type="submit" className="button">Create Account</button>
    </form>
    </main> 
    );
  }

  export default CreateAccount