import * as zod from "zod";

export const PasswordSchema = zod
  .object({
    email: zod
      .string()
      .nonempty("Email is Required")
      .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Email is not valid"),
    password: zod
      .string()
      .nonempty("Password is Required")
      .min(6, "Password must be at least 6 characters long"),
    newpassword: zod
      .string()
      .nonempty("New Password is Required")
      .min(6, "Password must be at least 6 characters long"),
  })
  .refine((data) => data.password !== data.newpassword, {
    path: ["newpassword"],
    message: "New password must be different from old password",
  });
