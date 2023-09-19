const NewBlogForm = ({submitHandler,titleValue,authorValue,urlValue,setNewBlogHandler,newBlogValue}) =>(
    <div>
        <h2><em>Create New</em></h2>
        <form onSubmit={submitHandler}>
            <div>
                Title:
                <input 
                type="text"
                value={titleValue}
                name="Title"
                onChange={({ target }) => setNewBlogHandler({...newBlogValue,title: target.value})}>
                </input>
            </div>
            <div>
                Author:
                <input 
                type="text"
                value={authorValue}
                name="Author"
                onChange={({ target }) => setNewBlogHandler({...newBlogValue,author: target.value})}>
                </input>
            </div>
            <div>
                URL:
                <input 
                type="text"
                value={urlValue}
                name="URL"
                onChange={({ target }) => setNewBlogHandler({...newBlogValue,url: target.value})}>
                </input>
                <button type="submit">save</button>
            </div>
        </form>
    </div>
)


export default NewBlogForm