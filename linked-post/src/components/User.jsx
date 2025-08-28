import React, { useContext } from "react";
import UnKnownPhoto from "../assets/UnKnown_person.jpg";
import { AuthContext } from "../contexts/AuthContext";
import DropDownAction from "./DropDownAction";




export default function User({ post , setIsUpdating }) {

  const {userData}  = useContext(AuthContext);

  return <>
      <div className="flex justify-between items-center">
        <div className="flex items-center px-4 py-3">
          <img
            className="h-8 w-8 rounded-full"
            onError={(e) => (e.target.src = UnKnownPhoto)}
            src={ post.user?.photo}
            alt={ post.user?.name}
          />
          <div className="ml-3 ">
            <span className="text-sm font-semibold antialiased block leading-tight">
              {post.user ? post.user?.name : post.commentCreator.name}
            </span>
            <span className="text-sm antialiased block leading-tight">
              {post.createdAt?.split(".", 1).join().replace("T", " ")}
            </span>
          </div>
        </div>
         {userData._id === post.user?._id   &&
          <DropDownAction postId={post._id} setIsUpdating={setIsUpdating} />}
      </div>
    </>
}
