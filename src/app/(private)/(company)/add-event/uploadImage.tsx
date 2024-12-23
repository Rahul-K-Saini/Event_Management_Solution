"use client";
import { useRef } from "react";
import { Input } from "@/components/ui/input";

export function ImageUpload() {
  const inputRef = useRef(null);

  return (
    <div>
      <label className="text-sm font-medium block mb-2">Event Image</label>
      <Input
        ref={inputRef}
        type="file"
        className="hidden"
        accept="image/*"
      />
      <div
        onClick={() => inputRef.current?.click()}
        className="h-[500px] cursor-pointer border-dashed border-4 flex justify-center items-center w-full bg-gray-600"
      >
        <p className="text-white">Upload Image</p>
      </div>
    </div>
  );
}
