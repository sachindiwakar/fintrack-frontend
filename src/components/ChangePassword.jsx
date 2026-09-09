import { useForm } from "react-hook-form";
import api from "../libs/apiCall";
import { toast } from "sonner";
import { useState } from "react";
import Input from "./Input";
import { Button } from "./Button";
import { BiLoader } from "react-icons/bi";

const ChangePassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const [loading, setLoading] = useState(false);

  const submitPasswordHandler = async (data) => {
    try {
      setLoading(true);

      const { data: res } = await api.patch("/user/change-password", data);

      if (res?.status === "success") {
        toast.success(res?.message);
      }
    } catch (error) {
      console.error("Something went wrong:", error);
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-20">
      <form onSubmit={handleSubmit(submitPasswordHandler)}>
        <div>
          <p className="text-xl font-bold text-black dark:text-white mb-1">
            Change Password
          </p>

          <span className="inputLabels">
            This will be used to log you into your account and complete high
            severity actions.
          </span>

          <div className="mt-6 space-y-5">
            <Input
              disabled={loading}
              type="password"
              name="currentPassword"
              label="Current Password"
              className="inputStyles"
              {...register("currentPassword", {
                required: "Current Password is required!",
              })}
              error={
                errors.currentPassword ? errors.currentPassword.message : ""
              }
            />

            <Input
              disabled={loading}
              type="password"
              name="newPassword"
              label="New Password"
              className="inputStyles"
              {...register("newPassword", {
                required: "New Password is required!",
              })}
              error={errors.newPassword ? errors.newPassword.message : ""}
            />

            <Input
              disabled={loading}
              type="password"
              name="confirmPassword"
              label="Confirm Password"
              className="inputStyles"
              {...register("confirmPassword", {
                required: "Confirm Password is required!",
                validate: (val) => {
                  const { newPassword } = getValues();

                  return newPassword === val || "Passwords does not match!";
                },
              })}
              error={
                errors.confirmPassword ? errors.confirmPassword.message : ""
              }
            />
          </div>
        </div>

        <div className="flex items-center gap-6 justify-end py-10 pb-10 border-b-2 border-gray-200 dark:border-gray-800">
          <Button
            variant="outline"
            disabled={loading}
            type="reset"
            className="px-6 bg-transparent text-black border border-gray-200 dark:border-gray-700 cursor-pointer"
          >
            Reset
          </Button>

          <Button
            disabled={loading}
            type="submit"
            className="px-8 bg-violet-800 text-white cursor-pointer"
          >
            {loading ? (
              <BiLoader className="animate-spin text-white" />
            ) : (
              "Save"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
