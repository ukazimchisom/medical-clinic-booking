import { describe, it, expect, vi, beforeEach } from "vitest";
import { getBookedSlots, getDoctors } from "@/services/appointment-service";

// Mock the supabase client
vi.mock("@/lib/supabase-client", () => ({
  supabase: {
    from: vi.fn(),
  },
}));

import { supabase } from "@/lib/supabase-client";

describe("appointment service", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // getBookedSlots tests
  describe("getBookedSlots", () => {
    it("should return booked time slots for a doctor on a date", async () => {
      const mockData = [
        { appointment_time: "09:00" },
        { appointment_time: "10:00" },
      ];

      (supabase.from as any).mockReturnValue({
        select: vi.fn().mockReturnValue({
          eq: vi.fn().mockReturnValue({
            eq: vi.fn().mockResolvedValue({
              data: mockData,
              error: null,
            }),
          }),
        }),
      });

      const slots = await getBookedSlots("doctor-123", "2026-06-15");
      expect(slots).toEqual(["09:00", "10:00"]);
    });

    it("should return empty array when no slots are booked", async () => {
      (supabase.from as any).mockReturnValue({
        select: vi.fn().mockReturnValue({
          eq: vi.fn().mockReturnValue({
            eq: vi.fn().mockResolvedValue({
              data: [],
              error: null,
            }),
          }),
        }),
      });

      const slots = await getBookedSlots("doctor-123", "2026-06-15");
      expect(slots).toEqual([]);
    });

    it("should throw an error when Supabase returns an error", async () => {
      (supabase.from as any).mockReturnValue({
        select: vi.fn().mockReturnValue({
          eq: vi.fn().mockReturnValue({
            eq: vi.fn().mockResolvedValue({
              data: null,
              error: { message: "Database error" },
            }),
          }),
        }),
      });

      await expect(getBookedSlots("doctor-123", "2026-06-15")).rejects.toThrow(
        "Database error",
      );
    });
  });

  // getDoctors tests
  describe("getDoctors", () => {
    it("should return a list of doctors", async () => {
      const mockDoctors = [
        {
          id: "1",
          name: "Dr. John Smith",
          specialty: "Cardiologist",
          photo: "/photo1.jpg",
        },
        {
          id: "2",
          name: "Dr. Jane Doe",
          specialty: "Dermatologist",
          photo: "/photo2.jpg",
        },
      ];

      (supabase.from as any).mockReturnValue({
        select: vi.fn().mockResolvedValue({
          data: mockDoctors,
          error: null,
        }),
      });

      const doctors = await getDoctors();
      expect(doctors).toEqual(mockDoctors);
      expect(doctors).toHaveLength(2);
    });

    it("should return empty array when no doctors exist", async () => {
      (supabase.from as any).mockReturnValue({
        select: vi.fn().mockResolvedValue({
          data: [],
          error: null,
        }),
      });

      const doctors = await getDoctors();
      expect(doctors).toEqual([]);
    });

    it("should throw an error when Supabase returns an error", async () => {
      (supabase.from as any).mockReturnValue({
        select: vi.fn().mockResolvedValue({
          data: null,
          error: { message: "Failed to fetch doctors" },
        }),
      });

      await expect(getDoctors()).rejects.toThrow("Failed to fetch doctors");
    });
  });
});
