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
    website: z.string()
        .trim()
        .url({ message: "Invalid website URL" })
        .optional()
        .nullable(),
    description: z.string()
        .trim()
        .min(10, { message: "Description must be at least 10 characters" })
        .max(1000, { message: "Description is too long" }),
    facebook: z.string()
        .trim()
        .url({ message: "Invalid Facebook URL" })
        .optional()
        .nullable(),
    linkedin: z.string()
        .trim()
        .url({ message: "Invalid LinkedIn URL" })
        .optional()
        .nullable(),
    twitter: z.string()
        .trim()
        .url({ message: "Invalid Twitter URL" })
        .optional()
        .nullable(),
    instagram: z.string()
        .trim()
        .url({ message: "Invalid Instagram URL" })
        .optional()
        .nullable(),
    password: z.string()
        .min(8, { message: "Password must be at least 8 characters" })
        .max(72, { message: "Password is too long" })
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/, {
            message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
        })
});

type SignupResponse = {
    errors?: {
        name?: string[];
        email?: string[];
        phone?: string[];
        website?: string[];
        description?: string[];
        facebook?: string[];
        linkedin?: string[];
        twitter?: string[];
        instagram?: string[];
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

        const { name, email, phone, password, description, website, facebook, linkedin, twitter, instagram } = res.data;

        const existingUser = await pool.query(
            'SELECT id FROM users WHERE email = $1 OR phone = $2 LIMIT 1',
            [email, phone.replace(/\s+/g, '')]
        );

        if (existingUser.rows.length > 0) {
            return {
                errors: {
                    _form: ["Email or phone number already registered"]
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

        const companiesData = {
            id: uuid(),
            website: website || null,
            description,
            facebook: facebook || null,
            linkedin: linkedin || null,
            twitter: twitter || null,
            instagram: instagram || null
        }

        const client = await pool.connect();
        try {
            await client.query('BEGIN');

            await client.query(
                `INSERT INTO users (id, name, email, phone, password, role, created_at) 
                 VALUES ($1, $2, $3, $4, $5, $6, CURRENT_TIMESTAMP)`,
                [userData.id, userData.name, userData.email, userData.phone, userData.hashedPassword, 'company']
            );

            await client.query(
                `INSERT INTO companies (id, user_id, website, description, facebook_url, linkedin_url, twitter_url, instagram_url)
                  VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
                [companiesData.id, userData.id, companiesData.website, companiesData.description,
                companiesData.facebook, companiesData.linkedin, companiesData.twitter, companiesData.instagram]
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
