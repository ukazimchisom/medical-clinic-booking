import emailjs from "@emailjs/browser";

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!;
const BOOKING_TEMPLATE_ID =
  process.env.NEXT_PUBLIC_EMAILJS_BOOKING_TEMPLATE_ID!;

export async function sendBookingEmailJS({
  to,
  doctorName,
  date,
  time,
}: {
  to: string;
  doctorName: string;
  date: string;
  time: string;
}) {
  await emailjs.send(
    SERVICE_ID,
    BOOKING_TEMPLATE_ID,
    {
      to_email: to,
      doctor_name: doctorName,
      appointment_date: date,
      appointment_time: time,
    },
    PUBLIC_KEY,
  );
}

const RESCHEDULE_TEMPLATE_ID =
  process.env.NEXT_PUBLIC_EMAILJS_RESCHEDULE_TEMPLATE_ID!;

export async function sendRescheduleEmailJS({
  to,
  doctorName,
  oldDate,
  oldTime,
  newDate,
  newTime,
}: {
  to: string;
  doctorName: string;
  oldDate: string;
  oldTime: string;
  newDate: string;
  newTime: string;
}) {
  await emailjs.send(
    SERVICE_ID,
    RESCHEDULE_TEMPLATE_ID,
    {
      to_email: to,
      doctor_name: doctorName,
      old_date: oldDate,
      old_time: oldTime,
      new_date: newDate,
      new_time: newTime,
    },
    PUBLIC_KEY,
  );
}
