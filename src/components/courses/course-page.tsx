"use client"

import { SearchBar } from "./search-bar";
import { Course } from "./course";
import { courses, course } from "@/src/config/course-data"
import { useState } from "react";


export function CoursePage(){

    const [search, setSearch] = useState("");

    return(
        <div>
        <SearchBar search={search} setSearch={setSearch} />
         <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-6 m-10">
          {courses
            .filter((data: course) =>
              data.title.toLowerCase().includes(search.toLowerCase())
            )
            .map((data: course) => (
              <Course key={data.id} {...data} />
            ))}
        </div>
        </div>
    )
}