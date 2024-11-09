"use server";
import { z } from "zod";
import { v4 as uuid } from "uuid"
import pool from "@/lib/db";
import bcrypt from "bcryptjs"
// import { redirect } from "next/navigation";



const signupSchema = z.object({
    name: z.string().trim().min(3, { message: "Name must be larger than 3 characters" }),
    email: z.string().email({ message: "Invalid email address" }),
    phone: z.string().min(10, { message: "Phone number must be at least 10 digits" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters" })
})

export async function signup(prevState: unknown, formData: FormData) {
    const res = signupSchema.safeParse(Object.fromEntries(formData));
    if (!res.success) {
        return {
            errors: res.error.flatten().fieldErrors,
        };
    }
    const { name, email, phone, password } = res.data;

    const hashedPassword = await bcrypt.hash(password, 10);

    console.log("password",hashedPassword)

    const userData = {
        id: uuid(),
        name,
        email,
        phone,
        hashedPassword
    }

    const db_res = await pool.query('INSERT INTO users (id, name, email, phone, password) VALUES ($1, $2, $3, $4, $5)', [userData.id, userData.name, userData.email, userData.phone, userData.hashedPassword])

    console.log(db_res)

}