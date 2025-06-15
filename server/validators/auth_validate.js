const { z } = require("zod");

const signUpSchema = z.object({
  username: z
    .string({ required_error: "Username is required" })
    .trim()
    .min(3, { message: "Username must be at least 3 characters" })
    .max(255, { message: "Username must not exceed 255 characters" }),

  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid email format" }),

  phone: z
    .string({ required_error: "Phone number is required" })
    .trim()
    .min(10, { message: "Phone number must be at least 10 characters" })
    .max(20, { message: "Phone number must not exceed 20 characters" }),

  password: z
    .string({ required_error: "Password is required" })
    .trim()
    .min(6, { message: "Password must be at least 6 characters" })
    .max(20, { message: "Password must not exceed 20 characters" }),

   role: z.enum(["admin", "user", "content creator"], {
      required_error: "Role is required",
    }),

    userType: z
      .string()
      .trim()
      .refine(
        (val) => ["buyer", "tenant", "owner", ""].includes(val || ""),
        { message: "Invalid userType" }
      ),
});

module.exports = signUpSchema;
