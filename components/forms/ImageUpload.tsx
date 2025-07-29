"use client";

import Image from "next/image";
import { CldUploadWidget, CloudinaryUploadWidgetResults } from "next-cloudinary";

interface ImageUploadProps {
    imageUrl: string;
    onImageUpload: (result: CloudinaryUploadWidgetResults) => void;
    onClearImage: () => void;
    label?: string;
}

export const ImageUpload = ({
    imageUrl,
    onImageUpload,
    onClearImage,
    label = "PLANT IMAGE"
}: ImageUploadProps) => {
    return (
        <div>
            <label className="form_label">{label}</label>
            <div className="mt-2 flex flex-col items-center space-y-4">
                {imageUrl ? (
                    <div className="w-full max-w-md relative h-64 mb-4">
                        <Image
                            src={imageUrl}
                            alt="Plant image"
                            fill
                            className="object-cover rounded-md"
                        />
                        <button
                            type="button"
                            onClick={onClearImage}
                            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600 transition-colors"
                            aria-label="Remove image"
                        >
                            ×
                        </button>
                    </div>
                ) : (
                    <div className="w-full max-w-md border-2 border-dashed border-gray-300 rounded-md p-8 text-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="mx-auto h-12 w-12 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1}
                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                        </svg>
                        <p className="mt-2 text-sm text-gray-600">Upload a high-quality image of the plant</p>
                    </div>
                )}

                <CldUploadWidget
                    uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "sanjeevini_plants"}
                    onSuccess={onImageUpload}
                >
                    {({ open }) => (
                        <button
                            type="button"
                            onClick={() => open()}
                            className="bg-[var(--color-bg-accent-light)] text-[var(--color-bg-accent)] font-medium py-2 px-4 rounded-md hover:bg-[var(--color-bg-accent)] hover:text-white transition-colors"
                        >
                            {imageUrl ? "Replace Image" : "Upload Image"}
                        </button>
                    )}
                </CldUploadWidget>
            </div>

            {/* Hidden input field to store the image URL */}
            <input
                type="hidden"
                id="mainImage"
                name="mainImage"
                value={imageUrl}
            />
        </div>
    );
};
