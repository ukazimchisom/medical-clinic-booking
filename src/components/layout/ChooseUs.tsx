import Image from "next/image";
import { TiTick } from "react-icons/ti";

export default function ChooseUs() {
  return (
    <section className=" w-full h-auto mx-auto px-6 sm:px-12 py-20 items-center bg-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="flex flex-col gap-4">
          <span className="flex items-center gap-5">
            <Image
              src="/stethoscope.png"
              alt="Why Choose Us"
              width={30}
              height={30}
              priority
            />
            <p>Why Choose Us</p>
          </span>

          <h3 className="text-4xl font-bold">
            Why Patients trust us with their care
          </h3>
          <p className="text-gray-500">
            We are committed to providing the highest quality healthcare
            services with compassion and integrity which has earned us a
            reputation for excellence. Discover what sets us apart.
          </p>
        </div>
        <div className="flex flex-col gap-6">
          <div className="flex items-start gap-3">
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-600 mt-1">
              <TiTick className="text-white text-xs" />
            </span>

            <p>Team is committed to making you feel comfortable</p>
          </div>

          <div className="flex items-start gap-3">
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-600 mt-1">
              <TiTick className="text-white text-xs" />
            </span>

            <p>We offer flexible hours to fit your busy schedule</p>
          </div>

          <div className="flex items-start gap-3">
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-600 mt-1">
              <TiTick className="text-white text-xs" />
            </span>

            <p>We ensure you receive prompt and effective care</p>
          </div>

          <div className="flex items-start gap-3">
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-600 mt-1">
              <TiTick className="text-white text-xs" />
            </span>

            <p>Helping you manage your health at every stage of your life</p>
          </div>
        </div>
      </div>

      <div className="relative w-full min-h-[400px] md:h-[500px] mt-5 rounded-lg overflow-hidden">
        <Image
          src="/doctor-wearing-mask.jpg"
          alt="doctor wearing mask"
          fill
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/30" />

        <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-6 text-white">
          <div className="flex flex-col md:flex-row gap-4 md:gap-5">
            <div className="flex items-center gap-3 md:gap-4 text-white p-3 md:p-4 rounded-lg">
              <span className="rounded-full bg-blue-100 p-2 md:p-3">
                <Image
                  src="/healthcare.png"
                  alt="healthcare icon"
                  width={24}
                  height={24}
                  className="md:w-[30px] md:h-[30px]"
                />
              </span>

              <div>
                <h2 className="font-semibold text-sm md:text-base mb-3 ">
                  Expert Doctors
                </h2>
                <p className="text-xs md:text-sm text-gray-200">
                  Our team includes highly skilled <br /> and experienced
                  doctors.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 md:gap-4 text-white p-3 md:p-4 rounded-lg">
              <span className="rounded-full bg-blue-100 p-2 md:p-3">
                <Image
                  src="/hospital.png"
                  alt="hospital icon"
                  width={24}
                  height={24}
                  className="md:w-[30px] md:h-[30px]"
                />
              </span>

              <div>
                <h2 className="font-semibold text-sm md:text-base mb-3">
                  24/7 Instant Support
                </h2>
                <p className="text-xs md:text-sm text-gray-200">
                  We provide round-the-clock support <br /> to assist you
                  whenever you need it.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
