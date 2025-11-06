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

  const departmentOptions =
    allDepartment?.data?.map((dept: IDepartmentItem) => ({
      value: dept.id,
      label: dept.name,
    })) || [];

  const validationSchema = Yup.object({
    department: Yup.string().required("Department is required"),
    dueDate: Yup.string().required("Due date is required"),
  });

  const initialValues = {
    department: "",
    dueDate: "",
  };

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

    const payload = {
      // department_id: values.department,
      staff_ids: selectedStaff,
      due_date: values.dueDate,
    };

    console.log("API Payload:", payload);

    onCreateAssignFormMutate({
      id: formId,
      payload: payload,
    });
  };

  const handleClose = () => {
    if (formikRef.current) {
      formikRef.current.resetForm();
    }
    setSelectedStaff([]);
    onClose();
  };

  return (
    <ModalOverlay isOpen={isOpen} onClose={handleClose}>
      <div className="flex flex-col gap-4 p-2 w-full max-w-md">
        <h2 className="text-[1rem] text-gray-800">Assign Form</h2>

        <Formik
          innerRef={formikRef}
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
          validateOnChange={false}
          validateOnBlur={false}
        >
          {({ values, setFieldValue, errors, submitForm }) => (
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
                {errors.department && (
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
                  departmentId={values.department}
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
                    setFieldValue("dueDate", value);
                  }}
                  minDate={new Date().toISOString().split("T")[0]}
                />
                {errors.dueDate && (
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
                  disabled={isPending}
                  onClick={(e) => {
                    e.preventDefault();

                    if (!values.department || !values.dueDate) {
                      formikRef.current?.validateForm().then((errors: any) => {
                        formikRef.current?.setErrors(errors);
                        formikRef.current?.setTouched(
                          {
                            department: true,
                            dueDate: true,
                          },
                          false
                        );
                      });
                      return;
                    }

                    if (selectedStaff.length === 0) {
                      toast.error("Please select at least one staff member");
                      return;
                    }

                    submitForm();
                  }}
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </ModalOverlay>
  );
}
