import { formSubmissionActions, formSubmissionColumns } from "@/constants";
import { Table } from "@/components";
import { useAllRecentSubmissionQuery } from "@/services/apis";

export function DailyFormSubmissionList() {
  const { allRecentSubmission, isLoading, isError } =
    useAllRecentSubmissionQuery();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div className="text-red-500">Failed to load data.</div>;

  return (
    <section className="flex flex-col gap-4 bg-white p-6">
      <h1 className="text-[1.1rem]">Daily Form Submission List</h1>

      {Array.isArray(allRecentSubmission?.data) &&
      allRecentSubmission.data.length > 0 ? (
        <Table
          columns={formSubmissionColumns}
          data={allRecentSubmission.data || []}
          actions={formSubmissionActions}
        />
      ) : (
        <div className="text-gray-500 text-center p-4 text-sm">No submissions found.</div>
      )}
    </section>
  );
}
