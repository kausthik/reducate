export default function ProblemBreakdown() {
  return (
    <div className="bg-gray-800 p-5 rounded-xl">
      <h3 className="text-gray-400 mb-4">PROBLEM BREAKDOWN</h3>

      <div className="flex items-center gap-6">
        <div className="w-32 h-32 bg-gray-800 rounded-full border-4 border-red-500 flex items-center justify-center">
          487
        </div>

        <div className="space-y-2">
          <p className="text-green-400">Easy 201</p>
          <p className="text-yellow-400">Medium 218</p>
          <p className="text-red-400">Hard 68</p>
        </div>
      </div>
    </div>
  );
}