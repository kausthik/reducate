import { connectDB } from "@/src/lib/mongodb";

export async function GET() {
    const connection = await connectDB();
    console.log(connection)
    return Response.json({
    name: "kaushal",
   });
};