import axios from "axios";

export async function getAllPostsApi() {

   try{
     const {data} = await axios.get('https://linked-posts.routemisr.com/posts?limit=10' , {
        headers : {
            token: localStorage.getItem('token')
        },
        params: {
            limit : 10 ,
            sort : '-createdAt'
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

export async function createPostApi(formData) {

   try{
     const {data} = await axios.post('https://linked-posts.routemisr.com/posts?limit=10' , formData , {
        headers : {
            token: localStorage.getItem('token')
        }
    })
    console.log(data);
    return data;
   }catch (error) {
    console.log(error);
   }
}

export async function getUserPostsApi() {

   try{
     const {data} = await axios.get('https://linked-posts.routemisr.com/users/664bcf3e33da217c4af21f00/posts' , {
        headers : {
            token: localStorage.getItem('token')
        }
    })
    console.log(data);
    return data;
    
   }catch (error) {
    console.log(error);
   }
}

export async function deletePost(PosttId) {
    try {
        const {data} = await axios.delete('https://linked-posts.routemisr.com/posts/'+PosttId,{
            headers : {
                token : localStorage.getItem('token')
            }
        })
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);   
    }
}

export async function updatePost(PosttId , updatedformData) {
    try {
        const {data} = await axios.put('https://linked-posts.routemisr.com/posts/'+PosttId,
            updatedformData            
            ,{
            headers : {
                token : localStorage.getItem('token')
            }
        })
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);   
    }
}