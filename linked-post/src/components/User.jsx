import React from 'react';
import UnKnownPhoto from '../assets/UnKnown_person.jpg'

export default function User({post}) {
  return <>

  <div className="flex items-center px-4 py-3">
        <img
          className="h-8 w-8 rounded-full"
          onError={(e)=> e.target.src = UnKnownPhoto }
          src={post.user?post.user.photo : post.commentCreator.name}
          alt={post.user?post.user.name:post.commentCreator.name}
        />
        <div className="ml-3 ">
          <span className="text-sm font-semibold antialiased block leading-tight">
            {post.user?post.user.name:post.commentCreator.name}
          </span>
          <span className="text-sm antialiased block leading-tight">
            {post.createdAt.split('.',1).join().replace('T' , ' ')}
          </span>
        </div>        
      </div>   
      
  
  
  
  </>
}
