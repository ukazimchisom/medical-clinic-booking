"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginFormData } from "@/lib/validators/auth";

import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

import { supabase } from "@/lib/supabase-client";
import Image from "next/image";

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
    <main className="min-h-screen">
      <div className="flex items-center justify-center flex-col md:flex-row md:gap-10">
        <div className="md:w-full max-w-md mb-4 md:mb-8 flex-1">
          <Image
            src="/register-doctor-photo.png"
            alt="smiling Doctor"
            width={600}
            height={600}
            className="w-full max-w-md mb-4"
            priority
          />
        </div>
        <div className="flex flex-1 flex-col w-full max-w-md bg-white p-8 rounded-lg shadow">
          <h2 className="text-2xl text-green-400 font-bold mb-6 text-center">
            Welcome Back
          </h2>
          <p className="text-gray-400 text-center mb-6">
            Login to access your account
          </p>
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
            <Button type="submit" className="w-ful">
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>
          <p className="text-sm text-center text-gray-600 mt-6">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-green-400 hover:underline">
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
