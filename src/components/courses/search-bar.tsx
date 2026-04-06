import React from "react";

type Props = {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
};

export function SearchBar({ search, setSearch }: Props){

    return(
    <div className="flex flex-col items-center gap-4 mt-10">
      <input
        type="text"
        placeholder="Search courses..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-80 px-4 py-2 border rounded-lg"
      />

      <div className="w-80 p-4 bg-white rounded-xl shadow-md">
        <h2 className="text-lg font-semibold mb-2">
          {search || "Course Title"}
        </h2>
      </div>

    </div>
  );
}
