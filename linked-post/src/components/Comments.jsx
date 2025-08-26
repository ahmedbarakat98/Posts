import React, { useContext } from "react";
import User from "./User";
import { AuthContext } from "../contexts/AuthContext";
import UnKnownPhoto from "../assets/UnKnown_person.jpg";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
import DropDownAction from "./DropDownAction";

export default function Comments({ post, comment }) {
  const { userData } = useContext(AuthContext);
  

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex items-center px-4 py-3">
          <img
            className="h-8 w-8 rounded-full"
            onError={(e) => (e.target.src = UnKnownPhoto)}
            src={comment.commentCreator.photo}
            alt={comment.commentCreator.name}
          />
          <div className="ml-3 ">
            <span className="text-sm font-semibold antialiased block leading-tight">
              {comment.commentCreator.name}
            </span>
            <span className="text-sm antialiased block leading-tight">
              {comment.createdAt.split(".", 1).join().replace("T", " ")}
            </span>
          </div>
        </div>
        {userData._id === post.user._id &&
          userData._id === comment.commentCreator._id && <DropDownAction commentId={comment._id} />}
      </div>
      <div className="px-4">
        <p>{comment.content}</p>
      </div>
    </>
  );
}
