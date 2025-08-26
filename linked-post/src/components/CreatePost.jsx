import { Button, Spinner, Textarea } from "@heroui/react";
import { useEffect, useMemo, useState } from "react";
import { createPostApi, getAllPostsApi } from "../services/postServices";

export default function CreatePost({callback}) {
  const [postText, setpostText] = useState("");
  const [img, setImg] = useState(null);
  const [imgUrl, setImgUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  
   

  async function crPost(e) {
    setLoading(true)
    e.preventDefault()
    const formData = new FormData();
    {postText && formData.append('body' , postText);}
    {img && formData.append('image' , img)}
    
    const response = await createPostApi(formData);
    if (response.message) {
      await callback();
      setpostText('');
      setImg('');  
      setImgUrl(''); }else{
        setLoading(false)
      }
    setLoading(false)
  }

  

  function handleImage(e) {
    setImg(e.target.files[0]);
    setImgUrl( URL.createObjectURL(e.target.files[0]))
    e.target.value = '';
  }

  return (
    <>
      <form onSubmit={crPost} className=" bg-gray-200 relative rounded-2xl my-4 p-3 flex flex-wrap justify-between items-center">
        <Textarea
          placeholder="Create Post Now ..."
          className="w-full mb-3"
          value={postText}
          onChange={(e) => setpostText(e.target.value)}
        />
        {imgUrl && <div className=" relative w-full mb-3">
          <img src={imgUrl} alt="photo" />
          <svg
            onClick={()=>setImgUrl('')}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6 absolute top-2 right-2 cursor-pointer"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </div>}
        <div>
          <label htmlFor="file" className="cursor-pointer hover:text-blue-400">
            <input type="file" onChange={(e)=>handleImage(e)} name="file" id="file" className="hidden" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6 ms-3 "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg>
          </label>
        </div>
        <Button type="submit" className="text-blue-500 border-blue-500" variant="ghost">
          {" "}
          Add Post{" "}
        </Button>
        {loading && <div className="absolute inset-0 bg-black/25 rounded-2xl flex justify-center items-center ">
        <Spinner></Spinner>        
        </div>}
        
      </form>
      
    </>
  );
}
