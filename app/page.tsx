"use client";
import { useState } from "react";
import ListTags from "./components/ListTags";
import { links } from "./utils/data";

export default function Home() {
  const [isOpen, setIsOpen] = useState<boolean>();

  return (
    <main>
      <ul className="ml-12 mt-12 border border-black rounded-xl inline-block ">
        {links.map((link) => {
          const { icon: Icon, name, tags } = link;
          return (
            <li
              key={name}
              className="relative z-50 p-6 hover:bg-slate-100 cursor-pointer"
              onClick={() => {
                name === "tags" && setIsOpen(true);
              }}
            >
              <Icon />
              {tags.length > 0 && isOpen && (
                <ListTags setIsOpen={setIsOpen} tags={tags} />
              )}
            </li>
          );
        })}
      </ul>
    </main>
  );
}
