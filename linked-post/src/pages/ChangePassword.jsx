import { Button, Input } from "@heroui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PasswordSchema } from "../Schemas/PasswordSchema";
import { sendLoginData , sendPassword }from "../services/authServices";

export default function ChangePassword() {
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      newpassword: "",
    },
    resolver: zodResolver(PasswordSchema),
    mode: "onBlur",
    reValidateMode: "onBlur",
  });

  async function onSubmit(data) {
    const loginResponse = {
      email: data.email,
      password: data.password,
    };

    setLoading(true);
    const response = await sendLoginData(loginResponse);
    if (response.message) {
      console.log(response.token);
      const PassResponse = await sendPassword(data.password , data.newpassword , response.token );

      if (PassResponse.message) {
        setApiError(PassResponse.message);
        return setLoading(false);
      }else{
        setApiError(PassResponse.message);
        return setLoading(false);
      }

    } else {
      setApiError(response);
      return setLoading(false)
    }
  }

  return (
    <div className="bg-white py-10 px-6 shadow-2xl rounded-2xl min-w-[400px] ">
      <h1 className="text-center uppercase font-bold text-2xl ">
        Change Password
      </h1>
      <form
        className="flex flex-col gap-4 mt-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          isInvalid={Boolean(errors.email)}
          errorMessage={errors.email?.message}
          type="email"
          label="Email"
          {...register("email")}
        />
        <Input
          isInvalid={Boolean(errors.password)}
          errorMessage={errors.password?.message}
          type="password"
          label="Password"
          {...register("password")}
        />
        <Input
          isInvalid={Boolean(errors.newpassword)}
          errorMessage={errors.newpassword?.message}
          type="password"
          label="New Password"
          {...register("newpassword")}
        />
        <Button
          isLoading={loading}
          color="default"
          variant="ghost"
          type="submit"
          className="my-0 capitalize"
        >
          Change password
        </Button>
        {apiError.length > 8 ? <p className="text-red-500 text-center">{apiError}</p> :
        <p className="text-green-500 text-center">{apiError}</p> }
        <p className="text-center text-gray-500 mt-0">
          <a href="/login" className="text-blue-500 hover:underline capitalize">
            login
          </a>
        </p>
      </form>
    </div>
  );
}
