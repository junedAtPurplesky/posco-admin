"use client";
import React, { useEffect } from "react";
import { Button, Dropdown, InputField, ModalOverlay } from "@/components";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import {
  ICreateStaffPayload,
  useCreateStaffMutation,
  useAllDepartmentQuery,
  useAllRoleQuery,
} from "@/services/apis";

interface AddStaffModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddStaffModal({ isOpen, onClose }: AddStaffModalProps) {
  const { onCreateStaffMutate, isPending } = useCreateStaffMutation({
    onSuccessCallback: (response) => {
      toast.success(response?.message || "Staff created successfully");
      onClose();
    },
    onErrorCallback: (err) => {
      toast.error(err?.message || "Failed to create staff. Please try again.");
    },
  });

  const { allDepartment } = useAllDepartmentQuery();
  const { allRole } = useAllRoleQuery();

  const formik = useFormik({
    initialValues: {
      employeeId: "",
      employeeName: "",
      email: "",
      role: "",
      departmentId: "",
      password: "",
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      employeeId: Yup.string().required("Employee ID is required"),
      employeeName: Yup.string().required("Employee Name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      role: Yup.string().required("Role is required"),
      departmentId: Yup.string().required("Department ID is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: (values) => {
      const payload: ICreateStaffPayload = {
        employee_id: values.employeeId,
        email: values.email,
        first_name: values.employeeName.split(" ")[0] || "",
        last_name: values.employeeName.split(" ")[1] || "",
        phone_number: "",
        password: values.password,
        department_id: values.departmentId,
        user_role: "admin",
        status: "active",
      };

      onCreateStaffMutate(payload);
    },
  });

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
            options={
              allRole?.data?.list?.map((role) => ({
                label: role.role,
                value: role.id,
              })) || []
            }
            value={formik.values.role}
            onChange={(value) => formik.setFieldValue("role", value)}
            error={formik.touched.role ? formik.errors.role : undefined}
          />

          <Dropdown
            label="Department"
            options={
              allDepartment?.data?.map((dept) => ({
                label: dept.name,
                value: dept.id,
              })) || []
            }
            value={formik.values.departmentId}
            onChange={(value) => formik.setFieldValue("departmentId", value)}
            error={
              formik.touched.departmentId
                ? formik.errors.departmentId
                : undefined
            }
          />

          <InputField
            label="Create Password"
            placeholder="Create Password"
            name="password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password ? formik.errors.password : undefined}
          />

          <div>
            <Button
              title={isPending ? "Saving..." : "Save"}
              width="w-full"
              type="submit"
              disabled={isPending}
            />
          </div>
        </form>
      </div>
    </ModalOverlay>
  );
}
