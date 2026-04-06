import StatCard from "./statcard";

export default function Overview() {
  return (
    <div>
      <h2 className="text-gray-400 mb-3">OVERVIEW</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard title="Solved" value="487" sub="of 3,341 total" />
        <StatCard title="Acceptance" value="68%" sub="avg rate" />
        <StatCard title="Streak" value="34d" sub="current streak" />
        <StatCard title="Contest Rating" value="1,847" sub="top 12%" />
      </div>
    </div>
  );
}