export type UserRole = "patient" | "admin";

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  photo: string;
  availability: string[];
  created_at: string;
}

export interface Appointment {
  id: string;
  user_id: string;
  doctor_id: string;
  appointment_date: string;
  appointment_time: string;
  status: "scheduled" | "cancelled" | "completed";
  created_at: string;
}
