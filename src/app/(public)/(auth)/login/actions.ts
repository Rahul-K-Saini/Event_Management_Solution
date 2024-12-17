"use server";

import { z } from "zod";
import { createSession, deleteSession } from "@/lib/sessions";
import { redirect } from "next/navigation";
import pool from "@/utils/db";
import bcrypt from "bcryptjs"

const loginSchema = z.object({
  email: z.string().trim()
    .toLowerCase()
    .email({ message: "Invalid email address" })
    .max(255, { message: "Email is too long" }),
  password: z
    .string()
    .trim()
    .max(72, { message: "Password is too long" })
});

export async function login(prevState: unknown, formData: FormData) {
  const result = loginSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const { email, password } = result.data;

  const query_res = await pool.query('SELECT id,password FROM users WHERE email = $1 LIMIT 1', [email]);

  if (query_res.rowCount == null) {
    return {
      error: {
        email: ["Please register first to sign in"]
      }
    }
  }

  const userData = query_res.rows[0]

  const isPasswordMatched = await bcrypt.compare(password, userData.password);

  if (!isPasswordMatched) {
    return {
      errors: {
        email: ["Please enter correct password"],
      },
    };
  }

  await createSession(userData.id);

  redirect("/dashboard");
}

export async function logout() {
  await deleteSession();
  redirect("/login");
}
