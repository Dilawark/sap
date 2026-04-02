import { useMutation, useQueryClient } from "react-query";
import { deleteStudent } from "../apiRequest";

export function useDeleteStudentMutation() {
  const queryClient = useQueryClient();
  const deleteStudentMutation = useMutation(deleteStudent, {
    onSuccess: () => {
      queryClient.invalidateQueries("students");
    },
  });
  return deleteStudentMutation;
}
