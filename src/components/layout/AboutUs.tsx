import Image from "next/image";

export default function AboutUs() {
  return (
    <section
      id="about"
      className="w-full h-auto mx-auto px-6 sm:px-12 py-20 grid md:grid-cols-1 lg:grid-cols-2 gap-10 items-center bg-gray-100"
    >
      <div className="sm:px-6 ">
        <span className="flex justify-center md:justify-start gap-3 font-semibold text-blue-800 mb-3">
          <Image
            src="/stethoscope.png"
            alt="About Us stethoscope"
            width={30}
            height={30}
          />
          <p>About Us</p>
        </span>
        <h1 className="text-gray-600 mb-6 max-w-xs md:max-w-none text-3xl font-bold text-center md:text-left">
          Proffessionals dedicated to your health
        </h1>
        <p className="text-gray-500 mb-8 max-w-md text-center md:text-left">
          Our team of skilled proffesionals is committed to providing
          exceptional, personalized healthcare services.
        </p>

        <div className="flex flex-col items-center gap-6">
          <div className="flex items-center gap-6">
            <span className="rounded-full bg-blue-100 p-3">
              <Image
                src="/healthcare.png"
                alt="healthcare icon"
                width={30}
                height={30}
              />
            </span>

            <span>
              <h2 className="mb-2 font-semibold">Patient-Centered Care</h2>
              <p>
                We prioritize the needs and preferences of each patient,
                ensuring a personalized approach to healthcare.
              </p>
            </span>
          </div>

          <div className="flex items-center gap-6">
            <span className="rounded-full bg-blue-100 p-3">
              <Image
                src="/patient.png"
                alt="healthcare icon"
                width={30}
                height={30}
              />
            </span>

            <span>
              <h2 className="mb-2 font-semibold">Specialist Doctors</h2>
              <p>
                We have a team of experienced specialist doctors in various
                fields, ensuring you receive the best possible care.
              </p>
            </span>
          </div>

          <div className="flex items-center gap-6">
            <span className="rounded-full bg-blue-100 p-3">
              <Image
                src="/medical-symbol.png"
                alt="medical symbol icon"
                width={30}
                height={30}
              />
            </span>

            <span>
              <h2 className="mb-2 font-semibold">24 hours service</h2>
              <p>
                We are available 24/7 to provide you with the care and support
                you need, whenever you need it.
              </p>
            </span>
          </div>
        </div>
      </div>

      <div className="">
        <Image
          src="/doctor-treating-patient.jpg"
          alt="About Us image"
          width={500}
          height={500}
          className="w-full h-auto rounded-lg object-cover"
        />
      </div>
    </section>
  );
}
