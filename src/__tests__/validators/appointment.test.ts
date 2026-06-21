import { describe, it, expect } from "vitest";
import { z } from "zod";
import { appointmentSchema } from "@/lib/validators/appointment";

describe("appointmentSchema", () => {
  // Valid data tests
  describe("valid data", () => {
    it("should pass with valid date and time", () => {
      const result = appointmentSchema.safeParse({
        appointment_date: "2026-06-15",
        appointment_time: "09:00",
      });
      expect(result.success).toBe(true);
    });

    it("should pass with any non-empty date and time", () => {
      const result = appointmentSchema.safeParse({
        appointment_date: "2026-12-31",
        appointment_time: "15:00",
      });
      expect(result.success).toBe(true);
    });
  });

  // Invalid data tests
  describe("invalid data", () => {
    it("should fail when appointment_date is empty", () => {
      const result = appointmentSchema.safeParse({
        appointment_date: "",
        appointment_time: "09:00",
      });
      expect(result.success).toBe(false);
    });

    it("should fail when appointment_time is empty", () => {
      const result = appointmentSchema.safeParse({
        appointment_date: "2026-06-15",
        appointment_time: "",
      });
      expect(result.success).toBe(false);
    });

    it("should fail when both fields are empty", () => {
      const result = appointmentSchema.safeParse({
        appointment_date: "",
        appointment_time: "",
      });
      expect(result.success).toBe(false);
    });

    it("should fail when appointment_date is missing", () => {
      const result = appointmentSchema.safeParse({
        appointment_time: "09:00",
      });
      expect(result.success).toBe(false);
    });

    it("should fail when appointment_time is missing", () => {
      const result = appointmentSchema.safeParse({
        appointment_date: "2026-06-15",
      });
      expect(result.success).toBe(false);
    });

    it("should fail when both fields are missing", () => {
      const result = appointmentSchema.safeParse({});
      expect(result.success).toBe(false);
    });
  });

  // Error message tests
  describe("error messages", () => {
    it("should return correct error message when date is empty", () => {
      const result = appointmentSchema.safeParse({
        appointment_date: "",
        appointment_time: "09:00",
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        const errors = result.error.flatten().fieldErrors;
        expect(errors.appointment_date).toContain("Date is required");
      }
    });

    it("should return correct error message when time is empty", () => {
      const result = appointmentSchema.safeParse({
        appointment_date: "2026-06-15",
        appointment_time: "",
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        const errors = result.error.flatten().fieldErrors;
        expect(errors.appointment_time).toContain("Time is required");
      }
    });
  });
});
