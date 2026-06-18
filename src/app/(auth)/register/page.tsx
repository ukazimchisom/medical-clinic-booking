"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterFormData } from "@/lib/validators/auth";

import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

import { supabase } from "@/lib/supabase-client";
import Image from "next/image";
import Link from "next/link";

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  async function onSubmit(data: RegisterFormData) {
    setLoading(true);
    setServerError(null);

    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          name: data.name,
        },
      },
    });

    setLoading(false);

    if (error) {
      setServerError(error.message);
      return;
    }

    alert("Account created successfully! Please check your email.");
  }

  return (
    <main className="min-h-screen">
      <div className="flex items-center justify-center flex-col md:flex-row md:gap-10">
        <div className="md:w-full max-w-md mb-4 md:mb-8 flex-1">
          <Image
            src="/register-doctor-photo.png"
            alt="smiling Doctor"
            width={600}
            height={600}
            className="w-full max-w-md mb-8"
            priority
          />
        </div>
        <div className="flex flex-1 flex-col w-full max-w-md bg-white p-8 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-6 text-center text-green-400">
            Create Account
          </h2>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <Input
              label="Full Name"
              placeholder="Enter Your Full Name"
              {...register("name")}
              error={errors.name?.message}
            />

            <Input
              label="Email"
              type="email"
              placeholder="you@example.com"
              {...register("email")}
              error={errors.email?.message}
            />

            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              {...register("password")}
              error={errors.password?.message}
            />

            {serverError && (
              <p className="text-red-500 text-sm">{serverError}</p>
            )}

            <Button type="submit" className="w-full">
              {loading ? "Creating account..." : "Register"}
            </Button>
            <span className="text-center">
              already have an account?{" "}
              <Link href="/login" className="text-green-500 hover:underline">
                Login
              </Link>
            </span>
          </form>
        </div>
      </div>
    </main>
  );
}
