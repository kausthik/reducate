interface Props {
  title: string;
  value: string;
  sub: string;
}

export default function StatCard({ title, value, sub }: Props) {
  return (
    <div className="bg-gray-800 p-4 rounded-xl">
      <p className="text-gray-400">{title}</p>
      <h2 className="text-2xl font-bold">{value}</h2>
      <p className="text-gray-500 text-sm">{sub}</p>
    </div>
  );
}