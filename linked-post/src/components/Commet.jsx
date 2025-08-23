import React from 'react'
import User from './User'

export default function Commet({post}) {
  return <>

  <div className='mb-3 rounded-2xl '>
    
  <User post={post} />
  <p className='px-3'>{post.content && post.content}</p>


  </div>

  
  
  </>
}
