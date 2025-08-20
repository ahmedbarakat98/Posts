import * as zod from "zod";

export const schema = zod.object({
    name: zod.string().nonempty("Name is Required").min(3, "Name must be at least 3 characters long"),
    email: zod.string().nonempty("Email is Required").regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Email is not valid"),
    password: zod.string().nonempty("Password is Required").min(6, "Password must be at least 6 characters long"),
    rePassword: zod.string().nonempty("RePassword is Required").min(6, "RePassword must be at least 6 characters long"),
    dateOfBirth: zod.coerce.date("Date is Required").refine((value)=> 
    {const userAge = value.getFullYear();
      const currentYear = new Date().getFullYear();
      return currentYear - userAge >= 18;
    },"Age must be at least 18"
  ),
    gender:zod.string().nonempty("Choose your Gender")  
  }).refine((data) => data.password === data.rePassword, {
  path: ["rePassword"],
  message: "Passwords must match",});