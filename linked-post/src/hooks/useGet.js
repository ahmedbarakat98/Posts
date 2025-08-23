import React, { useEffect, useState } from 'react'
import { getAllPostsApi } from '../services/postServices';

export default function useGet(func) {

     const [data, setData] = useState([])
    
      async function getData() {
        const response = await func;
        setData(response.data)
        console.log(response.data);
        
      }
    
      useEffect(() => {
        getData();
      }, []);

  return {data}
}
