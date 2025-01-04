"use server";

import { z } from "zod";
import { pinata } from "@/lib/pinata";
import pool from "@/utils/db";
import { getUser } from "@/lib/dal";

export const handleUploadImage = async (file: File | null) => {
  if (!file) {
    throw new Error("No image file provided");
  }

  const res = await pinata.upload.file(file);
  const url = await pinata.gateways.createSignedURL({
    cid: res.cid,
    expires: 3600,
  });

  return url;
};

const formSchema = z.object({
  title: z.string().min(1, "Title is required").max(255),
  description: z.string().min(1, "Description is required"),
  event_date: z.string()
    .min(1, "Event date is required")
    .refine((date) => new Date(date) > new Date(), {
      message: "Event date must be in the future"
    }),
  location: z.string().min(1, "Location is required").max(255),
  status: z.enum(["DRAFT", "PUBLISHED", "CANCELLED"]),
  image: z.any(),
});

export const createEvent = async (initialState: unknown, formData: FormData) => {
  try {
    const rawFormData = {
      title: formData.get("title"),
      description: formData.get("description"),
      event_date: formData.get("event_date"),
      location: formData.get("location"),
      status: formData.get("status"),
      image: formData.get("image"),
    };

    const validationResults = formSchema.safeParse(rawFormData);

    if (!validationResults.success) {
      throw new Error(validationResults.error.errors[0].message);
    }

    const validatedData = validationResults.data;
    const user = await getUser();

    const userResult = await pool.query(
      "SELECT id FROM users WHERE email = $1",
      [user.email]
    );

    if (!userResult.rows.length) {
      throw new Error("User not found");
    }

    const userId = userResult.rows[0].id;
    const imageUrl = await handleUploadImage(validatedData.image);

    const query = `
      INSERT INTO events (title, description, event_date, location, status, image, created_by)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING id
    `;

    const values = [
      validatedData.title,
      validatedData.description,
      validatedData.event_date,
      validatedData.location,
      validatedData.status.toLowerCase(),
      imageUrl,
      userId,
    ];

    const result = await pool.query(query, values);

    return {
      success: true,
      data: result.rows[0],
      errors: null
    };
  } catch (error: any) {
    console.error(error.message);
    return {
      success: false,
      data: null,
      errors: error instanceof Error ? error.message : "An unknown error occurred"
    };
  }
};
