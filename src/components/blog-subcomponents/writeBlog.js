import React ,{useState} from 'react';
function WriteBlog(props){

    const [blog, setBlog] = useState({title: "",content: ""});

    function handleChange(event) {
        const { name, value } = event.target;
        setBlog(prevBlog => {
        return {
            ...prevBlog,
            [name]: value
        };
        });
    }

    function submitBlog(event) {
       // props.postBlog(blog);
        setBlog({
            title: "",
            content: ""
        });
        event.preventDefault();
    }

        return (
                  <div className="row m-0">
                    <div className="col-10 col-md-6 offset-1 offset-md-3">
                      <form className="create-task">
                          <input
                            name="title"
                            onChange={handleChange}
                            value={blog.title}
                            placeholder="Title"
                          />
                        <textarea
                          name="Content"
                          onChange={handleChange}
                          value={blog.content}
                          placeholder="Write what's on ur mind"
                          rows= {10}
                        />
                      </form>
                    </div>
                </div>
        )
}
export default WriteBlog;