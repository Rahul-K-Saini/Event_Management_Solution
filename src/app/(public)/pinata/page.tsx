"use client";
import Image from "next/image";
import { useActionState } from "react";
import { uploadImage } from "./actions";

export default function Home() {
  const [state, upload_action, pending] = useActionState(
    uploadImage,
    undefined
  );
  console.log(state);
  return (
    <main className="w-full min-h-screen m-auto flex flex-col justify-center items-center">
      <form action={upload_action} className="flex flex-col gap-4">
        <input
          type="file"
          name="image"
          accept="image/*"
          className="border p-2 rounded"
          required
        />
        <button
          type="submit"
          disabled={pending}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {pending ? "Uploading..." : "Upload Image"}
        </button>
        {state?.url && <Image src={state?.url} width={500} height={300} alt="image" />}
      </form>
      {state?.error && <p className="text-red-500 mt-2">{state.error}</p>}
      {state?.success && (
        <p className="text-green-500 mt-2">Upload successful!</p>
      )}
    </main>
  );
}
