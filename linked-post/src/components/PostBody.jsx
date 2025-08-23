import React from 'react'

export default function PostBody({img , body}) {
  return <>


  {img && <img src={img} alt="pic" />}
  {body && <p className="p-3.5">{body}</p>}
  
  
  </>
}
