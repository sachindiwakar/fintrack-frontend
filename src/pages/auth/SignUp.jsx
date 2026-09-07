import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { BiLoader } from "react-icons/bi";

import useStore from "../../store";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/Card";

import { SocialAuth } from "../../components/SocialAuth";
import { Separator } from "../../components/Separator";
import Input from "../../components/Input";
import { Button } from "../../components/Button";
import { toast } from "sonner";
import api from "../../libs/apiCall";

const RegisterSchema = z.object({
  email: z.email({
    error: "Invalid email address",
  }),

  firstName: z
    .string({
      error: "Name is required",
    })
    .min(3, "Name must be at least 3 characters"),

  password: z
    .string({
      error: "Password is required",
    })
    .min(6, "Password must be at least 6 characters"),
});

const SignUp = () => {
  const { user } = useStore((state) => state);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(RegisterSchema),
  });

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const { data: res } = await api.post("/auth/sign-up", data);
      if (res?.user) {
        toast.success("Account created successfully. You can now login.");
        setTimeout(() => {
          navigate("/sign-in");
        }, 1500);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message) || error.message;
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center w-full min-h-screen py-10">
      <Card className="w-full max-w-md bg-white dark:bg-black/20 shadow-md overflow-hidden">
        <div className="p-6 md:p-8">
          <CardHeader className="py-0">
            <CardTitle className="mb-8 text-center dark:text-white">
              Create Account
            </CardTitle>
          </CardHeader>

          <CardContent className="p-0">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="mb-8 space-y-6">
                <SocialAuth isLoading={loading} setLoading={setLoading} />

                <Separator />

                <Input
                  disabled={loading}
                  id="firstName"
                  label="Name"
                  type="text"
                  placeholder="John Smith"
                  error={errors?.firstName?.message}
                  {...register("firstName")}
                  className="text-sm border dark:border-gray-800 dark:bg-transparent dark:placeholder:text-gray-700 dark:text-gray-400 dark:outline-none"
                />

                <Input
                  disabled={loading}
                  id="email"
                  label="Email"
                  type="email"
                  placeholder="you@example.com"
                  error={errors?.email?.message}
                  {...register("email")}
                  className="text-sm border dark:border-gray-800 dark:bg-transparent dark:placeholder:text-gray-700 dark:text-gray-400 dark:outline-none"
                />

                <Input
                  disabled={loading}
                  id="password"
                  label="Password"
                  type="password"
                  placeholder="Enter a strong password"
                  error={errors?.password?.message}
                  {...register("password")}
                  className="text-sm border dark:border-gray-800 dark:bg-transparent dark:placeholder:text-gray-700 dark:text-gray-400 dark:outline-none"
                />
              </div>

              <Button
                disabled={loading}
                type="submit"
                className="w-full bg-violet-800 cursor-pointer"
              >
                {loading ? (
                  <BiLoader className="text-2xl text-white animate-spin" />
                ) : (
                  "Create an account"
                )}
              </Button>
            </form>
          </CardContent>
        </div>
        <CardFooter className="justify-center gap-2">
          <p className="text-sm text-gray-600">Already have an account?</p>
          <Link
            to="/sign-in"
            className="text-sm font-semibold text-violet-600 hover:underline"
          >
            Sign In
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignUp;
