import { useForm } from "react-hook-form"
import { useHistory } from "react-router-dom"
import axios from 'axios'

function CreatePost() {
    const { register, handleSubmit } = useForm();
    const history =  useHistory();
  
    function onSubmit(data){
       history.push("/news-feed")
  
       let date = new Date().toLocaleDateString()
       let time = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
       
       let timestamp = `${date} at ${time}`
       
      const post = {
        text: data.textContent,
        firstName: 'Sample',
        lastName: 'Name',
        timestamp: timestamp,
        imageUrl: "https://images.unsplash.com/photo-1498805983167-a523078d762c?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8aGlnaCUyMGZpdmV8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        userId: 1
      }
  
      axios.post('http://localhost:3000/posts', {
        textContent: post.text,
        firstName: post.firstName,
        lastName: post.lastName,
        timestamp: post.timestamp,
        imageUrl: post.imageUrl,
        userId: post.userId,
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