import { describe, it, expect } from "vitest";
import { loginSchema } from "@/lib/validators/auth";

describe("loginSchema", () => {
  // Valid data tests
  describe("valid data", () => {
    it("should pass with valid email and password", () => {
      const result = loginSchema.safeParse({
        email: "user@example.com",
        password: "password123",
      });
      expect(result.success).toBe(true);
    });

    it("should pass with exactly 6 character password", () => {
      const result = loginSchema.safeParse({
        email: "user@example.com",
        password: "123456",
      });
      expect(result.success).toBe(true);
    });

    it("should pass with long password", () => {
      const result = loginSchema.safeParse({
        email: "user@example.com",
        password: "averylongpassword123456",
      });
      expect(result.success).toBe(true);
    });
  });

  // Invalid data tests
  describe("invalid data", () => {
    it("should fail with invalid email format", () => {
      const result = loginSchema.safeParse({
        email: "notanemail",
        password: "password123",
      });
      expect(result.success).toBe(false);
    });

    it("should fail with empty email", () => {
      const result = loginSchema.safeParse({
        email: "",
        password: "password123",
      });
      expect(result.success).toBe(false);
    });

    it("should fail with password less than 6 characters", () => {
      const result = loginSchema.safeParse({
        email: "user@example.com",
        password: "12345",
      });
      expect(result.success).toBe(false);
    });

    it("should fail with empty password", () => {
      const result = loginSchema.safeParse({
        email: "user@example.com",
        password: "",
      });
      expect(result.success).toBe(false);
    });

    it("should fail when both fields are empty", () => {
      const result = loginSchema.safeParse({
        email: "",
        password: "",
      });
      expect(result.success).toBe(false);
    });

    it("should fail when both fields are missing", () => {
      const result = loginSchema.safeParse({});
      expect(result.success).toBe(false);
    });

    it("should fail with missing @ in email", () => {
      const result = loginSchema.safeParse({
        email: "userexample.com",
        password: "password123",
      });
      expect(result.success).toBe(false);
    });
  });

  // Error message tests
  describe("error messages", () => {
    it("should return correct error message for invalid email", () => {
      const result = loginSchema.safeParse({
        email: "notanemail",
        password: "password123",
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        const errors = result.error.flatten().fieldErrors;
        expect(errors.email).toContain("Invalid email address");
      }
    });

    it("should return correct error message for short password", () => {
      const result = loginSchema.safeParse({
        email: "user@example.com",
        password: "12345",
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        const errors = result.error.flatten().fieldErrors;
        expect(errors.password).toContain(
          "Password must be at least 6 characters",
        );
      }
    });
  });
});
