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

export async function sendCancellationEmail({
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
    subject: "Appointment Cancellation Confirmation",
    html: `
      <h2>Appointment Cancelled</h2>
      <p>Your appointment has been successfully cancelled.</p>

      <ul>
        <li><strong>Doctor:</strong> ${doctorName}</li>
        <li><strong>Date:</strong> ${date}</li>
        <li><strong>Time:</strong> ${time}</li>
      </ul>

      <p>We hope to see you again soon. You can book a new appointment at any time.</p>

      <p>Thank you for choosing our clinic.</p>
    `,
  });
}

export async function sendRescheduleEmail({
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
  await resend.emails.send({
    from: "Clinic <onboarding@resend.dev>",
    to,
    subject: "Appointment Rescheduled Confirmation",
    html: `
      <h2>Appointment Rescheduled</h2>
      <p>Your appointment has been successfully rescheduled.</p>

      <h3>Previous Appointment</h3>
      <ul>
        <li><strong>Doctor:</strong> ${doctorName}</li>
        <li><strong>Date:</strong> ${oldDate}</li>
        <li><strong>Time:</strong> ${oldTime}</li>
      </ul>

      <h3>New Appointment</h3>
      <ul>
        <li><strong>Doctor:</strong> ${doctorName}</li>
        <li><strong>Date:</strong> ${newDate}</li>
        <li><strong>Time:</strong> ${newTime}</li>
      </ul>

      <p>Thank you for choosing our clinic.</p>
    `,
  });
}
