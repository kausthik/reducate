// import PlannerOverview from "./planner-overview";
// import PlannerStatistics from "./planner-statistics";
// import PlannerTaskList from "./planner-task-list";

// const planner = {
//   title: "DSA Placement Sheet",
//   image: "/placeholder.jpg",
//   progress: 40,
//   completedTasks: 8,
//   totalTasks: 20,
//   startDate: "05 Jul 2026",
//   dueDate: "30 Aug 2026",
//   status: "ONGOING",
// };

// const tasks = [
//   {
//     id: "1",
//     title: "Arrays",
//     subject: "DSA",
//     difficulty: "EASY",
//     completed: true,
//   },
//   {
//     id: "2",
//     title: "Binary Search",
//     subject: "DSA",
//     difficulty: "MEDIUM",
//     completed: false,
//   },
// ];

// export default function PlannerDetails() {
//   return (
//     <div className="space-y-8">
//       <PlannerOverview {...planner} />

//       <PlannerStatistics
//         completed={planner.completedTasks}
//         total={planner.totalTasks}
//       />

//       <PlannerTaskList tasks={tasks} />
//     </div>
//   );
// }