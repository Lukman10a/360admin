export default function TestStyles() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">
          Tailwind CSS Test Page
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Card 1</h2>
            <p className="text-gray-600">
              If you can see this styled card with shadows and rounded corners, 
              Tailwind CSS is working properly.
            </p>
            <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Button Test
            </button>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Card 2</h2>
            <p className="text-gray-600">
              This should have proper spacing, colors, and typography if 
              Tailwind is loaded correctly.
            </p>
            <button className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
              Green Button
            </button>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Card 3</h2>
            <p className="text-gray-600">
              Check the browser developer tools to see if CSS is being loaded 
              and applied to these elements.
            </p>
            <button className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
              Red Button
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 