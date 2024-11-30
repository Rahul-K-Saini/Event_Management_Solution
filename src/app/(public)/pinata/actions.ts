"use server";
import { pinata } from "@/lib/pinata";

export const uploadImage = async (prevState: unknown, formData: FormData) => {
    try {
        const file = formData.get("image") as File;
        const uploadData = await pinata.upload.file(file)
        const url = await pinata.gateways.createSignedURL({ cid: uploadData.cid, expires: 36000 }).optimizeImage({ format: 'webp' });
        return { success: true, url };
    } catch (error) {
        return { success: false, error: (error as Error).message };
    }
}