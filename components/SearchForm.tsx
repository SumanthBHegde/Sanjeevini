import Form from "next/form";
import SearchFormReset from "@/components/SearchFormReset";
import { Search } from "lucide-react";

const SearchForm = ({ query }: { query?: string }) => {
    return (
        <Form action="/plants" scroll={false} className="search-form max-w-md mx-auto relative flex items-center border-2 border-[var(--color-bg-accent)] rounded-full bg-white overflow-hidden">
            <input
                name="query"
                defaultValue={query}
                className="w-full py-3 px-5 outline-none border-none text-[var(--color-text-primary)]"
                placeholder="Search Plants"
            />

            <div className="flex gap-2 absolute right-2">
                {query && <SearchFormReset />}

                <button type="submit" className="bg-[var(--color-bg-accent)] text-white p-2 rounded-full hover:bg-opacity-90 transition-colors flex items-center justify-center">
                    <Search className="h-5 w-5" />
                </button>
            </div>
        </Form>
    )
}

export default SearchForm
