import { useForm, Controller } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'

function CreatePost() {
  const [imgPreview, setImgPreview] = useState(null)
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm()

  const history = useHistory()

  function onSubmit(data) {

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
        'http://localhost:3000/posts',
        
          form,
        
        {
          headers: {
            Authorization: token,
            'Content-Type': 'multipart/form-data',
          },
        },
      )

      .then(function (response) {
        console.log(response)
        history.push('/news-feed')
      })
      .catch(console.log('Something went wrong'))
  }

  return (
    <main className="main create-post">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="form"
        encType="multipart/form-data"
      >
        <h2 className="main__header" aria-level="1">Create Post</h2>
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
          Create Post
        </button>
      </form>
    </main>
  )
}

export default CreatePost