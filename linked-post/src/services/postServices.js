import axios from "axios";

export async function getAllPostsApi() {

   try{
     const {data} = await axios.get('https://linked-posts.routemisr.com/posts?limit=10' , {
        headers : {
            token: localStorage.getItem('token')
        }
    })
    return data;
   }catch (error) {
    console.log(error);
   }
}

export async function getSinglePostApi(postId) {

   try{
     const {data} = await axios.get('https://linked-posts.routemisr.com/posts/'+ postId , {
        headers : {
            token: localStorage.getItem('token')
        }
    })
    return data;
   }catch (error) {
    console.log(error);
   }
}