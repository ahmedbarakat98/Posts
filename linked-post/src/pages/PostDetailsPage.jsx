import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getSinglePostApi } from '../services/postServices';
import Card from "../components/Card";
import Loading from '../components/Loading';

export default function PostDetailsPage() {

  let {id} = useParams();

  // const {data : post} = useGet(getSinglePostApi(id))


  const [post, setPost] = useState(null)

  async function getPost() {
    const response = await getSinglePostApi(id);
    if (response.message) {
      setPost(response.post);        
      }
  }    
  

  useEffect(()=>{
    getPost()
  } , [])
  
  
  return <>

  <div className='w-8/12 md:w-4/12  mx-auto'>

  {post?<Card post={post} commetLimit={post.comments.length} />  : <Loading /> }

  </div>

  

  
  </>
};
