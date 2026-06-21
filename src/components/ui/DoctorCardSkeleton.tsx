export default function DoctorCardSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center text-center animate-pulse">
      {/* Doctor photo placeholder */}
      <div className="w-24 h-24 rounded-full bg-gray-200 mb-4" />

      {/* Doctor name placeholder */}
      <div className="w-32 h-4 bg-gray-200 rounded-full mb-2" />

      {/* Doctor specialty placeholder */}
      <div className="w-24 h-3 bg-gray-200 rounded-full mb-4" />

      {/* Book appointment button placeholder */}
      <div className="w-full h-9 bg-gray-200 rounded-md" />
    </div>
  );
}
