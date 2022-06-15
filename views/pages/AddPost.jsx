import log from "../utils/log";
import {h} from "preact"
import {useState} from "preact/compat";


function AddPost(){
	
	const [post, setPost] = useState({
		title: "Post One",
		content: "dummy content",
		summary: "dummy summary summary summary summarysummarysummary summary summary summary summary summary",
		tags: ["asd", "ASD", "DAS"],
	})
	
	
	function handleSubmit(e){
		e.preventDefault();
		
		if(typeof window.Android !== "undefined"){
			Android.addPost(JSON.stringify({
				...post
			}))
		}
	}
	
	return(
		<div className="add-post">
			<h1>Add Post</h1>
			<form onSubmit={handleSubmit}>
				<input type="text" name="title" value={post.title} placeholder="Title" />
				<input type="text" name="summary" value={post.summary} placeholder="summary" />
				<input type="text" name="content" value={post.content} placeholder="content" />
				<button type="submit">Add</button>
			</form>
			
		</div>
	)
}

export default AddPost