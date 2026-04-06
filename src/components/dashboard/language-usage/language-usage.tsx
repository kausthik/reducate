import ProgressBar from "./progress-bar";

export default function LanguageUsage() {
  return (
    <div className="bg-gray-800 p-5 rounded-xl">
      <h3 className="text-gray-400 mb-4">LANGUAGE USAGE</h3>

      <div className="space-y-4">
        <ProgressBar label="Python" value={351} max={400} />
        <ProgressBar label="C++" value={88} max={400} />
        <ProgressBar label="JavaScript" value={40} max={400} />
        <ProgressBar label="Java" value={8} max={400} />
      </div>
    </div>
  );
}