"use server";
import { z } from "zod";
import { v4 as uuid } from "uuid";
import pool from "@/utils/db";
import bcrypt from "bcryptjs";


const signupSchema = z.object({
    name: z.string()
        .trim()
        .min(3, { message: "Name must be larger than 3 characters" })
        .max(100, { message: "Name is too long" })
        .regex(/^[a-zA-Z\s]*$/, { message: "Name can only contain letters and spaces" }),
    email: z.string().trim()
        .email({ message: "Invalid email address" })
        .toLowerCase()
        .max(255, { message: "Email is too long" }),
    phone: z.string().trim()
        .min(10, { message: "Phone number must be at least 10 digits" })
        .max(15, { message: "Phone number is too long" })
        .regex(/^\+?[\d\s-()]*$/, { message: "Invalid phone number format" }),
    password: z.string()
        .min(8, { message: "Password must be at least 8 characters" })
        .max(72, { message: "Password is too long" })
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
            message: "Password must contain at least one uppercase letter, one lowercase letter, and one number"
        })
});

type SignupResponse = {
    errors?: {
        name?: string[];
        email?: string[];
        phone?: string[];
        password?: string[];
        _form?: string[];
    };
    success?: boolean;
}

export async function signup(prevState: unknown, formData: FormData): Promise<SignupResponse> {
    try {
        const res = signupSchema.safeParse(Object.fromEntries(formData));
        if (!res.success) {
            return {
                errors: res.error.flatten().fieldErrors,
            };
        }

        const { name, email, phone, password } = res.data;

        const existingUser = await pool.query(
            'SELECT id FROM users WHERE email = $1 LIMIT 1',
            [email]
        );

        if (existingUser.rows.length > 0) {
            return {
                errors: {
                    email: ["Email already registered"]
                }
            };
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const userData = {
            id: uuid(),
            name: name.trim(),
            email: email.toLowerCase(),
            phone: phone.replace(/\s+/g, ''),
            hashedPassword
        };

        const client = await pool.connect();
        try {
            await client.query('BEGIN');

            await client.query(
                `INSERT INTO users (id, name, email, phone, password, role,  created_at) 
                 VALUES ($1, $2, $3, $4, $5, $6, CURRENT_TIMESTAMP)`,
                [userData.id, userData.name, userData.email, userData.phone, userData.hashedPassword, 'user']
            );

            await client.query('COMMIT');

            return { success: true };

        }
        catch (error) {
            await client.query('ROLLBACK');
            throw error;
        }
        finally {
            client.release();
        }
    }
    catch (error) {
        console.error('Signup error:', error);
        return {
            errors: {
                _form: ["An error occurred during signup. Please try again."]
            }
        };
    }
}