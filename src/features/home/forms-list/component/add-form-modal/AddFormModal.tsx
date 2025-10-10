import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, DatePicker, InputField, ModalOverlay } from "@/components";
import { PlusIcon } from "@/features/icons";
import { MdOutlineCancel } from "react-icons/md";
import { LiaAngleDownSolid } from "react-icons/lia";

interface AddFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Topic {
  id: number;
  name: string;
  subText: string;
  isOpen: boolean;
}

export const AddFormModal: React.FC<AddFormModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [safetyQuestions, setSafetyQuestions] = useState<string[]>([""]);
  const [topics, setTopics] = useState<Topic[]>([
    { id: 1, name: "", subText: "", isOpen: true },
  ]);

  const validationSchema = Yup.object({
    employeeId: Yup.string().required("Employee ID is required"),
    formName: Yup.string().required("Form Name is required"),
    dueDate: Yup.date().required("Due Date is required"),
  });

  const formik = useFormik({
    initialValues: {
      employeeId: "",
      formName: "",
      dueDate: "",
    },
    validationSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => {
      console.log("Form submitted:", {
        ...values,
        safetyQuestions,
        topics,
      });
    },
  });

  const handleAddQuestion = () => {
    setSafetyQuestions([...safetyQuestions, ""]);
  };

  const handleRemoveQuestion = (index: number) => {
    setSafetyQuestions(safetyQuestions.filter((_, i) => i !== index));
  };

  const handleQuestionChange = (index: number, value: string) => {
    const updated = [...safetyQuestions];
    updated[index] = value;
    setSafetyQuestions(updated);
  };

  const handleAddTopic = () => {
    const newTopic: Topic = {
      id: Date.now(),
      name: "",
      subText: "",
      isOpen: true,
    };
    setTopics([...topics, newTopic]);
  };

  const handleRemoveTopic = (id: number) => {
    if (topics.length > 1) {
      setTopics(topics.filter((topic) => topic.id !== id));
    }
  };

  const handleTopicChange = (id: number, field: keyof Topic, value: string) => {
    setTopics(
      topics.map((topic) =>
        topic.id === id ? { ...topic, [field]: value } : topic
      )
    );
  };

  const toggleTopic = (id: number) => {
    setTopics(
      topics.map((topic) =>
        topic.id === id ? { ...topic, isOpen: !topic.isOpen } : topic
      )
    );
  };

  return (
    <ModalOverlay isOpen={isOpen} onClose={onClose}>
      <div className="rounded-lg w-full max-w-md mx-auto flex flex-col gap-5 h-[36rem] overflow-y-scroll scrollbar-hide">
        <div className="flex items-center justify-between">
          <h2 className="text-gray-800">Add Form</h2>
        </div>

        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col gap-4 p-1"
        >
          <InputField
            label="Employee ID"
            placeholder="Enter Employee ID"
            name="employeeId"
            value={formik.values.employeeId}
            onChange={formik.handleChange}
            error={
              formik.submitCount > 0 && formik.errors.employeeId
                ? formik.errors.employeeId
                : undefined
            }
          />

          <InputField
            label="Form Name"
            placeholder="Enter Form Name"
            name="formName"
            value={formik.values.formName}
            onChange={formik.handleChange}
            error={
              formik.submitCount > 0 && formik.errors.formName
                ? formik.errors.formName
                : undefined
            }
          />

          <DatePicker
            label="Due Date"
            value={formik.values.dueDate}
            onChange={(date) => formik.setFieldValue("dueDate", date)}
            error={
              formik.submitCount > 0 && formik.errors.dueDate
                ? formik.errors.dueDate
                : undefined
            }
          />

          {topics.map((topic, index) => (
            <div key={topic.id} className="text-gray-700">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-[0.8rem]">Topic {index + 1}</span>
                  <button
                    type="button"
                    onClick={() => toggleTopic(topic.id)}
                    className="hover:text-gray-800"
                  >
                    {topic.isOpen ? (
                      <LiaAngleDownSolid className=" h-3 w-3" />
                    ) : (
                      <LiaAngleDownSolid className=" rotate-180 h-3 w-3" />
                    )}
                  </button>
                </div>
                {topics.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveTopic(topic.id)}
                    className="hover:text-red-500"
                  >
                    <MdOutlineCancel className="h-4 w-4" />
                  </button>
                )}
              </div>

              {topic.isOpen && (
                <div className="flex flex-col gap-3">
                  <InputField
                    label="Topic Name"
                    placeholder="e.g. First Aid"
                    value={topic.name}
                    onChange={(e) =>
                      handleTopicChange(topic.id, "name", e.target.value)
                    }
                  />
                  <InputField
                    label="Sub Text"
                    placeholder="e.g. Sub Text"
                    value={topic.subText}
                    onChange={(e) =>
                      handleTopicChange(topic.id, "subText", e.target.value)
                    }
                  />
                </div>
              )}
            </div>
          ))}

          <div
            className="flex justify-end text-primary cursor-pointer items-center text-[0.8rem] gap-2"
            onClick={handleAddTopic}
          >
            <PlusIcon className="h-4 w-4" />
            <span className="text-primary">Add Topic</span>
          </div>

          {safetyQuestions.map((question, index) => (
            <div key={index} className="flex items-center gap-2">
              <InputField
                label={`Safety Question ${index + 1}`}
                placeholder="Enter Safety Question"
                value={question}
                onChange={(e) => handleQuestionChange(index, e.target.value)}
              />
              {safetyQuestions.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveQuestion(index)}
                  className="text-gray-500 hover:text-red-500 mt-6"
                >
                  <MdOutlineCancel className="h-4 w-4" />
                </button>
              )}
            </div>
          ))}

          <div
            className="flex justify-end text-primary cursor-pointer items-center text-[0.8rem] gap-2"
            onClick={handleAddQuestion}
          >
            <PlusIcon className="h-4 w-4" />
            <span className="text-primary">Add Safety Question</span>
          </div>

          <Button title="Save" width="w-full" type="submit" />
        </form>
      </div>
    </ModalOverlay>
  );
};
