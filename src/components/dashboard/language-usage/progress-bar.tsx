interface Props {
  label: string;
  value: number;
  max: number;
}

export default function ProgressBar({ label, value, max }: Props) {
  const percent = (value / max) * 100;

  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span>{label}</span>
        <span>{value}</span>
      </div>

      <div className="w-full bg-gray-700 h-2 rounded-full">
        <div
          className="bg-blue-500 h-2 rounded-full"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}