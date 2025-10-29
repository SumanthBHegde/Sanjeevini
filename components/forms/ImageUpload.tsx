"use client";

import Image from "next/image";
import { useState, useRef } from "react";

interface ImageUploadProps {
    imageUrl: string;
    onImageUpload: (url: string) => void;
    onClearImage: () => void;
    label?: string;
}

export const ImageUpload = ({
    imageUrl,
    onImageUpload,
    onClearImage,
    label = "PLANT IMAGE"
}: ImageUploadProps) => {
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith('image/')) {
            alert('Please upload an image file');
            return;
        }

        // Validate file size (max 10MB)
        if (file.size > 10 * 1024 * 1024) {
            alert('File size must be less than 10MB');
            return;
        }

        setIsUploading(true);

        try {
            // Upload to Sanity
            const formData = new FormData();
            formData.append('file', file);

            const response = await fetch('/api/upload-image', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Upload failed');
            }

            const data = await response.json();
            onImageUpload(data.url);
        } catch (error) {
            console.error('Error uploading image:', error);
            alert('Failed to upload image. Please try again.');
        } finally {
            setIsUploading(false);
        }
    };

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
                        <p className="mt-1 text-xs text-gray-500">Max size: 10MB (JPG, PNG, WebP)</p>
                    </div>
                )}

                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                />

                <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                    className="bg-[var(--color-bg-accent-light)] text-[var(--color-bg-accent)] font-medium py-2 px-4 rounded-md hover:bg-[var(--color-bg-accent)] hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isUploading ? "Uploading..." : imageUrl ? "Replace Image" : "Upload Image"}
                </button>
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
