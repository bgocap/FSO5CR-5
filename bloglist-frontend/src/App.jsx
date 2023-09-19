import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import login from './services/login'
import Notification from './components/Notification'
import NewBlogForm from './components/NewBlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState({text:null,type:null})
  

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

  const addNewBlog = async (newBlog) =>{
    try {
      const returnedBlog = await blogService.createBlog(newBlog)
      setBlogs(blogs.concat(returnedBlog))
      setNotificationMessage({
        text:`${returnedBlog.title} by ${returnedBlog.author} has been submited`,
        type:'success',
      })
    }catch(exception){
      setNotificationMessage({text:'Something went wrong',type:'error'})
    }
    setTimeout(() => {setNotificationMessage({text:null,type:null})}, 5000)
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
      setNotificationMessage({text:'Wrong username or password',type:'error'})
      setTimeout(() => {
        setNotificationMessage({text:null,type:null})
      }, 5000)
    }

  }

  const handleLogout = async () =>{
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser('')
    setUsername('')
    setPassword('')
  }

  const newBlogForm = () =>(
    <Togglable buttonLabel='Create a new blog'>
      <NewBlogForm submitBlog={addNewBlog}/>
    </Togglable>
  )
  
  return (
    <div>
      <h1 style={{fontSize:50}}><em>Blogs</em></h1>
      <Notification message={notificationMessage.text} type={notificationMessage.type} />
      {!user && 
        <LoginForm
        submitHandler={handleLogin}
        usernameValue={username}
        setUsernameHandler={setUsername}
        passwordValue={password}
        setPasswordHandler={setPassword}
      />}
      {user &&
        <div>
          <p>{user.name} logged in <button onClick={()=>handleLogout()}>logout</button></p>
          {newBlogForm()}
          {blogs.map(blog =><Blog key={blog.id} blog={blog} />)}
        </div>}
    </div>
  )

}

export default App