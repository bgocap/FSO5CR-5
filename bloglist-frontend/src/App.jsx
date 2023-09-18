import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import login from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newBlog, setNewBlog] = useState({title:'',author:'',url:''})
  

  useEffect( () => {
    blogService.getAll().then(blogs => setBlogs( blogs ))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addNewBlog = async (event) =>{
    event.preventDefault()
    try {
      const returnedBlog = await blogService.createBlog(newBlog)
      setBlogs(blogs.concat(returnedBlog))
      setNewBlog({title:'',author:'',url:''})
    }catch(exception){
      setTimeout(() => {
        console.log('Something went wrong')
        console.log('null')
      }, 5000)
    }
  }

  const handleLogin = async (event) =>{
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      ) 
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log('Wrong credentials')
      setTimeout(() => {
        console.log('null')
      }, 5000)
    }

  }

  const handleLogout = async () =>{
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser('')
    setUsername('')
    setPassword('')
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )
  
  return (
    <div>
      <h2>BlogList</h2>
      {!user && loginForm()}
      {user &&
        <div>
          <p>{user.name} logged in <button onClick={()=>handleLogout()}>logout</button></p>
          <form onSubmit={addNewBlog}>
            <div>
              Title:
              <input 
                type="text"
                value={newBlog.title}
                name="Title"
                onChange={({ target }) => setNewBlog({...newBlog,title: target.value})}>
              </input>
            </div>
            <div>
              Author:
              <input 
                type="text"
                value={newBlog.author}
                name="Author"
                onChange={({ target }) => setNewBlog({...newBlog,author: target.value})}>
              </input>
            </div>
            <div>
              URL:
              <input 
                type="text"
                value={newBlog.url}
                name="URL"
                onChange={({ target }) => setNewBlog({...newBlog,url: target.value})}>
              </input>
              <button type="submit">save</button>
            </div>
          </form>
          {blogs.map(blog =><Blog key={blog.id} blog={blog} />)}
        </div>
      }
    </div>
  )
}

export default App