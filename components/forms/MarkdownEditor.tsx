"use client";

import dynamic from "next/dynamic";
import { useState, useEffect, useMemo } from "react";

// Import the markdown editor dynamically to prevent SSR issues
const SimpleMdeEditor = dynamic(() => import("react-simplemde-editor"), {
    ssr: false
});

// Import the styles for the markdown editor
import "easymde/dist/easymde.min.css";

interface MarkdownEditorProps {
    value: string;
    onChange: (value: string) => void;
    label?: string;
    placeholder?: string;
    helperText?: string;
    required?: boolean;
}

export const MarkdownEditor = ({
    value,
    onChange,
    label = "DETAILED DESCRIPTION (MARKDOWN)",
    placeholder = "Write a detailed description with markdown formatting...",
    helperText = "Use markdown formatting for rich text. Support for headings (#), bold (**), italic (*), lists, etc.",
    required = false
}: MarkdownEditorProps) => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    // Memoize the options to prevent re-renders
    const editorOptions = useMemo(() => ({
        placeholder,
        spellChecker: false,
        autofocus: false,
        status: false,
        toolbar: [
            "bold", "italic", "heading", "|",
            "quote", "unordered-list", "ordered-list", "|",
            "link", "image", "|",
            "preview", "side-by-side", "fullscreen", "|",
            "guide"
        ] as const
    }), [placeholder]);

    if (!isClient) {
        return (
            <div>
                <label className="form_label">
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
                <div className="border border-gray-300 rounded-md p-4 bg-gray-50">
                    <p className="text-gray-500">Loading editor...</p>
                </div>
            </div>
        );
    }

    return (
        <div>
            <label className="form_label">
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <div className="border border-gray-300 rounded-md overflow-hidden">
                <SimpleMdeEditor
                    value={value}
                    onChange={onChange}
                    options={editorOptions}
                />
            </div>
            {helperText && (
                <p className="body-text-secondary text-xs mt-1">{helperText}</p>
            )}
        </div>
    );
};
