export function Header() {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
          KK
        </div>

        <div>
          <h1 className="text-xl font-semibold">Kaushal Kumar</h1>
          <p className="text-gray-400 text-sm">
            Joined 2 years ago • Global Rank #18,421
          </p>
        </div>
      </div>

      <button className="bg-blue-600 px-4 py-1 rounded-full text-sm">
        Premium
      </button>
    </div>
  );
}