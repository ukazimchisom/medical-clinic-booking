export type UserRole = "patient" | "admin";

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  photo: string;
  availability: string[];
  created_at: string;
  image_url: string;
}

export type Appointment = {
  id: string;
  appointment_date: string;
  appointment_time: string;
  status: string;
  doctors: {
    name: string;
    specialty: string;
    photo: string | null;
  } | null;
};
