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

interface SafetyQuestion {
  id: number;
  text: string;
}

interface Topic {
  id: number;
  name: string;
  subText: string;
  isOpen: boolean;
  safetyQuestions: SafetyQuestion[];
}

export const AddFormModal: React.FC<AddFormModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [topics, setTopics] = useState<Topic[]>([
    {
      id: 1,
      name: "",
      subText: "",
      isOpen: true,
      safetyQuestions: [{ id: Date.now(), text: "" }],
    },
  ]);

  const validationSchema = Yup.object({
    formName: Yup.string().required("Form Name is required"),
    dueDate: Yup.date().required("Due Date is required"),
  });

  const formik = useFormik({
    initialValues: {
      formName: "",
      dueDate: "",
    },
    validationSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => {
      console.log("Form submitted:", {
        ...values,
        topics,
      });
    },
  });

  const handleAddTopic = () => {
    const newTopic: Topic = {
      id: Date.now(),
      name: "",
      subText: "",
      isOpen: true,
      safetyQuestions: [{ id: Date.now() + 1, text: "" }],
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

  const handleAddSafetyQuestion = (topicId: number) => {
    setTopics(
      topics.map((topic) =>
        topic.id === topicId
          ? {
              ...topic,
              safetyQuestions: [
                ...topic.safetyQuestions,
                { id: Date.now(), text: "" },
              ],
            }
          : topic
      )
    );
  };

  const handleRemoveSafetyQuestion = (topicId: number, questionId: number) => {
    setTopics(
      topics.map((topic) =>
        topic.id === topicId
          ? {
              ...topic,
              safetyQuestions: topic.safetyQuestions.filter(
                (q) => q.id !== questionId
              ),
            }
          : topic
      )
    );
  };

  const handleSafetyQuestionChange = (
    topicId: number,
    questionId: number,
    value: string
  ) => {
    setTopics(
      topics.map((topic) =>
        topic.id === topicId
          ? {
              ...topic,
              safetyQuestions: topic.safetyQuestions.map((q) =>
                q.id === questionId ? { ...q, text: value } : q
              ),
            }
          : topic
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
            label="Form Name"
            placeholder="e.g. Safety Form"
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
            placeholder="e.g. DD/MM/YYYY"
            value={formik.values.dueDate}
            onChange={(date) => formik.setFieldValue("dueDate", date)}
            error={
              formik.submitCount > 0 && formik.errors.dueDate
                ? formik.errors.dueDate
                : undefined
            }
          />

          {topics.map((topic, topicIndex) => (
            <div key={topic.id} className="text-gray-700">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-[0.8rem]">Topic {topicIndex + 1}</span>
                  <button
                    type="button"
                    onClick={() => toggleTopic(topic.id)}
                    className="hover:text-gray-800"
                  >
                    {topic.isOpen ? (
                      <LiaAngleDownSolid className="h-3 w-3" />
                    ) : (
                      <LiaAngleDownSolid className="rotate-180 h-3 w-3" />
                    )}
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleAddTopic}
                    className="text-primary text-[0.8rem] flex items-center gap-1 hover:underline"
                  >
                    <PlusIcon className="h-3 w-3" />
                    Add Topic
                  </button>
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

                  <div className="mt-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Safety Questions
                    </label>
                    {topic.safetyQuestions.map((question) => (
                      <div
                        key={question.id}
                        className="flex items-center gap-2 mb-2"
                      >
                        <InputField
                          placeholder="e.g. Accessible first aid stations"
                          value={question.text}
                          onChange={(e) =>
                            handleSafetyQuestionChange(
                              topic.id,
                              question.id,
                              e.target.value
                            )
                          }
                        />
                        {topic.safetyQuestions.length > 1 && (
                          <button
                            type="button"
                            onClick={() =>
                              handleRemoveSafetyQuestion(topic.id, question.id)
                            }
                            className="text-gray-500 hover:text-red-500"
                          >
                            <MdOutlineCancel className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    ))}

                    <div
                      className="flex justify-end text-primary cursor-pointer items-center text-[0.8rem] gap-2 mt-2"
                      onClick={() => handleAddSafetyQuestion(topic.id)}
                    >
                      <PlusIcon className="h-4 w-4" />
                      <span className="text-primary">Add Safety Question</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}

          <Button title="Save" width="w-full" type="submit" />
        </form>
      </div>
    </ModalOverlay>
  );
};
