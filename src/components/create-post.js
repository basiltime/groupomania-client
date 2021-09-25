import { useForm, Controller } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import LoadingSpinner from './loading-spinner'

function CreatePost() {
  const [imgPreview, setImgPreview] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm()

  const history = useHistory()

  function onSubmit(data) {
    setIsLoading(true)
    const userId = localStorage.getItem('userId')
    const token = localStorage.getItem('token')
    let date = new Date().toLocaleDateString()
    let time = new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    })
    
    let timestamp = `${date} at ${time}`
    const form = new FormData()
    form.append('textContent', data.textContent)
    form.append('timestamp', timestamp)
    form.append('image', data.postImage)
    form.append('userId', userId)
    axios
      .post(
        'https://groupomania2.herokuapp.com/posts',
        
          form,
        
        {
          headers: {
            Authorization: token,
            'Content-Type': 'multipart/form-data',
          },
        },
      )

      .then(response => {
        console.log(response)
        history.push('/news-feed')
      })
      .catch(error => {
        console.log(error.response)
      })
  }

  return (
    <>
    {isLoading ? ( <LoadingSpinner />) : (
    <main className="main">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="form"
        encType="multipart/form-data"
      >
        <h2 className="main__header create-post" aria-level="1">Create Post</h2>
        {errors.textContent && (
          <div role="alert" className="error">
            Post cannot be empty
          </div>
        )}
        <hr className="hr" />
        <textarea
          {...register('textContent')}
          className="form__textarea"
          type="text"
          name="textContent"
          placeholder="Start typing..."
          aria-label="Create Post"
          required="true"
        />
        <img src={imgPreview} aria-label="Upload Preview" className="img-preview"/>
        
        <div className="button-file-input button">
        <Controller
          control={control}
          name="postImage"
          id="postImage"
          render={({
            field
          }) => (
            <input {...field} value={null} onChange={e => field.onChange(e.target.files[0], setImgPreview(URL.createObjectURL(e.target.files[0])))} type="file" aria-label="Upload Image" />
          )}
        />
        Upload Post Image
        </div>
        <hr className="hr" />
        <button className="button" type="submit">
          Publish
        </button>
      </form>
    </main> )}
    </>
  )
}

export default CreatePost