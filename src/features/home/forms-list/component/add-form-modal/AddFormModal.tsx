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
const FIELD_TYPES = Object.values(FieldType).map((f) => ({
  label: f.replace("_", " ").toUpperCase(),
  value: f,
}));

const SAFETY_CATEGORIES = Object.values(SafetyCategory).map((c) => ({
  label: c.replace("_", " ").toUpperCase(),
  value: c,
}));

interface AddFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onFormCreated?: () => void;
}

interface FormFieldData {
  id: number;
  field_label: string;
  field_type: FieldType;
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
      field_label: "",
      field_type: FieldType.CHECKBOX,
      category: SafetyCategory.GENERAL_SAFETY,
      is_required: false,
    },
  ]);

  const { onCreateFormMutate, isPending, error } = useCreateFormMutation({
    onSuccessCallback: (data) => {
      console.log("Form created successfully:", data);
      onClose();
      onFormCreated?.();
    },
    onErrorCallback: (err) => {
      console.error("Error creating form:", err);
    },
  });

  const validationSchema = Yup.object({
    form_name: Yup.string().required("Form Name is required"),
    due_date: Yup.date().required("Due Date is required"),
    description: Yup.string().nullable(),
  });

  const formik = useFormik({
    initialValues: {
      form_name: "",
      description: "",
      due_date: "",
    },
    validationSchema,
    onSubmit: (values) => {
      const payload: ICreateFormPayload = {
        form_name: values.form_name,
        description: values.description,
        due_date: values.due_date,
        fields: fields.map<IFormField>((f, index) => ({
          field_label: f.field_label,
          field_type: f.field_type,
          category: f.category,
          is_required: f.is_required,
          order: index + 1,
        })),
      };
      onCreateFormMutate(payload);
    },
  });

  const handleAddField = () => {
    setFields([
      ...fields,
      {
        id: Date.now(),
        field_label: "",
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

  const handleFieldChange = (
    id: number,
    key: keyof FormFieldData,
    value: string | boolean
  ) => {
    setFields(fields.map((f) => (f.id === id ? { ...f, [key]: value } : f)));
  };

  const isFormValid = () => {
    const hasValidFields = fields.some((f) => f.field_label.trim() !== "");
    return formik.isValid && hasValidFields;
  };

  return (
    <ModalOverlay isOpen={isOpen} onClose={onClose}>
      <div className="rounded-lg w-full max-w-lg mx-auto flex flex-col gap-5 h-[38rem] overflow-y-scroll scrollbar-hide">
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
          />

          {/* Form Fields Section */}
          <div className="mt-2">
            <h3 className="text-gray-700 text-base font-medium mb-2">
              Form Fields (Questions)
            </h3>

            {fields.map((field, idx) => (
              <div
                key={field.id}
                className="p-3 mb-3 border border-gray-200 rounded-lg bg-gray-50"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    Field {idx + 1}
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

                <InputField
                  label="Question Label"
                  placeholder="e.g. Are fire extinguishers accessible?"
                  value={field.field_label}
                  onChange={(e) =>
                    handleFieldChange(field.id, "field_label", e.target.value)
                  }
                  required
                />

                <Dropdown
                  label="Field Type"
                  options={FIELD_TYPES}
                  value={field.field_type}
                  onChange={(val) =>
                    handleFieldChange(field.id, "field_type", val as FieldType)
                  }
                />

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

            <div
              className="flex justify-end text-primary cursor-pointer items-center text-[0.85rem] gap-2 mt-2"
              onClick={handleAddField}
            >
              <PlusIcon className="h-4 w-4" />
              <span className="text-primary">Add Another Question</span>
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
