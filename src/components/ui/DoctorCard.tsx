import Button from "./Button";
import { Doctor } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";

type Props = {
  doctor: Doctor;
};

export default function DoctorCard({ doctor }: Props) {
  const router = useRouter();

  return (
    <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center text-center">
      <Image
        src={doctor.photo}
        alt={doctor.name}
        width={96}
        height={96}
        className="rounded-full mb-4"
      />
      <h3 className="text-lg font-semibold">{doctor.name}</h3>

      <p className="text-gray-600 mb-4">{doctor.specialty}</p>

      <Button onClick={() => router.push(`/book/${doctor.id}`)}>
        Book Appointment
      </Button>
    </div>
  );
}
