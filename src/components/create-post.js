import { useForm } from "react-hook-form"
import { BrowserRouter as useHistory } from "react-router-dom"
import axios from 'axios'

function CreatePost() {
    const { register, handleSubmit } = useForm();
    const history =  useHistory();
  
    function onSubmit(data){
      history.push("/news-feed")
  
      const post = {
        text: data.textContent
      }
  
      axios.post('http://localhost:3000/posts', {
        content: post.text
      })
      .then(function (response) {
        console.log(response);
  
      })
      .catch(function (error) {
        console.log(error);
      });
      
    }
    return ( <main className="main create-post">
      <form onSubmit={handleSubmit(onSubmit)} className="form">
      <h2 className="main__header">Create Post</h2>
      <hr className="hr" />
      <input {...register("textContent", { required: true, minLength: 1})} className="form__textarea" type="text" name="textContent" placeholder="Start typing..." 
      ariaLabel="Create Post" />
      <button className="button--small">Upload Photo or Video</button>
      
      <hr className="hr" />
      <button className="button" type="submit">Create Post</button>
      </form> 
      {PostCreated()}
    </main>)
  }

  function PostCreated() {
    return (<div className="alert__post-created">
      <h2>Post Created!</h2></div>)
  }
  
  export default CreatePost