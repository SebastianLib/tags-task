import { Input } from "@/components/ui/input"
import { Search, X } from "lucide-react"
import { Dispatch, SetStateAction, useRef } from "react";

interface InputSearchProps{
    search: string | null;
    setSearch: Dispatch<SetStateAction<string | null>>
}

const InputSearch = ({search, setSearch}:InputSearchProps) => {  
    const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div className="w-full relative">
    <Search
      className="absolute left-0 top-[50%] translate-y-[-50%] text-gray-500 cursor-pointer"
      onClick={() => inputRef.current?.focus()}
    />
    <Input
      ref={inputRef}
      onChange={(e) => setSearch(e.target.value)}
      type="text"
      placeholder="Znajdź tag..."
      className="border-none pl-8"
    />
    {search && (
      <X
        className="absolute right-0 top-[50%] translate-y-[-50%] w-5 h-5 cursor-pointer text-gray-500"
        onClick={() => setSearch(null)}
      />
    )}
  </div>
  )
}

export default InputSearch