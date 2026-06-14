"use client";

interface SearchFilterProps {
  search: string;
  onSearchChange: (value: string) => void;
  selectedSpecialty: string;
  onSpecialtyChange: (value: string) => void;
  specialties: string[];
}

export default function SearchFilter({
  search,
  onSearchChange,
  selectedSpecialty,
  onSpecialtyChange,
  specialties,
}: SearchFilterProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-8">
      {/* Search input */}
      <div className="relative flex-1">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
          />
        </svg>
        <input
          type="text"
          placeholder="Search by doctor name..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
        />
      </div>

      {/* Specialty dropdown */}
      <select
        value={selectedSpecialty}
        onChange={(e) => onSpecialtyChange(e.target.value)}
        className="sm:w-52 px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-700"
      >
        {specialties.map((spec) => (
          <option key={spec} value={spec}>
            {spec}
          </option>
        ))}
      </select>
    </div>
  );
}
