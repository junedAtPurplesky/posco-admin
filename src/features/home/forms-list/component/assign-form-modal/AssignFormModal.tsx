/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button, DatePicker, Dropdown, ModalOverlay } from "@/components";
import { MultipleSelection } from "../multiple-selection";
import {
  IDepartmentItem,
  useAllDepartmentQuery,
  useCreateAssignFormMutation,
} from "@/services/apis";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useState, useRef } from "react";
import toast from "react-hot-toast";

interface AssignFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  formId: string;
}

export function AssignFormModal({
  isOpen,
  onClose,
  formId,
}: AssignFormModalProps) {
  const [selectedStaff, setSelectedStaff] = useState<string[]>([]);
  const formikRef = useRef<any>(null);

  // Use the mutation hook properly
  const { onCreateAssignFormMutate, isPending } = useCreateAssignFormMutation({
    onSuccessCallback: (data) => {
      toast.success(data.message);
      handleClose();
    },
    onErrorCallback: (err) => {
      toast.error(err.message || "Failed to assign form");
    },
  });

  const { allDepartment, isError } = useAllDepartmentQuery();

  // Transform department data for dropdown options
  const departmentOptions =
    allDepartment?.data?.map((dept: IDepartmentItem) => ({
      value: dept.id,
      label: dept.name,
    })) || [];

  // Validation Schema using Yup
  const validationSchema = Yup.object({
    department: Yup.string().required("Department is required"),
    dueDate: Yup.string().required("Due date is required"),
  });

  // Initial form values
  const initialValues = {
    department: "",
    dueDate: "",
  };

  // Handle Form Submit - CORRECTED PAYLOAD
  const handleSubmit = (values: typeof initialValues) => {
    if (!formId) {
      toast.error("Form ID is missing");
      return;
    }

    console.log("Submitting form with:", {
      formId,
      department: values.department,
      staff: selectedStaff,
      dueDate: values.dueDate,
    });

    // Correct payload according to ICreateAssignFormPayload interface
    const payload = {
      department_id: values.department,
      staff_ids: selectedStaff,
      due_date: values.dueDate,
    };

    console.log("API Payload:", payload);

    // Call the mutation - formId goes as URL parameter, payload as request body
    onCreateAssignFormMutate({
      id: formId, // This becomes part of the URL: /admin/forms/${id}/assign
      payload: payload, // This is the request body
    });
  };

  // Handle modal close with reset
  const handleClose = () => {
    // Reset form
    if (formikRef.current) {
      formikRef.current.resetForm();
    }
    // Reset staff selection
    setSelectedStaff([]);
    // Close modal
    onClose();
  };

  return (
    <ModalOverlay isOpen={isOpen} onClose={handleClose}>
      <div className="flex flex-col gap-4 p-2 w-full max-w-md">
        <h2 className="text-[1rem] text-gray-800">Assign Form</h2>
        <p className="text-[0.8rem] text-gray-600">Form ID: {formId}</p>

        <Formik
          innerRef={formikRef}
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ values, setFieldValue, errors, touched, isValid }) => (
            <Form className="flex flex-col gap-4">
              {/* Department Dropdown */}
              <div>
                <label className="block text-[0.8rem] text-gray-700 mb-2">
                  Department
                </label>
                <Dropdown
                  options={departmentOptions}
                  value={values.department}
                  onChange={(value: string) => {
                    console.log("Department selected:", value);
                    setFieldValue("department", value);
                  }}
                />
                {touched.department && errors.department && (
                  <p className="text-red-500 text-[0.7rem] mt-1">
                    {errors.department}
                  </p>
                )}
              </div>

              {isError && (
                <p className="text-red-500 text-[0.7rem]">
                  Failed to load departments
                </p>
              )}

              {/* Staff Multiple Selection */}
              <div>
                <label className="block text-[0.8rem] text-gray-700 mb-2">
                  Staff
                </label>
                <MultipleSelection
                  selectedValues={selectedStaff}
                  onChange={(values) => {
                    console.log("Staff selected:", values);
                    setSelectedStaff(values);
                  }}
                  placeholder="Select staff members"
                />
                {selectedStaff.length === 0 && (
                  <p className="text-red-500 text-[0.7rem] mt-1">
                    At least one staff member is required
                  </p>
                )}
              </div>

              {/* Due Date Picker */}
              <div>
                <label className="block text-[0.8rem] text-gray-700 mb-2">
                  Due Date
                </label>
                <DatePicker
                  value={values.dueDate}
                  onChange={(value: string) => {
                    console.log("Due date selected:", value);
                    setFieldValue("dueDate", value);
                  }}
                />
                {touched.dueDate && errors.dueDate && (
                  <p className="text-red-500 text-[0.7rem] mt-1">
                    {errors.dueDate}
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between gap-4 w-full mt-4">
                <Button
                  variant="primary-outline"
                  title="Cancel"
                  onClick={handleClose}
                  type="button"
                  disabled={isPending}
                />
                <Button
                  title={isPending ? "Assigning..." : "Assign"}
                  type="submit"
                  disabled={!isValid || selectedStaff.length === 0 || isPending}
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </ModalOverlay>
  );
}
