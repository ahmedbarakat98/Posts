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

export async function deleteComment(commentId) {
    try {
        const {data} = await axios.delete('https://linked-posts.routemisr.com/comments/'+commentId,{
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

export async function updateComment(commentId , updatedformData) {
    try {
        const {data} = await axios.put('https://linked-posts.routemisr.com/comments/'+commentId,
            {
                content : updatedformData
            }            
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