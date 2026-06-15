"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginFormData } from "@/lib/validators/auth";

import Navbar from "@/components/layout/Navbar";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

import { supabase } from "@/lib/supabase-client";

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/dashboard";

  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(data: LoginFormData) {
    setLoading(true);
    setServerError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    setLoading(false);

    if (error) {
      setServerError(error.message);
      return;
    }

    router.push(redirectTo);
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex justify-center items-center py-20 px-4">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Login to Your Account
          </h2>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
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
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>
          <p className="text-sm text-center text-gray-600 mt-6">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-blue-600 hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginContent />
    </Suspense>
  );
}
