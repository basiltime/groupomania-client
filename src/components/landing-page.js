import axios from 'axios'
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom";









function LandingPage() {
  
    return ( <main className="main">
      <img className="main__logo" src="/black-logo.svg" alt="logo" />
      <h2 className="main__header">Log in to your account</h2>
      {LoginForm()}
      <p>Or</p>
      {CreateNewAccountButton()}
    </main>)
  } 
  function LoginForm() {
    const { register, handleSubmit } = useForm();
    function onSubmit(data){
      const userLogin = {
        email: data.email,
        password: data.password
      }
      console.log(userLogin)
      axios.post('http://localhost:3000/users', {
        userLogin
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="form">
          <input {...register("email", { required: true })} type="email" className="form__input" placeholder="Email" aria-label="Email" />
          <input {...register("password", { required: true, minLength: 6 })} type="text" className="form__input" placeholder="Password" aria-label="Password" />
          <button type="submit" className="button">Submit</button>
        </form>
    );
  }
  function CreateNewAccountButton() {
    return ( 
      <div>
      <Link to='/create-account' className="button--small">Create New Account</ Link>
      </div>
  )
  };

  export default LandingPage