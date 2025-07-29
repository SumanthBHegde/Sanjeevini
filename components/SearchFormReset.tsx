"use client"

import { X } from "lucide-react";

const SearchFormReset = () => {
    const reset = () => {
        const form = document.querySelector('.search-form') as HTMLFormElement;
        if (form) form.reset();
    }

    return (
        <button
            type="reset"
            onClick={reset}
            className="bg-gray-200 text-gray-700 p-2 rounded-full hover:bg-gray-300 transition-colors flex items-center justify-center"
        >
            <X className="h-4 w-4" />
        </button>
    )
}

export default SearchFormReset
