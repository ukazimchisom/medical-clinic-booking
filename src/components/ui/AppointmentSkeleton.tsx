export default function AppointmentSkeleton() {
  return (
    <div className="bg-white border border-gray-100 rounded-xl p-4 flex items-center justify-between gap-4 animate-pulse">
      <div className="flex items-center gap-3">
        {/* Doctor image placeholder */}
        <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0" />

        <div className="flex flex-col gap-2">
          {/* Doctor name placeholder */}
          <div className="w-32 h-3 bg-gray-200 rounded-full" />
          {/* Doctor specialty placeholder */}
          <div className="w-20 h-3 bg-gray-200 rounded-full" />
        </div>
      </div>

      <div className="flex flex-col items-end gap-2">
        {/* Date and status placeholder */}
        <div className="w-40 h-3 bg-gray-200 rounded-full" />
        {/* Cancel button placeholder */}
        <div className="w-16 h-6 bg-gray-200 rounded-md" />
      </div>
    </div>
  );
}

export function StatsSkeleton() {
  return (
    <div className="grid grid-cols-3 gap-3 mb-6 animate-pulse">
      {/* Total stat placeholder */}
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="w-12 h-3 bg-gray-200 rounded-full mb-3" />
        <div className="w-8 h-6 bg-gray-200 rounded-full" />
      </div>

      {/* Scheduled stat placeholder */}
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="w-16 h-3 bg-gray-200 rounded-full mb-3" />
        <div className="w-8 h-6 bg-gray-200 rounded-full" />
      </div>

      {/* Cancelled stat placeholder */}
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="w-16 h-3 bg-gray-200 rounded-full mb-3" />
        <div className="w-8 h-6 bg-gray-200 rounded-full" />
      </div>
    </div>
  );
}
