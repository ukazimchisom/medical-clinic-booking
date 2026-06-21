export default function ProfileSkeleton() {
  return (
    <div className="bg-white border border-gray-100 rounded-xl p-6 animate-pulse">
      {/* Photo placeholder */}
      <div className="flex flex-col items-center gap-3 mb-6">
        <div className="w-24 h-24 rounded-full bg-gray-200" />
        <div className="w-24 h-3 bg-gray-200 rounded-full" />
      </div>

      {/* Full name placeholder */}
      <div className="flex flex-col gap-1.5 mb-6">
        <div className="w-20 h-3 bg-gray-200 rounded-full" />
        <div className="w-full h-10 bg-gray-200 rounded-lg" />
      </div>

      {/* Email placeholder */}
      <div className="flex flex-col gap-1.5 mb-6">
        <div className="w-12 h-3 bg-gray-200 rounded-full" />
        <div className="w-full h-10 bg-gray-200 rounded-lg" />
        <div className="w-36 h-3 bg-gray-200 rounded-full" />
      </div>

      {/* Role placeholder */}
      <div className="flex flex-col gap-1.5 mb-6">
        <div className="w-10 h-3 bg-gray-200 rounded-full" />
        <div className="w-full h-10 bg-gray-200 rounded-lg" />
      </div>

      {/* Save button placeholder */}
      <div className="w-full h-10 bg-gray-200 rounded-lg" />
    </div>
  );
}
