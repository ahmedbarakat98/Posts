import axios from "axios";
import { ca, tr } from "zod/locales";

export default async function sendRegisterData(userData) {
    try {
        let {data} = await axios.post("https://linked-posts.routemisr.com/users/signup", userData)
        return data;
    }catch (error) {
        return error.response.data.error;
    }
}

export async function sendLoginData(userData) {
    try {
        let {data} = await axios.post("https://linked-posts.routemisr.com/users/signin", userData);
        return data;
    } catch (error) {
        return error.response.data.error;
    }
}

export  async function sendPassword(password , newPassword , logToken) {
    try {
        let {data} = await axios.patch("https://linked-posts.routemisr.com/users/change-password" , {
            password : password ,
            newPassword : newPassword
        }
        ,{
            headers: {
                token : logToken,
            }
        })
        return data;        
    }catch (error) {
        return error;
    }
}
    