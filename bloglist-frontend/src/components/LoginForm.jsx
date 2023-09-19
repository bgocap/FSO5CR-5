const LoginForm = ({submitHandler,usernameValue,setUsernameHandler,passwordValue,setPasswordHandler}) => (
  <form onSubmit={submitHandler}>
    <div>
      username
        <input
        type="text"
        value={usernameValue}
        name="Username"
        onChange={({ target }) => setUsernameHandler(target.value)}
      />
    </div>
    <div>
      password
        <input
        type="password"
        value={passwordValue}
        name="Password"
        onChange={({ target }) => setPasswordHandler(target.value)}
      />
    </div>
    <button type="submit">login</button>
  </form>      
)

export default LoginForm