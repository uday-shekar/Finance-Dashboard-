import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-64 h-screen bg-white shadow-md p-4">
        <h1 className="text-xl font-bold text-blue-600">FinFlow</h1>
        <p className="text-sm text-gray-400 mb-6">Personal Finance</p>

        <ul className="space-y-3">
          <li className="text-blue-500 font-semibold">Dashboard</li>
          <li className="text-gray-500">Transactions</li>
          <li className="text-gray-500">Insights</li>
        </ul>

        <div className="mt-10">
          <p className="text-sm text-gray-400">ROLE</p>
          <button className="mt-2 w-full bg-gray-100 p-2 rounded">
            Admin
          </button>
        </div>
      </div>

      {/* Main */}
      <div className="flex-1 p-6">
        <Dashboard />
      </div>
    </div>
  );
}

export default App;