import axios from "axios";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";

function LandingPage({ setIsLoggedIn }) {
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [error, setError] = useState(null);

  // POST request for login
  function onSubmit(data) {
    localStorage.clear();
    const loginRequest = async () => {
      try {
        const resp = await axios.post(
          "https://groupomania2.herokuapp.com/users/login",
          {
            email: data.email,
            password: data.password,
          }
        );
        localStorage.setItem("token", resp.data.token);
        localStorage.setItem("userId", resp.data.userId);
        setIsLoggedIn((setIsLoggedIn) => true);
        history.push("/news-feed");
      } catch {
        setError("The email or password you entered is incorrect");
      }
    };
    loginRequest();
  }

  return (
    <main className="main">
      <img className="main__logo" src="/black-logo.svg" alt="logo" />
      <h2 className="main__header" aria-level="1">
        Log in to your account
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        {errors.email && (
          <div role="alert" className="error">
            Email is required
          </div>
        )}
        {errors.password && (
          <div role="alert" className="error">
            Password is required
          </div>
        )}
        {error && <div className="error"> {error} </div>}
        <input
          {...register("email", { required: true })}
          autoComplete="off"
          type="email"
          className="form__input"
          placeholder="Email"
          aria-label="Email"
        />
        <input
          {...register("password", { required: true, minLength: 6 })}
          autoComplete="off"
          type="password"
          className="form__input"
          placeholder="Password"
          aria-label="Password"
        />
        <button type="submit" className="button">
          Log In
        </button>
      </form>
      <p>Or</p>
      <div>
        <Link to="/create-account" className="button">
          Create New Account
        </Link>
      </div>
    </main>
  );
}

export default LandingPage;
