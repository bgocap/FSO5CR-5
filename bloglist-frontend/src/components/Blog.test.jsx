import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders initial content', () => {
    const blog = {
    title:"Bosco-Fahey",
    author:"Darrick Palffrey",
    url:"blinklist.com",
    likes:56,
    user:{name:'user',id:'01'}
    }

    const { container } = render(<Blog blog={blog} currentUser={{id:'01'}}/>)

    const div = container.querySelector('.blog')
    expect(div).toHaveTextContent('Bosco-Fahey by Darrick Palffrey ')
    
})