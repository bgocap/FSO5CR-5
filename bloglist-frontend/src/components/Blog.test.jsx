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

    const { container } = render(<Blog blog={blog} currentUser={{id:'01'}} />)

    const defaultStyle = container.querySelector('.blogDetails').getAttribute('style')
    
    expect(defaultStyle).toBe(`display: none;`)
    
})
/*
test('blogs url and number of likes are shown when button is clicked', () => {
    const blog = {
    title:"Bosco-Fahey",
    author:"Darrick Palffrey",
    url:"blinklist.com",
    likes:56,
    user:{name:'user',id:'01'}
    }

    const { container } = render(<Blog blog={blog} currentUser={{id:'01'}} />)
    container.querySelector('.blogDetails').setAttribute('style',`display:none`)
    screen.debug()

    //const element = screen.toBe('Bosco-Fahey by Darrick Palffrey ')
    const div = container.querySelector('.blogDetails')
    expect(div).not.toBeInTheDocument()
    /* 
    expect(div).toHaveTextContent('blinklist.comLikes : 56 likeUser: userdelete') 
    
})*/