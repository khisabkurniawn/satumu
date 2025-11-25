"use client";

import { useTransition } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { login } from "@/app/login/actions/login";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [isPending, startTransition] = useTransition();

  function handleSubmit(formData: FormData) {
    startTransition(() => {
      toast.promise(
        (async () => {
          const res = await login(formData);

          if (!res.success) {
            throw new Error(res.message);
          }

          return res;
        })(),
        {
          loading: "Sedang masuk...",
          success: (data) => {
            setTimeout(() => {
              window.location.href = "/";
            }, 600);

            return data.message || "Login berhasil!";
          },
          error: (err) => err.message || "Terjadi kesalahan",
        }
      );
    });
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Selamat Datang</CardTitle>
          <CardDescription>
            Masukkan email dan password untuk masuk
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={handleSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="admin@satu.muhammadiyahcipondoh.or.id"
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="********"
                  required
                />
              </Field>
              <Field>
                <Button
                  type="submit"
                  disabled={isPending}
                  className="bg-linear-to-r from-[#2f318b] to-[#01612e] font-el-messiri cursor-pointer"
                >
                  {isPending ? "Loading..." : "Login"}
                </Button>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center font-el-messiri">
        Majelis Pustaka dan Informasi Pimpinan Cabang Muhammadiyah Cipondoh
      </FieldDescription>
    </div>
  );
}
