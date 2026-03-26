import Image from "next/image";
import Button from "../ui/Button";
import Link from "next/link";

export default function Services() {
  return (
    <section
      id="services"
      className="w-full h-auto mx-auto px-6 sm:px-12 py-20 items-center flex flex-col gap-10 "
    >
      <h1 className="text-3xl font-bold max-w-md text-gray-600 text-center">
        Comprehensive Services for your Health
      </h1>
      <div className="flex gap-20 flex-wrap justify-center flex-col md:flex-row">
        <div className="w-[300px] bg-white rounded-lg shadow p-6 flex flex-col items-center text-center">
          <span className="rounded-full bg-blue-100 p-3">
            <Image
              src="/health-insurance.png"
              alt="Health Insurance icon"
              width={30}
              height={30}
            />
          </span>
          <h3 className="text-lg font-semibold">Neurology</h3>

          <hr className="w-full border-t border-gray-300 my-4" />

          <p className="text-gray-600 mb-4">
            Our neurology services provide expert care for a wide range of
            neurological conditions affecting the brain and nervous system.
          </p>

          <Image
            src="/neurologist.jpg"
            alt="Neurologist icon"
            width={300}
            height={200}
            className="w-full h-36 object-cover rounded mb-4"
          />
        </div>

        <div className="w-[300px] bg-white rounded-lg shadow p-6 flex flex-col items-center text-center">
          <span className="rounded-full bg-blue-100 p-3">
            <Image
              src="/hospital.png"
              alt="Hospital icon"
              width={30}
              height={30}
            />
          </span>
          <h3 className="text-lg font-semibold">Cardiology</h3>

          <hr className="w-full border-t border-gray-300 my-4" />

          <p className="text-gray-600 mb-4">
            Our cardiology services offer expert care for heart-related
            conditions, including diagnosis, treatment, and prevention.
          </p>

          <Image
            src="/cardiologist.jpg"
            alt="Cardiologist icon"
            width={300}
            height={30}
            className="w-full h-36 object-cover rounded mb-4"
          />
        </div>

        <div className="w-[300px] bg-white rounded-lg shadow p-6 flex flex-col items-center text-center">
          <span className="rounded-full bg-blue-100 p-3">
            <Image
              src="/medicine.png"
              alt="medicine icon"
              width={30}
              height={30}
            />
          </span>
          <h3 className="text-lg font-semibold">Surgery</h3>

          <hr className="w-full border-t border-gray-300 my-4" />

          <p className="text-gray-600 mb-4">
            Our surgical services provide expert care for a wide range of
            conditions, utilizing advanced techniques and technology for optimal
            outcomes.
          </p>

          <Image
            src="/surgeon.jpg"
            alt="Surgeon icon"
            width={300}
            height={200}
            className="w-full h-36 object-cover rounded mb-4"
          />
        </div>
        <Link
          href="/doctors"
          className="text-blue-500 text-lg font-semibold text-center"
        >
          view all doctors
        </Link>
      </div>

      <div className="grid template-columns-1 md:grid-cols-2 gap-10 rounded-lg flex-col md:flex-row mt-5 md:p-12">
        <Image
          src="/doctor-4.jpg"
          alt="doctor image"
          width={350}
          height={200}
          className="object-cover rounded-tl-full rounded-bl-full rounded-br-full "
        />

        <div className="flex flex-col gap-4 items-center md:items-start ">
          <span className="text-center font-bold md:text-left text-blue-500">
            BOOK APPOINTMENT
          </span>
          <h3 className="font-bold text-3xl text-center md:text-left">
            Make an appointment with A Doctor today, online.
          </h3>
          <p className="text-gray-600 text-lg">
            Get the care you need from the comfort of your home. <br /> with our
            telehealth services, and more. <br /> To schedule an appointment,
            simply click the button below.
          </p>
          <Link href="/doctors">
            <Button className="bg-gray-800 hover:bg-gray-900">
              Book Appointment
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
