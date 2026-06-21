export default function BookingPageSkeleton() {
  return (
    <div className="max-w-xl md:max-w-5xl mx-auto px-6 py-12 animate-pulse">
      {/* Page heading placeholder */}
      <div className="w-48 h-6 bg-gray-200 rounded-full mb-3" />
      <div className="w-72 h-4 bg-gray-200 rounded-full mb-8" />

      <div className="bg-white p-8 rounded-lg">
        {/* Doctor info card placeholder */}
        <div className="mb-6 p-4 bg-gray-50 rounded-md flex items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-gray-200 flex-shrink-0" />
          <div className="flex flex-col gap-2">
            <div className="w-36 h-4 bg-gray-200 rounded-full" />
            <div className="w-24 h-3 bg-gray-200 rounded-full" />
          </div>
        </div>

        <div className="flex flex-col gap-6">
          {/* Calendar placeholder */}
          <div>
            <div className="w-32 h-3 bg-gray-200 rounded-full mb-4" />
            <div className="w-full h-64 bg-gray-200 rounded-lg" />
          </div>

          {/* Time slots placeholder */}
          <div>
            <div className="w-32 h-3 bg-gray-200 rounded-full mb-4" />
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-10 bg-gray-200 rounded-lg" />
              ))}
            </div>
          </div>

          {/* Confirm button placeholder */}
          <div className="w-full h-10 bg-gray-200 rounded-lg" />
        </div>
      </div>
    </div>
  );
}
