"use client"

import CreatePlannerDialog from "./create-planner-dialog";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { homeRoute } from "@/lib/routes";


export default function PlannerHeader() {
  const router = useRouter()
  return (
    <div className="flex p-2 m-1 justify-between">
      <div className="flex-col-reverse">
        <h1 className="text-3xl font-bold tracking-tight">
          Planner
        </h1>
        <p className="text-muted-foreground">
          Organize your study roadmap and track your progress.
        </p>
      </div>
       
      <div className="flex gap-2">
      <CreatePlannerDialog />
      <Button onClick={()=>{
        router.push(homeRoute)
      }} variant={"outline"}>🏠</Button>
      </div> 
    </div>
  );
}