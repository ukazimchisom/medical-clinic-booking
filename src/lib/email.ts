import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendAppointmentEmail({
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
  await resend.emails.send({
    from: "Clinic <onboarding@resend.dev>",
    to,
    subject: "Appointment Confirmation",
    html: `
      <h2>Appointment Confirmed</h2>
      <p>Your appointment has been successfully booked.</p>

      <ul>
        <li><strong>Doctor:</strong> ${doctorName}</li>
        <li><strong>Date:</strong> ${date}</li>
        <li><strong>Time:</strong> ${time}</li>
      </ul>

      <p>Thank you for choosing our clinic.</p>
    `,
  });
}
