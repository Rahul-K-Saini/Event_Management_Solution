"use client";
import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import Image from "next/image";

export function ImageUpload() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [imageUrl, setImageUrl] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImageUrl(url);
    }
  };

  return (
    <div>
      <label className="text-sm font-medium block mb-2">Event Image</label>
      <Input
        ref={inputRef}
        type="file"
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
        name="image"
      />
      <div
        onClick={() => inputRef.current?.click()}
        className="h-[420px] cursor-pointer border-dashed border-4 flex justify-center items-center w-full "
      >
        {imageUrl ? (
          <Image src={imageUrl} alt="upload_image" width={500} height={500} objectFit="contain" />
        ) : (
          <p>Upload Image</p>
        )}
      </div>
    </div>
  );
}
