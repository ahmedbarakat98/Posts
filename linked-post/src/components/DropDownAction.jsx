import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
import { deleteComment } from "../services/commentServices";
import { deletePost } from "../services/postServices";

export default function DropDownAction({ commentId, postId , commentContent , setIsUpdating , setHandelEdit}) {

  async function deleteC(commentId , postId) {
    if (commentId) {
      
    const commentResponse = await deleteComment(commentId);
    if (commentResponse.message) {
    window.location.reload()
    }
    console.log(response); 
      
    }else{
      const PostResponse = await deletePost(postId);
    if (PostResponse.message) {
      
    window.location.reload()
    }
    console.log(response); 


    }
       
  }
  async function editComment(commentId , commentContent) {

    
  }
  

  return <>
      <Dropdown>
        <DropdownTrigger>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6 me-4 text-gray-500 outline-0"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
            />
          </svg>
        </DropdownTrigger>
        <DropdownMenu aria-label="Static Actions">
          <DropdownItem key="edit"
          onClick={() => {
              setIsUpdating(true);
            }}          
          >Edit</DropdownItem>
          <DropdownItem
            key="delete"
            onClick={() => {
              deleteC(commentId, postId);
            }}
            className="text-danger"
            color="danger"
          >
            Delete
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </>
}
