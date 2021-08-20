import { useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import axios from 'axios'

function CreateAccount() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const [duplicateEmailError, setDuplicateEmailError] = useState(null)
  const [networkError, setNetworkError] = useState(null)
  const history = useHistory()

  function onSubmit(data) {
    localStorage.clear()

    const signupRequest = async () => {
      try {
        const resp = await axios.post('http://localhost:3000/users/signup', {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          password: data.password,
        })

        localStorage.setItem('userId', resp.data.userId)
        localStorage.setItem('token', resp.data.token)
        history.push('/news-feed')
      } catch (error) {
        console.log(error.message)
        if (error.message === 'Network Error') {
          setNetworkError(
            'Sorry, there was a problem on our end. Please try again later!',
          )
        } else if (error.response.status === 409) {
          setDuplicateEmailError('Duplicate email address')
        }
      }
    }
    signupRequest()
  }

  return (
    <main className="main">
      <h2 className="main__header">
        Enter your details to create a new account
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        {errors.firstName && (
          <div role="alert" className="error">
            First name is required
          </div>
        )}
        {errors.lastName && (
          <div role="alert" className="error">
            Last name is required
          </div>
        )}
        {errors.email && (
          <div role="alert" className="error">
            Email is required
          </div>
        )}
        {duplicateEmailError && (
          <div className="error"> {duplicateEmailError} </div>
        )}
        {networkError && <div className="error"> {networkError} </div>}
        {errors.password && (
          <div role="alert" className="error">
            Password is required
          </div>
        )}
        <input
          {...register('firstName', { required: true })}
          autoComplete="off"
          type="text"
          className="form__input"
          placeholder="First Name"
          aria-label="First Name"
        />
        <input
          {...register('lastName', { required: true })}
          autoComplete="off"
          type="text"
          className="form__input"
          placeholder="Last Name"
          aria-label="Last Name"
        />
        <input
          {...register('email', { required: true })}
          autoComplete="off"
          type="email"
          className="form__input"
          placeholder="Email"
          aria-label="Email"
        />
        <input
          {...register('password', { required: true })}
          autoComplete="off"
          type="password"
          className="form__input"
          placeholder="Password"
          aria-label="Password"
        />
        <button type="submit" className="button">
          Create Account
        </button>
      </form>
    </main>
  )
}

export default CreateAccount
