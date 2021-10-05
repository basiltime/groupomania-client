import { useHistory } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import LoadingSpinner from "./loading-spinner";

function CreateAccount({ setIsLoggedIn }) {
  const [duplicateEmailError, setDuplicateEmailError] = useState(null);
  const [networkError, setNetworkError] = useState(null);
  const [imgPreview, setImgPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const history = useHistory();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  function onSubmit(data) {
    localStorage.clear();
    const form = new FormData();
    form.append("firstName", data.firstName);
    form.append("lastName", data.lastName);
    form.append("email", data.email);
    form.append("password", data.password);
    form.append("image", data.profilePicUrl);

    const signupRequest = async () => {
      try {
        setIsLoading(true);
        const resp = await axios.post(
          "https://groupomania2.herokuapp.com/users",
          form,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        localStorage.setItem("userId", resp.data.userId);
        localStorage.setItem("token", resp.data.token);
        setIsLoggedIn((setIsLoggedIn) => true);
        history.push("/news-feed");
      } catch (error) {
        if (error.message === "Network Error") {
          setIsLoading(false);
          setNetworkError(
            "Sorry, there was a problem on our end. Please try again later!"
          );
        } else if (error.response.status === 409) {
          setIsLoading(false);
          setDuplicateEmailError("Duplicate email address");
        }
      }
    };
    signupRequest();
  }

  return (
    <div>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <main className="main">
          <h2 className="main__header" aria-level="1">
            Enter your details to create a new account
          </h2>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="form"
            encType="multipart/form-data"
          >
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
                Password is required, and must be at least 7 characters long.
              </div>
            )}
            <input
              {...register("firstName", { required: true })}
              autoComplete="off"
              type="text"
              className="form__input"
              placeholder="First Name"
              aria-label="First Name"
              name="firstName"
            />
            <input
              {...register("lastName", { required: true })}
              autoComplete="off"
              type="text"
              className="form__input"
              placeholder="Last Name"
              aria-label="Last Name"
              name="lastName"
            />
            <input
              {...register("email", { required: true })}
              autoComplete="off"
              type="email"
              className="form__input"
              placeholder="Email"
              aria-label="Email"
              name="email"
            />
            <input
              {...register("password", { required: true, minLength: 7})}
              autoComplete="off"
              type="password"
              className="form__input"
              placeholder="Password"
              aria-label="Password"
              name="password"
            />

            <img
              src={imgPreview}
              className="img-preview"
              aria-label="Image Preview"
            />
            <div className="button-file-input button">
              <Controller
                control={control}
                name="profilePicUrl"
                id="profilePicUrl"
                render={({ field }) => (
                  <input
                    {...field}
                    value={null}
                    onChange={(e) =>
                      field.onChange(
                        e.target.files[0],
                        setImgPreview(URL.createObjectURL(e.target.files[0]))
                      )
                    }
                    type="file"
                    aria-label="Upload Profile Picture"
                  />
                )}
              />
              Upload Profile Picture
            </div>

            <button type="submit" className="button">
              Create Account
            </button>
          </form>{" "}
        </main>
      )}
    </div>
  );
}

export default CreateAccount;
