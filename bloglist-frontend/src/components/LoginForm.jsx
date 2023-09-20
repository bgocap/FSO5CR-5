import { useState } from 'react'

const LoginForm = ({ loginHandler }) => {

  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')

  const Login = (event) => {
    event.preventDefault()
    loginHandler({username, password})
    setUsername('')
    setPassword('')
  }
  return(
    <div>
      <h2>Log In</h2>
      <form onSubmit={Login}>
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
    </div>     
)}

export default LoginForm