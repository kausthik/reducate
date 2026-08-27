// import { Difficulty, Subject } from "@/src/types/study";
// import PlannerTaskItem from "./planner-task-item";

// export interface PlannerTask {
//   id: string;
//   title: string;
//   subject: Subject
//   difficulty: Difficulty;
//   completed: boolean;
// }

// interface PlannerTaskListProps {
//   tasks: PlannerTask[];
// }

// export default function PlannerTaskList({
//   tasks,
// }: PlannerTaskListProps) {
//   return (
//     <section className="space-y-4">
//       <div>
//         <h2 className="text-2xl font-semibold">
//           Planner Tasks
//         </h2>

//         <p className="text-sm text-muted-foreground">
//           Complete each task to keep your planner up to date.
//         </p>
//       </div>

//       <div className="space-y-3">
//         {tasks.map((task) => (
//           <PlannerTaskItem
//             key={task.id}
//             {...task}
//           />
//         ))}
//       </div>
//     </section>
//   );
// }