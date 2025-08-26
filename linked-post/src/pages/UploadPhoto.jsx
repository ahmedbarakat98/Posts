import { Button, Input } from "@heroui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { sendLoginData , sendProfilePhoto }from "../services/authServices";
import { uploadSchema } from "../Schemas/uploadPhotoSchema";

export default function UploadPhoto() {
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const [img, setImg] = useState('');

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: ""
    },
    resolver: zodResolver(uploadSchema),
    mode: "onBlur",
    reValidateMode: "onBlur",
  });

  async function onSubmit(data) {
    const loginResponse = {
      email: data.email,
      password: data.password,
    };

    let formData = new FormData();
    formData.append('photo' , img);

    setLoading(true);
    const response = await sendLoginData(loginResponse);
    if (response.message) {
      console.log(response.token);
      const PhotoResponse = await sendProfilePhoto( formData , response.token );

      if (PhotoResponse.message) {
        setApiError(PhotoResponse.message);
        return setLoading(false);
      }else{
        setApiError(PhotoResponse.message);
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
        Upload Your Photo
      </h1>
      <form
        className="flex flex-col gap-4 mt-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        
        <Input
          isInvalid={Boolean(errors.email)}
          errorMessage={errors.email?.message}
          type="email"
          label="Email "
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
          required
          type="file"
          label="Upload Photo"
          onChange={(e)=>{setImg(e.target.files[0])}}
        />
        <Button
          isLoading={loading}
          color="default"
          variant="ghost"
          type="submit"
          className="my-0 capitalize"
        >
          Upload Now
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
