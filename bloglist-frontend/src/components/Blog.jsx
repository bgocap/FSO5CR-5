import Togglable from './Togglable'
import { useState } from 'react'

const Blog = ({ blog, handleLikes, deleteHandler, currentUser }) => {
  const [visible, setVisible] = useState(false)
  const showWhenVisible = { display: visible ? '' : 'none' }
  const buttonValue = visible ? 'hide' : 'show'
  const addedByUser = currentUser.id === blog.user.id ? true : false

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const blogstyle = {
    marginBottom: 3,
    borderColor: 'Black',
    borderStyle: 'solid',
    borderRadius: 10,
    padding: 5,
  }
/*   <b style={{ fontSize: 18 }}>{blog.title}</b>
        {'by'}
        <em>{blog.author} </em>
*/
  return (
    <div style={blogstyle} className='blog'>
        {`${blog.title} by ${blog.author} `}
        <button onClick={() => toggleVisibility()}>{buttonValue}</button>
      <div style={showWhenVisible}>
        {blog.url}
        <br />
        Likes : {blog.likes}{' '}
        <button onClick={() => handleLikes(blog.id)}>like</button> <br />
        User:{blog.user.name} <br />
        {addedByUser && (
          <button onClick={() => deleteHandler(blog.id)}>delete</button>
        )}
      </div>
    </div>
  )
}

export default Blog
