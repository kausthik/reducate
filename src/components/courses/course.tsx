import Image from "next/image"
import { course } from "@/src/config/course-data";
import Link from "next/link";

export function Course(data : course) {
  return (
      <div className="w-80 p-4 bg-white rounded-xl shadow-md">
        <div className="w-full h-40 relative mb-4">
          <Image
            src={data.image}
            alt="course"
            fill
            className="object-cover rounded-md"
          />
        </div>
        <div className="flex justify-between">
        <h2 className="text-lg font-semibold mb-2">{data.title}</h2>
        <Link href={data.link} className="font-semibold">Link</Link>
        </div>
        <p className="text-gray-600 text-sm">
          {data.desc}
        </p>
      </div>
  );
}