import React from 'react'
import User from './User'

export default function Commet({post , setIsUpdating}) {
  
  return <>

  <div className='mb-3 rounded-2xl '>
    
    
  <User post={post} setIsUpdating={setIsUpdating} />
  <p className='px-3'>{post.content}</p>


  </div>

  
  
  </>
}
