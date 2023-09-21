import { useState } from 'react'

const Input = ({ type, name, value, changeHandler }) => (
  <div>
    {name}
    <input
      type={type || 'text'}
      value={value}
      name={name}
      onChange={({ target }) => changeHandler(target.value)}
    />
  </div>
)

const LoginForm = ({ loginHandler }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const Login = (event) => {
    event.preventDefault()
    loginHandler({ username, password })
    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <h2>Log In</h2>
      <form onSubmit={Login}>
        <Input name={'Username'} value={username} changeHandler={setUsername} />
        <Input
          type='password'
          name={'Password'}
          value={password}
          changeHandler={setPassword}
        />
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

export default LoginForm
