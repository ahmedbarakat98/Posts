import { Button, Spinner, Textarea } from "@heroui/react";
import { useEffect, useMemo, useState } from "react";
import {
  createPostApi,
  getAllPostsApi,
  updatePost,
} from "../services/postServices";
import { fa } from "zod/v4/locales";

export default function CreatePost({callback , post , isUpdating , setIsUpdating }) {
  const [postBody, setPostBody] = useState( post?.body ?? '');
  const [img, setImg] = useState(null);
  const [imgUrl, setImgUrl] = useState(post?.image ?? '');
  const [loading, setLoading] = useState(false);

  async function urlToFile() {
    const response = await fetch(post?.image);
    const data = await response.blob();
    let file = new File([data] , 'image' , {type: 'image/jpg'});
    setImg(file)   
  }

  useEffect(() => {
    urlToFile()
  }, [])
  

  async function handelSubmit(e){
    e.preventDefault()
    setLoading(true)
    const formData = new FormData();
    formData.append('body' , postBody);
    formData.append('image' , img);
    let response ;
    {isUpdating ?
    response = await updatePost(post.id , formData) : response = await createPostApi(formData)}  
    if (response.message) {
      await callback()
      setLoading(false)
      setPostBody('')
      setImg('')
      setImgUrl('')
      setIsUpdating(false)
      
    }    
  }

  function handelImage(e){
    setImg(e.target.files[0]);
    setImgUrl(URL.createObjectURL(e.target.files[0]));
    e.target.value = '';
  }

  return (
    <>
      <form
        onSubmit={(e)=>handelSubmit(e)}
        className=" bg-gray-200 relative rounded-2xl max-w-md my-4 p-3 flex flex-wrap justify-between items-center"
      >
        <Textarea
          value={postBody}
          onChange={(e)=> setPostBody(e.target.value)}
          placeholder="Create Post Now ..."
          className="w-full mb-3"
        />
          {imgUrl && <div className=" relative w-full mb-3">
            <img src={imgUrl} alt="photo" />
            {/* close icon  */}
            <svg
              onClick={() => {
                setImgUrl("");
                setImg("");
              }}
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
            <input
              onChange={(e)=>handelImage(e)}
              type="file"
              name="file"
              id="file"
              className="hidden bg-amber-50"
            />
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
        {!post ? <Button
            type="submit"
            className="text-blue-500 border-blue-500"
            variant="ghost"
          >
            {" "}
            Add Post{" "}
          </Button> : 
        <div className="flex gap-1.5">
          <Button
            className="text-black border-black"
            variant="ghost"
          >
            {" "}
            Cancel{" "}
          </Button>
          <Button
            type="submit"
            className="text-blue-500 border-blue-500"
            variant="ghost"
          >
            {" "}
            edit Post{" "}
          </Button>
        </div>}
          {loading && <div className="absolute inset-0 bg-black/25 rounded-2xl flex justify-center items-center ">
            <Spinner></Spinner>
          </div>}
      </form>
    </>
  );
}
