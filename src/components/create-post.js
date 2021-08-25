import { useForm } from "react-hook-form"
import { useHistory } from "react-router-dom"
import axios from 'axios'


function CreatePost() {
    const { register, handleSubmit, formState: { errors } } = useForm();
   
    const history =  useHistory();
    const userId = localStorage.getItem("userId")
    const token = localStorage.getItem("token")

    function onSubmit(data){
       let date = new Date().toLocaleDateString()
       let time = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
       let timestamp = `${date} at ${time}`
       
      axios.post('http://localhost:3000/posts', {
        textContent: data.textContent,
        timestamp: timestamp,
        imageUrl: "https://images.unsplash.com/photo-1498805983167-a523078d762c?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8aGlnaCUyMGZpdmV8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        userId: userId
      }, {
        headers: {
          Authorization: token,
        }
      }
      )
      
      .then(function (response) {
        console.log(response);
        history.push("/news-feed")
        
      })
      .catch(
        history.push("/error-page")
      );
      
    }
    return ( <main className="main create-post">
      <form onSubmit={handleSubmit(onSubmit)} className="form">
      <h2 className="main__header">Create Post</h2>
      {errors.textContent && (
        <div role="alert" className="error">
          Post cannot be empty
        </div>
      )}
      <hr className="hr" />
      <textarea {...register("textContent", { required: true, minLength: 1})} className="form__textarea" type="text" name="textContent" placeholder="Start typing..." 
      aria-label="Create Post" />
      <button className="button--small">Upload Photo or Video</button>
      <hr className="hr" />
      <button className="button" type="submit">Create Post</button>
      </form> 
    </main>)
  }

 
  
  export default CreatePost