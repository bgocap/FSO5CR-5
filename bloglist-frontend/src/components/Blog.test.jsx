import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

test('renders initial content', () => {
    const blog = {
    title:"Bosco-Fahey",
    author:"Darrick Palffrey",
    url:"blinklist.com",
    likes:56,
    user:{name:'user',id:'01'}
    }

    const { container } = render(<Blog blog={blog} currentUser={{id:'01'}} />)

    const defaultStyle = container.querySelector('.blogDetails').getAttribute('style')
    
    expect(defaultStyle).toBe(`display: none;`)

})

test('blogs url and number of likes are shown when button is clicked', async () => {
    const blog = {
    title:"Bosco-Fahey",
    author:"Darrick Palffrey",
    url:"blinklist.com",
    likes:56,
    user:{name:'user',id:'01'}
    }

    const mockHandler = jest.fn()

    const { container } = render(<Blog blog={blog} currentUser={{id:'01'}} toggleImportance={mockHandler}/>)
    container.querySelector('.blogDetails').setAttribute('style',`display:none`)
    screen.debug()

    const user = userEvent.setup()
    const button = container.querySelector('.showButton')

    await user.click(button)
    const defaultStyle = container.querySelector('.blogDetails').getAttribute('style')

    expect (defaultStyle).toBe('')
    
})