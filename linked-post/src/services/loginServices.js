import axios from "axios";
import { a } from "framer-motion/client";

export default async function sendLoginData(userData) {
    try {
        let {data} = await axios.post("https://linked-posts.routemisr.com/users/signin", userData);
        return data;
    } catch (error) {
        return error.response.data.error;
    }
}