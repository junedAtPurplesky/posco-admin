import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Button,
  DatePicker,
  Dropdown,
  InputField,
  ModalOverlay,
  ToggleSwitch,
} from "@/components";
import { PlusIcon } from "@/features/icons";
import { MdOutlineCancel } from "react-icons/md";
import {
  ICreateFormPayload,
  IFormField,
  useCreateFormMutation,
} from "@/services/apis";
import toast from "react-hot-toast";

// Enums matching backend
export enum FieldType {
  CHECKBOX = "checkbox",
  RADIO = "radio",
  TEXT = "text",
  TEXTAREA = "textarea",
  DROPDOWN = "dropdown",
  RATING = "rating",
  PHOTO = "photo",
  SIGNATURE = "signature",
}

export enum SafetyCategory {
  GENERAL_SAFETY = "general_safety",
  EMERGENCY_EXITS = "emergency_exits",
  FIRE_SAFETY = "fire_safety",
  EQUIPMENT_SAFETY = "equipment_safety",
}

// Dropdown options
// const FIELD_TYPES = Object.values(FieldType).map((f) => ({
//   label: f.replace("_", " ").toUpperCase(),
//   value: f,
// }));

const SAFETY_CATEGORIES = Object.values(SafetyCategory).map((c) => ({
  label: c.replace("_", " ").toUpperCase(),
  value: c,
}));

interface AddFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onFormCreated?: () => void;
}

interface QuestionData {
  id: number;
  label: string;
}

interface FormFieldData {
  id: number;
  questions: QuestionData[];
  field_type: FieldType;
  field_description?: string;
  category: SafetyCategory;
  is_required: boolean;
}

export const AddFormModal: React.FC<AddFormModalProps> = ({
  isOpen,
  onClose,
  onFormCreated,
}) => {
  const [fields, setFields] = useState<FormFieldData[]>([
    {
      id: Date.now(),
      questions: [{ id: Date.now(), label: "" }],
      field_type: FieldType.CHECKBOX,
      category: SafetyCategory.GENERAL_SAFETY,
      is_required: false,
    },
  ]);

  const { onCreateFormMutate, isPending, error } = useCreateFormMutation({
    onSuccessCallback: (data) => {
      toast.success(data.message);
      handleFormReset();
      onClose();
      onFormCreated?.();
    },
    onErrorCallback: (err) => {
      toast.error(err.message);
    },
  });

  const validationSchema = Yup.object({
    form_name: Yup.string().required("Form name is required"),
    due_date: Yup.string().required("Due date is required"),
    description: Yup.string().nullable(),
  });

  const formik = useFormik({
    initialValues: {
      form_name: "",
      description: "",
      due_date: "",
    },
    validationSchema,
    validateOnChange: false,
    validateOnBlur: false, 
    onSubmit: (values) => {
    
      if (values.due_date) {
        const selectedDate = new Date(values.due_date);
        const today = new Date();
        today.setHours(0, 0, 0, 0); 
        
        if (selectedDate < today) {
          formik.setFieldError("due_date", "Due date cannot be in the past");
          return;
        }
      }

      // Fields validation
      const hasValidQuestions = fields.some((field) =>
        field.questions.some((q) => q.label.trim() !== "")
      );

      if (!hasValidQuestions) {
        toast.error("Please add at least one question");
        return;
      }

      const allFields: IFormField[] = fields.map((field, index) => ({
        field_label: "",
        field_type: field.field_type,
        category: field.category,
        field_description: field.field_description,
        is_required: field.is_required,
        order: index + 1,
        options: field.questions
          .map((q) => q.label.trim())
          .filter((label) => label !== ""),
      }));

      const payload: ICreateFormPayload = {
        form_name: values.form_name,
        description: values.description,
        due_date: values.due_date,
        fields: allFields,
      };

      console.log("Final Payload:", payload);
      onCreateFormMutate(payload);
    },
  });

  // Function to reset the entire form
  const handleFormReset = () => {
    formik.resetForm();
    setFields([
      {
        id: Date.now(),
        questions: [{ id: Date.now(), label: "" }],
        field_type: FieldType.CHECKBOX,
        category: SafetyCategory.GENERAL_SAFETY,
        is_required: false,
      },
    ]);
  };

  // Handle modal close with reset
  const handleClose = () => {
    handleFormReset();
    onClose();
  };

  const handleAddField = () => {
    setFields([
      ...fields,
      {
        id: Date.now(),
        questions: [{ id: Date.now(), label: "" }],
        field_type: FieldType.CHECKBOX,
        category: SafetyCategory.GENERAL_SAFETY,
        is_required: false,
      },
    ]);
  };

  const handleRemoveField = (id: number) => {
    if (fields.length > 1) {
      setFields(fields.filter((f) => f.id !== id));
    }
  };

  const handleAddQuestion = (fieldId: number) => {
    setFields(
      fields.map((field) =>
        field.id === fieldId
          ? {
              ...field,
              questions: [...field.questions, { id: Date.now(), label: "" }],
            }
          : field
      )
    );
  };

  const handleRemoveQuestion = (fieldId: number, questionId: number) => {
    setFields(
      fields.map((field) =>
        field.id === fieldId
          ? {
              ...field,
              questions: field.questions.filter((q) => q.id !== questionId),
            }
          : field
      )
    );
  };

  const handleQuestionChange = (
    fieldId: number,
    questionId: number,
    value: string
  ) => {
    setFields(
      fields.map((field) =>
        field.id === fieldId
          ? {
              ...field,
              questions: field.questions.map((q) =>
                q.id === questionId ? { ...q, label: value } : q
              ),
            }
          : field
      )
    );
  };

  const handleFieldChange = (
    id: number,
    key: keyof Omit<FormFieldData, "id" | "questions">,
    value: string | boolean
  ) => {
    setFields(fields.map((f) => (f.id === id ? { ...f, [key]: value } : f)));
  };

  const isFormValid = () => {
    const hasValidQuestions = fields.some((field) =>
      field.questions.some((q) => q.label.trim() !== "")
    );
    return formik.values.form_name.trim() !== "" && 
           formik.values.due_date !== "" && 
           hasValidQuestions;
  };

  return (
    <ModalOverlay isOpen={isOpen} onClose={handleClose}>
      <div className="rounded-lg w-full max-w-lg mx-auto flex flex-col gap-5 h-[38rem] overflow-y-scroll scrollbar-hide p-1">
        <div className="flex items-center justify-between">
          <h2 className="text-gray-800 text-lg font-semibold">
            Create Safety Form
          </h2>
        </div>

        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col gap-4 p-1"
        >
          <InputField
            label="Form Name"
            placeholder="e.g. Fire Safety Audit"
            name="form_name"
            value={formik.values.form_name}
            onChange={formik.handleChange}
            error={formik.errors.form_name} 
          />

          <InputField
            label="Description"
            placeholder="Short description"
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
          />

          <DatePicker
            label="Due Date"
            placeholder="Select date"
            value={formik.values.due_date}
            onChange={(date) => formik.setFieldValue("due_date", date)}
            error={formik.errors.due_date}
            minDate={new Date()} 
          />

          {/* Form Fields Section */}
          <div className="mt-2">
            <h3 className="text-gray-700 text-base font-medium mb-2">
              Form Fields
            </h3>

            {fields.map((field, fieldIdx) => (
              <div
                key={field.id}
                className="p-3 mb-3 border border-gray-200 rounded-lg bg-gray-50 flex flex-col gap-4"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    Field {fieldIdx + 1}
                  </span>
                  {fields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveField(field.id)}
                      className="text-gray-500 hover:text-red-500"
                    >
                      <MdOutlineCancel className="h-4 w-4" />
                    </button>
                  )}
                </div>

                {/* Multiple Questions within same field */}
                <div className="space-y-1">
                  {field.questions.map((question, questionIdx) => (
                    <div key={question.id} className="relative mb-3">
                      <InputField
                        label={`Question ${questionIdx + 1}`}
                        placeholder="e.g. Are fire extinguishers accessible?"
                        value={question.label}
                        onChange={(e) =>
                          handleQuestionChange(
                            field.id,
                            question.id,
                            e.target.value
                          )
                        }
                        required
                      />
                      {field.questions.length > 1 && (
                        <button
                          type="button"
                          onClick={() =>
                            handleRemoveQuestion(field.id, question.id)
                          }
                          className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
                        >
                          <MdOutlineCancel className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  ))}

                  {/* Add Question button inside the same field */}
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => handleAddQuestion(field.id)}
                      className="flex items-center gap-1 text-primary hover:text-primary-dark text-xs p-2"
                    >
                      <PlusIcon className="h-3 w-3" />
                      <span>Add Another Question</span>
                    </button>
                  </div>
                </div>
                <InputField
                  label="Field Description"
                  placeholder="Describe this field (optional)"
                  value={field.field_description || ""}
                  onChange={(e) =>
                    handleFieldChange(
                      field.id,
                      "field_description",
                      e.target.value
                    )
                  }
                />
                {/* <Dropdown
                  label="Field Type"
                  options={FIELD_TYPES}
                  value={field.field_type}
                  onChange={(val) =>
                    handleFieldChange(field.id, "field_type", val as FieldType)
                  }
                /> */}
                <Dropdown
                  label="Safety Category"
                  options={SAFETY_CATEGORIES}
                  value={field.category}
                  onChange={(val) =>
                    handleFieldChange(
                      field.id,
                      "category",
                      val as SafetyCategory
                    )
                  }
                />
                <ToggleSwitch
                  label="Required Field"
                  checked={field.is_required}
                  onChange={(checked) =>
                    handleFieldChange(field.id, "is_required", checked)
                  }
                />
              </div>
            ))}

            {/* Add New Field button */}
            <div className="flex justify-end mt-2">
              <button
                type="button"
                onClick={handleAddField}
                className="flex items-center gap-2 text-primary hover:text-primary-dark text-sm p-2"
              >
                <PlusIcon className="h-4 w-4" />
                <span>Add New Field</span>
              </button>
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-sm mt-2">
              {error.message || "Failed to create form. Please try again."}
            </div>
          )}

          <Button
            title={isPending ? "Creating..." : "Save"}
            width="w-full"
            type="submit"
            disabled={isPending || !isFormValid()}
          />
        </form>
      </div>
    </ModalOverlay>
  );
};