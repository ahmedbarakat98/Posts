import { Button, Input } from "@heroui/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import sendLoginData from "../services/loginServices";
import z, { set } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../Schemas/LoginSchema";
import { useNavigate } from "react-router-dom";

export default function login() {

  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  const nav = useNavigate();

  const {handleSubmit , register , formState:{errors}} = useForm({
    defaultValues: {
      email: "",
      password: "",}
      , resolver: zodResolver(loginSchema)
      , mode: "onBlur"
      , reValidateMode: "onBlur"
    });

    async function onSubmit(data) {
      setLoading(true);
      const response = await sendLoginData(data);   
      setLoading(false);   
      if (response.message) {
      nav("/");
      console.log(response);
      localStorage.setItem("token", response.token);
      
    }else{
      setApiError(response);
    }
      
    }

  return <>
      <div className="bg-white py-10 px-6 shadow-2xl rounded-2xl min-w-md ">
        <h1 className="text-center uppercase font-bold text-2xl ">
          Login Now
        </h1>
        <form className="flex flex-col gap-4 mt-6" onSubmit={handleSubmit(onSubmit)}>
          <Input type="email" label="Email" {...register("email")}></Input>
          <Input type="password" label="Password" {...register("password")}></Input>
          <Button isLoading={loading} color="default" variant="ghost" type="submit" className="my-0 capitalize">
            Sign in
          </Button>
          {apiError && <p className="text-center text-red-500">{apiError}</p>}
          <p className="text-center text-gray-500 mt-0">
            You Dont have an account?{"  "}
            <a href="/register" className="text-blue-500 hover:underline capitalize">
              Register Now
            </a>
          </p>
        </form>
      </div>
    </>
}
