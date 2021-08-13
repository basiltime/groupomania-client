import axios from 'axios'
import { useForm} from "react-hook-form"
import { useHistory } from 'react-router-dom';
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
    const history =  useHistory();

    const { register, handleSubmit } = useForm();

    function onSubmit(data){
      localStorage.clear();
      axios.post('http://localhost:3000/users/login', {
        email: data.email,
        password: data.password
      })
      .then(function (res) {
        console.log('User Signed In!')
        localStorage.setItem("userId", res.data.userId)
        localStorage.setItem("token", res.data.token)
        history.push("/news-feed")
      })
      .catch(function (error) {
        console.log(error);
      });
    }

    
  
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="form">
          <input {...register("email", { required: true })} type="email" className="form__input" placeholder="Email" aria-label="Email" />
          <input {...register("password", { required: true, minLength: 6 })} type="text" className="form__input" placeholder="Password" aria-label="Password" />
          <button type="submit" className="button">Log In</button>
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