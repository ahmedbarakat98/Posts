import { Button, Input, Select, SelectItem } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { p, path } from "framer-motion/client";
import sendRegisterData from "../services/authServices";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { schema } from "../Schemas/SighupSchema";

const gender = [
  { key: "male", label: "male" },
  { key: "female", label: "female" },
];

export default function Register() {

  const [loading, setLouding] = useState(false);
  const [apiError, setApiError] = useState(null);
  const nav = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      dateOfBirth: "",
      gender: "",
    },
    resolver: zodResolver(schema),
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  async function onSubmit(data) {
    setLouding(true);
    const response = await sendRegisterData(data);
    setLouding(false);
    if (response.message) {
      nav("/login");
    }else{
      setApiError(response);
    }
  }

  return <>
      <div className="bg-white py-10 px-6 shadow-2xl rounded-2xl min-w-md ">
        <h1 className="text-center uppercase font-bold text-2xl ">
          Register Now
        </h1>
        <form
          className="flex flex-col gap-4 mt-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            isInvalid={Boolean(errors.name)}
            errorMessage={errors.name?.message}
            {...register("name", { required: "Name is Required" })}
            label="Name"
            type="text"
          />
          <Input
            isInvalid={Boolean(errors.email)}
            errorMessage={errors.email?.message}
            {...register("email", { required: "Email is Required" })}
            label="Email"
            type="email"
          />
          <Input
            isInvalid={Boolean(errors.password)}
            errorMessage={errors.password?.message}
            {...register("password", { required: "Password is Required" })}
            label="Password"
            type="password"
          />
          <Input
            isInvalid={Boolean(errors.rePassword)}
            errorMessage={errors.rePassword?.message}
            {...register("rePassword", { required: "RePassword is Required" })}
            label="RePassword"
            type="password"
          />
          <div className="flex gap-3">
            <Input
              isInvalid={Boolean(errors.dateOfBirth)}
              errorMessage={errors.dateOfBirth?.message}
              {...register("dateOfBirth", {
                required: "Date of Birth is Required",
              })}
              label="Date Of Birth"
              type="date"
            />
            <Select
              className="max-w-screen"
              {...register("gender", { required: "Gender is Required" })}
              isInvalid={Boolean(errors.gender)}
              errorMessage={errors.gender?.message}
              label="Gender"
            >
              {gender.map((gender) => (
                <SelectItem key={gender.key}>{gender.label}</SelectItem>
              ))}
            </Select>
          </div>
          <Button color="default" variant="ghost" type="submit" className="my-0 capitalize">
            Register
          </Button>
          {apiError && <p className="text-center text-red-500">{apiError}</p>}
          <p className="text-center text-gray-500 mt-0">
            Already have an account?{"  "}
            <a href="/login" className="text-blue-500 hover:underline">
              Login Now
            </a>
          </p>
        </form>
      </div>
    </>
}
