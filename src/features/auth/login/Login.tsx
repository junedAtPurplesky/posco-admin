
"use client";

import { Button, InputField } from "@/components";
import { AuthCard } from "../auth-card";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useLoginMutation } from "@/services/apis/clients/community-client/query-hooks/useLoginMutation";
import { ILoginPayload } from "@/services/apis";
import { useAuthStore } from "@/services";

const validationSchema = Yup.object({
  employeeId: Yup.string().required("Employee ID is required"),
  password: Yup.string().required("Password is required"),
});

export function Login() {
  const router = useRouter();
  const { addNewSession } = useAuthStore()

  const { submitLogin, isPending } = useLoginMutation({
    onSuccessCallback: (response) => {
      const loginData = response.data
        toast.success(response.message || "Login successful");
        
    addNewSession({
      user: loginData?.user,
      access_token: loginData.access_token || "",
      refresh_token: loginData.refresh_token || "",
    });
        router.push("/dashboard");
    },
    onErrorCallback: (err) => {
      toast.error(err?.message || "Something went wrong during login!");
      console.error("Login error:", err);
    },
  });

  const formik = useFormik({
    initialValues: {
      employeeId: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      const payload: ILoginPayload = {
        identifier: values.employeeId,
        password: values.password,
      };
      submitLogin(payload);
    },
  });

  return (
    <AuthCard title="Login">
      <form className="flex flex-col gap-4" onSubmit={formik.handleSubmit}>
        <InputField
          label="Employee ID"
          name="employeeId"
          placeholder="Enter Employee ID"
          value={formik.values.employeeId}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.employeeId ? formik.errors.employeeId : ""}
        />

        <InputField
          label="Password"
          name="password"
          type="password"
          placeholder="Enter Password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password ? formik.errors.password : ""}
        />

        <span className="text-primary cursor-pointer hover:underline text-sm font-semibold">
          Forget Password
        </span>

        <Button
          title={isPending ? "Logging in..." : "Login"}
          type="submit"
          disabled={isPending}
        />
      </form>
    </AuthCard>
  );
}

