import React, { useEffect } from "react";
import { Button, Dropdown, InputField, ModalOverlay } from "@/components";
import { useFormik } from "formik";
import * as Yup from "yup";

interface AddStaffModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddStaffModal({ isOpen, onClose }: AddStaffModalProps) {
  const formik = useFormik({
    initialValues: {
      employeeId: "",
      employeeName: "",
      email: "",
      role: "",
      password: "",
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      employeeId: Yup.string().required("Employee ID is required"),
      employeeName: Yup.string().required("Employee Name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      role: Yup.string().required("Role is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: (values) => {
      console.log("Form submitted:", values);
      onClose();
    },
  });

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      formik.resetForm();
    }
  }, [formik, isOpen]);

  return (
    <ModalOverlay isOpen={isOpen} onClose={onClose}>
      <div className="rounded-lg w-full max-w-md mx-auto flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <h2 className="text-gray-800">Add New Staff</h2>
        </div>

        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-3">
          <InputField
            label="Employee ID"
            placeholder="Enter Employee ID"
            name="employeeId"
            value={formik.values.employeeId}
            onChange={formik.handleChange}
            error={
              formik.touched.employeeId ? formik.errors.employeeId : undefined
            }
          />

          <InputField
            label="Employee Name"
            placeholder="Enter Employee Name"
            name="employeeName"
            value={formik.values.employeeName}
            onChange={formik.handleChange}
            error={
              formik.touched.employeeName
                ? formik.errors.employeeName
                : undefined
            }
          />

          <InputField
            label="Email ID"
            placeholder="Enter Email ID"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email ? formik.errors.email : undefined}
          />

          <Dropdown
            label="Role"
            options={[
              { label: "Admin", value: "admin" },
              { label: "User", value: "user" },
              { label: "Developer", value: "developer" },
            ]}
            value={formik.values.role}
            onChange={(value) => formik.setFieldValue("role", value)}
            error={formik.touched.role ? formik.errors.role : undefined}
          />

          <InputField
            label="Create Password"
            placeholder="Create Password"
            name="password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={
              formik.touched.password ? formik.errors.password : undefined
            }
          />

          <div>
            <Button title="Save" width="w-full" type="submit" />
          </div>
        </form>
      </div>
    </ModalOverlay>
  );
}