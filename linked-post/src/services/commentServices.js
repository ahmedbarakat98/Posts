import axios from "axios";

export async function createCommentApi(commentContent , postId) {
    try {
        const {data} = await axios.post('https://linked-posts.routemisr.com/comments', {
            content : commentContent ,
            post : postId
        } ,{
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