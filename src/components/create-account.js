import { useHistory } from "react-router-dom"
import { useForm } from "react-hook-form"
import axios from 'axios'

function CreateAccount() { 
    const { register, handleSubmit, formState: {errors} } = useForm();
    const history =  useHistory()
    function onSubmit(data){
    localStorage.clear()
      axios.post('http://localhost:3000/users/signup', {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
      })
      .then(function (res) {
        console.log(res.data)
        localStorage.setItem("userId", res.data.userId)
        localStorage.setItem("token", res.data.token)
        history.push('/news-feed')
      })
      .catch(function (error) {
        console.log(error);
      });

    }
    return ( <main className="main">
      <h2 className="main__header">Enter your details to create a new account</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="form">
      {errors.firstName && ( <div role="alert" className="error">First name is required</div>)}
      {errors.lastName && ( <div role="alert" className="error">Last name is required</div>)}
      {errors.email && ( <div role="alert" className="error">Email is required</div>)}
      {errors.password && ( <div role="alert" className="error">Password is required</div>)}
          <input {...register("firstName", { required: true })} autocomplete="off" type="text" className="form__input" placeholder="First Name" aria-label="First Name" />
          <input {...register("lastName", { required: true })} autocomplete="off" type="text" className="form__input" placeholder="Last Name" aria-label="Last Name" />
          <input {...register("email", { required: true })} autocomplete="off" type="email" className="form__input" placeholder="Email" aria-label="Email" />
          <input {...register("password", { required: true})} autocomplete="off" type="password" className="form__input" placeholder="Password" aria-label="Password" />
        <button type="submit" className="button">Create Account</button>
    </form>
    </main> 
    );
  }

  export default CreateAccount