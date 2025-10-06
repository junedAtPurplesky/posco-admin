import {
  dummyFormSubmissions,
  formSubmissionActions,
  formSubmissionColumns,
} from "@/constants";
import { Table } from "@/components";

export function DailyFormSubmissionList() {
  return (
    <section className="flex flex-col gap-4 bg-white rounded-md p-6">
      <h1 className="text-[1.2rem]">Daily Form Submission List</h1>
      <Table
        columns={formSubmissionColumns}
        data={dummyFormSubmissions}
        actions={formSubmissionActions}
      />
    </section>
  );
}
