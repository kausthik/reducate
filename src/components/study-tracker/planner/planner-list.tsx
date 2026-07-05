import PlannerCard from "./planner-card";

const planners = [
  {
    title: "Striver A2Z DSA",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
    progress: 40,
    completed: 8,
    total: 20,
    dueDate: "12 Jul",
    status: "ONGOING",
  },
  {
    title: "DBMS Placement",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475",
    progress: 75,
    completed: 15,
    total: 20,
    dueDate: "20 Jul",
    status: "ONGOING",
  },
  {
    title: "Operating System",
    image:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4",
    progress: 15,
    completed: 3,
    total: 20,
    dueDate: "28 Jul",
    status: "UPCOMING",
  },
];

export default function PlannerList() {
  return (
    <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {planners.map((planner) => (
        <PlannerCard
          key={planner.title}
          {...planner}
        />
      ))}
    </section>
  );
}