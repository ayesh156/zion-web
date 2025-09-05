'use client';

export default function TestAdmin() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Admin Panel Test
        </h1>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600">
            If you can see this, the admin route is working correctly.
          </p>
        </div>
      </div>
    </div>
  );
}
