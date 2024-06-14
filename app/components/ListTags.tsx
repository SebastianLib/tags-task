import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { X } from "lucide-react";
import React, { Dispatch, SetStateAction, useState } from "react";
import InputSearch from "./InputSearch";

interface ListTagsProps {
  tags: string[];
  setIsOpen: Dispatch<SetStateAction<boolean | undefined>>;
}

const ListTags = ({ tags, setIsOpen }: ListTagsProps) => {
  const [search, setSearch] = useState<string | null>(null);
  const [checkedTags, setCheckedTags] = useState<string[]>([]);
  const [submitedTags, setSubmitedTags] = useState<string[]>([]);

  let searchedTags = tags.filter((t) => !submitedTags.includes(t));

  if (search) {
    searchedTags = searchedTags.filter((tag) =>
      tag.toLowerCase().includes(search.toLowerCase())
    );
  }
  let notSearchedTags = tags.filter((t) => !submitedTags.includes(t));
  notSearchedTags = notSearchedTags.filter(
    (tag) => !searchedTags.includes(tag)
  );
  const connectedTags = [...searchedTags, ...notSearchedTags];

  const handleTags = (tag: string) => {
    setCheckedTags((prev: string[]) => {
      if (prev.includes(tag)) {
        return prev.filter((currentTag) => currentTag !== tag);
      } else {
        return [...prev, tag];
      }
    });
  };

  return (
    <div className="p-8 bg-white border absolute flex flex-col gap-4 left-[120%] top-0 min-w-[350px] max-w-[350px]">
      <h2>Tagi</h2>
      <InputSearch search={search} setSearch={setSearch} />

      <div className="w-full border border-gray-100" />
      {search ? (
        <div className="space-y-4">
          <ul className="w-full space-y-2">
            {connectedTags.map((tag: string, index: number) => (
              <li
                key={index}
                className="flex gap-2 items-center"
                onClick={() => handleTags(tag)}
              >
                <Checkbox checked={checkedTags.includes(tag)} />
                {tag}
              </li>
            ))}
          </ul>
          <Button
            onClick={() => {
              setSubmitedTags((prev) => [...prev, ...checkedTags]);
              setSearch("");
              setCheckedTags([]);
            }}
            className="w-full bg-blue-500 text-white"
          >
            Zapisz
          </Button>
        </div>
      ) : (
        <div>
          <ul className="flex flex-wrap gap-2">
            {submitedTags.map((t) => (
              <li
                key={t}
                className="bg-gray-100 inline-flex items-center p-3 gap-1"
              >
                {t}
                <X
                  className="w-5 h-5 cursor-pointer"
                  onClick={() => {
                    setSubmitedTags((prev) => prev.filter((p) => p !== t));
                  }}
                />
              </li>
            ))}
          </ul>
        </div>
      )}
      <X
        onClick={(e) => {
          e.stopPropagation()
          setIsOpen(false)
        }}
        className="absolute right-8 text-gray-500"
      />
    </div>
  );
};

export default ListTags;
