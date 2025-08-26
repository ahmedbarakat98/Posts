import React from 'react';
import Modal from './Modal';

export default function PostBody({img , body}) {
  return <>


  {img && <div className="w-full relative" >
    <Modal img={img} body={body} />    
    <img className='w-full' src={img} alt="pic" /></div>}
  {body && <p className="p-3.5">{body}</p>}
  
  
  </>
}
