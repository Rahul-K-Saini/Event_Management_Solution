"use server";

export const createEvent = async (formData: FormData
) => {
    return { success: "ji" ,error:"sdas"}
}

const formSchema = z.object({
  title: z.string().min(1, "Title is required").max(255),
  description: z.string().min(1, "Description is required"),
  event_date: z.string().min(1, "Event date is required"),
  location: z.string().min(1, "Location is required").max(255),
  status: z.enum(["DRAFT", "PUBLISHED", "CANCELLED"]),
});
