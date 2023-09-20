import Togglable from './Togglable'
import { useState } from 'react'

const Blog = ({ blog,handleLikes }) => {
  const [visible, setVisible] = useState(false)
  const showWhenVisible = { display: visible ? '' : 'none' }
  const buttonValue = visible?'hide':'show'

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const blogstyle={marginBottom:3,borderColor:'Black',borderStyle:'solid',borderRadius:10,padding:5}

  return(
    <div style={blogstyle}>
      <b style={{fontSize:18}}>{blog.title}</b> <button onClick={()=>toggleVisibility()}>{buttonValue}</button><br/>
      <div style={showWhenVisible}>
      by <em>{blog.author}</em><br/>
      {blog.url}<br/>
      Likes : {blog.likes} <button onClick={()=>handleLikes(blog.id)}>like</button> <br/>
      User:{blog.user.name}
      </div>
    </div>
  )
}

export default Blog