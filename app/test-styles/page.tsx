export default function TestStyles() {
  return (
    <div className="min-h-screen bg-red-500 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-blue-600 mb-4">Tailwind Test</h1>
        <p className="text-gray-700">If you can see this styled properly, Tailwind is working.</p>
        <button className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
          Test Button
        </button>
      </div>
    </div>
  )
} 