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